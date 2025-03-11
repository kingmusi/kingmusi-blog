<template>
  <div class="my-dom" @click="handleCapture">
    <div class="example" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    @hide="visibleRef = false"
  />
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
import html2canvas from 'html2canvas'
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox'

// 子组件
const childComponent = shallowRef<any>(null)
// 容器
const exampleRef = ref<HTMLDivElement | null>(null)

// 图片预览
const {
  show,
  visibleRef, 
  imgsRef
} = useEasyLightbox({
  imgs: ''
})
async function handleCapture() {
  if (imgsRef.value) {
    show()
    return
  }
  const dom = exampleRef.value
  if (dom) {
    const canvas = await html2canvas(dom, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    })
    imgsRef.value = canvas.toDataURL('image/png', 1)
    show()
  }
}

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
  loadModule(Date.now() + 'dynamic-component.vue', {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
      return content.vue
    },
    addStyle(text, id) {
      console.log(id)
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
.my-dom {
  width: 100%;
  height: fit-content;
  margin: 0.5rem 0;
  cursor: pointer;
  .example {
    width: fit-content;
  }
}
</style>