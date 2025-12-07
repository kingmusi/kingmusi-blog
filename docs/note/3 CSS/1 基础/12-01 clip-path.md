# clip-path

`clip-path` 使得元素按照特定的区域显示内容，即被裁剪区域内（图形内）可视，被裁剪区域外（图形外）不可见（被隐藏）

## 坐标系统

左上角为 `(0, 0)` 原点，向右为 x 轴正方向，向下为 y 轴方向

```
(0,0) ──────────────────── x
  │
  │
  │
  │
  │
  │
  │
  y
```

下面代码，只裁剪 $\frac{1}{4}$ 个圆

```css 
.element {
    clip-path: circle(100px at 0 0);
}
```

![](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/clip-path%E5%9D%90%E6%A0%87%E8%BD%B41.webp)

将上面示例中的圆心位置调整到 `(100px 100px)` ：

![](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/clip-path%E5%9D%90%E6%A0%87%E8%BD%B42.webp)

## 绘制矩形：inset()

`clip-path` 属性的 `inset()` 函数用于绘制矩形，它定义了一个矩形形状，可以通过指定矩形的边缘来裁剪元素的区域。`inset()` 函数接受 `1 ~ 4` 个参数值，用来指定矩形的内边距（或称边缘间距），它与 `padding` 和 `margin` 属性类似，取值遵循 TRBL 原则

```css
/* inset() 取一个值，表示 Top = Right = Bottom = Left = 50px */
.element {
    clip-path: inset(50px);
}

/* inset() 取两个值，表示 Top = Bottom = val1, Right = Left = val2 */
.element {
    clip-path: inset(50px 80px);
}

/* inset() 取三个值，表示 Top = val1, Right = Left = val2 ，Bottom = val3 */
.element {
    clip-path: inset(50px 80px 100px);
}

/* inset() 取四个值，表示 Top = val1, Right = val2, Bottom = val3, Left = val4 */
.element {
    clip-path: inset(50px 80px 100px 120px);
}
```

除了使用 `<length-percentage>` 值指定矩形的内边距之外，还可以显式使用 `round` 关键词来绘制带有圆角的矩形：

:::demo

```css
.container {
  width: 200px;
  height: 100px;
  background: rgba(98, 73, 65, 0.8);
  
  .box {
    width: 100%;
    height: 100%;
    background: rgb(238, 170, 156);
    /* 10px 为圆角半径 */
    clip-path: inset(20px round 10px);
  }
}
```

```html
<div class="container">
  <div class="box"></div>
</div>
```

:::

> 可以为矩形每个角指定不同的半径

## 制圆形：circle()

```css
.element {
    clip-path: circle(100px); /* r=100px, 圆心坐标是 (0,0) */
}

.element {
    clip-path: circle(100px at 100px 100px); /* r=100px, 圆心坐标是 (100px, 100px) */
}
```

例子：

:::demo

```css
.container {
  width: 100px;
  height: 100px;
  background: rgba(98, 73, 65, 0.8);
  
  .box {
    width: 100%;
    height: 100%;
    background: rgb(238, 170, 156);
    clip-path: circle(50px at 0 0);
  }
}
```

```html
<div class="container">
  <div class="box"></div>
</div>
```

:::

> 其半径还可以使用 **`closest-side`** 和 **`farthest-side`** 关键词：
>
> -   **`closest-side`** 会使用从形状中心到参考框最近边缘的长度。对于圆形，这是在任何维度上最近的边缘。对于椭圆，这是在半径维度上最近的边缘。
> -   **`farthest-side`** 会使用从形状中心到参考框最远边缘的长度。对于圆形，这是在任何维度上最远的边缘。对于椭圆，这是在半径维度上最远的边缘。
>
> ```css
> .closest-side {
>   clip-path: circle(closest-side); 
> }
> ```

## 绘制椭圆：ellipse()

可以设置 `x` 轴的半径 `rx` 和 `y` 轴的半径 `ry` 来绘制一个椭圆，还可以通过 `at` 关键词设置圆心

```css
.element {
    clip-path: ellipse(100px 50px at 100px 100px); /* x 轴半径 rx = 100px, y 轴半径 ry = 50px, 圆心坐标位置是 (100px, 100px) */
}
```

例子：

:::demo

```css
.container {
  width: 200px;
  height: 100px;
  background: rgba(98, 73, 65, 0.8);
  
  .box {
    width: 100%;
    height: 100%;
    background: rgb(238, 170, 156);
    clip-path: ellipse(farthest-side closest-side);
  }
}
```

```html
<div class="container">
  <div class="box"></div>
</div>
```

:::

> 其半径还可以使用 **`closest-side`** 和 **`farthest-side`** 关键词：
>
> -   **`closest-side`** 会使用从形状中心到参考框最近边缘的长度。对于圆形，这是在任何维度上最近的边缘。对于椭圆，这是在半径维度上最近的边缘。
> -   **`farthest-side`** 会使用从形状中心到参考框最远边缘的长度。对于圆形，这是在任何维度上最远的边缘。对于椭圆，这是在半径维度上最远的边缘。
>
> ```css
> .closest-side {
>   clip-path: circle(closest-side); 
> }
> ```

## 绘制多边形：polygon()

可以使用 `polygon()` 绘制多边形，比如三角形，四边形，五边形，甚至是不规则的多边形等。你只需要给 `polygon()` 传入多个坐标值，并且使用逗号（`,`）将每对坐标值进行分隔

:::demo

```css
div {
  width: 100px;
  height: 100px;
  background: rgb(238, 170, 156);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
```

```html
<div></div>
```

:::

可以使用 [在线工具 clippy 来绘制不同的形状](https://bennettfeely.com/clippy/)

## 引用 SVG 路径绘制图形：url()

通过 `url()` 函数来引用 SVG 的 `path` 作为裁剪路径，对元素进行裁剪

1. 先使用 SVG 定义一个路径

```html
<svg width="0" height="0" style="position:absolute;">
    <clipPath id="custom-clip">
        <path d="M50,0 C77.614,0 100,22.386 100,50 C100,77.614 77.614,100 50,100 C22.386,100 0,77.614 0,50 C0,22.386 22.386,0 50,0 Z" />
    </clipPath>
</svg>
```

2. 将 `custom-clip` 作为 `url()` 的参数来定义 `clip-path`

```css
.element {
    clip-path: url(#custom-clip);
}
```

## 引用 SVG 路径绘制图形：path()

可以使用 `path()` 函数，将 SVG 的路径来裁剪元素

:::demo

```css
div {
    width: 300px;
    height: 300px;
    clip-path: path('M256 203C150 309 150 309 44 203 15 174 15 126 44 97 73 68 121 68 150 97 179 68 227 68 256 97 285 126 285 174 256 203');
    background: rgb(238, 170, 156);
}
```

```html
<div></div>
```

:::