import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

import { createPage } from '@vuepress/core'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'

import path from 'path'
import viteCompression from 'vite-plugin-compression'
import traverse from './utils/traverse'

const { sidebar, list, categorys } = traverse()

export default defineUserConfig({
  lang: 'zh-CN',
  title: '木厶笔记存放站',
  description:
    '存放计算机相关的笔记、博客，主要和 web、echarts、node、electron、java、俄lastic、mysql、git、算法、html、css、javascript、js、typescript、ts、vue、react 相关',
  dest: path.join(__dirname, '..', '..', 'dist'),
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }], // 网站logo
    ['link', { rel: 'manifest', href: '/pwa/manifest.webmanifest' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/pwa/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/pwa/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/pwa/favicon-16x16.png' }],
    ['link', { rel: 'shortcut icon', href: '/pwa/favicon.ico' }],
    ['meta', { rel: 'theme-color', content: '#ffffff' }],
    ['meta', { rel: 'msapplication-config', content: '/pwa/browserconfig.xml' }]
  ],
  theme: defaultTheme({
    logo: '/logo.svg', // 主题logo
    sidebar,
    sidebarDepth: 0, // 不展示 markdown 级别
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '文章',
        link: '/note/'
      }
    ]
  }),
  plugins: [
    // google 埋点
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    googleAnalyticsPlugin({ id: 'G-40Q2D0LN9P' }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pwaPlugin({ skipWaiting: true }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pwaPopupPlugin({
      locales: {
        '/': {
          message: '博客已更新',
          buttonText: '刷新'
        }
      }
    })
  ],
  // 改造页面
  alias: {
    '@theme/Home.vue': path.resolve(__dirname, 'components', 'home', 'Home.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, 'components', 'Sidebar.vue')
  },
  // 为客户端注入全局数据
  define: {
    __LIST__: list,
    __CATEGORYS__: categorys
  },
  async onInitialized(app) {
    // 生成各个类型的首页(index.md)
    const categoryPagesPromist = [] as ReturnType<typeof createPage>[]
    for (const { path, markdown } of Object.values(categorys)) {
      categoryPagesPromist.push(
        createPage(app, {
          path,
          frontmatter: {
            layout: 'Layout'
          },
          content: markdown
        })
      )
    }
    const categoryPages = await Promise.allSettled(categoryPagesPromist)
    for (const res of categoryPages) {
      if (res.status === 'fulfilled') {
        app.pages.push(res.value)
      }
    }
  },
  // 客户端配置
  clientConfigFile: path.join(__dirname, 'client-config.ts'),
  // vite 配置
  bundler: viteBundler({
    viteOptions: {
      plugins: [viteCompression()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname)
        }
      },
      // @ts-expect-error: vite 还没有给 ssr 配置项提供类型
      ssr: {
        noExternal: ['swiper']
      }
    }
  })
})
