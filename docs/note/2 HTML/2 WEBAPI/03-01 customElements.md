# customElements

## 规范

1. 自定义元素名必须至少包含一个不在名称开头和末尾的连字符
2. 元素标签不能自关闭

## 自定义元素类型

#### 自主定制元素

独立元素；它们不继承自内置的HTML元素

```ts
class FooElement extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define('x-foo', FooElement)
```

> 使用的方式：
>
> 1. `document.createElement`
>
> ```js
> const xFoo = document.createElement('x-foo')
> document.body.appendChild(xFoo)
> ```
>
> 2. `new Class`
>
> ```js
> const xFoo = new FooElement()
> document.body.appendChild(xFoo)
> ```
>
> 3. html
>
> ```html
> <x-foo></x-foo>
> ```

#### 自定义内置元素

这些元素继承并扩展了内置的HTML元素

```js
class FooElement extends HTMLDivElement {
    constructor() {
        super();
    }
}
customElements.define('x-foo', FooElement, { extends: 'p' })
```

> 使用方式：
>
> 1. `document.createElement`
>
> ```js
> document.createElement('p', { is: 'x-foo' })
> ```
>
> 2. html
>
> ```html
> <p is="x-foo"></p>
> ```

## Web Component API

#### `customElements.define`

接受三个参数，无返回值

| 参数名      | 值                           | 说明                                                         |
| ----------- | ---------------------------- | ------------------------------------------------------------ |
| name        | string（必须是中划线形式）   | 全局注册的自定义组件名字                                     |
| constructor | class                        | 自主定制元素，必须继承 `HTMLElement`<br />自定义内置元素，必须继承要扩展的原生元素类<br />在类的constructor中必须执行 `super()` |
| options     | Record<string,  any>（可选） | 配置对象                                                     |

#### `customElements.get`

获取自定义组件的构造函数，接受一个参数，即声明过的自定义组件的name，返回构造函数

```js
const c = customElements.get('x-foo')
```

#### `customElements.upgrade`

更新挂载主文档之前的包含shadow dom的自定义组件的，接受一个参数，即包含了shadow dom的自定义组件节点，无返回值

```js
// 在没有define前，创建了自定义元素 
const foo = document.createElement('x-foo')
// 后define
customElements.define('x-foo', FooElement)
const.log(foo instanceof FooElement, foo.shadowRoot) // false null

// 更新节点
customElements.upgrade(foo)
console.log(foo instanceof FooElement, foo.shadowRoot) // true #document-fragment 
```

#### `customElements.whenDefined`

检测并提供自定义组件被定义声明完毕的时机，接受一个参数，即自定义元素的name，返回值是一个promise

```js
customElements.whenDefined('x-foo').then(() => {
  console.log('声明完毕')
})
```

## 生命周期

| 生命周期                     | 调用时间                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| `constructor()`              | 创建元素实例或将已有 **DOM** 元素升级为自定义元素时          |
| `connectedCallback()`        | 在每次将这个自定义元素实例添加到 **DOM** 中时                |
| `disconnectedCallback()`     | 在每次将这个自定义元素实例从 **DOM** 中移除时                |
| `attributeChangedCallback()` | 在每次可观察属性的值发生变化时，在元素实例初始化时也算一次<br />需要`observedAttributes` 使用 |
| `adoptedCallback()`          | 在通过 **document.adoptNode()** 将这个自定义元素实例移动到新文档对象时 |

```js
class FooElement extends HTMLElement {
    constructor() {
        super()
        console.log('ctor')
    }
    
    connectedCallback() {
        console.log('connected')
    }
    
    disconnectedCallback() {
        console.log('disconnected')
    }
}
customElements.define('x-foo', FooElement)

const fooElement = document.createElement('x-foo') // ctor
document.body.appendChild(fooElement)              // connected
document.body.removeChild(fooElement)              // disconnected
```

监听 attributes 变化

```js
class FooElement extends HTMLElement {
    constructor() {
        super()
    }
  	
  	static get observedAttributes () { return [ 'text' ]; }
  	attributeChangedCallback(name, oldValue, newValue) {
      	console.log(name, oldValue, newValue)
    }
}

customElements.define('x-foo', FooElement)
foo.setAttribute('text', 'hello world') // text null hello world
```

