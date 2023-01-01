# wepack5--模块联邦

## 介绍

Module Federation 通常译作“**模块联邦**”，是 Webpack 5 新引入的一种远程模块动态加载、运行技术。MF 允许我们将原本单个巨大应用按我们理想的方式拆分成多个体积更小、职责更内聚的小应用形式，理想情况下各个应用能够实现独立部署、独立开发(不同应用甚至允许使用不同技术栈)、团队自治，从而降低系统与团队协作的复杂度 —— 没错，这正是所谓的微前端架构。

## 简单实现

Module Federation 的基本逻辑是一端导出模块，另一端导入、使用模块，实现上两端都依赖于 Webpack 5 内置的 `ModuleFederationPlugin` 插件：

1. 对于模块生成方，需要使用 `ModuleFederationPlugin` 插件的 `expose` 参数声明需要导出的模块列表；
2. 对于模块使用方，需要使用 `ModuleFederationPlugin` 插件的 `remotes` 参数声明需要从哪些地方导入远程模块。

#### 文件结构：

```lua
remote
├─ app-1
│  ├─ package.json
│  ├─ src
│  │  ├─ index.js
│  │  ├─ add.js
│  └─ webpack.dev.js
│  └─ webpack.prod.js
├─ app-2
│  ├─ package.json
│  ├─ src
│  │  └─ index.js
│  └─ webpack.dev.js
│  └─ webpack.prod.js
├─ dist
```

其中，`app-1`、`app-2` 是两个独立应用，分别有一套独立的 Webpack 构建配置，类似于微前端场景下的“微应用”概念。在本示例中，`app-1` 负责导出模块 —— 类似于子应用；`app-2` 负责使用这些模块 —— 类似于主应用

#### 本地开发环境（webpack.dev.js）：

模块导出方 —— 也就是 `app-1` 的构建配置：

需要使用 `ModuleFederationPlugin` 的 `exposes` 项声明哪些模块需要被导出；使用 `filename` 项定义入口文件名称

```js
const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  plugins: [
    new ModuleFederationPlugin({
      // MF 应用名称
      name: 'app1',
      // MF 模块入口，可以理解为该应用的资源清单
      filename: 'remote.js',
      // 定义应用导出哪些模块
      exposes: {
        './add': './src/add.js'
      }
    })
  ],
  devServer: {
    port: 8081,
    hot: true
  }
}
```

模块导入方 —— 也就是 `app-2` 的配置方法：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  plugins: [
    new ModuleFederationPlugin({
      // 使用 remotes 属性声明远程模块列表
      remotes: {
        // 地址需要指向导出方生成的应用入口文件
        app1: 'app1@http://localhost:8081/remote.js'
      }
    }),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    port: 8082,
    hot: true
  } 
}
```

在 `app-2` 中就可以使用模块名称异步导入 `app-1` 暴露出来的模块，例如：

```js
// app-2/src/index.js
(async () => {
  const { add } = await import("app1/add")
  console.log(add(1, 2))
})();
```

#### 生产环境

模块导出方 —— 也就是 `app-1` 的构建配置：

```js
const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    // 生产环境一般会打包到线上nginx环境中，app1-dist就是nginx命中的路由
    path: path.join(__dirname, 'app1-dist'),
    publicPath: 'http://xxx.com/app1-dist/'
  },
  plugins: [
    new ModuleFederationPlugin({
      // MF 应用名称
      name: 'app1',
      // MF 模块入口，可以理解为该应用的资源清单
      filename: 'remote.js',
      // 定义应用导出哪些模块
      exposes: {
        './add': './src/add.js'
      }
    })
  ]
}
```

模块导入方 —— 也就是 `app-2` 的配置方法：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'app2-dist')
  }
  plugins: [
    new ModuleFederationPlugin({
      // 使用 remotes 属性声明远程模块列表
      remotes: {
        // 地址需要指向导出方生成的应用入口文件
        app1: 'app1@http://xxx.com/app1-dist/remote.js'
      }
    }),
    new HtmlWebpackPlugin()
  ]
}
```

