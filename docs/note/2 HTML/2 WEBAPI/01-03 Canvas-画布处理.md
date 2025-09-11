# 画布处理

## 重叠图像处理

- `ctx.globalcompositeOperation`：设置重叠图像处理

![](https://cdn.musiblog.com/HTML/WEBAPI/canvas-globalcompositeOperation.webp)

> **destination-out 可以用来做刮刮乐**
>
> :::demo
>
> ```html
> <div class="container">
>     <div>奖励一个抱抱</div>
>     <canvas width="300" height="100" />
> </div>
> ```
>
> ```less
> .container {
> 	position: relative;
>     width: 300px;
>     height: 100px;
>     
>     div {
> 		position: absolute;
>         top: 0;
>         left: 0;
>         width: 100%;
>         height: 100%;
>   		display: flex;
>         justify-content: center;
>         align-items: center;
>         font-size: 30px;
>     }
>     canvas {
>         position: absolute;
>         top: 0;
>         left: 0;
>         width: 300px;
>         height: 100px;
>         &:hover {
> 			cursor: pointer;
>         }
>     }
> }
> ```
>
> ```js
> const canvas = document.querySelector('canvas')
> const ctx = canvas.getContext('2d')
> 
> let isDraw = false;
> canvas.onpointerdown = () => {
>     isDraw = true;
> }
> document.onpointerup = () => {
>     isDraw = false;
> }
> 
> // 初始化画布
> ctx.fillStyle = 'darkgray';
> ctx.fillRect(0, 0, 300, 100);
> 
> canvas.onpointermove = function (e) {
>     if (isDraw) {
>         const { left, top } = canvas.getBoundingClientRect()
>         let x = e.clientX - left;
>         let y = e.clientY - top;
>         console.log(x, y)
>         ctx.beginPath();
>         ctx.arc(x, y, 15, 0, 2 * Math.PI);
>         ctx.globalCompositeOperation = 'destination-out';
>         ctx.fill();
>     }
> }
> ```
>
> :::

## 像素读写

- `getImageData(x, y, w, h)`：将画布读取成一个 ImageData 对象，读取始点位于 `(x, y)`，大小由 `width` 和 `height` 指定
- `putImageData()`：将 ImageData 对象写入画布

```js
ctx.putImageData(imagedata, dx, dy)
ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
```

- `createImageData(w, h)`：生成一个空的`ImageData`对象，所有像素都是透明的黑色

> `ImageData`对象
>
> - ImageData.data：一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha 通道值（每个值的范围是 0～255），因此该数组的长度等于`图像的像素宽度 x 图像的像素高度 x 4`。这个数组不仅可读，而且可写，因此通过操作这个数组，就可以达到操作图像的目的
> - ImageData.width：浮点数，表示 ImageData 的像素宽度
> - ImageData.height：浮点数，表示 ImageData 的像素高度

:::demo

```html
<canvas width="2" height="2"></canvas>
<json-viewer data="{}"></json-viewer>
```

```css
canvas {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  transform-origin: left top;
}
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.rect(0, 0, 1, 1)
ctx.fillStyle = '#f00'
ctx.fill()

// 导出imageData，是一个 rgba 组成的信息
const imageData = ctx.getImageData(0, 0, 2, 2)

// 显示在界面上
const jsonViewer = document.querySelector('json-viewer')
jsonViewer.setAttribute('data', jsonStringify({ imageData }))
```

:::

## 矩阵变换

1. 矩阵变换（具体矩阵公式可以参照 ==图形学 - 基础 - 矩阵==）

```js
setTransform(a, b, c, d, e, f)
```

变换矩阵的描述：$\begin{pmatrix} a & c & e \\ b & d & f \\ 0 & 0 & 1 \end{pmatrix}$

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 移动的正方形
ctx.translate(110, 30);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 80, 80);

// 重置当前的变换矩阵为单位矩阵
ctx.setTransform(1, 0, 0, 1, 0, 0);

// 未移动的正方形
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, 80, 80);
```

:::

2. 对画布左上角进行平移变换

```js
translate(x轴方向的距离, y轴方向的距离)
```

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 位移
ctx.translate(110, 30);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 80, 80);
```

:::

3. 对画布进行缩放变换

```js
scale(x轴缩放倍数， y轴缩放倍数)
```

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 缩放
ctx.scale(2, 2);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 80, 80);
```

:::

4. 对画布进行旋转变换

```js
rotate(顺时针旋转的弧度)
```

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 旋转
ctx.rotate(30 * Math.PI / 180);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 80, 80);
```

:::

## 绘制状态保存和恢复

> 绘制状态：
>
> - 当前的变换矩阵
> - 当前的剪切区域（clip）
> - 当前的虚线列表
> - 以下属性的当前值：strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、lineJoin、miterLimit、lineDashOffset、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、globalCompositeOperation、font、textAlign、textBaseline、direction、imageSmoothingEnabled

使用 `save()` 方法保存当前状态（**只是保存，不会将状态去除**），使用 `restore()` 方法恢复

可以理解成 `save()` 后的绘制状态可以随心所欲，只要 `restore()` 就不会影响之前的绘制状态

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 设置了一个红色填充颜色
ctx.fillStyle = '#f00'
// 保存上面的状态
ctx.save()
// 重新设置填充颜色
ctx.fillStyle = '#ff0'
// 设置一个描边
ctx.strokeStyle = '#f0f'
// 设置一个位移
ctx.translate(150, 150)
// 绘制一个矩形
ctx.fillRect(0, 0, 50, 50)
// 恢复以前的绘制状态
ctx.restore()
// 绘制矩形
ctx.fillRect(0, 0, 50, 50)

// 不会应用 '#f0f' 颜色
ctx.strokeRect(250, 0, 50, 50)
```

:::
