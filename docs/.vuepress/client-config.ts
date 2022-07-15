import { onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import Particles from 'particles.vue3'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(Particles)
  },
  setup() {
    onMounted(() => {
      if (!__VUEPRESS_SSR__) {
        import('@/utils/click-fireworks.js' as any) // 鼠标点击烟花特效
      }
    })
  }
})
