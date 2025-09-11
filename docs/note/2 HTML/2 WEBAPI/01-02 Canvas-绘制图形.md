# Canvas-绘制图形

## beginPath 、closePath

#### `beginPath()`

- 开始一条新的路径，调用此方法后，之前的所有路径会被清空，开始绘制新的路径
- 通常在绘制图形前调用，确保不会被之前的路径影响

#### `closePath()`

- 用于闭合一条路径，会从当前点画一条直线回到路径开始的地方，形成一个闭合的形状
- 需要通过连线绘制封闭图形时

> `beginPath()` 和 `closePath()` 不是要成对出现的，他们的作用有很大的区别

## 路径

- `moveTo(x, y)`：设置路径的起点，即将一个新路径的起始点移动到`(x，y)`坐标
- `lineTo(x, y)`：使用直线从当前点连接到`(x, y)`坐标
- `fill()`：在路径内部填充颜色
- `stroke()`：路径线条着色
- `fillStyle`：指定路径填充的颜色和样式
- `strokeStyle`：指定路径线条的颜色和样式

绘制一个三角形：

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 开始一段新的路径子集
ctx.beginPath()
// 设置边颜色
ctx.strokeStyle = '#f00'
// 设置填充颜色
ctx.fillStyle = '#ff0'
// 把鼠标移动到 (100. 100)
ctx.moveTo(100, 100)
// 绘制到 (150, 150)
ctx.lineTo(150, 150)
// 绘制到 (200, 100)
ctx.lineTo(200, 100)
// 闭合路径
ctx.closePath()
// 绘制边
ctx.stroke()
// 填充图形
ctx.fill()
```

:::

## 线

- `lineWidth`：指定线条的宽度
- `lineCap`：指定线条末端的样式
  - butt：矩形（默认值）
  - round：圆形
  - square：突出的矩形，矩形宽度不变，高度为线条宽度的一半
- `lineJoin`：指定线段交点的样式
  - miter：菱形（默认值）
  - round：扇形
  - bevel：三角形底边
- `miterLimit`：指定交点菱形的长度（只在`lineJoin`属性的值等于`miter`时有效）
- `getLineDash()`：返回一个数组，表示虚线里面线段和间距的长度
- `setLineDash(array)`：数组，用于指定虚线里面线段和间距的长度

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 开始一段新的路径子集
ctx.beginPath()
// 设置线宽
ctx.lineWidth = 3
// 设置颜色
ctx.strokeStyle = '#f00'
// 末端改成圆角
ctx.lineCap = 'round'
// 交点改成圆角
ctx.lineJoin = 'round'
// 设置虚线
ctx.setLineDash([15, 5])
// 把鼠标移动到 (100. 100)
ctx.moveTo(100, 100)
// 绘制到 (150, 150)
ctx.lineTo(150, 150)
// 绘制到 (200, 100)
ctx.lineTo(200, 100)
// 绘制
ctx.stroke()
```

:::

## 矩形

- `rect(x, y, width, height)`：绘制矩形路径，起始点位于 `(x, y)`，大小由 `width` 和 `height` 指定
- `roundRect(x, y, width, height, r)`：绘制圆角矩形路径，与 `rect` 相似，多一个绘制圆角的参数
- `fillRect(x, y, width, height)`：填充一个矩形
- `strokeRect(x, y, width, height)`：绘制矩形边框
- `clearRect(x, y, width, height)`：指定矩形区域的像素都变成透明

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.roundRect(50, 50, 200, 200, 16)
ctx.fillStyle = '#f00'
ctx.fill()
```

:::

## 弧线（圆形）

- `ctx.arc(x, y , r, 起始弧度, 结束弧度, 弧形方向)`：通过指定圆心和半径绘制弧形

> `arc()` 方法创建一个以坐标 `(x, y)` 为中心，以 `radius` 为半径的圆弧。路径从 `startAngle` 开始，到 `endAngle` 结束，路径方向由 `counterclockwise` 参数（**可选**）决定（默认为顺时针方向 -- `false`）

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath();
ctx.arc(150, 150, 100, 0, 2 * Math.PI);
ctx.strokeStyle = '#f00'
ctx.stroke();
```

:::

## 文本

- `fillText(text: string, x: number, y: number)`：在指定位置绘制实心字符。
- `strokeText(text: string, x: number, y: number)`：在指定位置绘制空心字符。
- `measureText()`：返回一个 TextMetrics 对象。
  - 可以从这个对象上面获取参数字符串的信息，目前主要是文本渲染后的宽度（`width`）

```js
const text1 = ctx.measureText('Hello world');
text.width // 49.46
```

- `font`：指定字型大小和字体，默认值为`10px sans-serif`。
  - 和 [css字体描述](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 相同的字符串
- `textAlign`：文本的对齐方式，默认值为`start`。
- `direction`：文本的方向，默认值为`inherit`。
- `textBaseline`：文本的垂直位置，默认值为`alphabetic`

![](https://cdn.musiblog.com/HTML/WEBAPI/canvas%E6%96%87%E6%9C%AC%E4%BD%8D%E7%BD%AE.webp)

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#f0f'
ctx.font = '30px bold'
// 文字描边在中间
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('hello world', 150, 150)
```

:::

## 渐变色和图像填充

#### 线性渐变

`createLinearGradient(x0, y0, x1, y1)` 方法需要指定四个参数，分别表示渐变线段的起点和终点

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 创建一个线性斜对角线的渐变
const gradient = ctx.createLinearGradient(0, 0, 300, 300)

// 添加三个色标
gradient.addColorStop(0, "green");
gradient.addColorStop(0.5, "cyan");
gradient.addColorStop(1, "green");

// 设置填充样式并绘制矩形
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 300, 300);
```

:::

#### 径向渐变

`createRadialGradient(x0, y0, r0, x1, y1, r1)` 方法由六个参数指定，三个参数定义渐变的起始圆，另外三个参数定义渐变的结束圆。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 创建一个径向渐变
const gradient = ctx.createRadialGradient(150, 150, 30, 150, 150, 100)

// 添加三个色标
gradient.addColorStop(0, "pink");
gradient.addColorStop(0.9, "white");
gradient.addColorStop(1, "green");

// 设置填充样式并绘制矩形
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 300, 300);
```

:::

#### 重复填充图像

`createPattern(image, repetition)` 方法定义一个图像填充样式，在指定方向上不断重复该图像，填充指定的区域

- image：图像数据，它可以是`<img>`元素，也可以是另一个`<canvas>`元素，或者一个表示图像的 Blob 对象
- repetition：`repeat`（双向重复）、`repeat-x`(水平重复)、`repeat-y`(垂直重复)、`no-repeat`(不重复)

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image();
img.src = '/logo.svg';
img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

:::

## 阴影

- `shadowBlur`：阴影的模糊程度，默认为`0`
- `shadowColor`：阴影的颜色，默认为`black`
- `shadowOffsetX`：阴影的水平位移，默认为`0`
- `shadowOffsetY`：阴影的垂直位移，默认为`0`

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.shadowColor = 'red'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 10
ctx.fillRect(100, 100, 100, 100)
```

:::

## 图片

使用 `drawImage()` 绘制

| 值     | 说明                        |
| ------ | --------------------------- |
| dom    | 图片                        |
| number | 绘制图片的起始点的x         |
| number | 绘制图片的起始点的y         |
| number | 可选：绘制的宽度            |
| number | 可选：绘制的高度            |
| number | 可选：canvas绘制的起始点的x |
| number | 可选：canvas绘制的起始点的y |
| number | 可选：canvas绘制的宽        |
| number | 可选：canvas绘制的高        |

> 绘制一张完整的图片
>
> :::demo
>
> ```html
> <canvas width="300" height="300" style="background-color: #ccc" />
> ```
>
> ```js
> const canvas = document.querySelector('canvas')
> const ctx = canvas.getContext('2d')
> 
> const oImg = document.createElement('img')
> oImg.src = '/logo.svg'
> oImg.onload = () => { ctx.drawImage(oImg, 0, 0) }
> ```
>
> :::

> 绘制一张图片，并截取一部分渲染
>
> :::demo
>
> ```html
> <canvas width="300" height="300" style="background-color: #ccc" />
> ```
>
> ```js
> const canvas = document.querySelector('canvas')
> const ctx = canvas.getContext('2d')
> 
> const oImg = document.createElement('img')
> oImg.src = '/logo.svg'
> oImg.onload = () => { ctx.drawImage(oImg, 0, 0, 100, 100, 50, 50, 100, 100) }
> ```
>
> :::
