<template>
  <div class="my-dom">
    <div class="example" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadLink, loadScript } from '@/utils/loadScript';
import { onMounted, ref, shallowRef, h, onBeforeUnmount } from 'vue'

// 子组件
const childComponent = shallowRef<any>(null)
// 容器
const exampleRef = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  content: string
  info?: string
}>()

// 解析 info
const info: string[] = []
if (props.info) {
  const res = JSON.parse(decodeURIComponent(props.info))
  if (Array.isArray(res)) {
    info.push(...res)
  }
}
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

if (contentKeys.has('python')) {
  if (!Array.from(document.scripts).some(s => s && s.src === location.host + '/mini-coi.js')) {
    loadScript('/mini-coi.js')
  }
  loadScript('https://pyscript.net/releases/2025.8.1/core.js')
  loadLink('https://pyscript.net/releases/2025.8.1/core.css')

  const attributes: Record<string, string> = {}
  for (const s of info) {
    const [key, value] = s.split('=')
    if (key && value) {
      attributes[key] = value
    }
  }
  const script = document.createElement('script')
  script.type = 'py-editor'
  script.textContent = content.python
  for (const key in attributes) {
    script.setAttribute(key, attributes[key])
  }
  let observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        for (const node of Array.from(mutation.addedNodes)) {
          const n = node as HTMLElement
          if (n.tagName === 'PY-EDITOR') {
            const editor = n.querySelector('.py-editor-input') as HTMLDivElement
            const shadowRoot = editor.lastElementChild?.shadowRoot
            if (shadowRoot) {
              const style = shadowRoot.querySelector('style')
              if (style) {
                style.textContent = `${style.textContent}
.cm-line {
  color: #4b2e2b;
}
.ͼd[class] {
  color: #41ae3c;
}
.ͼc[class] {
  color: #0eb0c9;
}
.ͼm[class] {
  color: #b89485;
}
`

              }
            }
          }
        }
        observer.disconnect()
      }
    }
  })
  onMounted(() => {
    exampleRef.value?.appendChild(script)
    if (exampleRef.value) {
      exampleRef.value.style.color = '#000'
    }
    observer.observe(exampleRef.value!, {
      childList: true,
    })
  })
  onBeforeUnmount(() => {
    exampleRef.value?.removeChild(script)
    observer?.disconnect?.()
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