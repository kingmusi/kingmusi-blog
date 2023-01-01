# splitChunks

## Chunk

1. Webpack 首先根据 `entry` 配置创建若干 Chunk 对象；
2. 遍历构建(Make)阶段找到的所有 Module 对象，同一 Entry 下的模块分配到 Entry 对应的 Chunk 中；
3. 遇到异步模块则创建新的 Chunk 对象，并将异步模块放入该 Chunk；
4. 分配完毕后，根据 SplitChunksPlugin 的启发式算法进一步对这些 Chunk 执行**裁剪、拆分、合并、代码调优**，最终调整成运行性能(可能)更优的形态；
5. 最后，将这些 Chunk 一个个输出成最终的产物(Asset)文件，编译工作到此结束。

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202212031850985.jpg)

Webpack 默认会将以下三种模块做分包处理：

- Initial Chunk：`entry` 模块及相应子模块打包成 Initial Chunk；
- Async Chunk：通过 `import('./xx')` 等语句导入的异步模块及相应子模块组成的 Async Chunk；
- Runtime Chunk：运行时代码抽离成 Runtime Chunk，可通过 [entry.runtime](https://webpack.js.org/configuration/entry-context/#dependencies) 配置项实现。

## SplitChunksPlugin 

[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/) 是 Webpack 4 之后内置实现的最新分包方案，与 Webpack3 时代的 `CommonsChunkPlugin` 相比，它能够基于一些更灵活、合理的启发式规则将 Module 编排进不同的 Chunk，最终构建出性能更佳，缓存更友好的应用产物。

通过 `optimization.splitChunks` 配置项即可实现自定义的分包策略：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // ...
    },
  },
}
```

> 解决 Webpack 默认分包带来的两个明显问题
>
> 1. **模块重复打包**
>
> 假如多个 Chunk 同时依赖同一个 Module，那么这个 Module 会被不受限制地重复打包进这些 Chunk，例如对于下面的模块关系：
>
> ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202212031915153.png)
>
>  示例中的 `index1.js` 和 `index2.js` 同时依赖 `c.js` 模块，在没有 SplitChunksPlugin 前，webpack 不会做优化处理，只是单纯地把 `c.js` 模块同时打包进 `index1.js` 和 `index2.js` 两个 Chunk中
>
> 2. **资源冗余 & 低效缓存**
>
> Webpack 会将 Entry 模块、异步模块所有代码都打进同一个单独的包，随着项目的推进，包体积逐步增长可能会导致应用的响应耗时越来越长。这种将所有资源打包成一个文件的方式存在两个弊端：
>
> - **资源冗余**：客户端必须等待整个应用的代码包都加载完毕才能启动运行，但可能用户当下访问的内容只需要使用其中一部分代码
> - **缓存失效**：将所有资源达成一个包后，所有改动 —— 即使只是修改了一个字符，客户端都需要重新下载整个代码包，缓存命中率极低
>
> 这两个问题都可以通过更科学的分包策略解决，例如：
>
> - 将被多个 Chunk 依赖的包分离成独立 Chunk，防止资源重复；
> - `node_modules` 中的资源通常变动较少，可以抽成一个独立的包，业务代码的频繁变动不会导致这部分第三方库资源缓存失效，被无意义地重复加载。

## 设置分包范围

`SplitChunksPlugin` 默认情况下只对 Async Chunk 生效，我们可以通过 `splitChunks.chunks` 调整作用范围，该配置项支持如下值：

- 字符串 `'all'` ：对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值；
- 字符串 `'initial'` ：只对 Initial Chunk 生效；
- 字符串 `'async'` ：只对 Async Chunk 生效；
- 函数 `(chunk) => boolean` ：该函数返回 `true` 时生效；

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

设置为 `all` 效果最佳，此时 Initial Chunk、Async Chunk 都会被 `SplitChunksPlugin` 插件优化

## 根据 Module 使用频率分包

`SplitChunksPlugin` 支持按 Module 被 Chunk 引用的次数决定是否分包，借助这种能力我们可以轻易将那些被频繁使用的模块打包成独立文件，减少代码重复。

用法很简单，只需用 `splitChunks.minChunks` 配置项设定最小引用次数，例如：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // 设定引用次数超过 2 的模块才进行分包
      minChunks: 2
    },
  },
}
```

这里“被 Chunk 引用次数”并不直接等价于被 `import` 的次数，而是取决于上游调用者是否被视作 Initial Chunk 或 Async Chunk 处理，例如：

```js
// common.js
export default "common chunk";

// async-module.js
import common from './common'

// entry-a.js
import common from './common'
import('./async-module')

// entry-b.js
import common from './common'
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202212031924013.png)

`entry-a`、`entry-b` 分别被视作 Initial Chunk 处理；`async-module` 被 `entry-a` 以异步方式引入，因此被视作 Async Chunk 处理。那么对于 `common` 模块来说，分别被三个不同的 Chunk 引入，此时引用次数为 3

`common` 模块命中 `optimization.splitChunks.minChunks = 2` 规则，因此该模块**可能**会被单独分包

上面说的是“**可能**”，`minChunks` 并不是唯一条件，此外还需要满足诸如 `minSize`、`chunks` 等限制条件才会真正执行分包

## 限制分包数量

在 `minChunks` 基础上，为防止最终产物文件数量过多导致 HTTP 网络请求数剧增，反而降低应用性能，Webpack 还提供了 `maxInitialRequest/maxAsyncRequest` 配置项，用于限制分包数量：

- `maxInitialRequest`：用于设置 Initial Chunk 最大并行请求数；
- `maxAsyncRequests`：用于设置 Async Chunk 最大并行请求数。

## 限制分包体积

Webpack 还提供了一系列与 Chunk 大小有关的分包判定规则，借助这些规则我们可以实现当包体过小时直接取消分包 —— 防止产物过"碎"；当包体过大时尝试对 Chunk 再做拆解 —— 避免单个 Chunk 过大。

这一规则相关的配置项有：

- `minSize`： 超过这个尺寸的 Chunk 才会正式被分包；
- `maxSize`： 超过这个尺寸的 Chunk 会尝试进一步拆分出更小的 Chunk；
- `maxAsyncSize`： 与 `maxSize` 功能类似，但只对异步引入的模块生效；
- `maxInitialSize`： 与 `maxSize` 类似，但只对 `entry` 配置的入口模块生效；
- `enforceSizeThreshold`： 超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 Size 限制。

> SplitChunksPlugin 主体流程
>
> 1. `SplitChunksPlugin` 尝试将命中 `minChunks` 规则的 Module 统一抽到一个额外的 Chunk 对象；
> 2. 判断该 Chunk 是否满足 `maxInitialRequests` 阈值，如果不满足，则把体积较小的 Chunk 并入主 Chunk 中，保留体积较大的 Chunk，直到满足为止
> 3. 判断该 Chunk 资源的体积是否大于上述配置项 `minSize` 声明的下限阈值；
>    - 如果体积**小于** `minSize` 则取消这次分包，对应的 Module 依然会被合并入原来的 Chunk
>    - 如果 Chunk 体积**大于** `minSize` 则判断是否超过 `maxSize`、`maxAsyncSize`、`maxInitialSize` 声明的上限阈值，如果超过则尝试将该 Chunk 继续分割成更小的部分

## 缓存组 `cacheGroups`

`SplitChunksPlugin` 提供了 `cacheGroups` 配置项用于为不同文件组设置不同的规则，例如：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 1,
            minSize: 0
        }
      },
    },
  },
};
```

示例通过 `cacheGroups` 属性设置 `vendors` 缓存组，所有命中 `vendors.test` 规则的模块都会被归类 `vendors` 分组，优先应用该组下的 `minChunks`、`minSize` 等分包配置。

`cacheGroups` 支持上述 `minSice/minChunks/maxInitialRequest` 等条件配置，此外还支持一些与分组逻辑强相关的属性，包括：

- `test`：接受正则表达式、函数及字符串，所有符合 `test` 判断的 Module 或 Chunk 都会被分到该组；
- `type`：接受正则表达式、函数及字符串，与 `test` 类似均用于筛选分组命中的模块，区别是它判断的依据是文件类型而不是文件名，例如 `type = 'json'` 会命中所有 JSON 文件；
- `idHint`：字符串型，用于设置 Chunk ID，它还会被追加到最终产物文件名中，例如 `idHint = 'vendors'` 时，输出产物文件名形如 `vendors-xxx-xxx.js` ；
- `priority`：数字型，用于设置该分组的优先级，若模块命中多个缓存组，则优先被分到 `priority` 更大的组。

> Webpack 提供了两个开箱即用的 `cacheGroups`，分别命名为 `default` 与 `defaultVendors`，默认配置：
>
> ```js
> module.exports = {
>   //...
>   optimization: {
>     splitChunks: {
>       cacheGroups: {
>         default: {
>           idHint: "",
>           reuseExistingChunk: true,
>           minChunks: 2,
>           priority: -20
>         },
>         defaultVendors: {
>           idHint: "vendors",
>           reuseExistingChunk: true,
>           test: /[\\/]node_modules[\\/]/i,
>           priority: -10
>         }
>       },
>     },
>   },
> };
> ```
>
> - 将所有 `node_modules` 中的资源单独打包到 `vendors-xxx-xx.js` 命名的产物
> - 对引用次数大于等于 2 的模块 —— 也就是被多个 Chunk 引用的模块，单独打包
>
> 可以将默认分组设置为 false，关闭分组配置



