# WeakMap

## 基本 API

与 **Map** 类型，但键只能是 **Object 或继承自 Object 的类型**，且键为`弱引用`

##### 1. 创建

- 使用 **new** 和 **WeakMap** 构造函数

  ```js
  const weakMap = new WeakMap()
  ```

- 可同时初始化数据，传入包含键/值对数组的可迭代对象

  ```js
  const obj = {}
  const weakMap = new WeakMap([
      [obj, 'val1']
  ])
  ```

##### 2. 新增

- 使用 **set()** 方法添加键/值对，可链式调用

  ```js
  const obj2 = {}
  weakMap.set([obj2, 'val2'])
  ```

##### 3. 查询

- 使用 **get()** 方法查询某一键对应的值

  ```js
  weakMap.get(obj1) // 'val1'
  ```

- 使用 **has()** 方法查询是否有某一个键

  ```js
  weakMap.has(obj1) // true
  ```

##### 4. 删除

- 使用 **delete()** 方法删除某一个键/值对

  ```js
  weakMap.delete(obj1)
  ```

## 弱引用 / 弱键

##### 1. 强引用

如果不删除键，或值设置为 **null**，则一直引用着，不会被垃圾回收

以下代码中 **obj** 会一直强引用着对象，**Map** 也会一直强引用着对象

```js
let obj = {}
const map = new Map([[obj, 'obj']])
```

如果变量不需要了，想让其被垃圾回收，那么需要下面两步，少一步都不行，因为少一步还是会有一个强引用着对象

```js
map.delete(obj)
obj = null
```

##### 2. 弱引用

一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收

如以上例子

```js
let obj = {}
const weakMap = new WeakMap([[obj, 'obj']])
```

只要消除 **obj** 对对象的强引用，则 **weakMap** 对应对象的键值对会被垃圾回收，因为 **weakMap** 使用的是弱键

```js
obj = null
// 下一次垃圾回收执行，weakMap 就是一个空弱映射
```

> 由于弱键随时可能被垃圾回收，所以 **WeakMap** 是`不可迭代`的

## 应用

可以用于存储和对象相关，但不需要管理其死活的数据。

##### 1. DOM 节点元数据

假设需要管理 **DOM** 节点是否被禁用，则就需要为每个 **DOM** 设置禁用信息，而这个信息随着 **DOM** 节点被删除就没用了，应该被垃圾回收掉，则可以用 **WeakMap** 自动化这个过程

```js
const box = document.querySelector('.box'),
	  weakMap = new WeakMap()

weakMap.set(box, { disabled: true })

// 某个时刻，box 被删除了
box.parentNode.removeChild(box)
box = null
```

##### 2. 长度缓存

```js
const weakMap = new WeakMap()
function lengthOfKey(obj) {
    if (weakMap.has(obj)) {
        return weakMap.get(obj)
    } else {
        const length = Object.keys(obj).length
        weakMap.set(obj, length)
        return length
    }
}
```



