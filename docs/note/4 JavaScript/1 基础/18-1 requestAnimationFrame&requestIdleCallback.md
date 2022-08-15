# requestAnimationFrame & requestIdleCallback

## requestAnimationFrame

- 接受一个参数，此参数是回调函数
- 这个函数修改 **DOM** 样式以反映下一次重绘有什么变化的地方

```js
const handle = window.requestAnimationFrame(callback)
```

- **requestAnimationFrame** 返回一个请求 ID，可通过 **cancelAnimationFrame** 取消重绘任务

```js
let id = requestAnimationFrame(() => {})
cancelAnimationFrame(id)
```

- 优化动画例子

```js
function run () {
    const div = document.getElementsByTagName('div')[0];
    div.style.left = div.getBoundingClientRect().left + 5 + 'px'
    if (div.style.left !== '900px') {
        requestAnimationFrame(run)
    }
}
requestAnimationFrame(run)
```

- 大数据渲染例子

在大数据渲染过程中，比如表格的渲染，如果不进行一些性能策略处理，就会出现 UI 冻结现象，用户体验极差。有个场景，将后台返回的十万条记录插入到表格中，如果一次性在循环中生成 DOM 元素，会导致页面卡顿5s左右。这时候我们就可以用 **requestAnimationFrame** 进行分步渲染，确定最好的时间间隔，使得页面加载过程中很流畅。

```js
var total = 100000
var size = 100
var count = total / size
var done = 0
var ul = document.getElementById('list')

function addItems() {
    var li = null
    var fg = document.createDocumentFragment()

    for (var i = 0; i < size; i++) {
        li = document.createElement('li')
        li.innerText = 'item ' + (done * size + i)
        fg.appendChild(li)
    }

    ul.appendChild(fg)
    done++

    if (done < count) {
        requestAnimationFrame(addItems)
    }
};
requestAnimationFrame(addItems)
```

## requestIdleCallback

判断一帧有空闲时间，则去执行某个任务

- callback：一个在事件循环空闲时即将被调用的函数的引用
- options：包括可选的配置参数
  - timeout： 回调在timeout毫秒过后还没有被调用，那么回调任务将放入事件循环中排队（强制执行）

```js
const handle = window.requestIdleCallback(callback[, options])
```

```typescript
type Deadline = {
  timeRemaining: () => number // 当前剩余的可用时间。即该帧剩余时间，单位ms。
  didTimeout: boolean // 是否超时。
}

function work(deadline: Deadline) {
  if (deadline.timeRemaining() > 1 || !deadline.didTimeout) {
     // 走到这里，说明时间有余，我们就可以在这里写自己的代码逻辑
  }
  // 走到这里，说明时间不够了，就让出控制权给主线程，下次空闲时继续调用
  requestIdleCallback(work);
}
requestIdleCallback(work, { timeout: 1000 }); // 这边可以传一个回调函数（必传）和参数（目前就只有超时这一个参数）
```

- **requestIdleCallback** 返回一个请求 ID，可通过 **cancelIdleCallback** 取消

```js
cancelIdleCallback(id)
```



RequestIdleCallback 定位处理的是: **不重要且不紧急的任务**

不要做什么

1. 执行修改DOM操作：requestIdleCallback回调执行之前, 样式变更以及布局计算等都已经完成. 如果在callback中修改 DOM 的话, 之前所作的布局计算都会失效. 并且如果下一帧里有获取布局相关的操作, 浏览器就需要强制进行重排, 极大的影响性能
2. 执行 Promise：Promise的回调会在 idle 的回调执行完成后立即执行, 拉长当前帧的耗时. promise 的回调属于优先级较高的微任务，所以会在 requestIdleCallback 回调结束后立即执行，可能会给这一帧带来超时的风险

能做什么

1. 数据的分析和上报
2. 预加载
3. 心跳
4. 拆分耗时任务
