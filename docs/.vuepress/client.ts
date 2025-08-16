import { onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import Layout from './components/Layout.vue'
import Demo from './container/Demo.vue'
import Dom from './container/Dom.vue'
// import './plugins/JsonViewer'

export default defineClientConfig({
  async enhance({ app, router, siteData }) {
    if (!__VUEPRESS_SSR__) {
      await import('@/plugins/JsonViewer.jsx' as any)
      app.component('Demo', Demo)
      app.component('Dom', Dom)
    }
  },
  setup() {
    onMounted(() => {
      if (!__VUEPRESS_SSR__) {
        import('@/utils/click-fireworks.js' as any) // 鼠标点击烟花特效
      }
    })
  },
  layouts: {
    Layout
  }
})
