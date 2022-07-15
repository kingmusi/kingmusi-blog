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

> **把画笔移动到 (x, y) 点**
>
> ```js
> ctx.moveTo(x, y)
> ```

> **开始一段新的路径子集**
>
> ```js
> ctx.beginPath()
> ```

#### 边

1. 设置线的宽度

   ```js
   ctx.lineWidth = number
   ```

2. 从当前点绘制直线到`(x, y)`点

   ```js
   ctx.lineTo(x, y)
   ```

3. 设置边的颜色

   ```js
   ctx.strokeStyle = string
   ```

4. 线段样式

   ```js
   ctx.lineCap = string // 圆角：'round'
   ```

5. 描边

   ```js
   ctx.stroke()
   ```

6. 闭合当前路径（画闭合图形的最后一条线用此方法）

   ```js
   ctx.closePath()
   ```

7. 设置填充的颜色

   ```js
   ctx.fillStyle = string
   ```

8. 填充

   ```js
   ctx.fill()
   ```

#### 矩形

1. 绘制矩形

   ```js
   ctx.rect(x, y, width, height)
   ```

2. 开始一段新的路径子集，并绘制矩形

   ```js
   ctx.strokeRect(x, y, width, height)
   ```

3. 开始一段新的路径子集，并绘制一个填充矩形

   ```js
   ctx.fillRect(x, y, width, height)
   ```

#### 弧形

1. 绘制弧形

   ```js
   ctx.arc(x, y , r, 起始弧度，结束弧度，弧形方向)
   ```

## 坐标轴转换

1. 重新映射画布上（0，0）的位置

   ```js
   ctx.translate(x轴方向的距离, y轴方向的距离)
   ```

2. 缩放映射画布

   ```js
   ctx.scale(x轴缩放倍数， y轴缩放倍数)
   ```

3. 旋转映射画布

   ```js
   ctx.rotate(旋转的角度)
   ```

4. 集中设置

   ```js
   ctx.setTransform(水平缩放， 水平倾斜，垂直倾斜，垂直缩放，水平移动，垂直移动)
   ```

5. 保存当前图像状态的一份拷贝

   ```js
   ctx.save()
   ```

6. 从栈中弹出存储的图像状态并且使用这个状态

   ```js
   ctx.restore()
   ```

## 渐变

1. 线性渐变

   ```js
   const bg = ctx.createLinearGradient(x1, y1, x2, y2)
   ```

2. 径向渐变

   ```js
   const bg = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
   ```

3. 设置渐变的颜色

   ```js
   bg.addColorStop(百分比: number, 颜色: string)
   ```

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

```js
ctx.shadowColor = 'red'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 10
ctx.fillRect(100, 100, 100, 100)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214231721.png)

## 文本

1. 设置文字颜色

   ```js
   ctx.fillStyle = string
   ```

2. 设置文字的大小和字体

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

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214232512.png)

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

## 重叠图形的样式方案

- ```js
  ctx.globalcompositeOperation = string
  ```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214232854.png)

> **destination-out可以用来做刮刮乐**

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

> ```js
> const oImg = document.createElement('img')
> oImg.src = './1.png'
> oImg.onload = () => { ctx.drawImage(oImg, 0, 0) }
> ```
>
> ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214233634.png)

> ```js
> ctx.drawImage(oImg, 0, 0, 100, 100, 50, 50, 100, 100)
> ```
>
> ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214233710.png)

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