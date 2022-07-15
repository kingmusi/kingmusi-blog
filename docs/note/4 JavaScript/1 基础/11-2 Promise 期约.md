# Promise 期约

## 状态

1. 分为`两个阶段`和`三种状态`
   - 两个阶段：`unsettled`（未决） 和 `settled`（已决）
   - 三种状态：`pending`（挂起）、`resolved`（完成）、`rejected`（失败）
2. 开始必定是未决阶段（挂起状态），到了一定条件后，用 **resolve** 或 **reject**（只能是二者之一）推向已决阶段，对 **resolveed** 的后续处理称为 `thenable`，对 **rejected** 的后续处理称为`catchable`

<img src="https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2019-12-25-15-48-58.png" style="zoom:80%;" />

## 解决问题：`回调地狱`

## 创建及使用

- 使用 **new** 操作符创建

```javascript
const pro = new Promise((resolve, reject)=>{
    // 未决阶段的代码，这些代码是同步代码，即会立即执行

    // 在合适的时候，将任务推向已决
    // if 到达 resolveed 状态
    	// resolve(数据)：将任务推向resovled状态，并附加一些数据
    // else 到达 rejected 状态
    	//reject(数据)：将任务推向rejected状态，并附加一些数据
    
    // 收尾代码，这些代码是同步代码，也会立即执行
})
```

- 使用

```JS
promise.then(res => {
    // resolved 后的代码
}, err => {
    // rejectd 后的代码
}).catch(err => {
    // 捕获 rejectd 后的代码，或  thenable 中发生的异常
}).finally(() => {
    // 无论 resolved 还是 rejectd 最终都会走一次这里
}
```

> **then** 第二个参数和 **catch** 的异同
>
> - `同`
>
>   都可以捕获到 **rejectd** 的发生
>
>   两者谁来执行 **rejectd** 的代码，依照`就近原则`，即二者都存在时，由 **then** 的第二个参数执行，二者只有一个时，则由那一个执行
>
> - `异`
>
>   **catch** 还能捕获到 **thenable** 中发生的异常，但 **then** 第二个参数不行
>
> `推荐使用 catch，而不用 then 第二个参数。因为 catch 可以捕获更多，写法也更符合 try/catch`

## **Promise** 链

- 前一个无论是 **resolve** 还是 **reject** ，都会去到后一个的 **resolved** 中

  ```js
  promise.then(res => {
      console.log('1-成功')
  }, err => {
      console.log('1-失败')
  }).then(res => {
      console.log('2-成功')
  }, err => {
      console.log('2-失败')
  })
  // 无论怎么样都是输出
  // 1-成功 或 1-失败
  // 2-成功
  ```

- 前一个不返回，则后一个 **res** 是 **undefined**

  ```js
  promise.then(res => {
  	
  }).then(res => {
      console.log(res) // undefined
  })
  ```

- 前一个返回除 **Promise** 外的值，则后一个 **res** 就是那个值

  ```js
  promise.then(res => {
      return 1
  }).then(res => {
      console.log(res) // 1
  })
  ```

- 前一个返回 **Promise**，则后一个 **res** 是返回 **promise** 的 **resolved** 或 **rejectd** 携带的数据 

  ```js
  promise.then(res => {
      return new Promise(resolve => resolve(1))
  }).then(res => {
      console.log(res) // 1
  })
  ```

## **Promise.resolve()** 和 **Promise.reject()**

```js
// 等价
new Promise(resolve => resolve(1))
Promise.resolve(1)
```

```js
// 等价
new Promise((resolve, reject) => reject(1))
Promise.reject(1)
```

## **Promise.all()**

- 将多个  **Promise** 实例包装成一个新的  **Promise** 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被 **reject** 失败状态的值
- 可以获取定义时的顺序结果

```js
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
Promise.all([p1, p2]).then(res => {
    console.log(res) // [1, 2]
})

// 只要有一个失败，则走 rejectd
const p1 = Promise.resolve(1)
const p2 = Promise.reject(2)
Promise.all([p1, p2]).then(res => {
    console.log(res) // 不输出
}, err => {
    console.log(err) // 2
})
```

## **Promise.allSettled()**

- 返回一个在所有给定的 **Promise** 都已经 **fulfilled** 或 **rejected** 后的 **Promise**，并带有一个对象数组，每个对象表示对应的 **Promise** 结果
- 解决 **all** 有一个 **reject** 就不退出执行的问题

```js
let p1 = Promise.resolve(1)
let p2 = Promise.reject(2)
Promise.allSettled([p1, p2]).then(res => {
    console.log(res)
})
/** 返回
[
	{ status: "fulfilled", value: 1 },
	{ status: "rejected", reason: 2 }
]
*/
```

## **Promise.rece()**

- 竞赛，数组中有一个完成，则执行

```js
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => resolve(1), 2000)
})
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => resolve(2), 1000)
})
Promise.race([p1, p2]).then(res => {
	console.log(res) // 2
})

// 只要有一个失败，则走 rejectd
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => reject(1), 2000)
})
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => resolve(2), 1000)
})
Promise.race([p1, p2]).then(res => {
	console.log(res) 
}, err => {
	console.log(err) // 1
})
```

> 应用：异步请求超过 **2** 秒，则不请求了，而是打印 **timeout**
>
> ```js
> const ajax = () => {
> 	// ajax 异步操作
> 	resolve('拿取数据')
> }
> const timeout = () => {
> 	return new Promise((resolve, reject) => {
> 		setTimeout(() => reject('timeout'), 2000)
> 	})
> }
> Promise.race([ajax(), timeout()]).then(res => {
> console.log(res)
> }, err => {
> 	console.log(err)
> })
> ```

## Promise.any()

只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 

如果可迭代对象中没有一个 `promise` 成功（即所有的 `promises` 都失败/拒绝），就返回一个失败的 `promise`

```js
const p1 = new Promise(resolve => resolve('很快输出'))
const p2 = new Promise(resolve => {
  setTimeout(() => resolve('迟点输出'), 100)
})

Promise.any([p1, p2]).then(res => console.log(res)) // 很快输出
```

