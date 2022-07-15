# new

## 第一版

不考虑构造函数返回值

```js
function objectFactory(Base, ...arg) {
	const obj = {}
  obj.__proto__ = Base.prototype // 继承原型链
  Base.apply(obj, arg) // 给 obj 添加新的属性
  return obj
}
```

## 第二版

考虑构造函数返回值

- 如果返回对象，则实例只能访问到返回的对象属性
- 如果返回不是对象，则就是实例本身

```js
function objectFactory(Base, ...arg) {
	const obj = {}
  obj.__proto__ = Base.prototype // 继承原型链
  const res = Base.apply(obj, arg) // 给 obj 添加新的属性
  return res instanceof Obejct ? res : obj; // 根据情况返回
}
```

