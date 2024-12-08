# AbortController

## 描述

`AbortController` 是一个全局类，它可以**终止任何异步操作**

```js
const controller = new AbortController()
```

创建一个 `AbortController` 实例，会得到两个东西

- `signal` 属性，它是一个 `AbortSignal` 实例
  - 可以把这个实例传递给要中断的API，来响应中断事件并经行相应处理
  - 可以监听 `abort` 事件，实现自己的中断逻辑

```js
controller.signal.addEventListener('abort', () => {
  // 实现中断逻辑
})
```

- `abort()` 方法，调用这个方法会触发 `signal` 上的中止事件，并将信号标记为已终止

## Promise 中断逻辑

```js
const controller = new AbortController()

const promise = new Promise((resolve, reject) => {
  controller.signal.addEventListener('abort', () => {
  	reject('AbortError')
	})
})

// 特定时机触发此方法
controller.abort()
```

## 事件监听器

在添加事件监听器时提供一个中止 `signal`，这样在中止发生时，监听器会自动删除

```js
const controller = new AbortController()

window.addEventListener('click', listener, { signal: controller.signal })

controller.abort()
```

可以使用一个 `signal` 来删除多个事件监听器

```js
useEffect(() => {
	const controller = new AbortController()
  
  window.addEventListener('click', listener1, { signal: controller.signal })
  window.addEventListener('resize', listener2, { signal: controller.signal })
  window.addEventListener('mousedown', listener1, { signal: controller.signal })
  
  return () => {
    controller.abort()
  }
})
```

## Fetch 请求

`signal` 上的 `abort` 事件被触发，`fetch()` 返回的请求 `promise` 就会被拒绝，从而终止未完成的请求

```js
const controller = new AbortController()
const res = fetch('/api/xx', {
	method: 'POST',
  signal: controller.signal
})
res.then(() => {
  // do something
}).catch((err) => {
	if (err.name === 'AbortError') {
		// 中断请求
  } else {
    // 请求失败
  }
})
```

## AbortSignal.timeout

创建一个在经过一定超时时间后会触发中止事件的信号

```js
const res = fetch('/api/xx', {
	method: 'POST',
  signal: AbortSignal.timeout(1500)
})
res.then(() => {
  // do something
}).catch((err) => {
	if (err.name === 'AbortError') {
		// 超时
  } else {
    // 请求失败
  }
})
```

## AbortSignal.any

多个中止信号组合成一个，只要有一个中止触发，都会进行中止

```js
const clickController = new AbortController()
const timeoutController = new AbortController()

fetch('/api/xx', {
	signal: AbortSignal.any([clickController.signal, timeoutController.signal])
}).then(() => {
  // do something
}).catch((err) => {
	if (err.name === 'AbortError') {
		// 中止
  } else {
    // 请求失败
  }
})

setTimeout(() => {
  timeoutController.abort()
}, 1500)
cancelBtn.addEventListener('click', () => {
	clickController.abort()
})
```

