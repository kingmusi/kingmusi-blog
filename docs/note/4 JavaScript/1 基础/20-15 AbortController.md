# AbortController

## 描述

`AbortController` 是一个全局类，它可以**终止任何异步操作**

```js
const controller = new AbortController()
```

创建一个 `AbortController` 实例，会得到两个东西

- `signal` 属性，它是一个 `AbortSignal` 实例
  - 可以把这个实例传递给要中断的API，来