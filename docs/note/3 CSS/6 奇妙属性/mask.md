# CSS Mask

## 📋 介绍

可以使用图像、渐变或SVG来**控制元素的可见性**。

**核心原理**：遮罩中的**透明部分**会让元素对应区域变得透明，**不透明部分**保持元素可见。

:::dom

```html
<div class="warpper">
  <div class="item">
    <div>不透明</div>
    <img src="/banner/1.webp" />
  </div>
  <div class="item">
    <div>透明度70%</div>
    <img src="/banner/1.webp" />
  </div>
  <div class="item">
    <div>透明度30%</div>
    <img src="/banner/1.webp" />
  </div>
  <div class="item">
    <div>完全透明</div>
    <img src="/banner/1.webp" />
  </div>
</div>
```
```css
.warpper {
  display: flex;
  gap: 10px;
}
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
img {
  width: 100%;
}
.item:nth-child(1) img {
  mask: linear-gradient(to right, #fff 0, #fff 100%);
  -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%);
}
.item:nth-child(2) img {
  mask: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0, rgba(255, 255, 255, 0.7) 100%);
  -webkit-mask: linear-gradient(to right, rgba(255, 255, 255, 0.7) 0, rgba(255, 255, 255, 0.7) 100%);
}
.item:nth-child(3) img {
  mask: linear-gradient(to right, rgba(255, 255, 255, 0.3) 0, rgba(255, 255, 255, 0.3) 100%);
  -webkit-mask: linear-gradient(to right, rgba(255, 255, 255, 0.3) 0, rgba(255, 255, 255, 0.3) 100%);
}
.item:nth-child(4) img {
  mask: linear-gradient(to right, transparent 0, transparent 100%);
  -webkit-mask: linear-gradient(to right, transparent 0, transparent 100%);
}
```

:::

特点：

- **非破坏性**：不会改变原始元素的结构和内容
- **灵活性强**：支持图片、渐变、SVG等多种遮罩源
- **动画友好**：可以轻松实现动态遮罩效果
- **性能优良**：GPU加速，渲染效率高

## 🔧 基础属性解析

#### mask-image
定义遮罩图像源
```css
mask-image: none | <image> | <mask-source>
```

1. 图片

```css
mask: url(mask.png);            /* 使用位图来做遮罩 */
mask: url(masks.svg#star);      /* 使用 SVG 图形中的形状来做遮罩 */
```

:::demo
```html
<div>
  <img src="/category-icon/css.svg" />
  <svg>
    <defs>
      <mask id="mask-221e4e9a-225f-4771-bdcc-f8be456db11c">
          <path fill="white" d="M 10,30
          A 20,20 0,0,1 50,30
          A 20,20 0,0,1 90,30
          Q 90,60 50,90
          Q 10,60 10,30 z">
          </path>
      </mask>
    </defs>
  </svg>
</div>
```

```css
div {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
}
img {
  width: 100px;
  height: 100px;
  mask: url(#mask-221e4e9a-225f-4771-bdcc-f8be456db11c);
  -webkit-mask: url(#mask-221e4e9a-225f-4771-bdcc-f8be456db11c);
}
svg {
  width: 0;
  height: 0;
}
:::

2. 渐变
```css
mask: linear-gradient(#000, transparent);
```

#### mask-position

定义遮罩位置
```css
mask-position: top|bottom|left|right|center|percentage
```

#### mask-size
定义遮罩尺寸
```css
mask-size: <bg-size>
```

#### mask-repeat
定义遮罩重复方式
```css
mask-repeat: <repeat-style>
```

- repeat: 默认值，遮罩会在图片区域重复绘制
- space: 遮罩尽可能多的平铺，且遮罩之间产生间距，遮罩图片不会被裁剪
- round: 遮罩会压缩或者拉伸占满整个图片
- no-repeat: 遮罩不会重复

> 当 size 小于容器大小，并且不重复时，其他区域会直接不显示
> :::demo
> ```html
> <div></div>
> ```
> ```css
> div {
>   width: 100px;
>   height: 100px;
>   background: pink;
>   mask: linear-gradient(to right, #fff 0, #fff 100%) center no-repeat;
>   mask-position: right bottom;
>   mask-size: 50px 50px;
>   -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%) center no-repeat;
>   -webkit-mask-position: right bottom;
>   -webkit-mask-size: 50px 50px;
> }
> ```
> :::

#### mask-clip
定义mask-image作用的图片区域
```css
mask-clip: content-box|padding-box|border-box|margin-box|fill-box|stroke-box|view-box|no-clip
```

## 🎨 mask-composite

`mask-composite` 属性定义了**多个遮罩层之间的合成方式**，类似于Photoshop中的图层混合模式。

### 支持的合成操作符

#### add（添加）
- **效果**：将多个遮罩层**相加**
- **公式**：A + B
- **适用场景**：需要扩大遮罩范围时

:::demo
```html
<div></div>
```
```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  background: pink;
  mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  mask-size: 50px 50px;
  mask-repeat: no-repeat;
  mask-position: top left, center center;
  mask-composite: add;
  -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  -webkit-mask-size: 50px 50px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top left, center center;
  -webkit-mask-composite: source-over;
}
```
:::

#### subtract（减去）
- **效果**：从第一个遮罩中**减去**后续遮罩
- **公式**：A - B
- **适用场景**：在遮罩中挖洞或创建缺口

:::demo
```html
<div></div>
```
```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  background: pink;
  mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  mask-size: 50px 50px;
  mask-repeat: no-repeat;
  mask-position: top left, center center;
  mask-composite: add;
  -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  -webkit-mask-size: 50px 50px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top left, center center;
  -webkit-mask-composite: source-out;
}
```
:::

#### intersect（交集）
- **效果**：只保留**重叠部分**
- **公式**：A ∩ B
- **适用场景**：创建精确的遮罩区域

:::demo
```html
<div></div>
```
```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  background: pink;
  mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  mask-size: 50px 50px;
  mask-repeat: no-repeat;
  mask-position: top left, center center;
  mask-composite: add;
  -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  -webkit-mask-size: 50px 50px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top left, center center;
  -webkit-mask-composite: source-in;
}
```
:::

#### exclude（排除）
- **效果**：保留**非重叠部分**
- **公式**：A ∪ B - (A ∩ B)
- **适用场景**：创建环形或复杂形状

:::demo
```html
<div></div>
```
```css
div {
  position: relative;
  width: 100px;
  height: 100px;
  background: pink;
  mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  mask-size: 50px 50px;
  mask-repeat: no-repeat;
  mask-position: top left, center center;
  mask-composite: add;
  -webkit-mask: linear-gradient(to right, #fff 0, #fff 100%), linear-gradient(to right, #fff 0, #fff 100%);
  -webkit-mask-size: 50px 50px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top left, center center;
  -webkit-mask-composite: xor;
}
```
:::

> `-webkit-mask-composite` 会有不同的值
>
> ```css
> -webkit-mask-composite: clear; /*清除，不显示任何遮罩*/
> -webkit-mask-composite: copy; /*只显示上方遮罩，不显示下方遮罩*/
> -webkit-mask-composite: source-over; 
> -webkit-mask-composite: source-in; /*只显示重合的地方*/
> -webkit-mask-composite: source-out; /*只显示上方遮罩，重合的地方不显示*/
> -webkit-mask-composite: source-atop;
> -webkit-mask-composite: destination-over;
> -webkit-mask-composite: destination-in; /*只显示重合的地方*/
> -webkit-mask-composite: destination-out;/*只显示下方遮罩，重合的地方不显示*/
> -webkit-mask-composite: destination-atop;
> -webkit-mask-composite: xor; /*只显示不重合的地方*/
> ```

## 💡 实用实践例子

### 1. 渐变边框效果 ✨

这是最经典的mask应用之一，可以创建**渐变色的边框**效果。

:::demo

```html
<div></div>
```

```css
div {
  width: 200px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); /** 边框渐变 **/
  border-radius: 10px;
  padding: 1px; /** 边框宽度 **/
  mask: linear-gradient(#fff 0 100%) content-box, linear-gradient(#fff 0 100%);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 100%) content-box, linear-gradient(#fff 0 100%);
  -webkit-mask-composite: xor;
}
```

:::

**原理说明**：
1. 元素使用**渐变背景**作为边框颜色
2. 创建两层mask，一层在 `content-box` ，一层默认
3. 通过 `mask-composite: subtract` 让内层"挖空"外层，形成边框效果

### 2. 切角效果 🔲

使用多个线性渐变创建切角效果：

:::demo

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    mask: linear-gradient(135deg, transparent 30px, #fff 0) top left,
    linear-gradient(-135deg, transparent 30px, #fff 0) top right,
    linear-gradient(-45deg, transparent 30px, #fff 0) bottom right,
    linear-gradient(45deg, transparent 30px, #fff 0) bottom left;
    mask-size: 50% 50%;
    mask-repeat: no-repeat;
}
```

:::

### 3. 图片转场动画 🎬

:::demo

```html
<div></div>
```

```less
.keyframe-loop(@i) when (@i <= 100) {
  @percentage: @i * 1%;
  @{percentage} {
    mask: linear-gradient(45deg, #000 0%, transparent @percentage);
  }
  .keyframe-loop(@i + 1);
}

@keyframes maskTransition {
  .keyframe-loop(0); // 从0开始循环
}

div {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  animation: maskTransition 2s ease-in-out infinite;
}
```

:::