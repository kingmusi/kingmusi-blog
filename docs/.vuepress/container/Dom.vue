<template>
  <div class="my-dom">
    <div class="example" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
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
import { applyPureReactInVue, setVeauryOptions } from 'veaury'

setVeauryOptions({
  react: {
    createRoot
  }
})

// 子组件
const exampleRef = ref<HTMLDivElement | null>(null)
const childComponent = shallowRef<any>(null)

const props = defineProps<{
  content: string
}>()

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
  loadModule('dynamic-component.vue', {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
      if (url === 'dynamic-component.vue') {
        return content.vue
      }
      throw new Error('Not found')
    },
    addStyle(text) {
      if (text) {
        const style = document.createElement('style')
        style.textContent = text
        document.head.appendChild(style)
      }
    }
  }).then(res => {
    childComponent.value = res
  }).catch(e => {
    console.error(e)
  })
}

if (has(content, 'react')) {
  const func = new Function('React', 'exports', content.react)
  const exports = {
    default: null
  }
  func(React, exports)
  const component = exports.default
  if (component) {
    childComponent.value = applyPureReactInVue(component)
  }
}
</script>

<style scoped lang="scss">
.my-dom {
  width: fit-content;
  margin: 0.5rem 0;
  .example {
    width: fit-content;
    padding: 0.5rem;
    box-sizing: border-box;
    border: 1px solid var(--vp-c-border);
    border-radius: 8px 8px 0 0;
  }
}
</style>