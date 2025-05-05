import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

import { createPage } from '@vuepress/core'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { watermarkPlugin } from '@vuepress/plugin-watermark'
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d'
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"

import path from 'path'
import viteCompression from 'vite-plugin-compression'
import traverse from './utils/traverse'
import parseCode from './utils/parseCode'

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
    ['link', { rel: 'preconnect', href: 'https://www.googletagmanager.com' }], // googleAnalytics预连接
    ['meta', { rel: 'msapplication-config', content: '/pwa/browserconfig.xml' }], // pwa
    ['meta', { name: 'baidu-site-verification', content: 'code-JfM5X4P2zS' }], // 百度收录验证
    ['meta', { name: '360-site-verification', content: 'bbeb6891b4135a6e65877a7e7d4be2cd' }], // 360 收录验证
    // markdownStylizePlugin scss中注入样式不生效，所以直接在style中注入
    ['style', {}, `
      mark {
        padding: 2px 4px;
        margin: 0 2px;
        font-weight: 500;
        color: #222222;
        background-color: var(--main-4);
        border-radius: 2px;
        border-radius: 4px;
      }
      #oml2d-stage {
        right: 75px !important;
      }
    `]
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
  shouldPrefetch: false,
  plugins: [
    // 水印
    watermarkPlugin({}),
    // 数学公式
    markdownMathPlugin({}),
    mdEnhancePlugin({
      // 启用 mermaid
      mermaid: true,
    }),
    // 增强语法解析
    markdownStylizePlugin({
      // == == 标记
      mark: true,
      // 上下标
      sup: true
    }),
    // google 埋点
    googleAnalyticsPlugin({ id: 'G-40Q2D0LN9P' }),
    pwaPlugin({}),
    docsearchPlugin({
      apiKey: '4488710a3e7070c0782ffe7717b52799',
      indexName: 'kingmusi',
      appId: 'XNAMRA0CZ0'
    }),
    oml2dPlugin({
      // 在这里配置选项
      models: [
        {
          "path": "https://model.oml2d.com/cat-black/model.json",
          "scale": 0.1,
          "stageStyle": {
            "height": 233
          }
        }
      ],
      dockedPosition: 'right',
      primaryColor: '#ffd4cc',
      statusBar: {
        disable: true
      },
      tips: {
        style: {
          top: '-30%'
        },
        idleTips: {
          wordTheDay: true
        },
        messageLine: 5
      }
    }),
    (app) => markdownContainerPlugin({
      type: 'demo',
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const content: Record<string, string> = {}
          const raw: Record<string, string> = {}

          const fn = (code: string, type: string) => {
            const enRaw = encodeURIComponent(app.markdown.render(`\`\`\`${type}\n${code}\`\`\``))
            raw[type] = enRaw

            const enContent = parseCode(code, type)
            if (enContent) {
              content[enContent.type] = enContent.code
            }
          }

          const matchToken: typeof tokens = []
          for (let i = idx; i < tokens.length; i++) {
            const token = tokens[i]
            if (token && token.type === 'fence' && token.tag === 'code') {
              matchToken.push(token)
            }
            if (token && token.type === 'container_demo_close') {
              break
            }
          }
          for (const token of matchToken) {
            fn(token.content, token.info)
          }

          return `<demo content="${encodeURIComponent(JSON.stringify(content))}" raw="${encodeURIComponent(JSON.stringify(raw))}">`;
        }
        return `</demo>`;
      }
    }),
    markdownContainerPlugin({
      type: 'dom',
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const content: Record<string, string> = {}

          const fn = (code: string, type: string) => {
            const enContent = parseCode(code, type)
            if (enContent) {
              content[enContent.type] = enContent.code
            }
          }

          const matchToken: typeof tokens = []
          for (let i = idx; i < tokens.length; i++) {
            const token = tokens[i]
            if (token && token.type === 'fence' && token.tag === 'code') {
              matchToken.push(token)
            }
            if (token && token.type === 'container_dom_close') {
              break
            }
          }
          for (const token of matchToken) {
            fn(token.content, token.info)
          }

          return `<Dom content="${encodeURIComponent(JSON.stringify(content))}">`;
        }
        return `</Dom>`;
      }
    }),
  ],
  // 改造页面
  alias: {
    '@theme/VPHome.vue': path.resolve(__dirname, 'components', 'home', 'Home.vue'),
    '@theme/VPSidebar.vue': path.resolve(__dirname, 'components', 'Sidebar.vue')
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
  // vite 配置
  bundler: viteBundler({
    viteOptions: {
      plugins: [viteCompression()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname)
        }
      },
      ssr: {
        noExternal: ['swiper']
      }
    },
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'json-viewer'
        }
      }
    }
  })
})