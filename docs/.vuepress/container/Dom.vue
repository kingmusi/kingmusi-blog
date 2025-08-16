<template>
  <div class="my-dom">
    <div class="example" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, h } from 'vue'

// 子组件
const childComponent = shallowRef<any>(null)
// 容器
const exampleRef = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  content: string
}>()
// 解析 content
const content = JSON.parse(decodeURIComponent(props.content))
const contentKeys = new Set<string>()
for (const key in content) {
  content[key] = decodeURIComponent(content[key])
  contentKeys.add(key)
}

if (['html', 'css', 'js'].some(v => contentKeys.has(v))) {
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

if (contentKeys.has('vue')) {
  Promise.allSettled([import('vue3-sfc-loader'), import('vue')]).then(([sfcLoaderRes, VueRes]) => {
    if (sfcLoaderRes.status === 'fulfilled' && VueRes.status === 'fulfilled') {
      const sfcLoader = sfcLoaderRes.value
      const Vue = VueRes.value
      // @ts-ignore
      sfcLoader.loadModule(Date.now() + 'dynamic-component.vue', {
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
        childComponent.value = () => h('div', '加载组件失败，请刷新重试')
        console.error(e)
      })
    } else {
      childComponent.value = () => h('div', '加载组件失败，请刷新重试')
      console.error('加载 Vue3 SFC Loader 或 Vue 失败', sfcLoaderRes, VueRes)
    }
  })
}

if (contentKeys.has('react')) {
  Promise.allSettled([
    import('react'),
    // @ts-ignore
    import('react-dom/client'),
    import('veaury')
  ]).then(([reactRes, reactDomClientRes, veauryRes]) => {
    if (reactRes.status === 'fulfilled' && reactDomClientRes.status === 'fulfilled' && veauryRes.status === 'fulfilled') {
      const React = reactRes.value
      const { createRoot } = reactDomClientRes.value
      const veaury = veauryRes.value
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
      } else {
        childComponent.value = () => h('div', '加载组件失败，请刷新重试')
        console.error('React 组件未导出或导出不正确')
      }
    } else {
      childComponent.value = () => h('div', '加载组件失败，请刷新重试')
      console.error('加载 React 或 React DOM Client 或 Veaury 失败', reactRes, reactDomClientRes, veauryRes)
    }
  })
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