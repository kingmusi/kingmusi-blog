# shadow-dom

> 中文：影子 DOM

## 简介

Shadow DOM 即浏览器将模板、样式表、属性、JavaScript 码等，封装成一个独立的 DOM 元素

优点：

1. 向用户隐藏内部细节，直接提供组件
2. 可以封装内部样式表，内部样式不会影响到外部

## 使用

通过 `attachShadow()` 创建并添加给影子宿主

- 参数：**shadowRootInit** 对象，此对线必须包含 **mode** 属性，一般值为 **open**

- 影子 **DOM** 可以通过 **影子宿主.shadowRoot** 获取（当 mode 值为 closed 时不可获取）

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

## 插槽

- 影子 **DOM** 一添加到元素中，浏览器就会赋予他最高优先级，优先渲染它的内容而不是原来的文本
- 为了原显示文本，需要使用 `<slot>` 标签指示浏览器在哪里放置原来的 **HTML**

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

`slotchange`：用于监听shadow dom中的slot插入或移除的事件

```js
const slots = shadow.querySelectorAll('slot')
slots.forEach(slot => { 
  slot.addEventListener('slotchange', function (e) { 
    console.log('slotchange', slot.name, e); 
  }); 
});
```

## 根样式

CSS 样式内部，`:host`表示根元素

```css
:host {
  display: block;
}
```

外部样式会覆盖掉`:host`的设置，比如下面的样式会覆盖`:host`

```css
my-element {
  display: inline-block;
}
```



`:slotted([选择器])` 表示所在shadow dom内所有实例中选择器符合括号中名称的slot元素，若选择器为*，则表示命中所有slot

## 与 customElements 配合使用

shadow dom 可以非常方便的和 customElements 使用

```js
class FooElement extends HTMLElement {
    constructor() {
        super();
      	const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `<div>x-foo</div>`
    }
}
customElements.define('x-foo', FooElement)
```

