# Map

## 基本 API

##### 1. 创建

- 使用 **new** 和 **Map** 构造函数

  ```js
  const map = new Map()
  ```

- 可同时初始化数据，传入包含键/值对数组的可迭代对象

  ```js
  const map = new Map([
      ['key1', 'val1'],
      ['key2', 'val2']
  ])
  ```

##### 2. 新增

- 使用 **set()** 方法添加键/值对，可链式调用

  ```js
  map.set('key3', 'val3')
     .set('key4', 'val4')
  ```

##### 3. 查询

- 使用 **get()** 方法查询某一键对应的值

  ```js
  map.get('key1') // 'val1'
  ```

- 使用 **has()** 方法查询是否有某一个键

  ```js
  map.has('key1') // true
  ```

- 使用 **size** 属性查询当前键/值对的数量

  ```js
  map.size // 4
  ```

##### 4. 删除

- 使用 **delete()** 方法删除某一个键/值对

  ```js
  map.delete('key1')
  ```

- 使用 **clear()** 清空所有键/值对

  ```js
  map.clear()
  ```

## 与 **Object** 的区别

##### 1. 键的类型

- **Object**：数值、字符串、Symbol
- **Map**：任何类型

##### 2. 顺序

- **Object**：没有顺序
- **Map**：维护顺序

##### 3. 性能

- **Map** 内存占用更小，插入和删除的性能更佳，查找速度几乎没有区别

> **Map** 和 **Object** 都采用键严格相等（===）比较是否同一键。**SameValueZero** 可能会产生一些困扰
>
> ```js
> const zero1 = +0,
>       zero2 = -0,
>       map = new Map(),
>       obj = {}
> 
> map.set(zero1, {})
> map.get(zero2).foo = 'foo'
> map.get(zero1) // {foo: 'foo'}
> 
> obj[zero1] = 'foo'
> obj[zero2] // 'foo'
> ```

## 顺序与迭代

- **entries()**：获取键/值对的迭代器
- **keys()**：获取键的迭代器
- **values()**：获取值的迭代器

**Map** 维护顺序，所以可以使用 **for-of** 和 **forEach** 顺序迭代

```js
const map = new Map([
    ['key1', 'val1'],
    ['key2', 'val2'],
    ['key3', 'val3']
])

for (const [key, val] of map) {
    console.log(key, val) 
    // key1 val1
    // key2 val2
    // key3 val3
}

map.forEach((val, key) => {console.log(val, key)})
// val1 key1
// val2 key2
// val3 key3
```



