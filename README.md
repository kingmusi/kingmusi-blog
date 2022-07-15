# kingmusi-blog-next

## 核心技术

- [vuepress2](https://v2.vuepress.vuejs.org/zh/)
- vue3

## 目录解析

```
kingmusi-blog-next
├─ build.js                           // 打包后自动推送到 kingmusi-blog-dist 仓库
├─ docs
│  ├─ .vuepress
│  │  ├─ client-config.ts           // 客户端配置
│  │  ├─ components                 // 页面及组件
│  │  ├─ config.ts                  // vuepress 配置
│  │  ├─ public                     // 静态资源
│  │  ├─ styles                     // 全局样式
│  │  ├─ types.ts                   // 全局 ts 类型
│  │  └─ utils
│  │     ├─ category-icon-map.ts    // 类型和 icon 的映射
│  │     └─ traverse.ts             // 遍历 note 目录，生成所需要的数据
│  ├─ index.md                       // 首页数据
│  └─ note                           // 笔记
```