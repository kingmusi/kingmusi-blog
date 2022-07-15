# Object 创建

## **new** 操作符和 **Object** 构造函数

```js
const obj = new Object()
obj.name = 'obj'
```

## 对象字面量

```js
const obj = {
    name: 'obj'
}
```

## 构造函数

用于创建特定类型的对象

##### 1. 创建构造函数

- 规范中，构造函数第一个字母应该大写
- 通过在 **this** 上定义属性，为每个实例创建独有的属性
- 一般方法不在 **this** 上定义，因为方法是一组公有的逻辑，没必要为每个实例创建一个公有方法，所以一般定义在原型上

```js
function Person(name, age) {
	this.name = name
    this.age = age
}

Person.prototype.sayName = function() {
	console.log(this.name)
}
```

##### 2. 创建实例

- 通过 **new** 创建符创建实例
- 如果没有要传入的参数，其实可以不写圆括号，只要有 **new** 即可

```js
const person = new Person('kingmusi', 22)
```

> **new** 操作符做的事情
>
> 1. 在内存中创建一个新对象
> 2. 这个新对象的 **[[Prototype]]** 被赋值为构造函数的 **prototype** 属性
> 3. 构造函数内部的 **this** 被赋值为这个新对象（即 **this** 指向新对象）
> 4. 执行构造函数内部的代码（给新对象添加属性）
> 5. 如果构造函数返回非空对象，则返回该对象。否则，返回刚创建的新对象
>
> ```js
> function objectFactory(Base, ...arg) {
>   const obj = {}
>   obj.__proto__ = Base.prototype
>   const res = Base.apply(obj, arg)
>   return res instanceof Object ? res : obj
> }
> ```

