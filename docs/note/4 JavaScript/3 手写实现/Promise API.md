# Promise API

## Promise.resolve

```js
Promise.myResolve = function (value) {
  if (value && typeof value === 'object' && value instanceof Promise) {
    // 是Promise实例，则直接返回
    return value
  } else {
    // 其他情况使用 Promise 包装后返回
    return new Promise(resolve => resolve(value))
  }
}
```

## Promise.reject

```js
Promise.myReject = function (value) {
  return new Promise((_, reject) => reject(valuee))
}
```

## Promise.all

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0 // 计数器
    // 存放结果
    const res = [], len = promises.length

    if (len === 0) return []

    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then(value => {
        // 因为是按顺序返回，所以结果值要放在正确的索引上
        res[i] = value
        // 如果所有 Promise 都成功，resolve 结果数组
        if (++count === len) {
          resolve(res)
        }
        // 有一个失败，则 reject
      }).catch(reject)
    })
  })
}
```

## Promise.allSettled

```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    let count = 0 // 计数器
    // 存放结果
    const res = [], len = promises.length

    if (len === 0) return []

    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then(value => {
        // 成功属性设置 
        res[i] = {
          status: 'fulfilled',
          valuee
        }
        if (++count === len) resolve(res)
      }).catch(reason => {
        // 失败属性设置 
        res[i] = {
          status: 'rejected',
          reason
        }
        if (++count === len) resolve(res)
      })
    })
  })
}
```

## Promise.race

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 并行执行，哪个先返回状态，则返回对应状态
    promises.forEach(p => Promise.resolve(p).then(resolve).catch(reject))
  })
}
```

