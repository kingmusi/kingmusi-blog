# JSON

## 语法

键：必须用双引号包裹

值：

1. 简单值：字符串、数值、布尔值和 null
2. 对象
3. 数组

## 序列化

使用 `JSON.stringify()` 序列化

```js
// 列子所用
const obj = {
    name: 'kingmusi',
    age: 22,
    address: ['foshan', 'shunde']
}
```

1. 要序列化的对象

```js
JSON.stringify(obj)
// "{"name":"kingmusi","age":22,"address":["foshan","shunde"]}"
```

2. 过滤

   - 传入数组：返回结果只包含该数组列出的对象属性

     ```js
     JSON.stringify(obj, ['name'])
     // "{"name":"kingmusi"}"
     ```

   - 传入函数：根据键返回想要的值，返回 **undefined**，会忽略

     ```js
     JSON.stringify(obj, (key, value) => key === 'address' ? value.join('-') : value)
     // "{"name":"kingmusi","age":22,"address":"foshan-shunde"}"
     ```

3. 控制缩进和空格，会自动换行

   ```js
   JSON.stringify(obj, null, 4)
   /*
   	"{
           "name": "kingmusi",
           "age": 22,
           "address": [
               "foshan",
               "shunde"
           ]
       }"
   */
   ```

> 在对象上自定义 `toJSON()` 方法，可以自定义序列化
>
> ```js
> const obj = {
>     name: 'kingmusi',
>     age: 22,
>     address: ['foshan', 'shunde'],
>     toJSON() {
>         return this.name
>     }
> }
> JSON.stringify(obj)
> // ""kingmusi""
> ```

## 解析

通过 `JSON.parse()` 解析字符串成 **JSON**

1. 要解析的字符串

2. 还原函数，经常用来把日期字符串转换为 **Date** 对象

   ```js
   const obj = {
       name: 'kingmusi',
       date: new Date()
   }
   
   const jsonText = JSON.stringify(obj) // "{"name":"kingmusi","date":"2021-05-17T15:02:55.738Z"}"
   const objCopy = JSON.parse(jsonText, (key, value) => key === 'date' ? new Date(value) : value)
   ```

   