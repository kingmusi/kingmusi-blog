import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

import { path as vuepressPath } from '@vuepress/utils'
import { createPage } from '@vuepress/core'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import katex from 'markdown-it-katex'

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
    ['link', { rel: 'manifest', href: '/pwa/manifest.webmanifest' }], // pwa
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/pwa/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/pwa/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/pwa/favicon-16x16.png' }],
    ['link', { rel: 'shortcut icon', href: '/pwa/favicon.ico' }],
    ['meta', { rel: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }], // katex
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }], // katex
    ['link', { rel: 'preconnect', href: 'https://www.googletagmanager.com' }], // googleAnalytics预连接
    ['meta', { rel: 'msapplication-config', content: '/pwa/browserconfig.xml' }], // pwa
    ['meta', { name: 'baidu-site-verification', content: 'code-JfM5X4P2zS' }], // 百度收录验证
    ['meta', { name: '360-site-verification', content: 'bbeb6891b4135a6e65877a7e7d4be2cd' }] // 360 收录验证
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
    pwaPlugin({ skipWaiting: false }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pwaPopupPlugin({
      locales: {
        '/': {
          message: '博客已更新',
          buttonText: '刷新'
        }
      }
    }),
    docsearchPlugin({
      apiKey: '4488710a3e7070c0782ffe7717b52799',
      indexName: 'kingmusi',
      appId: 'XNAMRA0CZ0'
    })
  ],
  extendsMarkdown: (md) => {
    md.use(katex) // katex
    md.linkify.set({ fuzzyEmail: false })
  },
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
  clientConfigFile: vuepressPath.resolve(__dirname, 'client-config.ts'),
  // vite 配置
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          // katex
          isCustomElement: (tag) => ['mi', 'mo', 'mn', 'mrow', 'annotation', 'semantics', 'math'].includes(tag)
        }
      }
    },
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
