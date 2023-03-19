# loader

## 是什么

`webpack`做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中

当 `webpack` 碰到不识别的模块的时候，就是调用对应的 `loader`，对模块的"源代码"进行转换

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202206070026030.png)

## 配置方式

写在`module.rules`属性中

- `rules`是一个数组的形式，可以配置多个`loader`
- 每一个`loader`对应一个对象的形式，对象属性`test` 为匹配的规则，一般情况为正则表达式
- 属性`use`针对匹配到文件类型，调用对应的 `loader` 进行处理

```js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }]
  }
};
```

`loader` 的调用顺序是**从右到左**，**从下到上**

即上述执行方式为`sass-loader`、`css-loader`、`style-loader`

## 常见的 loader

- style-loader: 将 css 添加到 DOM 的内联样式标签 style 里
- css-loader: 允许将 css 文件通过 require 的方式引入，并返回 css 代码
- less-loader: 处理 less
- sass-loader: 处理 sass
- postcss-loader: 用 postcss 来处理 CSS
- autoprefixer-loader: 处理 CSS3 属性前缀，已被弃用，建议直接使用 postcss
- file-loader: 分发文件到 output 目录并返回相对路径
- url-loader: 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url
- html-minify-loader: 压缩 HTML
- babel-loader: 用 babel 来转换 ES6 文件到 ES5

## css-loader

```shell
npm install --save-dev css-loader
```

```js
rules: [
  ...,
  {
    test: /\.css$/,
    use: {
      loader: "css-loader",
      options: {
        // 启用/禁用 url() 处理
        url: true,
        // 启用/禁用 @import 处理
        import: true,
        // 启用/禁用 Sourcemap
        sourceMap: false
      }
    }
  }
]
```

如果只通过`css-loader`加载文件，这时候页面代码设置的样式并没有生效

原因在于，`css-loader`只是负责将`.css`文件进行一个解析，而并不会将解析后的`css`插入到页面中

如果希望再完成插入`style`的操作，那么还需要另外一个`style-loader`

## style-loader

把 `css-loader` 生成的内容，用 `style` 标签挂载到页面的 `head` 中

```shell
npm install --save-dev style-loader
```

```js
rules: [
  ...,
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  }
]
```

## less-loader

```shell
npm install --save-dev less-loader
```

```js
rules: [
  ...,
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader", "less-loader"]
  }
]
```

## raw-loader

通过 `import`方式导入文件内容

```shell
npm install --save-dev raw-loader
```

```js
module.exports = {
  ...,
  module: {
    rules: [{
      test: /\.(txt|md)$/,
      use: 'raw-loader'
    }]
  }
}
```

## file-loader

把识别出的资源模块，移动到指定的输出⽬目录，并且返回这个资源在输出目录的地址

```shell
npm install --save-dev file-loader
```

```js
rules: [
  ...,
  {
    test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "file-loader",
      options: {
        // placeholder 占位符 [name] 源资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        //打包后的存放位置
        outputPath: "./images",
        // 打包后文件的 url
        publicPath: './images',
      }
    }
  }
]
```

## url-loader

可以处理理 `file-loader` 所有的事情，但是遇到图片格式的模块，可以选择性的把图片转成 `base64` 格式的字符串，并打包到 `js` 中

```shell
npm install --save-dev url-loader
```

```js
rules: [
  ...,
  {
    test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        // placeholder 占位符 [name] 源资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        //打包后的存放位置
        outputPath: "./images"
        // 打包后文件的 url
        publicPath: './images',
        // 小于 100 字节转成 base64 格式
        limit: 100
      }
    }
  }
]
```

