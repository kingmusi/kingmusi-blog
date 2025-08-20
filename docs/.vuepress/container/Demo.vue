<template>
  <div class="my-demo">
    <div class="example" :class="{ 'no-raw': !showRaw }" ref="exampleRef">
      <component v-if="childComponent" :is="childComponent" />
    </div>
    <div class="tools" v-show="showRaw">
      <button @click="showCode = !showCode">
        <i>
          <svg t="1737553668146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4648" width="200" height="200"><path d="M300.224 224L32 525.76l268.224 301.76 71.776-63.776-211.552-237.984 211.552-237.984zM711.744 224L640 287.776l211.552 237.984L640 763.744l71.744 63.776 268.256-301.76z" p-id="4649"></path></svg>
        </i>
      </button>
    </div>
    <transition name="scale" v-show="showRaw">
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
import { onMounted, ref, shallowRef, h, onBeforeUnmount } from 'vue'
import { loadScript, loadLink } from '../utils/loadScript'

const showCode = ref(true)
const exampleRef = ref<HTMLDivElement | null>(null)
const showRaw = ref(true)

// 子组件
const childComponent = shallowRef<any>(null)

const props = defineProps<{
  content: string
  raw: string
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
// 解析 raw
const raw = JSON.parse(decodeURIComponent(props.raw))
for (const key in raw) {
  raw[key] = decodeURIComponent(raw[key])
}
const activeRaw = ref(Object.keys(raw)[0])

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
    showRaw.value = false
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
    &.no-raw {
      border-radius: 8px;
    }
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