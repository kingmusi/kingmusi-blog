# `<script>`

## script 元素

所有除 **defer** 和 **async** 属性外的 **script** 元素都必须严格按次序执行

执行会阻塞页面，所以一般会放在 `</body>` 的前面，防止渲染被阻塞，出现白屏

## 行内代码和外部文件

1. 嵌入行内代码，把代码放在`<script>`元素中即可
2. 引入外部文件，需要使用 **src** 属性
   - 可跨域

## **defer** 脚本

- 脚本会延迟到整个页面都解析完毕后再执行

- 按照出现顺序执行（现实中不一定）
- 在 **DOMContentLoaded** 事件前执行（现实中不一定）
- 只对外部脚本文件有效（IE4~7行内脚本也有效）

## **async** 脚本

- 异步下载，执行时间不固定，所以不应该在加载期间修改 **DOM**
- 不保证按顺序执行
- 在 **load** 事件前执行
- 只对外部脚本文件有效

## 动态加载脚本

通过向 **DOM** 中动态添加 **script** 元素加载，行为与 **async** 属性相似

```js
const script = document.createElement('script')
script.src = 'xx.js'
document.body.appendChild(script)
```

如果要控制动态脚本的加载行为，可以明确将其设置为同步加载

```js
const script = document.createElement('script')
script.src = 'xx.js'
script.async = false
document.body.appendChild(script)
```

