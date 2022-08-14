#  event loop 事件循环机制

## 执行过程

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2019-12-25-14-37-45.png)

1. 将`同步任务`放到执行栈中执行
2. 遇到`异步任务`，则放入 **Event Table** 中注册，并交给其他线程执行，执行完后放入事件队列中
3. 将执行栈中的代码`全部执行完毕`
4. `事件队列任务`的执行
   - **js** 中
     1. 执行所有`微任务`
     2. 取出`第一个宏任务`执行
     3. 再`清空微任务队列`（因为有可能宏任务执行完后会产生新的微任务）
     4. 返回到步骤 **2**，直至事件队列中的任务全部执行完
   - `node` 中
     1. 执行`所有微任务`
     2. 执行`所有宏任务`
     3. 返回到步骤 **1**，直至事件队列中的任务全部执行完

> **js 和 node 不同的举例**
>
> ```js
> Promise.resolve().then(data => console.log(1))
> 
> setTimeout(() => {
> 	console.log(2)
> 	Promise.resolve().then(data => console.log(3))
> }, 0)
> 
> setTimeout(() => {
> 	console.log(4)
> }, 0)
> ```
>
> 1. js 的输出为  1 2 3 4
> 2. node 的输出为  1 2 4 3

## 宏队列和微队列

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2019-12-25-14-49-42.png)

1. 遇到 `setTimeout `直接把其放到事件队列中
2. 遇到`pormise`，执行 **promise** 中的代码，到`resolve `或 `reject`后，把`then`放到事件队列中（*`resolve `或 `reject`后的代码会执行完*）
3. 遇到 `await`，执行后面的表达式，执行完后，把 **await** 后面的代码全部放到事件队列中



*node中有所不同*

宏队列：**setTimeout**，**setInterval**，**setImmediate**，**ajax**，**dom 操作**当他们之间的时间间隔相差10时，谁先谁后都是有可能的

微队列：**Promise**、**async/await**、**MutationObserver**、**queueMicrotask**、**process.nextTick**

> **requestAnimationFrame** 和 **requestIdleCallback** 理论上属于宏任务，但因为还和帧有关，所以实际执行时间不一定按规则走

## 面试题目与解答

```javascript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    new Promise(resolve => {
        console.log('promise1');
        resolve();
    }).then(() => {
        console.log('promise2');
    })
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(resolve => {
    console.log('promise3');
    resolve();
}).then(() => {
    console.log('promise4');
})
console.log('script end');
```

我的做题过程（拿张纸跟着我做一遍把）

1. **async1**和 **async2**只是声明，不管，直接看下面的代码
2. 看到 **console.log('script start');** ，同步代码，把其画到 执行栈 中
3. **setTimeout**，异步代码，把其画到 事件队列 中（画到中间，如果遇到微队列的任务，画到前面）
4. 执行 **async1**，看 **async1**函数
5. 看到 **console.log('async1 start');** ，同步代码，把其画到 执行栈 中
6. 执行**async2()**，看到**Promise**立即执行，所以 **console.log('promise1');** 是同步代码，把其画到 执行栈 中
7. 看到 **resolve()** ，**then** 后面都是异步的，把其画到 事件队列 中（**9 resolve()** —— 表明这是第**9**行的 **resolve**）
8. **await async2()**，**await**是返回**promise**对象，即 **await async2()** 下面的代码全是这个**promise**的 **then** 中的代码，所以是异步代码，把其画到 事件队列 中（**3 resolve()** —— 表明这是第**3**行的 **resolve**）
9. 看回 **19**行，**Promise**立即执行，**console.log('promise3');** 是同步代码，把其画到 执行栈 中
10. 看到 **resolve()** ，把其画到 事件队列 中（**21 resolve()** —— 表明这是第**21**行的 **resolve**）
11. **console.log('script end');**，同步代码，把其画到 执行栈 中
12. 从 事件队列中 依次执行
13. **9 resolve()**，**console.log('promise2');** ，同步代码，把其画到 执行栈 中
14. **3 resolve()**，**console.log('async1 end');** ，同步代码，把其画到 执行栈 中
15. **21 resolve()**, **console.log('promise4');**，同步代码，把其画到 执行栈 中
16. **setTimeout**，**console.log('setTimeout');**，同步代码，把其画到 执行栈 中
17. 结果
    - script start
    - async1 start
    - promise1
    - promise3
    - script end
    - promise2
    - async1 end
    - promise4
    - setTimeout