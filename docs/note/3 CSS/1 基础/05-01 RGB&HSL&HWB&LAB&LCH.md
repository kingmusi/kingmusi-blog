# 颜色格式——RGB、HSL、HWB、LAB、LCH



## 概述

CSS 颜色的各种格式的值都可以用于可接受 `<color>` 值类型的属性

```css
.element {
    color: red;                   /* <named-color> */
    color: #ff0000;               /* <hex-color>   */
    color: rgb(255 0 0);          /* <rgb()>       */
    color: hsl(0deg 100% 50%);    /* <hsl()>       */
    color: hwb(0deg 0% 0%);       /* <hwb()>       */
    color: lch(54 106.85 40.86);  /* <lch()>       */
    color: lab(54 80.81 69.9);    /* <lab()>       */
}
```

## 命名颜色

可以用一些英文单词来描述颜色的值，它们不区分大小写，比如 `red`

具体可以在 [ @Anthony Lieuallen 制作的页面](https://arantius.github.io/web-color-wheel/) 中查看各个命名颜色

## 十六进制颜色（sRGB空间）

十六进制颜色表示法在 CSS 中被称为 `<hex-color>`，其语法是一个 `<hash-token>` 令牌，其值由 `3`、`4`、`6` 或 `8` 个十六进制数字组成

哈希符 `#` 后面带了 `6` 位数，这六位数会分成三对，从左往右每两位分别代表的是红色（Red）、绿色（Green）和蓝色（Blue）三个通道。每位值都可以是数字 `0~9` 或字母 `a~f` 组合而成。

三位数的十六进制颜色表示法是六位数十六进制颜色表示法的简化形式。当六位数的十六进制数中每对数值相同时，可以简写，即 **`#RRGGBB`** **简写成** **`#RGB`**

```css
.element {
    /** 等价 */
    color: rgb(255, 255, 255);
    color: #ffffff;
    color: #fff;
}
```

在六位数十六进制的基础上增加了**第四对**数，这一对数主要是用来指定颜色的**透明通道**。同样的，这对值可以是数字 `0~9` 或字母 `a~f`。比如上图中的 `#00ff00cc` 颜色对应的就是`rgb(0, 255, 0, .8)`，同样也可以简写，比如 `#00ff00cc` 可以简写成 `#0f0c`

## RGB 颜色（sRGB空间）

`RGB`（红、绿、蓝）格式是写颜色的另一种选择，相对十六进制颜色，相对更容易读（减少了10进制转换为16进制的过程）

```css
.element {
    color: rgb(255, 0, 0, .8);
}
```

注意，`rgb()` 带有四个值时，它和 `rgba()` 是等同的。（这是 CSS4 的新语法）

## HSL 颜色（sRGB空间）

> 不同于十六进制颜色和RGB颜色的思想：传递红、绿、蓝通道的特定值

 `HSL` 颜色格式可以通过调整色相、饱和度或亮度参数来获得不同的颜色：

*   `H` 指的是色调，即 Hue，就是想要使用的颜色，其有效值的范围是 `0 ~ 360` （单位为度，即 `deg`）。在实际运用中，只需要记住色相环上的六大主色，用作基本参照：`360°`（`0°`）红、`60°` 黄、`120°` 绿、`180°` 青、`240°` 蓝、`300°` 洋红，它们在色相环上按照 `60°` 圆心角的间隔排列
*   `S` 指的是饱和度，即 SATURATION，就是使用的颜色中有多少色彩，它的有效值范围是 `0% ~ 100%` 。其中 `0%` 表示颜色中没有颜色，完全为灰；在 `100%` 时，表示颜色尽可能的鲜艳。在标准色轮上饱和度是从中心逐渐向边缘递增的。纯度即各色彩中包含的单种标准色成分的多少。纯度高的色彩色感强，即色度强，所以纯度亦是色彩感觉强弱的标志。不同色相所能达到的纯度是不同的，其中红色纯度最高，绿色纯度相对低些，其余色相居中，同时明度也不相同
*   `L` 指的是亮度，即 LIGHTNESS，就是使用的颜色的明度或暗度，它的有效值范围也是 `0% ~ 100%` 。其中 `0%` 表示颜色是全黑的；在 `100%` 时，表示颜色是纯白色的

<video src="https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/HSL.mp4" autoplay muted loop />

`hsl()` 也可以像 `rgb()` 颜色函数一样，可以往里传四个值，其中第四个值就是透明通道的值，它的值范围是 `0 ~ 1`

```css
.element {
    color: hsl(60deg, 50%, 50%, 80%);
}

/* 等同于 */
.element {
    color: hsla(60deg, 50%, 50%, 80%);
}
```

## HWB 颜色（sRGB空间）

HWB 是 Hue Whiteness Blackness 的简写，HWB 类似于 HSL ，因为它比 HSL 模型更直观（HSL 颜色本身被广泛认为比 RGB 更直观）。因此，它（HWB 颜色格式）也被称为“**更易于人类使用**”的颜色格式。这是因为，HWB 颜色允许你选择色相盘上的一种颜色，然后根据自己需要将其与白色和黑色混合。即可以在由黑色、白色和所选颜色所组成的三角形中可视化

![img](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/HWB.webp)

HWB 和 HSL 类似，每个字母都代表不同的意义：

*   H：和 HSL 和 HSV 中的 H 相同，指的都是色相（颜色的角度）
*   W：指的是白色的程度，范围从 `0% ~ 100%`（或 `0 ~ 1`）
*   B：指的是黑色的程度，范围从 `0% ~ 100%`（或 `0 ~ 1`）

简单地说，HWB 它描述了一开始的色相（H），然后将一定程度的白色（W）和黑色（B）混合到基本色调，从而得到一个颜色：

![img](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/HWB-2.webp)

`hwb()` 颜色函数同样可以传入第四个参数，表示不透明度参数

```css
.element {
    color: hwb(30deg 20% 20% / .5);
}
```

## LAB 颜色（CIE Lab 颜色空间）

LAB 是一种可以在像 Photoshop 这样的软件中访问的颜色空间，如果想要一种颜色在屏幕上和印在 T 恤上看起来相同，建议使用 LAB

Lab 是一个中心亮度轴的直系坐标系。`100%` 表示 `L` 值为 `100`，而不是 `1.0`。`L=0%` 为深黑（完全无光），`L=100%` 为漫反射白根据设计，`L=50%` 是中灰色的，`L` 的等距增量在视觉上是均匀间隔的。`a` 轴和 `b` 轴表示色调，沿 `a` 轴的正值为红色，负值为补色，为绿色。同样，沿着 `b` 轴的正值为黄色，负值为互补的蓝色（或紫色）。去饱和的颜色 `a` 和 `b` 值较小，接近 `L` 轴；饱和色远离 `L`轴

![img](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/LAB.webp)

简单地说，LAB 有三个轴，亮度 `L` 轴，紧随其后的是 `a` 轴(绿色到红色)和 `b` 轴(蓝色到黄色)：

*   `L` （亮度）：取值范围为 `0~100`，表示亮度
*   `a` （分量）：代表由绿色到红色的光谱变化，取值范围均为 `-120~120`
*   `b` （分量）：代表由蓝色到黄色的光谱变化，取值范围均为 `-120~120`

使用 `lab()` 颜色函数同样可以传入第四个参数，表示不透明度参数

```css
.element {
    background-color: lab(80% 100 50 / .5);
}
```

## LCH 颜色（CIE Lab 颜色空间）

LCH 与 LAB 具有相同的 `L` 轴，但使用极坐标 `C`（色度）和 `H` (色调)。

简单地说， LCH 代表亮度（Lightness）、色度（Chroma）和色相（Hue）:

*   `L` （Lightness）：跟 LAB 一样，可以是一个超过 `100%` 的百分比
*   `C` （Chroma）：色彩的相对饱和度。类似于 HSL 颜色格式中的饱和度（S），但 LCH 中的 `C` 可以超过 `100`
*   `H` （Hue）：与 HSL 颜色格式中的色相（`H`）类似，范围值是 `0 ~ 360`

使用 `lch()` 颜色函数同样可以传入第四个参数，表示不透明度参数

```css
.element {
    background-color: lch(50% 132 95 / .5);
}
```

虽然在概念上 LCH 与 HSL 非常相似，但存在两个主要区别：

*   如前所述，LCH 优先考虑人类感知，因此具有相同“亮度”值的两种颜色将感觉同样明亮。
*   LCH 不局限于任何特定的颜色空间。

HSL 颜色都具有相同的“亮度”值： `50％`。然而，感觉它们并不一样轻。黄色比蓝色看起来更轻！这也说明，在 HSL 颜色中，亮度是没有意义的。颜色可以具有相同的亮度值，而其感知上的亮度差异巨大。造成这种现象的主要原因是， HSL 颜色格式是根据数学、物理模型建模的，它并不考虑人类感知。事实证明，人类对颜色的感知并不非常准确！

LCH 是一种旨在对人类感知均匀的颜色格式，它更接近人眼感知。如下图中 LCH 颜色，具有相同“亮度”值（都是 `50%`）的两种颜色（黄色和蓝色）应感觉同样明亮。

:::dom

```html
<div class="container">
  <div class="hsl-container">
    <div class="box-hsl-l50-1">hsl(60deg 100% 50%)</div>
    <div class="box-hsl-l50-2">hsl(240deg 100% 50%)</div>
    <div class="text">HSL</div>
  </div>
  <div class="lch-container">
    <div class="box-lch-l50-1">lch(50% 132 95)</div>
    <div class="box-lch-l50-2">lch(55% 132 280)</div>
    <div class="text">LCH</div>
  </div>
</div>
```

```less
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
	width: 100%;
  height: 200px;
  padding: 0 30px;
  box-sizing: border-box;
	background-color: rgb(85, 86, 114);
  &::before {
    z-index: 1;
		content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    height: 100%;
    width: 2px;
    background: #eee;
  }
 
  .hsl-container, .lch-container {
    position: relative;
    display: flex;
    flex: 1;
  }
  
  & :is(.box-hsl-l50-1, .box-hsl-l50-2, .box-lch-l50-1, .box-lch-l50-2) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100px;
    color: deeppink;
  }
  
  .box-hsl-l50-1 {
    background-color:hsl(60deg 100% 50%);
  }

  .box-hsl-l50-2 {
    background-color:hsl(240deg 100% 50%);
  }

  .box-lch-l50-1 {
    background-color:lch(50% 132 95);
  }

  .box-lch-l50-2 {
    background-color:lch(55% 132 280);
  }
  
  .text {
		position: absolute;
    bottom: -10px;
    left: 50%;
    color: #fff;
    font-size: 1.8em;
    transform: translate(-50%, 100%);
  }
}
```

:::
