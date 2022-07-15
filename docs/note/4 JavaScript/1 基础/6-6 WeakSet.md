# WeakSet

## 基本 API

与 **Set** 类型，但键只能是 **Object 或继承自 Object 的类型**，且键为`弱引用`

##### 1. 创建

- 使用 **new** 和 **WeakSet** 构造函数

  ```js
  const weakSet = new WeakSet()
  ```

- 可同时初始化数据，传入包含键/值对数组的可迭代对象

  ```js
  const obj = {}
  const weakSet = new WeakSet([obj])
  ```

##### 2. 新增

- 使用 **add()** 方法添加，可链式调用

  ```js
  const obj2 = {}
  weakSet.add(obj2)
  ```

##### 3. 查询

- 使用 **get()** 方法查询某一键对应的值

  ```js
  weakSet.get(obj1) // {}
  ```

- 使用 **has()** 方法查询是否有某一个键

  ```js
  weakSet.has(obj1) // true
  ```

##### 4. 删除

- 使用 **delete()** 方法删除

  ```js
  weakSet.delete(obj1) 
  ```

## 弱引用 / 弱值

##### 1. 强引用

以下代码中 **obj** 会一直强引用着对象，**Set** 也会一直强引用着对象

```js
let obj = {}
const set = new Set([obj])
```

如果变量不需要了，想让其被垃圾回收，那么需要下面两步，少一步都不行，因为少一步还是会有一个强引用着对象

```js
set.delete(obj)
obj = null
```

##### 2. 弱引用

一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收

如以上例子

```js
let obj = {}
const weakSet = new WeakSet([[obj]])
```

只要消除 **obj** 对对象的强引用，则 **weakSet** 对应对象的值会被垃圾回收，因为 **weakSet** 使用的是弱值

```js
obj = null
// 下一次垃圾回收执行，weakSet 就是一个空弱映射
```

> 由于弱值随时可能被垃圾回收，所以 **WeakMap** 是`不可迭代`的

