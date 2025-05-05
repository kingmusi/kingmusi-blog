<template>
  <div class="my-demo">
    <div class="example" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
    <div class="tools">
      <button @click="showCode = !showCode">
        <i>
          <svg t="1737553668146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4648" width="200" height="200"><path d="M300.224 224L32 525.76l268.224 301.76 71.776-63.776-211.552-237.984 211.552-237.984zM711.744 224L640 287.776l211.552 237.984L640 763.744l71.744 63.776 268.256-301.76z" p-id="4649"></path></svg>
        </i>
      </button>
    </div>
    <transition name="scale">
      <div v-show="showCode" class="code">
        <div class="vp-tabs">
          <div class="vp-tabs-nav">
            <button
              v-for="v in Object.keys(raw)"
              :key="v"
              type="button"
              class="vp-tab-nav"
              :class="{ active: v === activeRaw }"
              @click="activeRaw = v"
            >{{ v }}</button>
            <div class="vp-tab" style="display: block;">
              <div v-html="raw[activeRaw]"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import * as Vue from 'vue'
import { onMounted, ref, shallowRef } from 'vue'
import { some, has } from 'lodash-es'
import { loadModule } from 'vue3-sfc-loader'
import React from 'react'
// @ts-ignore
import { createRoot } from 'react-dom/client'
import * as veaury from 'veaury'

const showCode = ref(true)
const exampleRef = ref<HTMLDivElement | null>(null)

// 子组件
const childComponent = shallowRef<any>(null)

const props = defineProps<{
  content: string
  raw: string
}>()
// 解析 raw
const raw = JSON.parse(decodeURIComponent(props.raw))
for (const key in raw) {
  raw[key] = decodeURIComponent(raw[key])
}
const activeRaw = ref(Object.keys(raw)[0])

// 解析 content
const content = JSON.parse(decodeURIComponent(props.content))
for (const key in content) {
  content[key] = decodeURIComponent(content[key])
}

if (some(['html', 'js', 'css'], (k) => has(content, k))) {
  onMounted(() => {
    const container = exampleRef.value
    if (container) {
      const shadowRoot = container.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = `
        <style>${content.css || ''}</style>
        ${content.html || ''}
      `

      if (typeof content.js === 'string') {
        const js = 
          content.js
            .replace(/document\.querySelector/g, 'shadowRoot.querySelector')
            .replace(/document\.querySelectorAll/g, 'shadowRoot.querySelectorAll')
            .replace(/document\.getElement/g, 'shadowRoot.getElement')
        
        const script = new Function('shadowRoot', js)
        try {
          script(shadowRoot)
        } catch (e) {
          console.error('脚本执行错误', e)
        }
      }
    }
  })
}

if (has(content, 'vue')) {
  // @ts-ignore
  loadModule(Date.now() + 'dynamic-component.vue', {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
      return content.vue
    },
    addStyle(text) {
      if (text) {
        const style = document.createElement('style')
        style.textContent = text
        document.head.appendChild(style)
      }
    },
    isCustomElement(tagName) {
      return tagName === 'json-viewer'
    }
  }).then(res => {
    childComponent.value = res
  }).catch(e => {
    console.error(e)
  })
}

if (has(content, 'react')) {
  veaury.setVeauryOptions({
    react: {
      createRoot
    }
  })
  const func = new Function('React', 'exports', content.react)
  const exports = {
    default: null
  }
  func(React, exports)
  const component = exports.default
  if (component) {
    childComponent.value = veaury.applyPureReactInVue(component)
  }
}
</script>

<style scoped lang="scss">
.scale-enter-from,
.scale-leave-to {
  transform: scaleY(0);
}
.scale-leave-from,
.scale-enter-to {
  transform: scaleY(1);
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s;
}

.my-demo {
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 0.5rem 0;
  .example {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    border: 1px solid var(--vp-c-border);
    border-radius: 8px 8px 0 0;
  }
  .tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
    padding: .5rem;
    box-sizing: border-box;
    border-bottom: 1px solid var(--vp-c-border);
    border-left: 1px solid var(--vp-c-border);
    border-right: 1px solid var(--vp-c-border);
    button {
      position: relative;
      width: 1rem;
      height: 1rem;
      margin: 0 .5rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 0;
      outline: none;
      border-radius: 4px;
      i {
        position: relative;
        width: 1rem;
        height: 1rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 1rem;
          height: 1rem;
          cursor: pointer;
        }
      }
    }
  }
  .code {
    padding: 0;
    transform-origin: center top;

    .vp-tabs {
      margin: 0;
      border-radius: 0;
      .vp-tabs-nav {
        border-radius: 0;
      }
      .vp-tab {
        padding: 0.3rem;
        border-radius: 0;
      }
    }
  }
}
</style>