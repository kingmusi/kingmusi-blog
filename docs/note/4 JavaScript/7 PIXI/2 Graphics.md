# Graphics

## 创建图形

1. 实例化 `Graphics` 类。
2. 设置填充或描边颜色。
3. 创建图形。
4. 执行绘制操作。
5. 放入画布中。

```typescript
// 以矩形举例
import { Graphics } from 'pixi.js'

const graphics = new Graphics() // 实例化
graphics.beginFill(0xffd900, 1) // 填充颜色，透明度
graphics.lineStyle(2, 0xff0000, 1) // 填充边框宽度，颜色，透明度
graphics.drawRect(50, 50, 200, 100) // 绘制图形
graphics.endFill() // 结束绘制

app.stage.addChild(graphics)
```

## 矩形

直角矩形

- `x` 和 `y` 是矩形左上角坐标的位置，这个位置是相对于画布而言的
- `width` 和 `height` 是矩形的宽高

```typescript
drawRect(x, y, width, height)
```

圆角矩形

- `radius` 参数可以控制四个角的圆角半径

```typescript
drawRoundedRect(x, y, width, height, radius)
```

倒角矩形

- 需要引入 `@pixi/graphics-extras`
- `chamfer` 参数就是倒角的切口，数值越大切口越大

```typescript
drawChamferRect(x, y, width, height, chamfer)
```

倒圆角矩形

- 需要引入 `@pixi/graphics-extras`
- `fillet` 表示圆角半径，当 `fillet` 是正数是，它画出来的图像和普通圆角矩形差不多；当 `fillet` 为负数时，圆角就会向内凹进去

```typescript
drawFilletRect(x，y，width，height，fillet)
```

## 圆形

圆

- `x` 和 `y` 是圆心的位置
- `radius` 是圆的半径

```typescript
drawCircle(x, y, radius)
```

椭圆

- 需要引入 `@pixi/graphics-extras`
- `x` 和 `y` 是椭圆的圆心位置
- `width` 是椭圆的宽度，`height` 是椭圆的高度

```typescript
drawEllipse(x, y, width, height)
```

## 圆弧

**arc**

- `cx` 和 `cy` 是圆心坐标
- `radius` 是圆弧半径
- `startAngle` 圆弧的开始角度（以弧度表示）
- `endAngle` 圆弧的结束角度（以弧度表示）
- `anticlockwise` 绘制方向，`true` 表示逆时针方向绘制，`false` 表示顺时针。默认值为 `false`

```typescript
arc(cx, cy, radius, startAngle, endAngle, anticlockwise)
```

> 画一个 30° 的圆弧（0° 是正东方向）
>
> ```typescript
> const graphics = new PIXI.Graphics()
> graphics.lineStyle(3, 0x000000, 1)
> graphics.arc(100, 100, 50, 0, 30 * Math.PI / 180, false)
> 
> app.stage.addChild(graphics)
> ```

## 多边形

参数是一个数值型数组，用来表示多边形顶点坐标，会将起始点和结束点连接起来，形成一个封闭的图形

```typescript
drawPolygon([
	x1, y1,
	x2, y2,
	x3, y3,
	......
])
```

> 三角形：
>
> ```typescript
> drawPolygon([
>   50, 50,
>   50, 150,
>   100, 100
> ])
> ```
>
> 梯形：
>
> ```typescript
> drawPolygon([
>   50, 50,
>   50, 200,
>   100, 180,
>   100, 70
> ])
> ```

## transform

#### 移动

```typescript
// 直接改变 x、y 的值
graphics.x = 200
graphics.y = 200
// 通过 position.set() 改变
graphics.position.set(200, 200)
```

#### 缩放

```typescript
// 直接改变 scale 的值
graphics.scale = new PIXI.Point(2, 2)
graphics.scale = { x: 2, y: 2 }
// 通过 scale.set() 改变
graphics.scale.set(2, 2)
```

#### 旋转

```typescript
graphics.rotation = 45 * (Math.PI / 180) // 旋转45度
```

> 如果没设置锚点，会以画布左上角为锚点进行旋转，如果希望以自己中心点进行旋转
>
> ```typescript
> const graphics = new PIXI.Graphics()
> graphics.beginFill(0x0000ff)
> graphics.drawRect(0, 0, 100, 100) // 将矩形绘制位置改为 (0, 0)
> graphics.endFill()
> graphics.pivot.set(50, 50) // 将注册点设置为 (50, 50)
> graphics.position.set(100, 100) // 将位置设置为 (100, 100)
> 
> graphics.rotation = 45 * (Math.PI / 180) // 旋转45度
> 
> app.stage.addChild(graphics)
> ```

