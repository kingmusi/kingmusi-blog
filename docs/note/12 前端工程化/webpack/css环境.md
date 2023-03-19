# css环境

## CSS

在 Webpack 中处理 CSS 文件，通常需要用到：

- [`css-loader`](https://webpack.js.org/loaders/css-loader/)：该 Loader 会将 CSS 等价翻译为形如 `module.exports = "${css}"` 的JavaScript 代码，使得 Webpack 能够如同处理 JS 代码一样解析 CSS 内容与资源依赖；
- [`style-loader`](https://webpack.js.org/loaders/style-loader/)：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>` 标签，使得样式生效；
- [`mini-css-extract-plugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/)：该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中。

> 当 Webpack 版本低于 5.0 时，请使用 [`extract-text-webpack-plugin`](https://www.npmjs.com/package/extract-text-webpack-plugin) 代替 `mini-css-extract-plugin`。

1. 安装依赖

```shell
# 如果希望只插入到 style 中，则只需要引入 style-loader
# 如果希望css单独打包到一个文件，则引入 mini-css-extract-plugin
npm i -D css-loader style-loader mini-css-extract-plugin
```

2. 添加配置信息

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                // 根据运行环境判断使用那个 loader
                (process.env.NODE_ENV === 'development' ?
                    'style-loader' :
                    MiniCssExtractPlugin.loader),
                'css-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HTMLWebpackPlugin()
    ]
}
```

> `mini-css-extract-plugin` 不能与 `style-loader` 混用，否则报错
>
> `mini-css-extract-plugin` 需要与 `html-webpack-plugin` 同时使用，才能将产物路径以 `link` 标签方式插入到 html 中

## 预处理器

社区在 CSS 原生语法基础上扩展出一些更易用，功能更强大的 CSS 预处理器(Preprocessor)，比较知名的有 Less、Sass、Stylus 。这些工具各有侧重，但都在 CSS 之上补充了扩展了一些逻辑判断、数学运算、嵌套封装等特性，基于这些特性，我们能写出复用性、可读性、可维护性更强，条理与结构更清晰的样式代码

以 less 为例：

1. 安装依赖

```shell
npm i -D less less-loader
```

2. 添加配置信息

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [{
            test: /\.less/,
            use: [
                // 根据运行环境判断使用那个 loader
                (process.env.NODE_ENV === 'development' ?
                    'style-loader' :
                    MiniCssExtractPlugin.loader),
                'css-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HTMLWebpackPlugin()
    ]
}
```

## postcss

PostCSS 也能在原生 CSS 基础上增加更多表达力、可维护性、可读性更强的语言特性。PostCSS 并没有定义一门新的语言，而是与 `@babel/core` 类似，只是实现了一套将 CSS 源码解析为 AST 结构，并传入 PostCSS 插件做处理的流程框架

1. 安装依赖

```shell
npm i -D postcss postcss-loader
```

2. 添加配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
    ],
  }
}
```

3. 现在为止，postcss-loader 只是个空壳，需要为其添加[插件](https://www.postcss.com.cn/)，首先在根目录下添加 `postcss.config.js`

```js
module.exports = {
  plugins: [
    'autoprefixer' // 自动添加浏览器前缀
  ]
}
```

