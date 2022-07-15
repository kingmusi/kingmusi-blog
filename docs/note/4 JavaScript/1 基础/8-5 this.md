# this

## 全局执行上下文的 this

1. 严格模式：**undefined**
2. 非严格模式：**window**

## 默认函数执行上下文的 this

默认情况下调用一个函数，**this** 指向就是全局的 **this**

```js
function foo() {
  console.log(this)
}
foo() // window
```

```js
function bar() {
  foo()
}
bar() // window
```

## 对象调用函数

```js
const obj = {
  name: 'obj',
  foo: function() {
    console.log(this)
  }
}

obj.foo() // {name: 'obj', foo: ƒ}
```

> 如果把对象的函数赋值别名，则会指向全局
>
> ```js
> const obj = {
>     name: 'obj',
>     foo: function () {
>        console.log(this)
>     }
> }
> 
> const foo = obj.foo
> foo() // window
> ```

## call、apply、bind 设置函数的 this

```js
const obj = { name: 'obj' }

function foo() {
  console.log(this)
}

foo.call(obj) // { name: 'obj' }
```

## 构造函数

构造函数的 this 指向新的实例

```js
function Obj(name) {
  this.name = name
  console.log(this)
}
const obj = new Obj('obj') // {name: 'obj'}
```

## 优先级

构造函数 > call、apply、bind > 对象调用函数 > 默认

> 问：一个构造函数，bind 了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？
>
> 答：不会，构造函数的 this 指向优先级更高

## this 设计缺陷

嵌套函数中的 this 不会从外层函数中继承

```js
const obj = {
  foo: function () {
    console.log(this) // obj
    function bar() { console.log(this) }
    bar() // window
  }
}
obj.foo()
```

如何解决

1. 声明一个 `that` 保存外层的 this

```js
const obj = {
  foo: function () {
    console.log(this) // obj
    const that = this
    function bar() { console.log(that) }
    bar() // obj
  }
}
obj.foo()
```

2. 使用箭头函数

```js
const obj = {
  foo: function () {
    console.log(this) // obj
    const bar = () => { console.log(this) }
    bar() // obj
  }
}
obj.foo()
```
