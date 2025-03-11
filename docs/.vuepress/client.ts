import { onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import Particles from "@tsparticles/vue3"
import { loadSlim } from '@tsparticles/slim'
import Layout from './components/Layout.vue'
import Demo from './container/Demo.vue'
import Dom from './container/Dom.vue'
// import './plugins/JsonViewer'

export default defineClientConfig({
  async enhance({ app, router, siteData }) {
    if (!__VUEPRESS_SSR__) {
      app.use(Particles, {
        init: async engine => {
          await loadSlim(engine);
        },
      })
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
