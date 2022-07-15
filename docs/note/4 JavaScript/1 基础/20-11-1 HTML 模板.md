# HTML 模板

> Web 组件之一，如果想得到良好兼容，请使用 [polymer](https://github.com/Polymer/polymer) 库

## DocumentFragment

- 连续调用 **document.appendChild()** 会导致多次重排，影响性能
- 可以先向 **DocumentFragment** 一次性添加所有子节点，再添加到文档中，这样最多只会有一次重排

```js
const fragment = new DocumentFragment()
fragment.appendChild(document.createElement('p'))
fragment.appendChild(document.createElement('div'))

console.log(fragment.children.length) // 2
document.body.appendChild(fragment)
console.log(fragment.children.length) // 0
```

## template 标签

- 在 **HTML** 中插入 **template** 标签
- **template** 标签其实就是一个 **DocumentFragment**，其内容不会渲染，且可以通过 **content** 属性获取内容

下面例子与上面例子过程及结果一样

```html
<body>
    <template id="fragment">
			<p></p>
			<div></div>
    </template>
</body>
```

```js
const fragment = document.getElementById('fragment').content
console.log(fragment.children.length) // 2
document.body.appendChild(fragment)
console.log(fragment.children.length) // 0
```

HTML会变成下面这样

```html
<body>
		<p></p>
		<div></div>
		<template id="fragment"></template>
</body>
```

> 如果想要复制模板，可以使用 **importNode()** 方法克隆

## 模板脚本

- 脚本执行可以推迟到将 **DocumentFragment** 的内容实际添加到 **DOM** 树

```html
<body>
    <template id="fragment">
    	<script>console.log('hello world')</script>
    </template>
</body>
```

```js
const fragment = document.getElementById('fragment').content
console.log('end')

document.body.appendChild(fragment)

// end
// hello world
```

