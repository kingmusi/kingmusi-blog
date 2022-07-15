# 影子 DOM

> Web 组件之一，如果想得到良好兼容，请使用 [polymer](https://github.com/Polymer/polymer) 库

## 常用场景

- 子树中
- 影子 **DOM** 内容会实际渲染到页面上

## 创建

- 有了影子 **DOM** 的元素添加影子 **DOM** 会导致抛出错误
- 只有以下元素可以容纳影子 **DOM**，容纳影子 **DOM** 的元素被称为**影子宿主**

|  自定义元素  | `<article>` |  `<aside>`  |
| :----------: | :-------: | :-------: |
| `<blockguote>` |  `<body>`   |   `<div>`   |
|   `<footer>`   |   `<h1>`    |   `<h2>`    |
|     `<h3>`     |   `<h4>`    |   `<h5>`    |
|     `<h6>`    | `<header>`  |  `<main>`   |
|    `<nav>`     |    `<p>`    | `<section>` |
|    `<span>`    |           |           |

- 通过 `attachShadow()` 创建并添加给影子宿主
  - 参数：**shadowRootInit** 对象，此对线必须包含 **mode** 属性，一般值为 **’open’**
- 影子 **DOM** 可以通过 **影子宿主.shadowRoot** 获取（当 mode 值为 ‘closed’ 时不可获取）

## 使用

如以下 **HTML**，可以为其添加不同的文字颜色，但 css 会作用到全局

```js
for (const color of ['red', 'green', 'blue']) {
    const div = document.createElement('div')
    const shadowDiv = div.attachShadow({ mode: 'open' })
    document.body.appendChild(div)
    shadowDiv.innerHTML = `
        <p>${color}</p>

        <style>
        p {
            color: ${color};
        }
        </style>
    `
}
```

渲染结果

```html
<div>
    #shadow-root (open)
    	<p>red</p>
    	<style>
        p {
            color: red;
        }
    	</style>
</div>
<div>
    #shadow-root (open)
    	<p>green</p>
    	<style>
        p {
            color: green;
        }
    	</style>
</div>
<div>
    #shadow-root (open)
    	<p>blue</p>
    	<style>
        p {
            color: blue;
        }
    	</style>
</div>
```

可以看到，影子 **DOM** 会渲染，但会包括在 **#shadow-root (open)** 中

```js
function countP(node) {
    console.log(node.querySelectorAll('p').length)
}
countP(document) // 0

for (const element of document.querySelectorAll('div')) {
    countP(element.shadowRoot)
}
// 1 1 1
```

## 影子 **DOM** 槽位

- 影子 **DOM** 一添加到元素中，浏览器就会赋予他最高优先级，优先渲染它的内容而不是原来的文本
- 为了显示文本，需要使用 `<slot>` 标签指示浏览器在哪里放置原来的 **HTML**

如改造以上例子

```js
for (const color of ['red', 'green', 'blue']) {
    const div = document.createElement('div')
    div.innerHTML = color
    document.body.appendChild(div)

    div
        .attachShadow({ mode: 'open' })
        .innerHTML = `
        <p><slot></slot></p>

        <style>
        p {
            color: ${color}
        }
        </style>
    `
}
```

可以用**命名插槽**实现多个投影，通过匹配 **slot / name** 属性实现

```js
document.body.innerHTML = `
    <div>
        <p slot='foo'>Foo</p>
        <p slot='bar'>Bat</p>
    </div>
`

document.querySelector('div')
    .attachShadow({ mode: 'open' })
    .innerHTML = `
        <slot name='foo'></slot>
        <slot name='bar'></slot>
    `
// Foo
// Bar
```

