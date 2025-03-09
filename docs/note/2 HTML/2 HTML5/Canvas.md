# Canvas

## 初始化

**1、创建画布并获取画布对象**

```html
<canvas width="500" height="500" id="myCanvas"></canvas>
```

**2、获取元素**

```js
const canvas = document.getElementById('myCanvas')
```

**3、获取上下文（可以理解为画笔）**

```js
const ctx = canvas.getContext('2d')
```

## 基础图形

#### `beginPath()`

- 开始一条新的路径，调用此方法后，之前的所有路径会被清空，开始绘制新的路径
- 通常在绘制图形前调用，确保不会被之前的路径影响

#### `closePath()`

- 用于闭合一条路径，会从当前点画一条直线回到路径开始的地方，形成一个闭合的形状
- 需要通过连线绘制封闭图形时

> `beginPath()` 和 `closePath()` 不是要成对出现的，他们的作用有很大的区别

#### 线

1. 设置线宽
2. 设置颜色
3. 把鼠标移动到某个点 (x1, y1)
4. 绘制到 (x2, y2)
5. 绘制

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
// 把鼠标移动到 (100. 100)
ctx.moveTo(100, 100)
// 绘制到 (200, 200)
ctx.lineTo(200, 200)
// 绘制
ctx.stroke()
```

:::

> 可以通过设置 `lineCap `，指定每一条线段的末端
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
> // 开始一段新的路径子集
> ctx.beginPath()
> // 设置线宽
> ctx.lineWidth = 30
> // 设置颜色
> ctx.strokeStyle = '#f00'
> 
> // 设置末端为圆
> ctx.lineCap = 'round'
> 
> // 把鼠标移动到 (100. 100)
> ctx.moveTo(100, 100)
> // 绘制到 (200, 200)
> ctx.lineTo(200, 200)
> // 绘制
> ctx.stroke()
> ```
>
> :::

#### 折线

1. 设置线宽
2. 设置颜色
3. 把鼠标移动到某个点 (x1, y1)
4. 绘制到 (x2, y2)
5. 绘制到 (x3, y3)
6. ...
7. 绘制

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

#### 多边形

1. 设置线宽
2. 设置边颜色（配合第 9 步使用）
3. 设置填充颜色（配合第 10 步使用）
4. 把鼠标移动到某个点 (x1, y1)
5. 绘制到 (x2, y2)
6. 绘制到 (x3, y3)
7. ...
8. 闭合路径
9. 绘制边
10. 填充图形

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

#### 矩形

1. 绘制矩形

`rect(x, y, width, height)` 方法创建一个矩形路径，其起始点位于 `(x, y)`，大小由 `width` 和 `height` 指定。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.rect(50, 50, 200, 200)
ctx.strokeStyle = '#f00'
ctx.stroke()
```

:::

2. 创建一个单独的路径子集，并绘制矩形

`strokeRect(x, y, widht, height)` 方法绘制一个描边矩形，其起点为 `(x, y)`，其大小由 `width` 和 `height` 指定。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.strokeStyle = '#f00'
ctx.strokeRect(50, 50, 200, 200)
```

:::

3. 创建一个单独的路径子集，并填充矩形

`fillRect(x, y, widht, height)` 方法填充一个矩形，其起点为 `(x, y)`，其大小由 `width` 和 `height` 指定。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#f00'
ctx.fillRect(50, 50, 200, 200)
```

:::

#### 弧形（圆形）

1. arc 绘制弧形

`arc()` 方法创建一个以坐标 `(x, y)` 为中心，以 `radius` 为半径的圆弧。路径从 `startAngle` 开始，到 `endAngle` 结束，路径方向由 `counterclockwise` 参数（**可选**）决定（默认为顺时针方向 -- `false`）。

```js
ctx.arc(x, y , r, 起始弧度, 结束弧度, 弧形方向)
```

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

## 渐变

#### 线性渐变

`createLinearGradient(x0, y0, x1, y1)` 方法需要指定四个参数，分别表示渐变线段的起点和终点

> 渐变坐标是全局的，即相对于当前的坐标空间。当应用于形状时，这些坐标并不是相对于形状本身的坐标。

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

> 渐变坐标是全局的，即相对于当前的坐标空间。当应用于形状时，这些坐标并不是相对于形状本身的坐标。

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

## 阴影

1. 设置阴影颜色

   ```js
   ctx.shadowColor = string
   ```

2. 设置阴影x轴的偏移方向

   ```js
   ctx.shadowOffsetX = number
   ```

3. 设置阴影y轴的偏移方向

   ```js
   ctx.shadowOffsetY = number
   ```

4. 设置模糊的距离

   ```js
   ctx.shadowBlur = number
   ```

5. 画出上面设置好的图形，并带阴影效果

   ```js
   ctx.fillRect(100, 100, 100, 100)
   ```

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

## 文本

1. 设置文字颜色

   ```js
   ctx.fillStyle = string
   ```

2. 设置文字的样式

> 和 [css字体描述](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 相同的字符串

   ```js
   ctx.font = string
   ```

3. 设置文字 和 文字的起始位置

   ```js
   ctx.fillText(文本: string, x: number, y: number)
   ```

4. 镂空效果

   ```js
   ctx.strokeText(文本: string, x: number, y: number)
   ```

5. 设置文本的起始点

   ![](data:image/webp;base64,UklGRlJlAABXRUJQVlA4IEZlAAAw+gCdASrxAfUAPm0wkkakIyQhKV48KIANiWdu/HMTCcV90v4AXPpT1wGm7DO7rxOT30T+0D7bxT/mO6n+qXve5ofkk/5nnRev/0f94S5wB/WfMt45/hfxw/rPpD+PfLv0j8cP7D/8v9p+GH0p/ZeRH6n+z/3f+A9R/5b9aPqv9g/wP+M/vH7b/h3+U/zf+B/bP+vegvxw/gfzI/zHyBfin8Z/tX9o/w/+1/rnnmdrxq/+n9AL1i+bf57+7f47/w/6j5C/pP8p/jf3B/f/5I+sH+L/uf5B/YD/EP5f/fP7J+539x////2+4v+h4G/1b/Df7T/P/k99gH8i/pP+w/xH+l/af6a/6P/nf47/Uftp7U/n7/ef4n/Tf+//M//////oL/Jf6X/rv7p/lP/p/l/////fvD/8HuJ/av/v+6H+uX/U/PhCmwnsL7kmJD69Xh9Oc5znOc5znOc5znOOZmpHOIThqtaOfwLaBf95hPg2P0KOF4uygzf+XyN5DbZUIJu6DzsdZVJrBsLanuORSgeQCCtKitZHJkK24Ioz5XUg2iiiBkqo8cC1XK9z6cT8JT9RQsZTHuim1eTnOcguLqvgnn5aCzLv+IbOlmrKz4uf1gBY8ALNdtnaeVKlZCTjjg2d0edx40gBBspDPUt911P8kI3RpYlbbYVGjeqIV/NycL0rmCZ+KLfjcj+hC3JP+0tQx6ngcjmmhxmnqK1vz1Ja/TzU/je6lgMzaYCUPekvtvN9l49ZdocNg7GxTrWM5O5ASoGTCfmhzCEjw2kDtwivgcarwRDNKzKduimOC+a5Noo9qC9p/eR00ebjyN0oeDY80W+9zf97ub5c6p/RjT/IYfrOWac+MnW+O4fIRDs6HppkZV4rcktL7vKWtAyYbIPsV6s2PFg2h3fq2zW6lxg19Dj4+CU3wtbWXPSgVBz7ZAtAjALZx3UMnk6+njJaxE/kXKGh6JyAQJDz5t/d3tJxEb+7Ec5Wl06WbYUuAo1ipPaPfOqplaXQC0geC/76hx6vHEUeh0tJCo0TitkQZyFKz6WfasEqMonJZimiwwyP8wqckVOIxWfmReldCHur/dRKhIYRQ/FQMFULPAcNH89PUjNE/Sd9kX5nWTf4ap348A8ic0Jwvs8JVHJQ9TSN3Yqyr449tZ6CIzotkse3Rt6LIaQMPtcKvBWBYnava+gmWFLuojvoY+f+YqYDMxf+aqmEm+iZkZMoZA3fLiJaX3mAOk1uqQdoDrhr48USzkeO1wbPLZ8ACmXy3AGQ+OovxEpSrWj3ItVDs1J9dEXu8RfPrDT3D6C7EW5fk9v3dIb369kJp8de9zl49ICwIHXLFPrLKZu4juJtEOaFOpXbSHilAakSrpkll7M7Pe449GYm9ZWI+nOQn3oqoisxRaw3/JvFwRxxPEsjRV82+5vLD7tYwi7lp7Nqr/65Oev8qp6R4XV6Nj6DxLqgM15rLCGoQ1nWVhobZA/1lJfPawvRe7PDvpI0ZIRjn6H9rxuzLwyuKFpFhb9XSm65I5dRJCnXrzmiwbPR0JdkAogSxCODZIKkReFayZRoXP7KoamAVb3RnLCNGJ5Cov08wh2AuqAEp56JTI44dZpm4JLZx/1oWpxef1F1x9V0LH+J9WfCB7yA3bIcZd+cnLqd2QdMlBLuZIAnEdEt0sRn+DYUQcjONzZHHASGDjAFuZkThjKy3lMmip6kRNdFa5pSzkx+va5NH92WxOARnjOqGYeKiuiZB42rPZLkREQtX412X6meSjb+sO6ND9fwfC4q4e3/AVOgSKRu0+zxQlBuoiYw++HQfML1X8gC9Pei1Mbiq5lM97iXRDoyLhd52eVV3++5pJgfrjq6I8TnfGgGKpVjs7hPi4LX9LCDRtqiPyUsSjJlXvkmMlcp+dT0errGFYt2/c0gIS/x2W5EZ4cR5tWUdZvtXnAn4b0WEPOSnMuoAh6ZnnZF1Pknd6hMlA8w9FJgk1xaukxcvaMbS9zI3V6w3EGNYt4vfrONOJphRYKS5BIKX0Oz8w3BJuD1qLIkPtYSSqNXPPVWEa9Ra8wbzrp1n41BrmEjkaeElie+TDyZKKU/INfy1+4qxR++milfH+lgTCoGfkgThV1aZVSL/wLD91xEA59NSl/ALxmbLwDmi41dSYaPRnzQfUQlgoViYHN8VuM8qBxXHDtOKIidmU31lK+5c5U1qizPgoMjOevOuIO51/e3Z9a43Sj4BywV9H44e8xHssWytVvSaLQgTkeeO6ns9ynC+lVhEiMyQto1/EaN9XYta2yW11xAsYi0z2m8avt5jGRQ4VSpGPPGwvZdhlkF7A9nnE7TaXI9zrvo5ZOLXAu9leHyLPdSR3GJnwcYj9zS3GbvGpIVNMQwKV8ueLWirG+a+GUFWZQjT+dRigqS5OpgKprkny7e5CnWI4eLVxvIgBIjupuz/EIfenFHOTJYjPIgwlKyn8pSXpAkWnWXUxoaRMZ59RDeF9twelZzrbwxn0/5xfiSvT8xsXmox6dMWdOWr4CVI2qeFSgH5rCfMo1cN6FHlbZDG2VC974EcP0sGIER2ME2NQ3fS/+bCZLhEQyNrbk+ie3lmP0YNjISxEh/xESvsZu99Jxj27RhUBT30L/Mgat4p4w2JjtCnKw+rj8ePxlC+5JiRGTZtQQs5iwsJmNJQ8cFQ4OJKIAA/v9rIAAAADQYGyLp7qAI8TI6WGmc86LCGyahBX0fXrK9xYIdRuACaJO90fOaHW/m/nCeGNMRSV1M1XzdM8YLFr2uahNZgczacVVHs4ry/dXc1fgtAHPxbFtprY+aIKSjKn3cDBE+i504R3Nnw514lvZrxP/lgXkHUViyD1x4bbIxyrCF/15R2x3RsLJDGmBezva3bPokg5901xVNJIV8tfbb2r/ttqspQ5JMirkZZ0hXAsrh/iqFBKh4zt5hbHZTi1ILGMmK4+JlJ/BE2Zj9DRvF2xy8xU2c7PljKvqNZ/ilt55KvpKxmfPSOgFD2/iMEUjFNufszamDUvDdD0K653ElZIU6mmTOMl+Qll9vM3cP6GVbCr8SnxoIovVfaSmRV6DcuSNa+jx3resw14WsK/eiDzY6qjCVdq/F7Oy7Rgu0Ai9EKgzqZfM9hSZbfizA3PuwmXe1pb8Ii1bm52hOnaBVu+nWOcjDPwwIeelLOaU4qQVPb5VTQdG6qFqwy45HqgvKVTKN+FWfyoM1rJ+3OuvXbmkVYRhKcpoN+NcitXGdmGxNJReNuKNOZquD35iwrlgQHqFkaF1MP/9A+o4r30Yj1BUhgobyDxgPu3E2WIjETrcBfJFtjxl69D5fnTTHgcBzK4ye2vfxLau53jB9UvWAoRXhEBya3JsQMmRVowgKoqFG1QfWly/tes26L9TCNAPD9qR0F12HfK42IW4x60Ggl4L+Y3iDPc9UWiUhqlKQmhZsRDTQoVmD/2pielVBZTHFYYmDMlhcIslupQ7nCndCyj2kZgu6cVYV/hBFeqT5z4MvaPkQLL8TOAOc5jhivsZ2p5aZop2PE/G8uwqMnk+9rcNibLy3hKPPJvVsTUUxMbikQJWLYJ8VWabH1iLc+iUXbR5UJgMVBJAHF+v7GCzcYraRpFwFxeV/5tzSx0w1eEtNuXqMMOCoFa9Nh3SFaP5LEdGqKWWh2y7gxqq1R3H06iFwpomW6yhthT3eW9+dcQr6b3NhwcjCcz238uMAXKu4Mdf3Lf9Eq9nSP9tmvlwK8KGmYb5NxtGRpBGF9c3sVlSl/i3U3ip7qikaL8f4l0EW+bTiCOnpO7WIh8XxJHIXziBo69TsJj4MVKzsmJq9zdz5mtT3kN4subz1AmYbcLXVGb/uWWvkzJRUrNPVwSQCW1NGaT+PH59yOnNlDsxTd54J7GMfCCrlcs4vNKtm7VfrqPPiFyMvwAYHvKTOUA2plcF+9a5NEzxLm8fm2pDoyr+iIoNZsMBOzqeVRo85eCwOza/C1slvSsdQ3776jwXNQ8NXNvN6dDmyd88hz3I+rUzNqP2lpWmWFbxYOkPTVrw85Zlt4oTgFxqnh3mIhXHe0XvhoetUBDCPLk0K5wC7JfUE4GHAWh6uPXGJVigLCQ9pkFiiwtqVyghLlgXQQ61e+ytUexkUBiCidNOlt9mfha+NsUwVb3Wby9btVxfUXPS5jPautbB6/SnbbJSM1jVIB7kBuLYBNy/KS9ni2aTRgv2Phll88zie0IoBoHZdwPT5Nru9nbEBIeNiHxCZ0QGMZJV8JSu/35K0xoEz9n9zdHe20vEUH6o+BRETsczkaqWdVbPO/R/9Vtpq14eFZI9oQCjvyYoY52NUAWf6ZDIoX/XjqCRrqbGTyAjuXMWMllrXIB5avC2Q9Wdc1nOq+ryz9Hb0TS4Po1r9wKQgPsNsjayqk5jcb5hxfJ3P0jFLZpeOj+XqViSJZdmvJgEwKRrm/GVKkg75EzyRoeLBJQlk8Xjoksqkh4+3yzlNzyxZ2uv68ptdR+2B0b+kWEpMfO3iUic2Rz1owzissINM1+BKp7cNpZBDjtSna/dQhSBEuODS2S3u70ZIxhLA63LzBFqm36yEJ/NTkNdL/mQU1jNqu9smcSBB6sqjxIkG6QziTITap8OqVM4OGh3PShKTuOd3/GNgUt3t7iLed2ZWwXqO2Jn6u0ughNmZHSW7/ZsDaIQ2V0/ednDjSoEWgMzcQsLvoSsaddNitN0noTSUxoATVRlih80mvy2vQT1xes8Iv5jjyApOY7ZlJTSq8KDgjxrljTjw4B5N2d4BxaAy1dcxGMltSeSshcKzFZ8tstWIbyf/jpvc8ijbiMRcP7AG5BbqbFg518o727fdyXPs58jFAAuDoqwA2YIxb6KQ9sCjBFST6le0PZ+QStcN1lZGttEOGoRxUtN47LFsAQaOx+VWnikxW/wtrd0VKt2brQ8Sbhm6qgoIEKEkCQjYj/Cca3wOtHg2OUoR6mxgx8neJf6vPmeIuMcZD832iRPEp/GGLFBhBkZPD5RpmU1tcCI5Yb3Q+ZfhRWacv2pa8d/neTDG8beIlt7RIhX5v6V45HFRdLTSmkpp+eGVu0Wj0eBGAFM6kbP2RMicomZabjuFykKUUqecOoIKYpK3gz3npIDHewHfSYklfWUR9QK4CQXPVMB/MX9x9ouwYUpc56LLA1ti/7pxlD2Hf2ehqPzlfqKEphsmWHq/ZxJZXtfxzVyjxH8seaCrEkubPHF5LsnQGLXxkkL+cYa/ryCdaTZhvUlZPKNqWyEq2JCpkDgt3PIet/V3Lv5PG/94Mci3tcenYlMgCVX627YpHLrj1RovpGrqHWv8nPLxs8ovJfbMtvptVkUMtiwSXtPMoHk3MITPP5oy2YFbE2eCSD9nsiaANI4hdRErdTQSmaiVwnAnFUeUOTqFZ5ru3aNMJriBnQR2WAVtLteSqM1HlR2vLPBr3xS0rNnPJvNAfeTFKsveeglVrNs4FSO8qulgc1OJbM2XoRotEh+4DTRd39de16R3aaL4/0gYiMRDqAL77dkgjwdxgMg+u9KTMwiB8BGz1/Lk21H4PzyVw2kHZuYzzANlDfrfnGsqK6AzbVoC8XLlSAGizcQjOOJhWYO6H4FQQo26NbGxarrMcwaHlOCRX/TSBdRxTPrShALX97UI4sT2KzJc2M09n+7YCx1ViywIiaYcoq3gGVU4UpYIO00t1SLQLK52uQCmB6tUCgYvfMlSvHeM0TOZZ16QwI0zkQ850AovkP1uqv4R+qX7wSSlTh9DRzgowWn7a8WNjnlXpKo4tieVX9dSUUlyEfH5Pl6GhZuQ9rBWIzvLXD8+kxHcgztcABXz8O0+92rOY9AHwViNvJbNFetNWe5ktIcJufh2JP1rI68k3LJKRRxz6eZ52qoyhUF4yY+RsPPrqV3xWIyyZi/9YcBKk3ZiOWs5/iGoEHxdlcOYoJGXt5jbo1sbFqus37yVQuzSlVY3yVP74qhlNmNX5kFWo9sggeX+CPykusb5UzdAGxpVUku93EswxT8GfujVpdl5XtJ2EVKWoQmC0pH9+nvwL9EVBKfqEbzHQIodvunrn1xPH9Nk/A4cUZR3uiFd4rYZmjm5yOMnfvjxXQtwTp7yl/Pk7sQPWJaNtlMBC7odxsCRrXJbmOyx7ACoAdl/ZLGohkKrlS3+ULcSuLPRAec4Cyjn4/QdwRreHN6KokZl50l1YsNFT+ne1jWPqBfEQ3QpJO6ycDAXQxgu3Vzg1edVBkzumB43TPJQ0qOv7wJBYUS326wQh8HmsbcQcNwoI5N3gwEPaBrA0wxj/rvar+cqqOmFqQ0/E0VYvwgG2YKT0ywwprlcGXcdtZs7EfVBZlM4c5dMgg0xgSfxW7Y7XRdZusFxfTyW7wLSbnKklHJMSREiYN+JCQrZ0t9wI4Aoeyp7xmMwNarPtJhWEq4JR2SwZvAy5ugrJ+IWmguyMUvNjSMo9jt8+5N2DhPIcFjO2/kWckkouoRXrXZttTZun0bpCH4ESJhuN3kqiSygeJDXFmg6O5qL1VTZZVQGeNTxLTb8D28I/jcqZchXH/Wac2y7G2bQGqnEYUTEFk6Zm2umKSkMw905Wv8jPjgXVbpTibiF2wQIsORjwhNZjGVes5pbyUd+LvUS93OE9l5lWFgMfjAg4L+Ew93bYXDH4NAKK28VKcwsCjW/2QtUNUliN/6AlaUbFdvDSjY25eRH6kb7PaDKQpj7w8FsyB2hUq2n7cs61ECOJNkf7T/DN2f1XLtseayxKJrOkDtIk1NteyjK49tV3B4dHzysv6BgRsn6mx6HoTLrLCAgvCFgxyTkXKk4lylEEiW1MOuSnwwe35ZWapvROaRwFPPgdbo69Hmb9Z16N8jyaDNqwV2U3g2IcjwtDDxTEoSwKR//4LctLGwQBHg0CnABpXkQZK5BwQs0ktc+6R+4lXWlh7muvXJG7Y49MKT8Y38ImCLcPqgTM4RWuFqlpQHObEvhJa5sXPA9Qct5259iPmq4bGuYxyfPJ4FlYwiAB0Xf2Clo1iMGtM1EUx4xUN/0dQ19uD18pwK+Qmw0K979GsU9pgYjtT6oGffcMXHHlGXs8c5df6fS1BjK+GN7pKnFQwEx1HydkVRxWCqG/cpT+rxzhse2045pDtzJT4AfaI5sBeWZEqEPP4Q+J9f39O9iipsXK+soKF+qFugjCSq4uQsvVUqME6OscwI36kokZK86ue9sbxDD4dJaS5oSUexor1QQpe10WqS5YQOpnvDwxMzdlVBpysc+IMz06pusEdQKaPd0lmUun4deKkwi12JNBCzdd/3lKsz+eb2W7kkgiEVVgdMqVt0MCSFaqZ7o9AqZ7mDc1ldVWmKKlDp3Wn/MI9EitgTPTqumd+GbR287MVGb7EX9asq6iMpvZiDZpdGp6Y7nRXCwLWiRA91Q4s9IcKyYwwLOziBWKp8UDNkuO6TL7fkWvLz61IuPz3Se8HQ/rmJ5pr8xTqHv851fNtJr+lu6joMPxtA8O9p2xdfvwJ0c/HLNBGEBP1W43giXXOo7a2NIm/43BWL91KA1L1DZF8OjM8djs7op5AJWpm+k0uUAyboNvkxIVAKFGByltq28eVprQaETUX4sFi5qsDkC6U/121G5pzvsOjEwEGpxD4gIwvbBvDhkEvyAvNQeDPisQV9MsO0IbmjX2UtV1fgFZITMz7CeLknnBCqYysNY2YQyoBqnyHVVBl/Oa57PXSQ88iK/b1YQN9kvIBy/XQ3MIBzcXVw/uVfkotkB78XNA6TF7cvHLTMIYZkT384utYWA9QQZAXXiKO9PjX47Fs3IBo+vIOz2TcxceWJI9REaw1ocqs6LKUd/AR1cAwceZyKehNw//hkZAlwPvlmvwng7NmgW0mHc5BqzOEC3AAGGNjVW13le0qB0PAphXcd0fgZp9QnDKHuaFYZ0hcCTDr6O+IMYIyeHr27/jxJbNao6XTi3/tQwS3suAnBD1R89O8uf0+NsEFEYI+Dmfq4SPlZxIsgzWar04R3Q7C12/WcCFpWAkV+eUvoaoiXEP0HUeogM041XmK8aVTKm/x0xgm+3q8zzycB9YARTnE6BxWdS4RK27PGaLofQX9asPBjrABX0TvnwnckV81G9CybeuUQnxQp+0zYIyJGjzZBvE2gOQdTXpA8Fcabt7AHOXKiPdWSYxJ8AR/R0y7XsM0bsM+Upr1dkGaEa2+WiIgkdATH5ellojfQf7Gy+lko0af2u7XzahiNqWPZm3Z8Mm258WJlY/UtRz+aVVeC/PtHfzEnzkLb/xgN5+ClS/PF5sgjp6mUN+1dWgdWCQjyR5w5sj69PNkRDeE4yn2QJA+L2jOSYvCjsbT7x5a+w5jzyykPJ/WhtQtDgBb7onuTh/GHq9LUhF3nyHcEZR2q2SmLwLUrdaNZEkj0wYy4I028d2xKvUGt7J4paXkYqwR9+CY2KS8i6rEm9fQV/qiRt9S3gzbj5zxvVBXCLc9z3yqVCSt4jubblGsc5smuWPGvOvq6bpeP4JTMqb3boRERzeMHB892FNNYLSDVj/xAqj4mAl3amaG2i8rItSKQViOSWKGgX9ovrzRRaeztaSRqTnlAjtj4qe2s5WAlMzewybCm/TIB+afAXvmF7OGbmYsJgje7e8xUwYUTUYhjJM5rjsoC8pI/tGQ95HHzBXL6M/2QOH6R/tTCN3oS8ZB50Li5tulPCZcorMKsgEaMhgborG6SQ9lAbdrKOIfb4ad+mNXSW0KgPFNQgudREAU7AJCzoB1dP1IH89NyJt/JHLToFV++NDP+YZ2rvf3RocRj+v2raxPmVF0AUIKjtQfi/atUSXQo9mucnmCjwBtLRdDCg6jJEgKjVwLobu9izuGvD8TM8A9RGo8a+a14RuVTvdNKRhQEgi1aBQ8Jiy5B/NLD2fpalAizxYGa4LEx/gp0gg6Knvs4+UY3f20DoMtqvnkCKScEV3Hyto5U7VuvEkp2KUQpI6K4tINNGxH7syPU+IEwoaFtiK3C32nDvXHP82vMb8JcM/qOHLuo1C6hgKJTSJmbHPRMhT9L5z+nEtuMsvU/oeM1yMJ4pdPl50uWi+XnlbCu/GzWNixo9I2uUCNi5NrjqvteH2Msv1jHBsjQrRxUXX+Ks7/vdq72mHJ1UMb2y43vpQdPlwR7JeyO3SYbvHj/yYnJFplBmITv43yJmBNi6aCWWYOkqn906shqcXyntaYGPllP29+XGHEkZXV8Db4EJaK3uXO+zPfmWj/P/6sweVNHHpJtzUZkrUVeg3AXajNlegI0ColC7TtoifHC1dL0LFR+RlyA/oMUpvWvEQCTKKIqcmHeuooyrG/P+hDsET7z9Z6tQfcWneJPZPD+hPf6lyKyGPi4sFKvPJSs2aGpBIQ9JaEFFtKQ4QMm9j2O+Azta1AlrJEeAE7D2zi6F5/v85wRrV2TiJDnC7NyPvr9ioDVHdPwfDtj3FJu7iy3kozipSxiGbK09RpcwOe/eLlMlstWHzyjeyJ/SQqCPrL3afgnkdRkx4u4DG7JlQglToa0TkZp7IPwTb+DEQ4YAFTBZ6CyNvqvbBG8fpBIrW+2JhqBA4/FWS08H6ooLBxzJSXKSJZ/MMC9z8eCWF8BCmpUhQF5DUPK7OQpoWsfCSoPlFQqQtgSqgdGuWTO7/DAzcGjqO+NQThCl0ocffs3F0q086gUaPMgZPmrMHZoSQ/Gk46wTTJ4S4yQgIWbOs4e7OmrBGUqTXTAXqOFtTqczjkLWWQZRLtcLgFHEAkWn3TkBAgxsGovukg4Eg+Sau37f6d4rhfVk26hURurNhnEusxGCBflrKPhyxJE7+YHQMbQBH0YF9ZAWNbRX2rILHV88bBKmsmOOFPcErKliFDYdb5hcf2HBIalWfVFQepSY0XByujQcersMTaPCHBUWE+ii44a5ElSgJTpjeKCyX10Gxz2058c1P+hK9HIXZN5v7pMgmsPNowFeuUYcGro/xXv9KcdKb6MOR15LB8Jp+UanSNM7sylJNMDgMwTLVy8RTxfXZmjVgg+2BgMN/bjJbWGIx3B0z4jsBsYwiA/LEZ23FiekgiiVVJp4Pr4LQV4NE5XfRcSP7hqZ+dl6gHPTjraDFQYvCk+OGuZlhJophGfSNNipDym5WepOVB/OfpsRUUoe2WumPKckcnVNoVwyvnBiBBmekRm5xyBdCF/sJ6/8xSVFmvddfflGV4i6YEub095eVEg0Lp9Qxrs811JtcY+YhwCe4WGXb4JefBQCQEv7NoAsM5Bijwa75I4CVjZr0lDQOFMmqDc4HUosqXIPhZCOO6wcXWzMbWuhOcqb/osSubnpohfa7fDxfj9spzoha7ZayyKFcQRN8EtwTdcv/JsX6nlPHxxYNoBCZhuEKznJBfaMS942dXmvKOB3EbbqHKNh1GJ9kFS2MYCEi68sqzUQr+/4LY8heY9DvbKlH/upYy0MyB7j96lw/QfHQddy2GYNC9h1xWalvYhocDaEZvFfxBqm0Pbed+yRJiCf03Os09lWqScbsR37X/S2ejHDuEl8D9j1xgLCGVUIZ2xkeuUNrYsnAzqVv7nAjEQhpIw90bBcYVgwJ7GFdkFNvoDvGaA6gqBm4cRc6+rZgDk6nOI3irhoFEokQhB0mBPgYuuO5/JUGNaMkTExPwdezfWMufWDIfAyBYEeDiwxvM8M+uxpXi8mZ493S3Yz4fj0BbFHnrAwuqYXRmELyGnbOjMtNjr5W3EkClciim0PfsVT53QWx2LTeJLVZByPBsxZY4BjsRKI3k6ni6MCM+p/JYpkQiTR2BpJCIcXKzT9JOvApVQv1Pi7TRzQ413U+GLcXws9M8XHlbbqlr1KKltTbEVdcFiJvf43+6rWVr3aDNlzo2mzHuh9ZAZquQYj3iQfO5MUMLt4zBzpZM7UzZJXpKCexnEIK8cRDrIGxRWLAsIIVL86bVlRbJZ9Ya2ItHltCUAnuUskgjKJZ/DfR4GPXS0DeT43doTtPqLUcZdNq0RvX9wdyGqzbqAsQ8W5P70+kBu+LKKThrkmqJr29LH9ggnm77W2oCn3pf8on6rldO0oJjRyrlXv57esNQ4g9RsmQdXSw1v67eNPG6nip3Rebr2AvUO77w0wte0xHWHDFm7TDFawqG/Ki2vMR6YG3ZTmb6LeGqrjbnASahruJM7o6PQCO6V4wau5K7V0lPTFPHAALsfB3Lvqnny3XgHdnin03as5acAwxx/aP0TcEDMEvlhOsBbkKFSqW2twcJiAnxveFlMqBjYRiYktnv7kNOnYPm2nODy9TGNRchGVFKRAdlIIGSgO8Jz6ha19gcsWqweXP4tu1nUdRVA1P49AdGHB53B4jlJN9SVUUQ0xuKS6QEGGvzGjC+NQ6kYMNDyEE+9xxV9Q4rM7YF4zxStkKNpiB1OhvwbTyrd8EeaHmAvDvEXh8qd6xTDu+x5w9NyIUHDKjS7Vw2yKGmUXL1zmWFyVv4YSTW+ktU1mlR7mMD0sjQz6gwwqc51NbW2ybO7nQVnLATi2fVLYDk1j/v4ZSpt4g9V+TE8Y3wAdlSmdozAopJtGDsMxGko2CmM3bHCnJoDxZY7iWrfk/rZmb5gjXZi4kzDoEKWvGu1hSrYgsjHOJbr+UtHHo8xHgj4/GSeorNfqNaQ/BhvUEW/MoqAT5OjL+iTBp1Q6axdPxmhJdXYcEr66/LTKd69/EBEiw/QqnoITyAKvnVwGf7NnQqHKYSK1XfiStTYlEsZ6NTYMBlTEkVcB/s6DFe6UExcBrDS6STCE/V7J3JB1g/yqnT+3xpl7G2Bg1akJMdtNpvCFT7NOlOZc/eaA82onrLdD+Qhuf4YznjAA+NtD80b54R5YKo4mkocRVm32KTptlnRTmhOzvRPYbrK81e3nXXN5ACpcJ7vPEhElnw+vHTT6Drx0kf6TMLy9kOGt3Zq+78dNVXlcwzNCu70z62cUDtji5taH5dzJh4hXOX5Z5U+zvNrF1xe4otL2UsC/9VzMZ0X1RvzG+D65OR8BXcFwpgrw7lLmO5RUbG66hQoXGK6TF5TgA6mhfGO6bLJ6MLRHRGIzK1xLHBsWR9mQmnn7GSoL+Ftp11PoOnLKxwenAromtrFnLefgdeLJJv+edZZ+EqS5oJ7abEvLOTgtxwhMIqO25bNVOcTEXol9Ki5R1ncWqzj/HcmWYdn1JZAt0MpPRzZ7U7jCCoRYlrEOY9oa6rweEXVdUiz83fEIsaDL+aMHIFVZMO/LNXyxCp16axOe2GIrNneddNuDfMlnnpembY+2qYRxZupWfzsBgb/zgVsBuI2rrCsy+JAwCi/1pmzrlsVw12QnKogajfJfIeVqA2lfkx5tT7zzkXtC+RdfJYuvbLXAypoyUNkuAQXGZcUg5Q8/Zu5+FSzBsOL42dO1OE+elK2emkBi002dTqc6z0xhliV6dK1jxpSlz6QxJraotCXN8QKdvX3jSMA3++ps7q5sgTsCJkr/yqH8zBXsIRiuhZ5RqnEUMfcbB+mYvUrcj34eOEIxwTFsl3BdNhOBEaYkNM0Z59qxk1CRVug2KiWhZ3T76rkwrYUr7HL0zu4dM1OXtTVW/tcE5IzH0J3IIvHFIB1ClJxB2oXLgpaJD1Cb8eqY6wfKOx2TPXp4KBR4Ez9KIlp/0nnOJzzmIMLEkICJzlMz4Pm0TlYyW1AO2zvAOdciVb+NuHq5L5e57eFwsfr1vK7ABLB42WKDFjXV0QS7/15wvLNuf2tzkfyH8TEF1wEj/N4kdpo+clHdwtINEGo3+KlC2rtNov/2yegNWzrNksCXGvZ87d+zUq5XKlW31njI6GKwnHVf8QRNa/SifBynRT2duXDq2LOvvJm3ewrjBcCP2VxWa43sEZ+h1zH/7nITtyRNfVe+nQpK/Sb1OWAPKXsrIaoFGRasP/TdEi/QjwGGIAKHyI2R52rQbE6PYp1dR6XFW4ngEsjfZUI3/qYKN0aL6vIp0SUp/4JZT7D4q73QUKTWinXtkSPrCBPxlqyY2ldXcA1k0ibuIh0IKvvyxPNXKsuIl4jx9FpaUyYDzUU/gaAQjAWaWBXVR9O6GKePyuWMvZ6UYrHTuISak4yJe9Pw5L6JtUU8QdHBtJibM0S8cr6L34M5xhkOMO3W+hL/Si8OWXAXng+gG7A40v1AjsxTIP5LiAOMkTRv4q5kzptQ2m0FuGG0V2e2WsN9TB4eKkwNGPdKyWEUIobGw6XCnssKoJC5vABVljIHZBS4uIaJGzzZQ9hC5YBIj9df17S4n+Eb8832lrdl1QA9cZOcP1Kc57o8MsciKIjfh+/xTbLq2ncWFcUbzO8IkPB7WX+9vMTW+lUyC7OPokajLuBcEbqq8XU2rgbxXWf2ReT+pl6PJ7S9eDT0WDEKRCKwWNXFdj8gtE9HdHBgJy0ubvsCFmjlEEyMu8MLhudbUyFgm7TZIpL/YZPkrRdKctGNVYziUeQsRdYnuRbutxqeWTW/2jnoHOuSHztofYh+f5S7Rt91OMNRRMJ+LOw/7JqdfDC3ZvG5k7q8fl/dPnRZSINunis54Xu/wibrMZz9AITVxPT40wAZSuDuzlk/ZJjj2UnBeAicqXecTl+z+u4WKRZ0MKSPvNcg5smAdURqBfbHLwbP/lYWZCpEau1N2Jq1DarpLOJCem3tX3Uzp1Ny/p5oUXJYTHFMQ2bwnwETCVpaxCyPTGXAd5Cp1H4yZ+J4dT2KcL+GvdzT/Ay3sNlesRV0ho15dj4wzc33VeW4fgd9FOGrcPLRAzDC5ABUEslHUhW3YGV/waUuk0t0xLsPswUPiPRc0c0tDosi1GR/teQeAYawmMcbD8mjAxtkJx4eY8+KFPRdz28tB0cfdv+mwflNVktidyHrbwqOtpWP9QtphOF1rZnD9/4xHFGpTYENMBQ39sw3cgxiMW0K7FCLzi+JljCaEOiug7s4vcCuWLpvl1lPj08sl1MfrNb/f0VVEVajUKuhhBKXslv52Gh2BLh/iFZ+/U7z1A84c0uU+4KrQgQeBpPOFWL7M4v7Q/cvbBa8VtlW55aQr5uR6Gog+LT6IfYljFhXucM29nyrXVwsWeykThFGnFZrLaP/vBrkwNOvDiOhx/suh6gVstO7igwltY2JwdpXKcE2+vtj1wwQeqI83irBwLt+MNEVvxDBMuafBMdBC8z7EqYSps0tlb+LrLiWGop/9xJcd41oynn7ocHrIgTXeZfggr4/QGmAXZ1xf7Z1rTvyTuWM8DJQqnH3RV/U+9EgcN5D/HEfbvUc9gsmawVNFMWaFjhSUEckljCX+hFybizVa9nQrsFdyM73ViRMN+JxdWI3eAkVbGPwM8sBelf2IeGp5a9uVyNlpnMpW4avTdYcSjNwIR2zyD7ItfQAzI65gVZTvHCVC4TOMI2hR82OnUmsuWml0lCI459MZER7tGfzQNcJswtDmj8idh2TLJTzM6OvFIhjMr+S2Z9/ahD8k2hAz6c3AyIksozlA8ecUzVJgNg3c+XfAg7yOZ4iDONC9SywIYOP58OCXw9xlhsaAB1rha0hnOAY0YTta1ow/aIMScXWSHwhxki2f0FW6LsK4g1m86WyqqRzlhnPHiHM/WlfOPjmkxt9sGooVEZnZmL8QoAvR25HD1dikFwCA6mgGH7q4JbyFY6PvAU2SyzGCewLPferJIZ/OIeGtgBtM0gGF58wwCGrohZYvi+BCuVmPxG6cMIbwKlbdwYduMpIx7ADJhEKDQ4PRWxoC8cN3oZWDCIWVQqRsm8gS4n1kWYN2BIEUQfs+axN/yr3KMG7t3kY+Ofv43/RT6ubPECMx7/6frAQxrNm+x7JfRCOf+fIWDAdcTrAz4jZptibg2xIgVXcS5GI1NGjNpItyQolZZ5eUlXdvQ9/u8bfRvK9BsAkkULZjDZ0XsZEU2B1JeFOm0P817OGUd+fbbdVx2oX0dG747ztK7lnip1gnsQ4+u8XJabEAWUS9jfl1g0vz6ziYAl9CVkR+koCmKoWFl7I6BhScy7IuytwmotYRhJ9e0qw+MZz8BLAIChoLaRqAn13fqMzcyoWGUyp3aBsoWi7XEn6IrBkQfhIulHp8IfjUADBjFIUnsfcyiPH99CXceIrI621tzCxl9BDfPJPetIGh067WOVDMzrMSK7qwPSzja3TdvJE0kWHvjg3A4HOjAMbwvmbnT4/JgOyd9KJ0cmmRb/iT5TZU1VY9AFfzy65QzEiV+AuASIBXqDh4pI1H2BkUa4o16/2TwR79rC1ax+szhT8Nf0TYA7TNpJye+D0xLzgDCi0BP1sZrlcTpmXK98OqRNzxklOF3lTWioFmH7qE8FE141BJnq9qWJ2j8VuqfPd6mg9OA8fZxGzmowV+a5K4Ke8L6jIxxdjJfIhoXcUXBLT+jAke1A4Cd7882HpalXwkoPXM3W7du/jTNieoiTtpLZpmg5cpWDEGLOywQdZXsu3f+9B4ADKss1pZe502xzK2RkskjFr0bFrIdE5rkEpOsFM9shvmYXbK9XECt+WKSk6clRiXokKtgniKZYR9qt4dwdfp6fnrmQ+MQRCShDM1fgwvDxPHWwrDaLAv3JButlWWFzAby3AAr/iT9Wxt9RzYRU8omZ7B2F+G5/Mhtb4TQEXjkjFFyaS+y/qnu/C5KmloyOZ9RP9ZYhrW/rR50v9MXh2zRuvHN9FnuE6ls285Yw+GbKiyJegrFkGJ8rT22JT/VFWgp0OL0QGqKM3IF1oe9ZCcVc1lc5Iwg9uZBM8mDoBYXUf1qbLToG0qkZlT6rwrMPKhB8WoNz6mL7wYPx+a2SGBPHwJxMrZi5KksqT0VOyWh+D4A4prP4Wt6KQr+wGKsmc2BFRuJugxJTBbNfvwxWY+nSL9e4vajodgKx9zCyxsQZjyws5o1VaNg7A51v/8R64nfScj35qp6BsSL28DFqiGRfLELy9nNYngWLKxihGxS5iYHKVohjf/Fa3UREULmkGzfW7JAfBjghIflXeBhcqUEpSknv3bPVUPG22nm4JYIR9o1VVR5wpPKaN3cl0EqfyJsTKyk0Qwi/qMxk9RDKLKNiYlK6Y/YAz0NxeUCR93mQSky6ezIuyfsA/kNI0ZzwpXnMjh0e3+iEXhZBvnhciItfRXh4SW9JmZNxBwbGs4asUXgIRh5aHZIz8+IbKrgjMT6spRpdbBsxMDlnHhwm1dWhAoIWXexv+Dhk3otL/WHIPNxO8Rc+zK9d92Nw7Ap/pWpIx+T7sWXxlcTFSFVwJ3CFMBpdR69QKSNvAWPB03dIfSLxk/YXcGefEPFctgSd4uLNjxxrfm87wVSRhSFkhvzwLELUAFv4jNzKMpddWswHaLwn08feOEXUizZsP9KWkxCf79z6VhK7WmEhqMvcNvOcBcBrqIty6pBizHvKVp8gRgV2t57d2loFHYOnjwXrmIlxXjwtb911Bsay0C5BxB3dIynVdGX2Mr40hnjFj+pxkElpCrj6HPDJ8rQ0Jm6UX8tTPG2Lg33wHeoQ13E4YTE86pvswcP78AmEhbtL+KJLrpfECjkgV9fOoukbSavpuyuK2e1KkJ7VEkhYDLAMK0Meqjm5csDqNj5O3WMW6dZTYoFObKXRJwYKR86sAyFjARCKALu4PinDbwfZkhXcGvAHXgSYYT8pkHY0IxPPUb0HAZmH3/sguyqPcKndKLuA4yxqMY7qwnb0RgZB0Ixf3wvOg8V75BtsT6d2etD/OqEy7Kb9c+L7E4sS71E2AXtpXPi/EU0U59SyGycnTBW4UtMagLC3TOUiQEZefrE6weI1cs/LaBFmsABC1hsLOUic0GwclPNyIG3BSpNAVuszp8FXM0P75/UqFxShpeL+6OQj9UBMz0pWiB0nWxB1SOHC0PV6F79gnPOr3TFwP19lVV4OgCq6ZdV7c+HZGXH4Ma8K1g6bPT/D5sJCCdHKhWDxy4LiWpJx//olJXr+1JGgPBFzmjBKdT50c+tqE+xHNHR+t3UKWvaF9Nw0EfvRZXYJoKaBaFRBpAHgueqGNKsdCE5h7d3ezYuOLamvLSbX+o5zEuRXFZzq3rqQNnSc9B7fdThLbagfrRNFLadDgS4niBQB6y+M28RYTKLnMEOE9uIzeBrWmJ+fVzaP4jmMlatjtSl+MnW/dFGlyaPmaN1JzpzOd6cRT54bLEH8aqvtcQde7q+vW+hJvf5sUOPBatZxXHQqUF3lKw3qVgLkj9+9HWRkpiKQVuKRLrYIsxCNXUulNIvBAXgl4GvOPedeHZW+4svtFUme1UJu8Abd7wtgO2BJCF8O6gjA45XG7F1h3aaDROjYdqF8ETsaL8v+WudG+ki0zRdVXGtEBzK0K+7aZDHsoH5fBWUXmi5lgzN/sG9yFrprouNHeh66Y50sW6RzFWNZDe4/b4/NrR1M0Qms5EiFSwoR9lIjrlBylS6IoCBj2eeOAX1i0t4fBeXx/+nd5RNFUmklNWjhY3eZfwJKGDEWLMMybQ38wFEa/hyoGxCNM2VlP90Fy62vxkLIOuaxyXWLPv+ufR6CQYFoA8mohLS17udmiDKEVaiFzjVuDUi+pEgn9KjhJtVIHYzQ88dSGQPORwpcHZ25+f1edRHEkYU3UPzDxj+y53rL+/PbJSX4ATp9WvYoZvmQoRcSjHAXEFDUZOYZxrvH1Z6Ojidr71HTJJoAaXzwaw4ZZS4/YXbmDu756AccvkOQJohc2R6Hc/sns31VCRbEaetXJHag5Y6NmI0cXX2KIRp7iGq4sJsCqUqP3LRniAQCrLPbPXg8aGwB33bzyTqNXkkA5DxzqyFyGkEE1ADNa2bPBsHmVquZUqGzYBRar1Bx42MlSvHW8xGxS639e66xFCEhsPTV3GgE0J8Mjt98ObOKhRjfWO6Y9H1/+4zcsKClq/r0q/xC2kBwHe/7NNj2P3zsgm+9t1VKC55z5R0kPn1wwsYBfmp3rpeXxOv7cIcR7GU4DUlkIAAsqGqYlQVuZpjF7tJ2cqO+NA3oD9WMHIh6MC439iHjNGX8g3pzy5fLch8v64jZqok44SXIZVhUGzSFedYdf490kUknCxka+fUvNeux4ee+G+kPJMqEdLBDt7yCXGTOfNdR7fFUQzf1Ymoie0ZJEDhrZcMm4zUZdyn0QzGLxRDTN4pOqKuw1r0k0zLvRZPFqEbe2p6tfzyujpH3RhYFouf9MArPT95ZTOtE02fzORD6u0A31b5/tc5YIwMvRD1cSA3FqaQe8gMAKtfFdF1mKd742TFk6vOz74llrNHYq3M2MBRuqmslKWVnSeIqyB0HGQn6h9ROUA3Ah/6BhetqulbAZOxj7f+12kNvT/ptVbuK7Nhe1J7w56kX7oubF8CDuhzJKfsFeLBGJY1w9K+HHEXA2+YY8dOP9QOjkQxTnfPfa5l8JAQ16xNPuaf/kNBiWoj1euORR5MGFeUo7tjARvyv9fjTUYoV5q4FMQPxvIshoeks8yItGy7MTLGOxQ0NtvbeE6tQRcFfVTpszbT0SYiz/jXKaNC2J/Lw6qtXq7HVPm1AbFYRBWB3vB5gmTOkL36Cp4K3i6yar4WXc+7DGBKAYrZNC2e4Qnw/yjzOvL0NsTcdyeZ/dsxIZfkDIl0UbQRO3MRfIVXRAn3Qs+OW7ugent4ZqH4ipSSD6S+Xm5jvMtuzw1Xop9meTQk6ZLQYfIs9cq06XA26JqHZEbGlG9iCgLUVsbyfYJjvsqzDN6HEdE5WkbcbMU5tU9PjjHb0ab39nyrhfLi4PV9Hu2WEpAuDcTNjEzhOkCsgtb6fdFiohm5kFjVJucVrv9eiRJ9HIDHeYxhsDWSoFw06TOe5CPioabP0wtTQvF1kS+6CD6A60Qa8MaNpMQ0DekqLyQtLlMwV/cnEO7fESlwdO/uXZjmDiKaQF/qzXZFzeoWq0+PwUgJDvOcdTnZEve62V1YzYp9in6QIeSIRitabxVYu3PKJNiLhoRaZBxEWFMzLi88iHj4k7QbQE9pSmHb8flLeRRLGDcBZXFB7B8DYk85RXmMcIxfb2WGxXOQPVIBWR7iydZ08lPwE/iay0A6BVmdrtuTBzCpEyLoYrRWY7GrzheVBd62XE3DC/Mdo0gxffs806Npy4t7r7YzP/1E9iF1G/FcV/IZJ9h1guhUjbsmg7KoDcfy1mYQfVB7moX6JFxjQ/MiLqnZ3tI4eq7uX8bX7j3sxChLACpBXZc1RH7df/NWCPeyEm425kgzXu8GZAiXPe2Q86sNdJd7/xJit3nJVdJElVTf0iBsatbbkKCgKJQZPsHCUPa6vc1myhAGLlJhdwgloyXS+LQeQ/MutLkAFuAwDtuipQ5Lwho4HMEPNvdtzc79ikewExq4C6Ljud9PTdyLrczkDH4GXpLjEF6qmD7d/kzeisjH54F2y5hnu4zBf3+r+fDCzjZmETCb+rwBg+DgpGRrk4bJteeQ3l6op7iUoovu43go7LM5m7LEQvWyYbG+V0/zqI8PE3TreR7+gMChYRxqxHiRDLrPPHa5qJ9SeK9L5CEjqJrTfX4FuS74gMiDaUpSRheh0SmD6/tpG3VU6q4o8KFtqTuK13xFqObXPMDNe3PwJtUUfKg8JBSwD4e9Rj/03xLQP9fDqvuYbmkh1rfCesx7MKASbXRYkQ0hgfF9eZnsgVUI6TGoGKTPJrVh8SD07A8VMKVvCVTndyXfEBkQcJkjkJbMGVteudrthLGfD2pfxpqEvSbUlePtBJeAQci2ZmVvJz3klASr+IHW4v1LI8twWUJ7d9o0p8ciPqUoAiCA/onHgt5+g80wb2G9amw6CwXxpJNN+K9UYaTf4O88GSbPPj/pALph+oC4EI1S3xg3Mbq5jkIVvdYyvcXeIDilI9JG4gySFT0Dq1B/D2jthVm+HBofZFirnC5JgwtHsMVGPwAaKnbsPLKENDH6Wjqx+bnv4GAsk87qa8naaYjeaEvj8wiRBZqr55A/bT0lvXi2VeLzyrOWsMJrAN7aMqCTaTJhbdlvtBCCHOH4gGLcDt3hD+JxsH3Flg2v+RNFMAj0AGHPqf8891KNGMGcsznN8pvXjkzok0/DGKgKQ3KJ30i89DCPlLzmkbMPCxuJTuMPXN8p8gZMRdjHG7xW8eid3T/0sNFD0M5AY/xNEneDruRMzZ28PQcgvqxgdwZ5mQv3cZg1+zFiCnUFSWTWDQMAoTJrTeL/l3UsbcB4aiqYjWNyBQRy80Id2UAY4s3NuaQnfX4ph7AqMwDwr6FcKq5fg4uYajNrma7yam26ZsdUAUM+ZZu/1ndbTReBCyNw47bzxMsqtHNxCM4v9V8FYJ8+epQ1aYzjorahz8EloUzYS70T0V8buoNCkXER3m/REfuFMTlRMpzM3SJXaMd1BRE0+XUQzyix96AAPZSe/eeDxhRS2u3/57rbp0wNYDcfeRu8no8s5CBtg7UXhcF2Fs7Wjup+QUhRscqnu38GEAR3TYmquq5LHyrPeQzQ1BEFW9cprGkDhRp5g2KqJDzwWLQdmHy6c0KWJN5xhO+N1lyKUW4ll7M8ZuCSeS447+HuQ1Uh1hKXiu+XNDwcm06mVXIeyCE9QPLE8IdGixp2qdoCtnznRqHuQ4KhJ+8bsjr5P0As9snB6YOPSIkT6hwmoeGlg4b3HMlhhfMUnDtLkO8hTSgvyNgB3BYEk4ClKkkMLQv+V5Lo1zNmIQlnbZxV+SwZFgmVHK+3UwhlT2B9fKaP/shHf6uq38A4hSJi7wrMlNWAArriAwe8QS6AMoBdTXEiHZFjumdWJHXRfHDASdkI1vkwSf0i5If9Pog5aBL24Vl3LSgnIxyfHC/Obhwfi5jzEC29tYt91fgiA2ZHzq8ngmBd2Qni1QzCU7E6/WX7Vrm1QLIWuTyAB6MUeG7xX390Z+D7l7jCphWZL9+ogDXGlQU3OQY5LyC5ITvpEq+48FM9+APueLSSkQ0Hoq2CXfP37KkJoQErdt1k/LWXxigRcNQwpFn+yufUYyOhG7Jp1JGGyZPAaPF0pL8cJbC+p9bMOWtK+d3Itc1HDBzUxe12AdKbNATH0YuUVH7UPDSRmnhMHvxCIvN0LO18JNTqzgp6JQBlDc0IxHZotTJfTQHnHle/3nrdLpmaOpKgzfn8NwHZsGwOKdz01DRvaDVMvl0rGLwgOQP1wce4HLb6zwUGflMFY2uUreO7MI+U1va7u8PRNspAOLHs/vlnxM4vc50PpRrZe+J8mf3XUZ777senILJudTogN3lgciM1QAqsyiUvkOybVHPvNtGql0uyUqO9fsEgOHWYLNmSvMG9lxbi36QOPEiQtkv1J804S6JK/o+Prck6cTHyNz+/HMyeQtURolmPraY01WWjE9jVU7TA3SmsoR3Wi2BKcu4dSEfQlJLrZoA7JdnBQ/nKoA5ErKj3AJdBjI8NZsbDDjgdL1gLn7w/5yEjs1RrUKfDV/kLYeBYwET3zqqodm+9f+/3iOvSaXbfi/8MUG9m5WuDKhaBPEMLuLL0wP5f3NYOeqHrY7/4bztxelivuRcGed0qfInpukCBuwE5Lyy+9KVFYQTLOkU8UVQoPUBigAnU8OMWIHJHLTTd+sxFuiQv+DJtI6LNkxzwaflUH2aRNeJ1CqHj4YTYaJFD7AgxDGo7CdJC7zehICtTTVnh+pJXl5fQausNdMRS8CiiU2XWkGbLMipHkNkGBf134+HR1Ee8MuB+p71G/wQtmfrM5Lu2RS7MkZ8OfxT8YfDLZv0jUP+dnXiF7s/zfZoKvLfLG6Ju8DyhA049AdnSSI8A7XB604u2GVPvjprm1vgESCwFqJUQM5OcqZBM/IZj+YeoVUBXwgS8hnKrGH6caXwSqOreB5QmGhQFpvC3PE0Bjys5s5DQAXdd/4RV/tfA/j0V4hYtpIcwTfRZZjl7G8n0SrQK1+k3XFE4Oi8jLUSiEPOunGYyXe2grkkzoOHUlTfpVGfq/b26scgtU/y3Xkc00PHed1XqnNgPzOmMXT+M+o2U8EbjvjYV7T6JxgSw+Y4YR+RynBvB1XzfW1NsECBPp2la+WW5F9x1p9EspC9PoMztKRy/xzdbKgmPh2WtK1DJ6rNS1V39EKQyQAxJEwhf1Ga0xMvLdeYEBWjrSj5el87iRXd8veENyu3zs+AyjTsiY/6Xj7A/5BYPKzS8pXnGHpXUThbut68Rg9bQHVwK2ly4d0a8DSnQ8cKuMmvOt4xm6SWM751dws54n1ObAsKrwP+qM8QRG4ue0DsQr+WUdb25vCFyAdLIDoAzHOjBuZVfk5azkP2UjcH97O7owK4NPyqD602TUI3i00ysBc8SH/DoZ8DXppWIaIJyeGZ59Gf5QS3ymhbzA10/mAPAtyH2K4zbuTpiPMSokn30np4ibUcfhLSrbvhJLkslgbylN7Agfa2Wsyy6i0kEQZT4sOX0oyrpDuusIrNz+DrLBygt/TqFYNlXmcpsdQGftfm1IfRFM0vvD4RdbyP6KP0rVmIj9IwclNW5g+FIAXRm+TCAosTnkN7p/v5FonQqibjtDWzv2Sq+9Ms7hd98cxDiw1uI8Ma6bR9t0WYJS/PuYpPufyBSiZlQ8ghZ5iEiIHSMYupRvBmyo1/y/4YeytDLk0BKojETtlc9tV8xx+33FJ5WJHuZcARC25D0r5k96cjx3ccG02l28ecml3nliWy1YHygI3IAIsnrqnHGWqOeRUoRZ6qmZKNQ/AOlJ63uLe7KbXuTBXXNxyKYogF+j9B+ktB6Zu38Qsg4tCYoSIdNuXwJFxbbXKAoSoN0pg1hzfCG8NPARqXZrITWESvm3kf/r/rkckuISDDT3rOCAewi3vIMvBJRL3PsXUAzVtRfsAqTh7LT8fNcr9lnmT/HXuVXJb0K3ck1ulOWmise6ptW9OHxU04m+YmI6Qw16LKoostMkQqRzWLnZ+jhdcrY4WLPRfCwAAR2I88OnZ5DesRai1hD0y/A9/DtDZujY4ZVQE1eQLXL87Wj3hzUzAiFERAPEgxebpHI5dGCuf7N+UpqVIhR888piXnL3cMqGY4qX68V16LJBOQKwNfoX0QC2wo7O3Ty+9WkiMvMiruJ1HWGUivaqIH1GgYZu5VNDj1t2DKo1WJGGEtq/eUKxiOhelXemvL1DFG6Q95Haj9pd9qIpqVoYWhF/aNS08YaSIZdmbo/a/CZ39uWm0OV2la/0vJQMoK1aYnIKuqkVdMYYRtfihedD423GBKkcKDDM8Fd3TxlgWzVPEVnEddwFj4DJ97p6tBFpM4xtLjy1bETw4CY+8BhrM4oXe4t6/Ri3afcQscZ3C/5f5o7HBqyEIu5j+mMPD+Gwo/nFU8z7DulqnTl6R+SJVOvWG3c0FuEf1mjP9aowaGx7dZ2VIUfBZZCvwamqlX9QTExHsNOlUn1RchkZ2it2HVmjC5bfN8cuLeEanBKNoD48bFwqO7WwskFQcFFUcP88axuIyCIFfCZl6hJZ6Kn9l1zNAf/l8QxT4S/dcGrDWDJRq1fT815++Osxwct80tgj9oYZCbyKV9S1t2f1DeFIqsa8YZdsN//WXyquXwoOgsARUqwLyOrfWOL5e6byMRfCtD9Hossvx6iH4wNNk93tj04TsxNE8S3KxVUzjZJyGH4rvh6a61tfQqukHd2H5pImzn3QnEbFOUuZ6DrlBTNHO7iLih4k/DgE6oiUWQAZrY5h7N6zB8hDOxmntGGziiD7xpeF2GpceFOB0JOJBAV2AEgWDZwZc6WbYiRYNrqHK2ibzZK9XLls3cfegcz2OyeMD063BW3pIYieArv9ulSRn0aVSVlK62ZFh4zrFICukFZ1yh6/iBbD7h0cnm6krOKajAu2mj7h6vrgFWC32lPTczNx4++nyJ0ND61FeKDjQR22Gp2OsmRbRapRJAv2ViZc/5GjPu3MaF+EitnJarex9tKTsAzIq7hyavMm9E1kbtNeqoXufqEnA9RD0ZvOiOTACRN69HdBEdsIHjhaFSJVEJfquxesjy/a466jbzgy2/hLe3f7j8oa94Dh3fbJPvuSXeKJGCuxAMfbEQdKZVa/TqKYPvrXBo8PQBzr1DQimP0L8fV18CatW5zAEsbWvi5/q4cvldpjFauyLWb4alDP3dbtFTH9MB/tKaCwFMBXoLOPOSluAx0W1WkzHVM8K2DstCDFlLkc5SRbwi15SNkBvUx0fGI/+I9gB5R9ztN+wDyahB3MRMqU6Sa2kBNWmDAHYA5CBTc6DX29aQdlzYBWr34VuYFuHa0KMlWPjsA8my1HWX1kIFp2RasOSnwfVTqII3IEWejAhjAAQ8FGAB/YZCopPXsaVp8xTBOUuzVOaGOtSJZnRGyyJ256eBxMs76yumBZO4YCwGCmKdKQejdQlLSyl57u/8g+yNyAXYBq4buFe8irTcVgFRhqwY8WfjYtZuUgxwzAChf8BZ+NRtOPFiJP+B3rc+FNssNKhvcP/BUbdV/U8/0LwPKIQgDZDhIcEL7NE3Njm099lpjIcfpOgedzDKHWt1nOA3iDBxAFqdXI7Fcl9Cp0Yrll4QfflJbHLNVOvSXHtgG9BfjdzPxfIBVihEo0rNRmjO/t4AL/pMq4iP7I4dIwoS53lYAIiFqFy6X7qPKtsHggpEpTe6huwbV3mFMrzQs7M0wa1gcAMeDM2Q3T6R5xFu2NNya+FJ3nfYCr1Mt0ZiEBW5WQKBYUOmY7a7BVzg5QbGr4UQC+1ZuRizBQFvLr75BE0i/m8/7OL3Kv/gVm3JPXinMAYfSwlfI6p/jcm7BfBPSWu0wfSkILzwkwTGI4eNDfrn+d7wj5qKf/Up7NRHcEHT9BueRfquSVKW0ORLELaQ7I1wH+VJyCcCKD+6ilOb3ULHfymzRetmUEfRsvXFo83HXFNuDRjtuy0MMBiIk+rYymg482HeS42ILXDswK3RizNVjyCUvpmWBE4JYab6eBgXzMFzsEBA5kuOJCdyzjlCmDXTp8dM5mdQ/dq8g7tSg4H+m1kMnLqdimaXyrCj1/9dIQ9j6armNmEa60U/+tCbG/T04OWc+Z1Wd+9azH32xOt++hINaPqjGZkHJw9CsZB54/SewE9jVfBuu5BbdpwFUuUl+EwUVt91ZUU3hqVYBc5jPNDV+AIo5C5yLVulrp/9pnfAZjctW84OgQom6xPHsj8miEy48HBiTkSSVWyrHvgop2NKPphqMBZaiEYwq3t2tOYz7Sf94V9AKXWPB/vYItdBiokv7pMGGcNF7FNeecL2V1BvpRG5OapDN8o4xnciDCmKSnf547y6XqoU7Q+LpqH2a6F6xDxQBEBHQ2oIfCYp3MGh0ry1mAuLTm1DMFl1YxlHcx80z1U/M3aZZ1MfXq5GWMB5yOyY0tHaCOKSpM/gnjx5VgenMciJSBxeFBBo4lFR7NFVT6710T7Z+U8Vcbn2Vo7sgPapGweQ1zMeFm3PGrksOHb7anmLp2Ujj81T6s4ThJDSA/7aStiJ4W4TuWpW1NNoZXBGqjBAd8SSmY9JHbLgp+Yktdc4Zf7DTFkTIssAXWAUnCMsMEl2F2Zzu2t7cK8PIrkWmoXg9TWd6jqAnHx2mdTBobYchU2S9tLNXmY8+au/r8Ztw28G3ckB8O0DGR1MoXeM0EAr4Yba4luBQriRb6tpzt281QUK/5aaRZps0kFjoLtzu67MrvV3pEGCk4y61lAzp2st8PbdWjJpOUYRj3csEMS6dxNtknCM2n7VZVxUKP5CLdSQTRR5MZcCtmEQk70qF7ubU8J0jHW/KQ4AK/8ghA0M4ZhYXc3YAhQ6kHDJi3p9P97wH0JuHQ5TyHrOzMiSifgLqf33/je6/bMJpiyWpgaPi5pKtIzmBKuKpvbKUf6U/g7RovHMeK6UG7zu+y4Hw0SqNVIXym2QCP046WmiGAt5wuZh5a1Utjd9pQRAHg6K5tdyNSygFr9P7cE22dAIBpc9vENpT8jQcfAr9vDIdrmBq3OF0Lc/4uJ06B/847oxeAKKr92hUBIbQ1l3qcZWtPS6IyxSG66b8GhIiN3zDhwt03vCuN0HA1wsw0rUeNPSMNy2Dj56iMYPqF24KB28H88ZDEl+32mt6Ww2UqQe0yLgfKVdBU4ftPAjfQWu3wJtiXhL2sXvgLPJL2mXbfvCwWnSmOrShxh/LwS2XLmbXeFr+bd5DxBUqT1NBiuKQSIpM5R64ZdH+DwQeK4rFfbvp+4u4lvngfekjjBvNQCFMloY+v+TzrligS0GWEfR7NHW3b1bg9S6yMfPdthAM0T6eijzhVDJXyNZgiOAWbybPdmip3ovIo8ntIS9RDS22UjKZOW1TZZ2w1WjxJh3TS79eiT+rgLpOqtM0f4Gg3PID0gXQn6epEIhFhbn5FxTIOG5nzOu9TKoYq3Jso9i5gfuPD1XNuFGCfs9wwEmTujTdFRsBLlHnqKLjaPkcUiJHX4Jq/JYh0A3GK4TpZeJO2/FcKSCq/Epy6MhY+jorhDFrpS5VMWjWGJv0JaB+XX/CxE5v7/VLWRhCPXz2ga/k9U3H6k+Q2/sKzWPmEsZ9YU5DiZZEfmzMk7fL6BHDbXFEEU5w8sdoLkLgUtIouxaPELhFgsI9Zo+psJz4dAoSrAyeQi1yE3Im8tMnji7lyUHOoLAd4/2NhhBlUgzAjHjbtHQAC+lMVepbFOIrF3HpyKl2+c3Vqibx9kz169HPyESwxOnRKwX8QUnqDac4bR1PjhdCottLtBb36Xr4919aV/gBDpyYgkPfSt5qfCWdcrUPZX0m55EBLeZ93dhbEJPOJ1urJu7ErfQsW7r9AwAVGkMKAs2PFK/HwsNFKT629DlY0ttTV/A3tQYkYF+5h4tXhro5kUOKpCx71h6njO/eXJpzc/PorbHZFjO6NK57lOsbDUxsJ30yu8jznx9dNbKpomj8GJNG2QkHId207PM3t8NoL6MKWatxirST6CnZ7IlXhpOcMyL1hvxuLUChBMOUESDJGyQYEQNGItpdAd2Anchsk1rjIuNkJtm3zeTxyWMh8/wtdK/s8AMP7HxABUzz1jZLXXQRoRC/fES8cHRVBdiW2GXlyQ2QZPJem/ZS3dzesbpb4+Yov1LrUTUpkJtxMjqk8q/SL0E79V6NS+RJf9fRLelF2DQ5Pbh5L7FaIbxq2pSw7ojAS7AtzHr3n0hbJSFHZ1Z4rL/D8jh6WCZtxdEYiXuyVUa7dfa7oUTc7vMMytfTMUKW/Ghs3PxCEyDU+KFnUlENj3okI/9Hp8ARcElJZQiHhz+sAH5VjfLVLUM+5kLrXPjr4z38Uhf0tiCg8ONKjzgrYQaZ+g097XAUXZPnWpgHvHD62EeFFUoGiqR+S0QB9s9gXmfgDAFyoaH2rNBTPTSXY266MvIrH05ibxhNBTOzU+PAY9TLUaItqnw9O0q23yClaxWHFXy4ImTs9CjzaF7mag8HvsYyCwQ6Zi1ZMpVqNeIaJY1jTGIBAivGvLG19iO1NZBOy0S8d7DnLsnS6HCqMlblSXu/byMY1Ket+QwGVSs556eBiyTKAEmzt02Z9p4oc0SoMBl8ui0XbwajyYgCqY0qH5nmiAcYynAAEGHKmpDny03UFwY+g7uIk/bIJl3ggpN0qFFYtSQRtqqY5FIXnCeQlcokX/Sp/Cx4nqdpLkYSNJlhllgh7L45PpCGLjUWIc2pFDSUI18thWzqz/NJL22B5e3uffyPKzYbgYH5f89AbWIV/6Vv4C0lrbe6sJMFthB/ETDqaFso1r0dUPOIPyMJckrUyeoZgldytb7TT3WACLnsO90K1lSiXYwIy7YrRvoBrYXefMxrPZs2hmYBPt9w0AGYAx8hP+Ank41rfcYaTde3MoJEIQ0pzBIw9vY9cB8Npzercn2kN/pXvxjdqKY2GgtR8Ux+8I0E1grl5cgQnO81F2lNKHWlLwR3TXyVSSnJyugqY+skcobgUFnpk8rPMRNZ91Gg3WHc75cQ3CsOuRTX8/dUgknXAG9URKVW1xgcLSlJShAgteDjUAu0tr06FyAL1OOfPIBGfM6Sh0inaMiIuxLdeO1I2OtnNzWdHY0hABYjrIQMcCu13HmDdP8dteoqJ+57f4BIA/wwdkThyEm1ksNb8fhOE5mgdt3oQZzIMD/0FJ4AVc5Up7ahlFvb8VnU7S/AbHzki5YcXrwkF61dWAYCx5fvH+MoUSWge3lqlPQIOcMCPPFd5e2jeeyKxJP4N0GrmR3mSDl9VwZXFrml4lOa5iX9AclIbm+v/64YGzRVKpC6yZQ5q3T9oBf0r0d7RkNA4lTpJThK+SFOE5PWakmUwyTukNcKfHgIm+8rxvDCD+7wcZatS2oT1QyEnY/kAeH7HbnYfGKcJDQ3TknbDDYwHDoS1jXOQB1YDpqFrUHHYLSj6zkD00z8HmGGiNVaFatolwkhONSSHz2clWRDSKkv+Z26bx8LgsuCDuvSolVsrgViwXqvgbDQEaOOVNDRpJK0iaF3mZYXkJ+XA6qDBdlq0KvIvXaTM/4FJ+SGdgYl8reIS6SXjeKmPf4lSw/uHAkCeV+hyRPgNlX/I9HPLugB56ShY1PNRstyEeJnGYIZw+3tbnSjkGNzY+A84ZzlEsyi+E109OczrQ7FkuS5Qfy+XlhmWgVHUag2k3wopS10shWjo7acXrbCNt0z3A1s+M+bazOyQayvrICIr3WiDnSrD7A82YYKWSFue7kT1hkntZEDu60uwcWTHvObM21uvEZfrmlHBY+/MQQ1q8dBV5Jf/1GDXN0MNH/WUZtkMNB692JTfZdP1nqe3gdS3I50cCVCbkNCk+Y1j0Dlne/Zf3pA/bIQqovD02fBwjkLwfC8Ehb7mEnFx6m+GCywSuBuw7xKNFDim99+efIquL3IoDCKeA91/JLztusKyBjDJJCgUsPmddQivYjfNNDYz9JLMeLzH4NB6dpO3bXeDVe41BB88DMH/M4Ly+tczBCx/UkafiykZ3A06B1wXd4WyHHeZbKA0yeSjN3T3woO9jYbK7gYSZ+xQSTW4Nk6qV6waqzXsdsE7ZEpcI0Ay2ayjBdjWrDeh7Qi0xBs0Ieaz3woYMNPHIGhGctFHHu0045QD4K0YEMYi7M3lgE6Ww/VaqkdV3DogGgY+Lj5wUbCCUGB1EuluysBGLL6bRtFzn6naEmEXXTR/rBdlsxfxqTiOAe5euLpla/ozq9rn4dXGPynytJUTBbtclccnIHOIgjKk16qx0ZMM3+CiK3n1Z3UTIS7iC9Ga8740Aiz7PfoUy/TZ0QRlaENvapXDrdJ6YARiqFOVNG1njgs96G9N7ik2HDSG4I8M2ZOYsrW+D+xIaLEpRWijemvtPh+ibzwsNPEneVXvF9OzeHPUJPbucpL4OAA7Tb2EfXbnqdjvjiCN0UyVD/EIEsQwjKXTPjrqNh36Yqh+9szwtgYPmYzFBpmFWSOhrD9RLsNrnYAapzQou3Mtnu267Yd9IZdDsSPklZ6YShBRup53nGKvP4gK8jyTIydlD8CiwK2bxPEqnsbkFgPDEOoFvtgSVGjrf3icDKU5BY0rAQJBLYKrHevQ/EmChDnDQjZqHhhHLdEaMhfQDwJMK6SP0mO5SGiCEwREevtgGYE32IS00BF1DOG/uBF9FIf0wO/1EIIygS9OPPaEwlHTAvXxH9IICEjQxVyve5Fa5fyiboDzwQSxhMy1ot0L1vyAQhCvm0L+RKyOuC+E6SLvJjwe0TamCMWo55ytJ9hJpJtfCv/hpZIFhYzydNNTq5cBI4RjKEtHtHfcpl/Fmh0kSfTt7nc9a/CIKRUCp6rLuLmgJfuT+ScaDqThOW1YrL/6Tjjx1P5j73FRIY4B4wptRKOj+oqlLJQppT9rIhRuxDNWycHzT5B8I8Y6kzjXbV0X2kpfYlf+g1hZrgRQ2ecPz+bXRdXkOeicqSB6ELFn4vjB5/qvVImC+7sfrzyEhHk77mpd3/mzllv+ykL9Iffbd90nNjmW6Wd8jvggHG6fFnLv+VuitxEoT5OEi0H4lydrkYXBcyh8yNFI2B1PhE1DiWG4IRDJFZs2EE5PsVzGVKxpUKn08YTiEbpJ3yNjuamR5w6LEsv4nTvJr19i7a1QadxxZyncgEmYFg1nY0Sy/RnISNnLKRdc46LvrKz0NZBfHJP5rSt42ZuNiogkf/29aHnzc2teSTTuv/YOc6G+SyxlU+czGQIOKp/BmM1Ju6odL7pT6X51Cn1CZv06qea4wDudNXoHwRL2hDO2nJA6XfR1lxen2qiDYEt5NYlSKUo2rEpspZVBIK+CNy8IqMz0v8Vk2UfioPdwp9Wbc68odb6/T+vnPJ2DViKUSHAzazHJZE0sUxz6+CL2VteTQmExmXNZrVsQTej6xjVKLi3tyQKOm0Cx+fHsPQYBuTOKKputvODKfbWrtP0DEATOKEdYzxHdOosCPmEb3FWgfTlFGhcbn9srWwurhyvc9lpytGx9wQdSZvIYLp8j/ltAqxWVpNkTiaNR4HkuXNMiXfdty+q7+PZukFuOBiFVTqBgx0BmQisEVj0jgwqbGwpktGhA7ajZisgSrV2xOHvROv3DnLm5fWRvoEHKygyaJ5Ja68qKJ31X432UewxkDItC5sGbGVP/ZJwnHug/ijvpyneJhMXG0n61X4ss80BEHmPM/XJyEzqMnP/qyGDkbxWFKp+2zO5PhgmyITcVKfYNTGJbqy+LKsLYe7ohhVLlRkk/cJftsuwxOA+hHXD7/MoC9GIL6j1bQFSMvuWmqE9L5iJzS2ou2AymjMznohvv3a3tkZwHJkiDw2+wh4CLA12TiFVWJeX77f+2FQQyKAKxfuWM0bV9APzExTbavfTVgqYUvFG+L29XdXUeaooiHwOOrSN0ZuKrY2b7FG9p5j6ge8LXnG/Pnls2aJyRqrgXh9k/7DfxWAvZ0edwwiZzdMBd9/5J5VM2i8gLGG32mboVC/7P2+6sNe9qayvNUAlEc5xBNUV9GBTFk96oMDqDPcCGkN7UmVCyS/OnwexdhPq/BVFyr/X5qv68Bhl3Qoaewf/BjlC6z9mqb+jmdZldTCblOPnWCVsSNgd23jMbQoAhmZWDSiZefgag1oQ1bxuIgp7M5PH7HZi4iUcis0HwQD9xTXpjEGVkb8hF77RvTdeMQtnr+m+XTkmx51GtCYZhQmBuY1wnU7JKjPAPnE4IA8vHf49zQYbKTk1rjJJcLXQ08vhJFkhdmy5nTO48ARckGL9IO4BAU0usZACoqm0l016TwEU+Qj7X+cX12KBht6t/UVPMd/KXkPVSwrKFZTmOFbcAPOYhgZ4M0YK/QJ8BE6kZTivt9sg8BSIhJzYsGLkaZ/4qpFUA0KAzHm6jXfZ3nDTXREx6vyE1Xb5j3EgqXD20G84j56vHVn55B1lRhRest1SCZ6mFZ3/Axe+h7nWRR0MHX63Xs+crGD5r4Ps2PMR+kNVm6O2g2QjfrLPJq+5LOVvx59oHGYvZomcS3zJqkV1v7YA93nhBsGs7CyfYpHZCrWTqqAZe2JATfe5m6rHKiBxDtoxWcIA3Sn/Dxy2Eui/P12ARFk175F+g82MC1N3bKOypIqglDKI+QuR5UnS+D0tPFVlz6kMRm4nzdLxBVK4Sxb2mMwbmjr9HyISq6NaC/8OWl+fzQqihBV0lUhXRZ0hx4kfMvnryb2tqR8xM6irhiQJOwgiC/n98apATPURNc/tD96Ds98DH3cYHqBdihFCdMuURT16rCFV22lgdR0pzxcXNUopVFAXJCNa4+RsDs6hMlb7ec8c+1uyYVNumA+43G0jtCjM/JzZqBppXpszPpDxiDANYHBr/3r8PmS5+YCV31i5GKYUej1oEQ3HvBPYUT5CrPnh7AUhgEFfWQIfnDulj4D6q7HmMZVCGMnoxa0RPQK6zjTbU/Yu8ODhVcayxS3ZIECAypHyScZCYUpp2ZEe0GzYws/DlnCz1OkIgs7glUgmh6RhR9mBTzwJkSM+OV2VFpcXti/24qe1/BRHpoB7WjejR8x1GMY38n3BIk38josZeGJUmviDJXOL1Zm4/h9Iv1sE9aMu3QCa3DVO0LG75TnJAB59XuAsZ8vwXZmvK2y0N99iqjsOVcyqE8NxVs5bzrt1Ylr7ulABIsFvnC+4QEy5I/IK94DUX8wh2aVrSx3V3EJlxCR0qPakTfBY7txizNnrL3rpuv69mhxZASbVlhedCUbrf0KapnRSKUgc3ephhXCTfE7ILDFclmoGnc8dxvESacxTkIWoTycuCzoD+MxeNLmlB8XCEDN8Jxdpg/GVqO1FVIY5TwKH3yOa2KJecqt+VOzcnKBhloVnv5l41X8UBYxgYz4xk+7qYQkMPGNk/2gTUg4fxuZhedZc9Wb9MIA5EzSw/POXk774Pf6DcXfYJyK3CRRIh2bLaLMZs9dkRKBdddV/wkeN7f51J9OFv4zOHI5DdRH86rotxkAPQxHRXIHpzTXv2N+PxmLBlE5IFAZg+Le2vxyjvpMFZP5oSvJ+B2qpHFwIWTStgcrdIFi23WSubOBHXLllDQ7mrh8Dx9kVimAG1mOR6AYu5G8bSURvg3ZfG/8DYBYXmQopYktmCCWS+qDuHIph4K9z9OGbWahflXN45prosSacX11CTugKssBylbK2FJhXdTEXHXrtK32e+iprK2VePUb2f3yMhsAT/GcO69ojTpjLXIefMCUEzDfMHDnTUdzhujYYLZb3XGl3YscOZD07smfAxmofh3q0RQ0BxuwGppXeyC/PJMKl6kvuXRweDoCo5qbt6X7y/CN1jtvUOcIOUCfPgMZlo8NS7VhQoEQ5tmAxj4A1FR2mpKIJ4BzZ35QeRXlwV7OebaEOB/YBDD9EnRnO66WKthjxXqRtVTurYwkGc+U27sB8s3rzUas9xj13xnk4zKU1J1FHH1SVWbhkHYByejjp2wNIiAR2D7T6AolueA4ke54V7nmpZbF67bX1dNWUdL8HwA7oVy0ITB01dHZuHyFjaa+GTXDG9H596v7UwRAaTVncxkBYAKcdSFwXf4JreU0E3c+JnBAVWRQSyc4k1pUFkukRR9y3pph4d1/xPV9byqJsJO3T3RFiR4TictDEkxaGNrUmpdyAOAesVKVKr5BL5V7h+Qa8tb89qqvZwl/rDnD4gcdO0kygTbWKCtVvlL1iwNJnzJ/WI+P/fEwULcaUxMYzKo9S6+5z4NXzwU8XWbQBT1VPHG7Q/72kwQBxOqV6o5s17ffT6bQuB6QdwIPVtcx9pZKjJgTMSVkMLhFLuhKbUvrZjhswSCCvF4AkDStgAkXp59SwJAUJXfVnO9ZCzy6ld1CdJDptIzsaQkBkScIzBdvJY7jV+8LFBXAExWl7HXS0rorMyfJ158FLbilPZH5mpBxM4UwRblVNTBZCCg33JoO4xqtrfcVgHaQbvPfxo8b1hCnbUBAvQAsdffN1FGJQ9cQGcbTqrJfceLSPz8Yzv25ar3aB6yuNogUqZv+ZB2np2VLOJHNM4pg+mUpIkAafN0j0egnJDUx7AHA7M60rf773jB8A7wPPqSXjI5WVoK3eCCuoI8270gMSYFkJ/h2rc1Agq4yNV+dWi/NrzcqZngjdJb7xLN/jG9WTfhLGp8VdZhnHJWAUbnlKRzyW6J3aEOvKCuHh0PYkbz9OeDUUIVM++dwdGBJNs67ho64LW7mUCQ608jzS7eFvdMLfWh3UZXPJJUy8RONtpqWVEGSFrU8O6/YwmQmmh1RG0Mhwbe6E0TB6ZvepULdy2WT1CxAsADmdm4CyBV5uddovJsoAxPUKzZ/LRBpF7mOmCgzOVRyQHH/locL1SvlIpCYfKRR/PmpkoZiMQbM5oONQqqZ5AQKlceOBUOFN9SYN5W0LSQu5SIoX9I2A0ZHJ2EG7CiWFBkGyJM/agMfcXWukj55gnRRx4SVCdMgQjatfPgqRnz7FVLFp3cB+X/ErgmOyPbBNWbx1Aw6cgHgg+BbYGJ/2zyYKzI3pNkWKOS+ErLzYdq0ct2WWxnxWiKUug/EcsPYFU9Qv3+LCaWINNFM6Sry91HTRD+YUmV/n/sAbo/rVBrIMbwigQeidNZxb6wdi6a7SHAFoCcs6ZQL0Gz+hGkQCPyjbORAhCoB/OXSOAoItTFeJXqXYTnjTH2fkw4RFe3VXt1V7dVe1AtKAgmx4SxhPXRfIk5DIqkFgw6NCaVY7H6XvRH4+cILxhYWedixMrYAtPMAIm9pD5cjHN9oe829pWxvFTA+lA6RXsyz93cCMCBxEx1lL2brVnQabomcv44YBlXSy51BOlJekcNI3Yy93oNodXfGXESVq9PoyNIINt/t9GqgoJNdPeNiibE2HBGmhlh9hpkHshlrqGJT7YZVYKFDDVOaNCxXiwHwvIkPn1cwUgrpLHht4NloGQ52ew7zO6hkzlxa7okYc6+DvJCIHEIRveg85spr8zz7t9lcoE6lPsAx8RKzjDskvr66gi3fdg2qX+WYUrb42uX+Aw3dCX9WjIypb2N3m2nBwjk6t10b+eReMxi4Do3lcsmXzRhXZAd1F1fkWLKX7rMVpsZjQLQBBJ7ABGsNSvhwLFCulhT+4DjGDxZKq8LUJY44sHv4dhLQBu9ojIRBU0yeCcVXK5mtlAf4tqs7Dbx8CM2sjfay8n5XeZQfOzlI9kkxT0PUL6dKc8v+IgEw0RrN+YSmAAAAAAAAAAAAAA=)

   - 设置水平位置

     ```js
     ctx.textAlign = string
     ```

   - 设置垂直位置

     ```js
     ctx.textBaseline = string
     ```

   > **文字居中**
   >
   > ```js
   > ctx.textAlign = 'center'
   > ctx.textBaseline = 'middle'
   > ctx.fillText('hello world', canvasWidth/2, cnavasHeight/2)
   > ```

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

## 重叠图形的样式方案

- ```js
  ctx.globalcompositeOperation = string
  ```

![](data:image/webp;base64,UklGRnQjAABXRUJQVlA4IGgjAADQpwCdASo7ATcBPm0wlEYkKCIhL9PKaQANiWJu8T/yeG7mcma1aqh+x/1H9gPIO6B1v+4/r9+QXzo2h+pffb+1f+X/H9bxyfkG+Y/oX+S/uf5GfMz+/f37+oe579F/9v3Av6b/O/9j/av8n/2f779avQ5/XfQB/Pv7T/6f8X7t3+Z/Vf3Jf4L/P/rv8AH9P/1H/h7DD/E/832EP5d/t///6637pfDZ+5H7gezv/69Zl9N/5btr/0n946gz017f/2X3D9C/GX6H/yr7tfrPNb/meGPx5/xPUC/IP5d/e99dnA9QX16+d/8z++/43yx/8H0S+v3/C/snwAfzT+nf5X86P798+/87/K+Mz+A/0/+Z+6T7Av5r/Vf9Z/iPx4+mj+s/93+X/0HqJ+oP/F7gv80/qv/P/w/te//T/5/CT9xfZT/Yn//owokx54VVV/01dE/Dd31VV/SsPNPIu3rfNVOHihprAOTBEGDO5gmJwUahDiyv9gNiLJOaUGJakUFEMmQ5a0le4EABd2+d9n6YnFjWLoJdPkM2gcWnIOctz0qxhAtYdzP/1NW3pAEukMJ1R37/yjRUE/GB7aDQNLdRpX/ELiRWfuA8QdDaojHb8dSO/29mfYIomcBi49pTAnU9uA6B3YWkbZ6/4YjkNzNBrCC+9pVcf/bx6DVb//aQLMnmV++E5ajgk31X41AK76WJ8rYrHZth5X8fbOuNfMVEfGiXmmOl2cea8bRj1fHmBOHKhBskZuOboondZRj2fhhZM7xb88+fbru6sSBQGGHZHYvhMgd1viDEpWXafRkXzMDkzmrggrqFnx3BOReSaxyZqkBQKc2Gvudb4rbocF15kQEE9rGKtblZUJ3Ooybw3mvo1Yg6aN5bA39Oa9BckmXGKFrrSVQmWa9cZKwAaixLw+EOI1UYzocaNc658cCoMj6SEQkJDRfZzOE7O9oGgLiemd72e/e07X8Ilepbv5EBNHJTcRRT/uTp1dy+iKDy0Rgso+E2WRoSHSftIUt7lwqOewTOyqlj3Mt0FjllWqKQTYtEnlaDx1ND5udkBR3g1zZFOzEMiuAzO7RkJGGfi7ZgdTNVlDmrvsNqXv3cpceigYEo2eAqiKOxB8yDKtAdtNtqaeFMW8Ew64u2MnPCXk7PZykyv651GUWWieWzDLqXApi/N+p3NErFouskCZYHjV3LJOpqx9LocontbQAI80FukoTU+s5CWCJ5Pqh4wOacTXHNTxgkDGx/bd4Jol8HOHKSaIYOkA2ZTUEhQ6lCv5hbMT3N6DfNZGVFSKePvRI0AJJNIH+rnNuO8W0hob9i33o/qFSHeKopQs9S7nJPipCPl/nVCEkZJaXxek1MXsObymsyRgrLvTxTx3qVuAzTp7abEb95usH2Yyw5tQ1sHDovtuHyMSPZvSFZj2F8ezIlCbgQ+Z/BbrLejrt5TS/9jDm5C/XnyRIwXlBALoZHWC8MkBnU4KrU8ywqLrVkpluCkHfdhmnLkou4oygq8RkL1wG31U37pdFrYmjSEwgAgDBZpgjAgsaR8uPUiB1cW3PufaBTK4DeZn0wJ0t2IYhx2djvA4VfcY3/OtNSzmB4jNo/jLBgvktLaHwXydNSiG/zwdQf4VHEdwZ40nDWc1yAFamzlwKiF+yDLE3D4E29Ih9sASxGIfMw4EZKOGSHncqQ4D/bSSpy8bdnflcTjxy43O1x0CI56bzA1XQVL2mABQjehBOKcNpXFms9rNCecvgTcIo7tjH/GqE3epr8fag43K74YFqqF1Fs4PbUaPPT5+hJxyJvRPNU1EgAAP76rvYndtMSAHC5r/kta8u455SsOHUDJIr7tg5dPkKGcb8tp5mYqf6YDI/S5xK0dn6G9ICX25IghG8eMxmFqh2fbFrazzfeJXNvE8JPr49UYLnqkKQl8ZX6tf0adWVHFF98GJXdiVP39v/8HIB7jBOYT2p0/WEmHrvhN8HSJmdWIQqhD8TOc6Wm4vaPi35MLHz2Lux3nR9cOqRjJO77+4MOYTgGTwFDdkk7CxoVAH5GGh6LlO6nIt2vkp0NVpCOVPe2poXSEV4wsnrnZLWtp0Q2hck3vK0H0QcyQ2uClp6cD5h5Y6gOUakhszkzQ44N349rNoa+B40IrsDl+HAMsfOjtUNfY/CYxr03pudFNGTzkB3wcvshISnLNGqBtRylpUmWYQ0/cTu+Ivj4/VaR2Owa/gmFXOBdkIMBbFZxWChJ3sssabJgA3vKOORpfSXp2GPKxsCjQC19I9Bd2COwA+8QyVuVSCFuOY/3/6RUNNJdI8+4NTt/s3sEBBQHUyB3rATbA21sp2C3m5fvQU/kx2lj9B8ljfzWKL7xP4X7o6qzRPLtN6+rC6Y104vViAI7igFIRxkwSPnDMq6/aKGPfOePEcxF4H4L3r933JaW0NJOJlYwBqkzL12G5qKUQM4UqrNYrJBfGh9l4puQkijol9HbLvrhi7tiY3Esw1Rma4XVoc6bxx9Bopc83x9KBBO493H18kEl8rclhVAS6g1RzbAvWRQ6+EFwJ99McYUs+f19gwILXdXdJpswOMcZiJMWVtn9/wIXi1vPNm5/gf4RMiicDHPzW8go55llFh13Ojns4i/8FKyCIjV1Gmv1chnBpjWRlzxaUJ2agLJzPpBuryR0+5E1d1pnqzBKz+LvUZxvQuBuW/R7W++5wT1IZjHxfVgWU2S99yDGvawcKqgTFiChLYfBVSTaNhKXz7gkU+Ai03aLavCre6qzjUWgRbXp7rTQkHEw7gVWiDgAp7FNp8WS0K92bwBAym60zho5y5PE7g1FPycyL0X2f+O/MV9+D0piZx2uAJLT64zZU+5Z/zQWfGq8DhlV/1d1K6Ny7pHKp0qPAXVfOgdY+Ca3DQSS86pcw+VSn48KSGratT+8LZGzXh69TxACf+Vi1w5UZZ7AvgleRGYwqWydOw2RPXx9yMy8plbWYLrsd/2RxQKWZnaOFnw7PGTyxf4K48gcmjqj5vCws+pWKyBo/2AXOlimrKRlelgKrJEU5kfa6jcHZgJuyhcUkg9AWsmjWuJ0BiSAl7GufL2aeTKiATYmjM0Mh5p0WQn3xYyNlq68nKjHWYkXSdmdlelAa49gnw9G04d8qJC6AqXiJmxQmj9/JXthaceutFUgFdTAuF5qklNsiaY+iDVkV3ldVmsFpVe5aBTe4Q0Ne6klwmU8JFf0QLySF650qkpun2TaIAp8qSWFZbwy8iIVulZM1WPacwswDOanSLUYLOjcbgcKs5L1RtjVwn81Tcia+gLix18mTz2c/bKsXC+G6MgtXyANSmGrN90yuK1Qtt4Eeis/gm8EAAJKaeeNInk6nYKQMJ6Rn63+EMZ7uFZdgIey36TbsH2h0aeHHpoRjJQS2IzdsTfwpeMrt3ULzGn/5Cf8CP/8Ce32hGI/m0qvsNGrm8SEElHS1A7VwCegbZ/vZAMU0ECMxHEVh2LHkSTNBdyve/zLTJz5eEPzrlSwt+iK/yeVXZR4hm/wdSM5Md5nH4a6+Vh87MPnWTQtqfEdQmiiUchial3LJWDUyxaqb1ogZD9EyJvhtws/nQSloUrrQlVppm67PIkBK+kmAGj7/gK8MKbwwZRCMRiJkTulZrbaT/i4LsEA7zgYT5M+NCWbIQ0JG6t1hAhvVkLkmJDEXSz1/nEqsoC4DG+M+B3O5DFg5bTYmkE1T4aWIB3wAlVN51m6qC7RIwK3LXLMCJkkOzpnHhsveUp/M5yB7fgShR9LYABLEsHKHh45S59tJqpGAgRG25dVCIzGa2M3URrEO58HUJCoyAJZGEGRNHlozd1LI7dlifYWqHwkSypdXgEs7eEkjb/4Sskgb+T426c6dd55fx6VVAAChcATYmc7LEBwrrc+cmwxxHN6bg6tenrjBE27SRAtDDZttCzn6EtVLx8JGpzUmCOHOLT1cTZ1mz6DuUuGcNVqH4iBZehpBBzmYRth/QC8/pD2ErLxcXT4hPNMVddJV16/fHBEBT4BeY5LjiyGjO1LNd0oqjEDOz9WXIaUios3Gypn+3eOOFDczEAfVN94fO7rG5jn+tnNaOI5YzMsl7rH20+ZqoSReLONmwP4Eg4oSBFIdytJZt7Uv857UxR9yB4uB3Hpyi3v0nfhhWQZAR1txiwht+XIITB6vFNN4Z9WlmDa9OhXaGiGb5+zCOWXf7ZF31HQpNcRoRlh9/xExOKQqxM7EFh/R41J00m90b1uXkZau8XpevgAlBvajFi41P9IsLnMV78dPJSiMjiiXXlpS/W44JmAT0rIPpcLBOPwHcqdnPe/wTq186Y2fpJ5HW/OSd8nFA7feYPudmYKDRicbaABNfXWyXOz/P3Ca+Hh+zRVlXLI8/VLe5JWmhUhSd/P4nKnNivZmpBKgpFI8D44Wl8bCAs1eY25jnS4ov0eHE5oCkxhNDBGvOJZXQ3QvouZHMbjWyIQjWuxdJf5bpydasNV6UJBaqDeb7gKUc0/y3/5g0KMt/DyNCqLK0vehN1wYQd8suPbjjBt9H2t9g67nw13qNPaok5D48Z4OLVoda0TDjzexnis4At5qyySc6kmP88EfUPvsfXEgFd8LE0Q1wfz2U6sEGpsg4O9+NTcoLxYQatKHUJ2bQaZl9NFCY+XZMYkdwAeN/9gXZapnw9zBrFCiscJYxCqKqiBqtOlEy97Cm7nbZWpermZQpKskv0ZKYUKocvwdGvM6UbJjPXaxff1G0cyMwGNWZxMPvn7dqbnslfgyLbBHuXlmHJTEM65axD70FI3yAO5Xv9VZwjN+htqViEVTu8A9v/q0nq6FtIjrdRboTmFYUBorml0++XEES0f4+Ys2kiD1WxYGQ+86JV5P1vNMWZrnoMebtCdcGPvNFNV/oiQ2FPbDtVnLYf8Sh5wuTO9TH50XwlpwQcRc3yplk4gB31fyW/04DaHa8r1iinAi0Ct0RkfuPsY/KyF4VFm9iQ7bRKiUxOUZiS4Q1aJlzrKFu5rJqsUbgRXxYS90GbVmYCmQXO1U1U7IL9sMlbocqLP9JviSj7JdJaZlulER8fhg6NvatA4jCX2aRAeOl0PPHlKN8PBRy3qOpUE7185G5T1/rfrXh6WQT19HjGGeGBHQ5bjkTUIEizq1Jeoz0Z+LU2a73DU0DhjdKK3IMibgNUs/SpPynKnZAZAPNwsEOs9u9zqMYYzpKVhY4A9UnXYazaMGU03+Fe7Tqpz/C4mQdE+HVC7hdBwdrQ5D+60zVT5fCMy2jT6vqje+HaMawOHg6wCj1amJhbhwpqIsE6MDBc9KwrU33TRWHcVfHVQPc5t9h/5bbL7ofc0uf6k0MB50XfFA4+EUAJSXm/qWLynxZQiUStk9zO6AfdQnEuBU2R3uvnNMUEEOoYbbPNdYXD81yVtB3BVbKn11kTXlLGASax6JQ0RfYzcp+Hzz3pYukFNLKHugYeE0UDJu0bFFWXR9qfDUS5zh0gfw/DuLlrSs8uK+SjsswdKdlmLVW2Jp83/HVCxBqOyrfAlQNrjbl+uJqR/FmHBCH/lSNRO9g4i2YEFlU90CZ75NrFp0cGoPJej7aew8sKNuzEq727K1HA3odp2HE5YuW1XkfxTGajw5NhHpCqwnzEsM59W7X7zzKkoHkxBB++Ehe/zA4FqivqvLCrFM1oVu4qwuthkDfj3FR3l9YlYvqLoyTV/57uo/2MqL//5fDTTQnTEGm0D158d/QkpaFLlJCopWBkdiKONuREDriQf7i34aTe4TbxhHzD4P7PzWUnkmWjinJYEKJ4AHQDDlPn4LjME5ffV9TaPSP0mBV9JfFPpN1KDAF3ku1NwuSJ+690AFFXE/qrzehq7dm/a428ub4Zz5sASsKoOAvPFwEREkHDwQP3OkqbcKr5+h90yIeijrzlgWuANkkkAYTPAbeWS+ej57HZq01mSqIF9Ti48477UgRvU4F3huJZu7Ao59pgW9jY+p7eLk9w9BNW5lmET+XDPQfh4JEufOoiNop/rg8iqR68y6nANcJqGRIiU5Alr5EAsr652fF19wmju9oAbsheUnSw27op+2xfhfdg15PuGv4MvNHAVQM7iYVXp1Hd05PTej6M0ZXAICCmUrHKSIaB9/TsaPyLqm6R4c65x6Qjz58ur1knAw0wrfB9RyGHH5R36wxJBZDi9vvZncUMJElSXla3Ahd6GoVDw+yWnF/8Mr2g4ogbevfZ0k+jJ0H6xFQD1pxIDSoI6F3hMUvo8pHkAbZ7AW6n2KlRD1SshEp7XWCYvbKg73aQA/spXDBIzcv8krtyoGxkbXi/GTaooWSke4EYkM8akZ4bqOfrFJRlSa0gsrnQX3FD8xugw/8J7uhnptkgC6PWnnFzDQcfXHbyE3iRdMzFGN5HXyXvf7SFqe8G8ZyKuULVkB+H9HCaMPbQlaudSdBthzqAFFsw1F/HOUa20w2FLmvVE4DIxGabzFEu+p1WqcYXaOZF9ZvSzPWh78h62/PeV7iqq+kuq/GUmcujte4KwNb5h2vUbJsAAJvx8P6OE0Jx58I53DFKgf/EA0KBviQcsyeaYFYFJURgjXn++WsXqgTTG2+DsnMqCc7It89Sq7R4hqaTpH3iSGQrg1MpPo3J1LHPd2zgI+r8Ah/eYFbmDQHqpST7+uf/O80DKrzUiGcKECrBj4RQKFx+orb8WF5GSzhwr3VaaeF7bmNpcYdEVAeiQpwFizbVx4wcrHOamutK4t0pmN8Cv/oBHYSCAkbkluxTZQm/LkEeiGpEPdcUvGC39Wi8Hwu/s7FaAJBvqkVwy85S+qKdRHZudkEbLMCt39B+AzB9B19KSygEP7WECSOukrW6q/gEUgEhCAKlW/UATJNZpuAQC6QCqJJ9QEQAfCU2E2Vbg4BsYqTiaxmjwiFg4GJFgAD70VnAR86SoaXiy2A0kNwD56TblezNjCR1mF2XsUatMFYYKC23ycs4bW+eCm332B8OMUgJp1ANjeQ+qaEqswrIKHaExcIkqVyuSP8q+CV3pAxpKnHXGVpJjwHmLvu5KaOoSK6tUexj7GJQ25f5Cotl0CkvxdlStNsY+cQxjbAQW7sApFrAEdFwkc2ui/iRn8oNN4Q2VAYL0JsVGthL2dlVvxq6OCMKugidQ2IKSNfpYAL/sVo73trCb/dFsT923cVsb2t3LFFji0k6beAi2N+WGD7mOh4XeFM9IoD7ObJYIy1GfzfKrUTEJ0sHTgFpm+UOcADBs43TI/7CiEsnHfgy/T3XWLOOG/NzbgR6kYMOTW0shP143KyTgXnpsVsYW1QKxRxv4iTO8F5DiaResDHS6SjOnkx4mbduXEbbbAJb2Nb8BjdauCicJDKOtyn8Vv8pxkF++dv3YSxVlvJ/ZTHqNQEGVcrzHPw6Kzh2bb41dxCw1F3V1oAljKuFEtm3FCGDwriKJxSHdxAhu/6VqeiqCwViROfa8eVeE8PIvAB3RFK2DUGUgBBOWz0u2cStoOWP4hE29g0EXW3ka1JyM8V3BITqLNFRgs/c4HTw7QffVEz794jV6Gn/Z193CPtRpGHrrpMr4Qr7MCkywuIWScqcGe4AChG8TYEQ8p/GDbp9r7ppLRQs9tnmJrJ6Yp8XwrJGx4bQawYfno1xjTk6vgljhIVsfu8iuHvatraupsLae/5yfT9ABK3+dVmNB5wJVqa+6SEI/gM5CKdQf8kb1DvIF51p5JB9OEUweqguI5fkTPcTThb0vI1OTDfwJVtZbEKF5ugsNjd/xF1ohBG1DN9FhiG+Kv+/KgCg3cBWkNfyRG3GJi25iGYAcVsxdpey5b2jrWXmF2DrmfxOxbQ92oz29w9V1lQ11N3X9UFaBe9n08x74tlClUif3Wx3oosQ4QvPkvyIxJZQd+2ilEFhm6lFFvrDavL3TCwLT54/oQjNoS6FLeU6WC267YrMX03Wg1K4p3m5k4w4CQzU7X0VSChxHzyTCHpdy70jkXbMkL388FDFYGFG31Gc/yKL4Wgo8JizWMM0sZrDhbaxDiIJHVWfuI8TkJOR18VO5PucMsVQVHq4Ytegb8B0g7olp7mqxdkIMfX0fdXP4p/RtcanNX2cAR74AKIplWl6H/YDQxLB+O0a47e8Hw1tF4U/xGKkrte80Na4oP05PCvzfs4QO/1Iw5kPv4xNurSzv6tsvyiM0Q7a8QJkue+GjyGF/ns2Rj4jgKsoCV3MVarQLlqrpqCz+baMXckxHeXq7Mr5LXPUo0qOgoRZqcQNKOzhhEiRIVYm1r9oYDr+AbiuqnXtODEbf6+yxxk3HVTK/1SktRDggMDnpxp9ffD8SdX57TlIUUGOE38lPYS0CVTZ+HFXTF430D7ZR06YDCVRkjNaGrvbXfhwlBIMLrDSgavfFRaPVwyOaAjlGu56jwEiqH8UKkchs8Dr7041k1+EY96m+93D1CDjbtS1dusWQT7jeVXhJ8j8D4iS363Cg5mc7lYxd9Tw8ZTKXNekvVUBlNHbpRwhtHPPp/ygtQI2PPojVEGHNJTl7e+81uota7+Qj4LBuUe5c5e5hXDc+STD80mkzTwV1wloaVEvVQctSh6nzpbP1RvAtlvvVDRicaxyl/2VefwTHGweO5NxyLiqNW7JITYmV3qlP+1zE1ElzeIYKAndmS51reWE+e57kNhpgqhCmWxkZMQcsMXRPWYM5TN1X2SFs4VpQZQ0vb9v+CEXQycdECT1CVwMKPyiuPt8Zj4mujEPECtLRK1FwBidGmEOLwEREV7uq+mPYjOcypq+S2eeJEEEQX8bKhB8D2OH5n9p0BPhkwE1pI0tkLlUhq+uQ0E68Shh5dMFL4FavfNLfXq0W7MseKN+vtw+TMxOzFlLfNglL+odGymr2kIkz0WnfERx+PibxhPAg8qM4zc9lskLJsvlTZUMsB82HtobAZsiwRpj1GmBKmHaCXgb/YlWcH7l0jJHK/tq1ko2wPLU2eR/dO49RwVkOFFc6WKVs6/gOwW6M59dHEmwefVntkmelUxpYUylNjuLdTxBDVoKbuhjFlJxNDy1AtRFzqyLvxNSzOTAwEeRBiWyFaGkYNo7gpLGN1lMEkKBj/S3EIm0SFKUX+YcwzfZq1J7qQmZActqahE33MLTb8i8qxOVA30lpU9Y8nUJUSZVIaHoCkDDBCxYDD7k+f5mWSHJtIB7zEqxSMDsQVwGkyNQ02gnGSXQTLqrwv4j9XfFbC8559q7iFV9EXntq0woerY3R+sRtSQp7oyziUN53MeG0TPcRHU6QdbcyaHSpewpmsC8JXitSoVz5Ip2T/8kVHcAPgjLbgB8EZYflifJexC5KRb2hrQu0WvpNnEQTRDKfEus2449SnEZAYQEQSO0h877UHVF/qiUNZcdEYVuxqSXf4IzqZtbC8l8USvX4nZvgmMz4iCqayHRmgslJinXXETwty8EbdXNH+sf54K2s7mOk9OYEUlCvrEKw+hm1EZLGVbdJmcIoSfEeWhPIqBUmgIrZOSmtznBDiE09phQntFJDLBXTZcAFpV2lNumPIW2EsMN/eAMiA7ryTkGvnoYxQv6z+ztLhvrECEvuZMC83BjHT2kjTFD8eOLN4Yn25NuMqN2qkgwdja/hkApOd+LQKo5ugTnqmiPHD4cPvWYcyy4LZKDOmyqa0pbGvLgI3aJIYnciUVUOCsCDPMD7hTPTjY2UKynxYepU6Gdl71hGBP1F/BK9M8YrVS5aS1RtZ07+ndtKr6kUkT1R+U301OM8lP5SyF1e2eB1qBF3/YKPnKVsWwKckUQghEHCoWAKyNxd+BjtjmFARNjoWnKEpFsEjfoxyIOdNKWYYibkatJOU6Apydc3hb6RbZtoeeY0U8BZ6W2JuKe6FV+7nEyUxFySki7SAVxRZf61NfXOMT5CCphcJhyAaoNQYgPELbOzjaPjUKsg47qzZJpy1XC91Y3xeryqGokuHALOOxkNLRCqshbakHaSFC0OiMblnkrhCWUgpdAcD75yO5DeCySCPwIBFOMfDVAsAdkWT6hMaUeXfhkw1p/SbOEFV8e4de6Mkb1h4wyGAYrxpkLRFcJb1tnuPr89/sJ2pdvurqswNIHV7keQlx9LEfUrg5vnS0AEv2+ucoLkwypFJeaB5I3osBjcL6Uats/FQHmpkwJRPgs7kVQD8EMLAyVd9Rk10Acso+Vitr1BG98usnHj0xwIRzjRn2UkosiP6jRTmLw1zgF7ACWtgDVQ9tmvqdN1s9wG6MlogbfXp+RBzUSq4Shb+KMzFFX0+IkHdK0Pod0KL5SujrNUcvbpsYRJ0oS0lOrIqkdodLEa+cCkTf1BWoFoxzPHCeM7MdeQ+3v/v96a3SJu2eivfcOogBd9SqsBCS7Kj2YmqUgMSQBsE21Dza6rP1/qAjHMA2EINfjb9zVCn8gxC4X5lbjUAhNiOarm4oVaB+IpuMAjJy18KNe4dkrgxgR7xGZz1piAGlukQNYO7j2tCn7zusNGYuSQqM7wpwcfo4qRkdjeJflpA8Mmy6puKhfYG22ByjKJeJFw/H5jUFLDK8rXKbZX6ZdTkysXOvHljWnTUSNhCAx1Zf0U0+4guGZ1cGGpRW4Rq+T3HAeBcwbybWJG3nilcr+BNVMVDgFdr5NjPBrWFVkaH3XhtMQREMWTrnqqLsVxJuXuWpT/qtZe1RT/oQP32DdDjkIkMtlK6dtJTTpkuJkfE4WiWtJFqkK6ivZZcw34jq8VPB6Wazi1zq5TqSUwmPqTxyEM/YCn6tGZDdoSoPmvgxvGNoMR9jHyg/uggFTiqjuCW/bxP5TMt03haepnUJQFzEg+5B/RVQLRyputMMUFgadx4GYtWTi5QbH2IFAfAMm2MgiqBouygVnnBRppOAxnPd9TDrzE7FR+SGDN1ZC5ozirCI9bE/vCe3GHJU2BTRxCiObabBdT93ZvZSU2dCbVlBUlWIrx0G+wyKJLWWb81d0yOavUtYyprBpJ0mfSJxQ0+2zL2kf83Pe2tjF1K8/T6Onp6q9TStYzb55Lx5ec777WG/6oc5H5ZD5sXQ7HUQCUWfPbGAKBFk4rKhJr4CWwhn6MQTh65xvyLq//27bz1igRfPEUJVPSC7Jzc2MMtqj1tArJxg8+if6edX5dqOdysVzNixcheRMMQsk4z1sNAPxs8igpCTykaMTFinRudvUDAIes+K87eNx/zeI8QXc0rzZkH7I6r+lJctxqaL77ckGTTSJECMD6oWNAXJLGDzFQQvGCYlbLIgfSqxJMFnu/85yFSLTG1FATGkT0jcHrhnGQcHj0aJ4+wWGgc8sArJ6g9LUQKISYT0iWNCbxAkvrxmAvpP3HqKBCWoeCyfPiKIPuXsDG14e5d7kVGsalGQKCKM2tWjtEQpVqZkqpKEkg1vL+U0NmA0rtNPIqWzorgW9kie8M25tiEI1zV2JzpCL4IdGBlzPWtu3/AL/3oQQZG1O5LsS0y0llb2p+fZ9O6DGqtXJl3MviZFRbtqHRHuDl+nZTbqKZYbZzAKiSu9NGVWDng7nxhHgxuRTMuWb85IoNiQ4o9HDzpkyxt1+fecJ6VSowThwa2YNI6YUiqObaCB+6ntOfgnW6wZuXXXteAlwaiALYvxQe9hLcouYw2SI7sWFf6qWFQtqn+78QHKX7Yd4W+iPN6HVSvIEEo1sUz9M69a2Jco4F9GmMnKGlyAGwJYyDTGv3BaEZcSuU/JOahanOWkkTHstVILAM0gF7h82yyuQf88Ypbw6UmoYiMkRNmVrqbHhWFoCsmAiae4sYjCpknGUx4H6xsSF/wf91k+IeGj+kdfIZh4QUEdEL8T5t/PtTF8jgtH3nIf+DuCURQbwAp5mJIsFa77xBbcBLTf8kl6J2vV7ecXwJ/6ozWJtg+OTqLB2VIttC7bQigxNWTMcu0QzINMHKV7s5/m4E7zwu0AGsuWPBtYZGGWIGh5cC26MQZ5Ycb5kXYd5VN+IzlsMcgX8PILTEyGLIAdSKeuI3HeyTZUT1rfLE/rS+Q36laTt5wrJm2n6DjJFoHG8Mr7590XH4okZyoUyk6+Zi9Cj3alJFAxgb2h5Wpq+e7rdXxZkI88/8QI6Uzdhe0gwpDdn19uKW5r/tuVHnzXzuHCoJx1SxqEWt+AAA)

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

## 绘制图片

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

## 导出 Canvas

- 将`canvas`的内容抽取成一张图片，`base64`编码格式

  ```js
  const base64 = canvas.toDataURL()
  ```

## 获取像素点信息

```js
ctx.getImageData(起始点x, 起始点y, 宽, 高)
```

## 如何解决canvas高分屏模糊的问题

真实像素中放更大的画布，画布会按像素宽高比压缩放入dom中，得到更细致的画布

```html
<style>
	canvas{
       width:200px;
       height:200px;
    }
</style>
<canvas width="500" height="500"></canvas>
```

## 与svg的区别

1. `svg `绘制出来的每⼀个图形的元素都是独⽴的 `DOM `节点，能够⽅便的绑定事件或⽤来修 改。 `canvas `输出的是⼀整幅画布

2. `svg `输出的图形是⽮量图形，后期可以修改参数来⾃由放⼤缩⼩，不会失真和锯⻮。⽽ `canvas `输出标量画布，就像⼀张图⽚⼀样，放⼤会失真或者锯⻮