# canvas

## 基本的画布功能

1. 创建 `<canvas>` 元素，至少要设置其 **width** 和 **height** 属性
2. 使用 **getContext(‘2d’)** 获取绘图上下文的引用
3. 使用 **toDataURL()** 方法导出 `<canvas>` 元素上的图像，获取 **base64** 的数据

## 填充和描边

| 属性          | 说明           |
| ------------- | -------------- |
| `fillStyle`   | 指定填充的颜色 |
| `strokeStyle` | 指定描边的颜色 |

> 值可以是 CSS 支持的任意格式：名称、十六进制代码、rgb、rgba、hsl、hsla

## 线条

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| `lineWidth` | 指定线条宽度                                                 |
| `lineCap`   | 指定线条端点形状：<br />- butt：平头<br />- round：出圆头<br />- square：出方头 |
| `lineJoin`  | 指定线条交点的形状<br />- round：圆转<br />- bevel：取平<br />- miter：出尖 |

## 绘制矩形

| 方法            | 说明                              |
| --------------- | --------------------------------- |
| `fillRect()`    | 根据 **fillStyle** 绘制并填充矩形 |
| `strokeReact()` | 根据 **strokeStyle** 绘制矩形轮廓 |
| `clearRect()`   | 擦除画布中某块矩形区域            |

以上方法均接受四个参数：矩形 **x** 坐标、矩形 **y** 坐标、矩形宽度、矩形高度。单位为像素

```js
const canvas = document.getElementById('canvas')

const context = canvas.getContext('2d')

context.fillStyle = 'red'
context.strokeStyle = 'blue'

context.fillRect(10, 10, 100, 100)
context.strokeRect(60, 60, 100, 100)
context.clearRect(60, 60, 30, 30)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210510204052.png)

## 绘制路径

通过绘制路径创建复杂的图形和线条

1. 绘制路径前需要先调用 `beginPath()`
2. 然后组合使用以下方法绘制路径
   - `arc(x, y, radius, startAngle, endAngle, counterclockwise）`：:以坐标**(x, y)**为圆心，以 **radius** 为半径绘制一条弧线，起始角度为 **startAngle**，结束角度为 **endAngle**（都是弧度），最后一个参数 **counterclockwise** 表示是否逆时针计算起始角度和结束角度（默认为顺时针）
   - `arcTo(x1, y1, x2, y2, radius)`：以给定半径 **radius**，经由 **(x1, y1)** 绘制一条从上一点到 **(x2, y2)** 的弧线
   - `dezierCurveTo(c1x, c1y, c2x, c2y, x, y)`：以 **(c1x, c2y)** 和 **(c2x, c2y)** 为控制点，绘制一条从上一点到 **(x, y)** 的弧线（三次贝塞尔曲线）
   - `lineTo(x, y)`：绘制一条从上一点到 **(x, y)** 的直线
   - `moveTo(x, y)`：不绘制线条，只把绘制光标移动到 **(x, y)**
   - `quadraticCurveTo(cx, cy, x, y)`：以 **(cx，cy) **为控制点，绘制一条从上一点到 **(x, y)** 的弧线（二次贝塞尔曲线）
   - `rect(x, y, width, height)`：以给定宽度和高度在坐标点 **(x, y)** 绘制一个矩形。这个方法与 **strokeRect()** 和 **fillRect()** 的区别在于，它创建的是一条路径，而不是独立的图形
3. 使用 **closePath()** 结束路径绘制
4. 绘制出来
   - 以指定的 **fillStyle** 属性并调用 **fill()** 方法来填充路径
   - 以指定的 **strokeStyle** 属性并调用 **stroke()** 方法来描绘路径
   - 使用 **clip()** 方法基于已有路径创建一个新剪切区域

```js
const canvas = document.getElementById('canvas')

const context = canvas.getContext('2d')

context.beginPath()

context.arc(100, 100, 99, 0, 2 * Math.PI, false)

context.moveTo(194, 100)
context.arc(100, 100, 94, 0, 2 * Math.PI, false)

context.moveTo(100, 100)
context.lineTo(100, 15)

context.moveTo(100, 100)
context.lineTo(35, 100)

context.closePath()
context.stroke()
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210510210115.png)

> 可以通过 **isPointInPath(x, y)** 确定指定的点是否在路径上
>
> ```js
> if (context.isPointInPath(100, 100)) {
>     console.log('点 100，100 在路径上')
> }
> ```

## 绘制文本

- 相关方法

| 方法           | 说明                              |
| -------------- | --------------------------------- |
| `fillText()`   | 根据 **fillStyle** 绘制并填充文本 |
| `strokeText()` | 根据 **strokeStyle** 绘制文本     |

以上方法均接受四个参数：要绘制的字符串、**x** 坐标、**y** 坐标和可选的最大像素宽度

- 相关属性

| 属性           | 说明                                                       |
| -------------- | ---------------------------------------------------------- |
| `font`         | 以 CSS 语法指定的字体样式、大小、字体族等，如 ‘10px Arial’ |
| `textAlign`    | 指定文本基于绘制点的水平位置                               |
| `textBaseline` | 指定文本基于绘制点的垂直位置                               |

 ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214232512.png)

```js
context.font = 'bold 14px Arial'

// 垂直居中
context.textBaseline = 'middle'
// 水平居中
context.textAlign = 'center'
context.fillText('12', 100, 20)
// 与开头对齐
context.textAlign = 'start'
context.fillText('12', 100, 40)
// 与末尾对齐
context.textAlign = 'end'
context.fillText('12', 100, 60)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210510211720.png)

> 提供 **measureText(text)** 方法，用于辅助确定文本大小。其会返回一个对象，只有一个属性 **width**
>
> 如果要把 **hello world** 放到 **140** 像素宽的矩形中，可以从 **100** 像素的字体大小开始计算，不断递减，直到合适为止
>
> ```js
> let fontSize = 100
> context.font = fontSize + 'px Arial'
> while(context.measureText('hello world').width > 140) {
>     context.font = --fontSize + 'px Arial'
> }
> context.fillText('hello world', 0, 0)
> ```

## 画布变换

| 方法                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `rotate(angle)`         | 围绕原点把图像旋转 **angle** 弧度                            |
| `scale(scaleX, scaleY)` | 通过在 **x** 轴乘以 **scaleX**，通过在 **y** 轴乘以 **scaleY** 来缩放画布 |
| `translate(x, y)`       | 把原点移动到 **(x, y)** 点上                                 |

## 上下文管理

- 对于上述变换，**fillStyle**、**strokeStyle** 属性，会一直保留在上下文中

| 方法        | 属性                                     |
| ----------- | ---------------------------------------- |
| `save()`    | 把当前上下文保存在栈中                   |
| `restore()` | 去除栈中的第一个上下文，并覆盖当前上下文 |

## 绘制图像

- 可以把现有图像绘制到画布上，使用 `drawImage()` 方法

- 以原图像比例绘制
  - 接受三个参数：一个 `<img>` 元素，绘制起点的 x，绘制起点的 y
- 改变图像大小
  - 接受五个参数：一个 `<img>` 元素，绘制起点的 x，绘制起点的 y，绘制宽度，绘制高度
- 裁剪图像
  - 接受九个参数：一个 `<img>` 元素，绘制起点的 x，绘制起点的 y，绘制宽度，绘制高度，裁剪起始点 x，裁剪起始点 y，裁剪区域宽度，裁剪区域高度

```js
const oImg = document.createElement('img')
oImg.src = './1.png'
oImg.onload = () => { ctx.drawImage(oImg, 0, 0) }
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214233634.png)

```js
ctx.drawImage(oImg, 0, 0, 100, 100, 50, 50, 100, 100)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214233710.png)

## 阴影

根据以下属性自动为即将绘制的形状或路径生成阴影

| 属性            | 说明                                  |
| --------------- | ------------------------------------- |
| `shadowColor`   | CSS 颜色值，表示要绘制的阴影颜色      |
| `shadowOffsetX` | 阴影相对于形状或路径的 x 坐标的偏移量 |
| `shadowOffsetY` | 阴影相对于形状或路径的 y 坐标的偏移量 |
| `shadowBlur`    | 像素，表示阴影的模糊量                |

```js
context.shadowColor = 'rgba(0, 0, 0, .5)'
context.shadowOffsetX = 5
context.shadowOffsetY = 5
context.shadowBlur = 4

context.fillStyle = 'red'
context.fillRect(10, 10, 50, 50)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210510213749.png)

## 渐变

- 线性渐变：`createLinearGradient(x1, y1, x2, y2)`
- 径向渐变：`createRadialGradient(x1, y1, r1, x2, y2, r2)`
- 设置渐变的色标：`addColorStop()`
  - 第一个参数是色标，即位置，范围是 0~1
  - 第二个参数是颜色

```js
const gradient = context.createLinearGradient(30, 30, 70, 70)
gradient.addColorStop(0, 'red')
gradient.addColorStop(1, 'green')

context.fillStyle = gradient
context.fillRect(10, 10, 50, 50)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210510214439.png)

## 重复图案

- 可用于创建重复的团，调用 `createPattern()` 方法
  - 传入参数：一个 `<img>` 元素，一个如何重复图案的字符串（与 **background-repeat** 属性一样）

```js
const img = new Image()
img.addEventListener('load', () => {
    pattern = context.createPattern(img, 'repeat')
    context.fillStyle = pattern
    context.fillRect(10, 10, 480, 480)
})

img.src = '1.jpg'
```

## 图像数据

使用 `getImageData()` 获取原始图像数据

- 4 个参数：要取的第一个像素的左上角坐标、要取的像素的宽度及高度
- 返回：**ImageData** 实例
  - width
  - height
  - data：包含图像的原始像素信息的数组
    1. 红
    2. 绿
    3. 蓝
    4. 透明度

```js
const imageData = context.getImageData(0, 0, 500, 500),
      data = imageData.data,
      red = data[0],
      green = data[1],
      blue = data[2],
      alpha = data[3],
      red2 = data[4]
```

## 透明度

设置 **globalAlpha** 属性，为后续绘制的图形添加透明度

- 0：不透明，默认值
- 1：完全透明

## 重叠图案

设置 **globalCompositionOperation** 属性，表示新绘制的形状如何与上下文中已有的形状融合

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214232854.png)

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

