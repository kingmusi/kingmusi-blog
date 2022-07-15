# Intersection Observer

一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110181620.gif)

## API

创建一个观察器实例

- `callback`：可见性变化时的回调函数
- `option`（可选）：配置对象

```js
const io = new IntersectionObserver(callback, option)

// 开始观察
io.observe(document.getElementById('example'))

// 停止观察
io.unobserve(element)

// 关闭观察器
io.disconnect()
```

如果要观察多个节点，就要多次调用这个方法

```js
io.observe(elementA)
io.observe(elementB)
```

## callback 参数

一般会触发两次

1. 目标元素刚刚进入视口（开始可见）
2. 完全离开视口（开始不可见）

```js
const io = new IntersectionObserver(e => {
  console.log(e)
})
```

`e` 是一个数组，包含多个 `IntersectionObserverEntry` 类型的对象

```dart
{
  boundingClientRect: DOMRectReadOnly {x: 0, y: 850, width: 100, height: 100, top: 850, …}
  intersectionRatio: 0.009999999776482582
  intersectionRect: DOMRectReadOnly {x: 0, y: 850, width: 100, height: 1, top: 850, …}
  isIntersecting: true
  isVisible: false
  rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 393, height: 851, top: 0, …}
  target: div#target
  time: 426308
}
```

- `boundingClientRect`：目标元素的边界信息，即目标元素的 `getBoundingClientRect()`
- `intersectionRatio`：目标元素的可见比例，完全可见时为`1`，完全不可见时小于等于`0`
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的边界信息
- `isIntersecting`：从非交叉状态变为交叉状态，则为 **true**，从交叉状态变为非交叉状态，则为 **false**
- `rootBounds`：视口（或根元素）区域的边界信息
- `target`：改变的元素
- `time`：返回一个记录从 `IntersectionObserver` 的时间原点(time origin)到交叉被触发的时间的时间戳

## Option 对象

- `threshold`：一个交叉比例的数组，决定了什么时候触发回调函数

```js
// [0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数
new IntersectionObserver(
  e => {/* ... */}, 
  {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  }
);
```

- `root` `rootMargin`：目标元素不一定会随着窗口滚动，还会在容器里面滚动
  - `root`属性指定目标元素所在的容器节点（即根元素）
  - `rootMargin `属性定义根元素的`margin`，用来扩展或缩小`rootBounds`这个矩形的大小，从而影响`intersectionRect`交叉区域的大小
