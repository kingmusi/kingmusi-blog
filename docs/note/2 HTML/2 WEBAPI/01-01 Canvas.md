# Canvas

## 概述

`<canvas>`元素通过 JS 生成图像。底层是一个个像素，`<canvas>` 本质是一个可操作的位图（bitmap）

## 初始化

#### 1、创建 Canvas

有两种方式：

1. 在 html 中创建一个 `canvas` 元素

```html
<canvas width="400" height="250">
  您的浏览器不支持 Canvas
</canvas>
```

2. 通过 JS 生成一个 `canvas` 元素（不用插入 html 中，也可以操作）

```js
const canvas = document.createElement('canvas')
```



#### 2、获取 `CanvasRenderingContext2D`

```js
const ctx = canvas.getContext('2d')
```

## 坐标轴

坐标原点 `(0,0)` 在画布的左下角，x 轴向右为正值，y轴向下为正值

:::dom

```html
<canvas width="500" height="500" style="background: #fff"></canvas>
```

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设置画布边距和尺寸
const margin = 50;
const w = canvas.width - margin * 2;
const h = canvas.height - margin * 2;

// 移动到画布中心
ctx.translate(margin, margin);

// 设置样式
ctx.lineWidth = 2;
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.font = '12px Arial';

// 绘制X轴
function drawXAxis() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    
    // 绘制X轴刻度
    for (let i = 0; i <= w; i += 50) {
        if (i === 0) continue
        // 刻度线
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 3);
        ctx.stroke();
        
        // 刻度值
        ctx.fillText(i.toString(), i - 10, 20);
    }
    
    // 绘制X轴箭头
    drawArrow(w, 0, w + 15, 0, 8);
}

// 绘制Y轴
function drawYAxis() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.stroke();
    
    // 绘制Y轴刻度
    for (let i = 0; i <= h; i += 50) {
        if (i === 0) continue
        // 刻度线
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(3, i);
        ctx.stroke();
        
        // 刻度值
        ctx.fillText(i.toString(), -35, i + 5);
    }
    
    // 绘制Y轴箭头
    drawArrow(0, h, 0, h + 15, 8);
}

// 绘制箭头函数
function drawArrow(fromX, fromY, toX, toY, arrowSize) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // 箭头头部
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle - Math.PI / 6),
        toY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle + Math.PI / 6),
        toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
}

// 绘制原点标记
function drawOrigin() {
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // 原点标签
    ctx.fillText("(0,0)", 5, -5);
}

// 执行绘制
drawXAxis();
drawYAxis();
drawOrigin();
```

:::

JS 获取当前点击位置，在 canvas 坐标轴上的坐标

```js
function windowToCanvas(canvas, x,  y){
    const canvasBox = canvas.getBoundingClientRect();
    return {
        x: (x - canvasBox.left) * (canvas.width / canvasBox.width),
        y: (y - canvasBox.top) * (canvas.height / canvasBox.height)
    }
}
```

## toDataURL

作用：

- 将 Canvas 数据转为 Data URI 格式的图像

入参：

- type：字符串，表示图像的格式。默认为`image/png`，另一个可用的值是`image/jpeg`，Chrome 浏览器还可以使用`image/webp`
- quality：浮点数，0到1之间，表示 JPEG 和 WebP 图像的质量系数，默认值为0.92

返回值：

Data URI 格式的字符串

```js
function convertCanvasToImage(canvas) {
  const image = new Image();
  image.src = canvas.toDataURL('image/png');
  return image;
}
```

## toBlob

作用：

- 将 Canvas 数据转为Blob 对象

入参：

- callback：回调函数。它接受生成的 Blob 对象作为参数。
- mimeType：字符串，图像的 MIMEType 类型，默认是`image/png`。
- quality：浮点数，0到1之间，表示图像的质量，只对`image/jpeg`和`image/webp`类型的图像有效

```js
const canvas = document.getElementById('myCanvas');

function blobToImg(blob) {
  const newImg = document.createElement('img');
  const url = URL.createObjectURL(blob);
  newImg.onload = function () {
    // 使用完毕，释放 URL 对象
    URL.revokeObjectURL(url);
  };
  newImg.src = url;
  document.body.appendChild(newImg);
}

canvas.toBlob(blobToImg);
```





