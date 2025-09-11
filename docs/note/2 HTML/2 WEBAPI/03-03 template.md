# template

## DocumentFragment

- 连续调用 **document.appendChild()** 会导致多次重排，影响性能
- 可以先向 **DocumentFragment** 一次性添加所有子节点，再添加到文档中，这样最多只会有一次重排

```javascript
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

> 如果需要多次插入模版，可以进行克隆
>
> ```js
> // cloneNode
> const fragment = document.getElementById('fragment').content
> console.log(fragment.children.length) // 2
> document.body.appendChild(fragment.cloneNode(true))
> console.log(fragment.children.length) // 2
> ```
>
> ```js
> // document.importNode （这种方式可以跨域文档克隆）
> const fragment = document.getElementById('fragment').content
> console.log(fragment.children.length) // 2
> document.body.appendChild(document.importNode(fragment, true))
> console.log(fragment.children.length) // 2
> ```



