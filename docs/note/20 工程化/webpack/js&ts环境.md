# js&ts环境

## babel

Babel 是一个开源 JavaScript 转编译器，它能将高版本 —— 如 ES6 代码等价转译为向后兼容，能直接在旧版 JavaScript 引擎运行的低版本代码

如将高版本的箭头函数语法转换为低版本的 function 语法：

```js
// 使用 Babel 转译前
arr.map(item => item + 1)

// 转译后
arr.map(function (item){
  return item + 1;
})
```

使用 `babel-loader` 即可接入 Babel 转译功能：

1. 安装依赖

```shell
npm i -D @babel/core @babel/preset-env babel-loader
```

2. 添加模块处理规则

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/, // 只对 js 文件进行 babel 转换
            	use: ['babel-loader']
            }
        ]
    }
}
```

3. 在根目录下添加 `.babelrc` 文件，配置 Babel 功能逻辑

```json
{
  "presets": ["@babel/preset-env"]
}
```

示例中的 `@babel/preset-env` 是一种 Babel 预设规则集 —— Preset，这种设计能按需将一系列复杂、数量庞大的配置、插件、Polyfill 等打包成一个单一的资源包，从而简化 Babel 的应用、学习成本。

## Typescript

Typescript 是 JavaScript 的超集，为 JavaScript 提供了一系列类型约束特性

#### ts-loader

typescript 官方的 loader

1. 安装依赖

```shell
npm i -D typescript ts-loader
```

2. 添加模块处理规则

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/, // 只对 js 文件进行 babel 转换
            	use: ['ts-loader']
            }
        ]
    }
}
```

3. 在根目录下添加 `.tsconfig.json` 文件，配置 TypeScript 配置信息

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "compilerOptions": {
    "allowJs": true,
    "target": "ES5",
    "lib": ["ES2015"],
    "removeComments": false,
    "jsx": "react"
  }
}
```

#### [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)

如果项目中已经使用 `babel-loader`，也可以使用 `@babel/preset-typescipt` 规则集，借助 `babel-loader` 完成 JavaScript 与 TypeScript 的转码工作。

相对 ts-loader，打包速度更快，生态更丰富；但不能导出 `.d.ts` 文件，且不提供类型检查，类型检查需要使用 tsc。

1. 安装依赖

```shell
npm i -D @babel/preset-typescript
```

2. 在 `.babelrc` 中添加

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

3. 类型检查

```shell
npm i -D typescript
```

```json
// tsconfig.json
{
  "compilerOptions":{
    "noEmit":true // 不输出文件，只做类型检查
  }
}
```

```json
// package.json
{
  "script":{
    "check-type": "tsc --watch"
  }
}
```

