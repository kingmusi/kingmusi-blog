# Set

## 基本 API

##### 1. 创建

- 使用 **new** 和 **Set** 构造函数

  ```js
  const set = new Set()
  ```

- 可同时初始化数据，传入可迭代对象

  ```js
  const set = new Set([1, 'a'])
  ```

##### 2. 新增

- 使用 **add()** 方法值，可链式调用

  ```js
  set.add(Symbol('b'))
     .add('c')
  ```

##### 3. 查询

- 使用 **has()** 方法查询是否有某一个键

  ```js
  set.has(1) // true
  ```

- 使用 **size** 属性查询当前值的数量

  ```js
  set.size // 4
  ```

##### 4. 删除

- 使用 **delete()** 方法删除某一个值

  ```js
  set.delete('a')
  ```

- 使用 **clear()** 清空所有值

  ```js
  set.clear()
  ```

> **Set** 的值是唯一的，如果添加一个已存在的值，则不会被添加到里面
>
> ```js
> const set = new Set([1, 2, 3])
> set.add(2)
> console.log(set) // Set(3) {1, 2, 3}
> ```
>
> **Set** 使用严格相等来检查是否唯一，所以 **SameValueZero** 需要被注意
>
> ```js
> const set = new Set([+0])
> set.add(-0)
> console.log(set.size) // 1
> ```

## 顺序与迭代

**Set** 可以理解成键和值相等的 **Map**

- **entries()**：获取值/值对数组
- **keys()**：获取值数组
- **values()**：获取值数组

**Set** 维护顺序，所以可以使用 **for-of** 和 **forEach** 顺序迭代

1、**forEach**

```js
const set = new Set([1, 2, 3, 2])
set.forEach((key, value, set) => {
	console.log(key, value, set)
})
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201223213524.png)

2、**for of**

```js
const set = new Set([1, 2, 3, 2])
for(let item of set) {
    console.log(item)
}
```

## Set 转换为 数组

```js
   const set = new Set([1, 2, 3])
   const arr = [...set]
```

```js
   const set = new Set([1, 2, 3])
   const arr = Array.from(set)
```