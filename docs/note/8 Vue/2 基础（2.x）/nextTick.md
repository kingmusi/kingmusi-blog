# $nextTick

## 基础

vue 实现 dom 更新是异步完成的

```vue
<ul ref="ul">
    <li v-for="item in arr" :key="item">{{item}}</li>
</ul>
```

```js
data(){
    return {
        arr: []
    }
},
methods: {
    add(){
        this.arr.push( new Date().getTime() )

        const ul = this.$refs.ul
        console.log(ul.children.length) // 同步操作，此时视图还未更新，所以为 0
    }
}
```

如果想在本次事件循环更新视图后，立即执行某些操作，可使用 `$nextTick`

```js
// 用$nextTick回调函数就可以做到异步执行了
add(){
    this.arr.push(new Date())
    this.$nextTick(() => {
        const ul = this.$refs.ul
        console.log(ul.children.length)  // 1
    }) 
}
```

## 原理分析

vue 异步更新 dom 的原理（官方原话）

> 只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`、`MessageChannel`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替

vue 异步更新 dom 的降级策略：**优先使用微任务（promise、mutationObserver），然后才会降级使用宏任务（setImmediate、MessageChannel、setTimeout）**

验证猜想：

```vue
<div ref="dom">{{ flag }}</div>
```

```js
data() {
  return {
    flag: false
  }
},
mounted() {
  this.flag = true
	
  // 第一步
  setTimeout(() => { console.log(111) })
  // 第二步
  Promise.resolve().then(() => { console.log(222) })
  // 第三步
  this.$nextTick(() => {
    console.log(this.$refs.dom)
    console.log(333)
  })
  // 第四部
  Promise.resolve().then(() => { console.log(444) })
}
```

会有如下打印

```html
<div>true</div>
333
222
444
111
```

基于以上打印，得出下面结论

1. chrome 浏览器环境下 nextTick 内部是执行了微任务的
2. 同样是微任务，nextTick 执行的顺序第二步的 Promise。其实这个和改变数据触发watcher更新的先后有关，看下面一段的验证

```js
data() {
  return {
    flag: false
  }
},
mounted() {
  // 第一步
  setTimeout(() => { console.log(111) })
  // 第二步
  Promise.resolve().then(() => { console.log(222) })
  // 第三步
  this.flag = true
  this.$nextTick(() => {
    console.log(this.$refs.dom)
    console.log(333)
  })
  // 第四部
  Promise.resolve().then(() => { console.log(444) })
}
```

会有如下打印

```html
222
<div>true</div>
333
444
111
```

---

当响应式数据发生变化，会触发它的 setter，从而通知 Dep 调用相关 watcher 的 update 函数，进行视图更新

```js
update() {
  // ...
  /* 推送 watcher 对象到观察者队列中 */
	queueWatcher(this)
}
```

```js
queueWatcher(watcher) {
  /* 获取watcher的id */
  const id = watcher.id
  /* 检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验 */
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      /*如果没有flush掉，直接push到队列中即可*/
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i >= 0 && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

可以看出，queueWatcher方法内部主要做的就是将watcher push到了queue队列当中

同时**当waiting为false时，调用了一次 nextTick方法**， 同时传入了一个参数 flushSchedulerQueue，其实这个参数，就是具体的队列更新函数，也就是说更新dom操作就是在这里面做的。而这个waiting状态的作用，很明显是为了保证nextTick(flushSchedulerQueue)只会执行一次

```js
function flushSchedulerQueue() {
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id)

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
  }
}
```

**nextTick 内部执行**

```js
/*
  延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个function
  这个函数的作用是在task或者microtask中推入一个timerFunc，在当前调用栈执行完以后以此执行直到执行到timerFunc
  目的是延迟到当前调用栈执行完以后执行
*/
export const nextTick = (function () {
  /*存放异步执行的回调*/
  const callbacks = []
  /*一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送*/
  let pending = false
  /*一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的timerFunc被调用*/
  let timerFunc

  /*下一个tick时的回调*/
  function nextTickHandler() {
    /*一个标记位，标记等待状态（即函数已经被推入任务队列或者主线程，已经在等待当前栈执行完毕去执行），这样就不需要在push多个回调到callbacks时将timerFunc多次推入任务队列或者主线程*/
    pending = false
    /*执行所有callback*/
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  /* 降级调用策略 */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    /*使用Promise*/
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError)
    }
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    /*使用setTimeout将回调推入任务队列尾部*/
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  /*
    推送到队列中下一个tick时执行
    cb 回调函数
    ctx 上下文
  */
  return function queueNextTick(cb, ctx) {
    let _resolve
    /*cb存到callbacks中*/
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          handleError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve) => {
        _resolve = resolve
      })
    }
  }
})()
```

1. 首先可以看出，nextTick 是一个立即执行函数，也就是说这个函数在定义的时候就已经自动执行一次了，即 `return function queueNextTick` 前面的代码已经执行过了
2. 定义了一个函数timerFunc，这个函数决定了nextTick内部最终是执行了微任务，还是执行了宏任务
3. 定义了一个函数nextTickHandler，就是把所有队列中的回调拿出来执行
4. return了一个函数queueNextTick，我们平常调用的 `this.$nextTick(cb)` 及上面的 `nextTick(flushSchedulerQueue)`，实际上就是调用这个 queueNextTick

queueNextTick 做了什么

1. 将传入进来的callback回调函数，push 到队列中
2. 当pending为false时，调用了timerFunc函数，而timerFunc函数其实就是注册一个异步任务，执行队列里的回调

---

回到最初的代码，看代码怎么走的

```js
data() {
  return {
    flag: false
  }
},
mounted() {
  this.flag = true
	
  // 第一步
  setTimeout(() => { console.log(111) })
  // 第二步
  Promise.resolve().then(() => { console.log(222) })
  // 第三步
  this.$nextTick(() => {
    console.log(this.$refs.dom)
    console.log(333)
  })
  // 第四部
  Promise.resolve().then(() => { console.log(444) })
}
```

1. `this.flag = true` 执行，响应式数据发生变化，触发 update 方法

2. update方法内执行了queueWatcher函数，将相关watcher push到queue队列中。并执行了 **nextTick(flushSchedulerQueue) **

3. nexTick内部代码执行，实际上是执行了queueNextTick，传入了一个flushSchedulerQueue函数，将这个函数加入到了callbacks数组中，此时数组中只有一个cb函数flushSchedulerQueue

4. pending状态初始为false，故执行了timerFunc

   ```js
   if (!pending) {
     pending = true
     timerFunc()
   }
   ```

5. timerFunc执行，会创建一个微任务，此时是微任务队列中的第一个任务

6. 然后回到最初的代码的 `setTimeout`，加入宏任务队列

7. 碰到第一个Promise，加入微任务队列，此时微任务队列中，有两个微任务

8. 此时this.$nextTick()函数执行，相当于就是调用了queueNextTick，并传入了一个回调函数。因为我们已经执行过一次queueNextTick，所以pending为true，那么timerFunc是不是这个时候不会再执行了，而此时唯一做的操作就是将传入的回调函数加入到了callbacks数组当中

9. 碰到第二个promise，加入微任务队列，此时微任务队列中，有三个微任务

10. 当同步代码执行完成后，优先清空微任务队列，会先清空第一个微任务，也就是timeFunc内的那个微任务

11. 则会更新dom，更新完 dom 后，执行我们传入的回调函数

12. 。。。
