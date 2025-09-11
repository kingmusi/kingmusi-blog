# Canvas-性能优化

## 避免浮点数坐标

浏览器为了达到抗锯齿的效果会对浮点数坐标做额外的运算

## 分层渲染

在部分场景里（比如游戏），会出现某些对象需要经常移动或更改，而其他对象则保持相对静态。对于这些场景，可以使用多个`<canvas>`元素对项目进行分层

例如，假设有一个游戏，其 UI 位于顶部，中间是游戏性动作，底部是静态背景。在这种情况下，可以将游戏分成三个`<canvas>`层。UI 将仅在用户输入时发生变化，游戏层随每个新框架发生变化，并且背景通常保持不变

然后只对中间层 `canvas`，使用 `requestAnimation` 不断重新绘制就好了

![](http://cdn.musiblog.com/HTML/WEBAPI/canvas%E4%BC%98%E5%8C%96-%E5%88%86%E5%B1%82%E6%B8%B2%E6%9F%93.svg)

## 用 CSS 设置大的背景图

在游戏场景，一般背景都是不变的，这个时候可以生成一个 `div` ，置于 `canvas` 后面，然后使用 `background` 渲染静态背景图

## 关闭透明度

如果画布不需要用到透明度，当使用 `HTMLCanvasElement.getContext()` 创建一个绘图上下文时把 `alpha` 选项设置为 `false` 。这个选项可以帮助浏览器进行内部优化

```js
const ctx = canvas.getContext("2d", { alpha: false });
```

## 减少上下文切换

**对上下文属性赋值是有一定的性能开销的**，比如下面表，对某一个属性重复赋值一百万次的耗时

| 赋值属性    | 耗时（ms） |
| ----------- | ---------- |
| font        | 200+       |
| fillStyle   | 80+        |
| strokeStyle | 50+        |

所以当绘制内容数量大、样式多的场景下，需要考虑如何减少上下文`context`的切换

- 考虑使用**先将相同样式的绘制内容收集起来**，在绘制的时候，则可以针对每种样式做切换，切换后批量绘制相同样式的所有内容

比如俄罗斯方块，可以考虑所有方块的信息收集起来，相同样式的放在一个数据中，切换上下文后遍历绘制

## 减少指令的调用

尽可能使用`beginPath()`和`stroke()`/`fill()`等方法将多个绘制操作合并成一次，减少绘制调用次数

比如下面的代码就是性能不好的

```js
for (let i = 0; i < points.length; i++) {
	ctx.beginPath()
	ctx.moveTo(...p1)
	ctx.lineTo(...p2)
	ctx.stroke()
}
```

而应该一次性移动完后，统一绘制

```js
ctx.beginPath();
ctx.moveTo(...p1)
for (let i = 0; i < points.length; i++) {
	ctx.lineTo(...p2)
}
ctx.stroke()
```

## 离屏渲染

1. 使用离屏 Canvas 提前绘制特定内容。

比如有多页内容，可以提前绘制好下一页的内容，当用户切换下一页，直接渲染即可

2. 使用 OffscreenCanvas 实现离屏渲染

通过 OffscreenCanvas API，将离屏 Canvas 完整地运行在 worker 线程，有效减少主线程的性能开销

## 局部渲染

比如下面，有三个图形，而在某一时间，只需要更新中间矩形的颜色

:::dom

```html
<canvas width="300" height="150"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.strokeStyle = '#f06'
ctx.fillStyle = '#f06'
ctx.moveTo(0, 100)
ctx.lineTo(25, 50)
ctx.lineTo(50, 100)
ctx.closePath()
ctx.stroke()
ctx.fill()

ctx.beginPath()
ctx.fillStyle = '#f06'
ctx.fillRect(100, 50, 50, 50)

ctx.beginPath()
ctx.fillStyle = '#f06'
ctx.arc(225, 75, 25, 0, 2 * Math.PI)
ctx.fill()
```

:::

性能最好的是局部绘制，局部绘制一般使用 bbox擦除和重绘（脏矩形技术），即

- **计算脏区域**：精确计算出需要更新的区域的范围（即它的边界框，包含 `x, y, width, height`）
- **局部擦除**：使用 `clearRect(x, y, width, height)` **只清空这个边界框范围内的区域**，而不是整个画布 (`ctx.clearRect(0, 0, canvas.width, canvas.height)`)
- **局部重绘**：只重新绘制这个边界框范围内受影响的所有物体





