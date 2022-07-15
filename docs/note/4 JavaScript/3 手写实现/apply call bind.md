# apply call bind

> **手写思路**
>
> 1. 把传入的第一个参数看成一个空对象 **{}**
> 2. 在空对象上定义一个方法**fn**，**fn**就是调用**call、apply、bind**的方法
> 3. 然后执行**空对象.fn**，这样就可以让**fn**的**this**是这个空对象，就是传入的第一个参数
> 4. 拿到执行完的返回结果
> 5. 把**fn**从空对象上删除
> 6. 返回执行结果

## call

- 传多个参数

```javascript
Function.prototype.myCall = function (context = window, ...arg) {
  const symbol = Symbol('fn')
  context[symbol] = this
  const result = context[symbol](...arg)
  delete context.fn
  return result
}
```

## apply

- 传入一个数组

```javascript
Function.prototype.myApply = function (context = window, arg = []) {
  const symbol = Symbol('fn')
  context[symbol] = this
  const result = context[symbol](...arg)
  delete context.fn
  return result
}
```

## bind

- 传入多个参数
- 返回一个改变this指向后的函数

```javascript
Function.prototype.myBind = function (context = window, ...arg) {
  const that = this
  function Fn() {
    // 如果是构造函数改变 this 指向，this 指向应该是调用的实例
    return that.call(this instanceof Fn ? this : context, ...arg)
  }
  // 改变原型
  Fn.prototype = this.prototype
  return Fn
}
```