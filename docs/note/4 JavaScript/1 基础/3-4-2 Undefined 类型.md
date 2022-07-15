# Undefined 类型

## 值

**Undefined** 类型只有一个值——**undefined**

目的：为了正式明确空对象（null）和未初始化变量的区别

## 易混淆点

对**未初始化**的变量和**未定义**的变量调用 **typeof** 都会返回 **undefined**

但两者还是有区别的

```js
let name
console.log(name) // undefined
console.log(age)  // 报错
```

