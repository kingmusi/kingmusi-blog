# filter

## 模糊：blur()

设置高斯模糊效果

"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；

:::demo

```css
img:nth-child(1) {
	filter: blur(10px);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 亮度：brightness()

设置更暗或更亮

- 如果值是0%，会全黑。
- 值是100%，则无变化。
- 值超过100%，会比原来更亮。

:::demo

```css
img:nth-child(1) {
	filter: brightness(80%);
}
img:nth-child(2) {
  filter: brightness(120%);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 灰度：grayscale()

转换为灰色图像

- 0%：无变化
- 100%：完全转为灰度图像

> 应用场景：网站因为需要默哀，所以一般会全站灰色，这个时候就可以使用这个属性，一键全灰色

:::demo

```css
img:nth-child(1) {
	filter: grayscale(100%);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 引用外部文件：url()

`url()` 滤镜允许从链接的 SVG 元素或文件中应用 SVG 滤镜，让其作为滤镜效果的一部分

:::demo

```css
img:nth-child(1) {
	filter: url('#goo');
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>

<svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />    
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
    </defs>
</svg>
```

:::

## 投影：drop-shadow()

设置阴影效果

:::demo

```css
img:nth-child(1) {
	filter: drop-shadow(4px 4px 6px var(--tab-c-nav));
}

img:nth-child(2) {
  box-shadow: 4px 4px 6px 1px var(--tab-c-nav);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/logo.svg" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/logo.svg" />
</div>
```

:::

> 与 `box-shadow` 的区别：
>
> 1. `drop-shadow()` 可以为复杂图形（如一个 PNG 图片中带透明区域的图形、一个不规则的 `clip-path` 裁剪的 `div`、或文字本身）创建精确的阴影，阴影会紧贴内容的轮廓。而 `box-shadow` 只能给盒模型创建阴影
> 2. `drop-shadow()` 在有 `GPU` 加速的情况下，性能会比 `box-shadow` 更好

## 透明度：opacity()

设置透明效果

:::demo

```css
img:nth-child(1) {
	filter: opacity(0.5);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

> 和 `opacity` 属性区别不大，都能有 `gpu` 性能提升的效果。`opacity` 属性具有更好的语义，所以更推荐用这个

## 复古的棕褐色调：sepia()

设置深褐色效果，用于模拟摄影印刷技术

:::demo

```css
img:nth-child(1) {
	filter: sepia(1);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 饱和度：saturate()

修改饱和度

- 值为0%则是完全不饱和
- 值为100%则无变化
- 值大于100%，则饱和度增高，色彩就会变重

:::demo

```css
img:nth-child(1) {
	filter: saturate(180%);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 色调旋转：hue-rotate()

应用色相旋转，和`hsl()` 中的色相（颜色轮的旋转）类似

:::demo

```css
img:nth-child(1) {
	filter: hue-rotate(180deg);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 反转：invert()

反转颜色

- 0%无变化
- 100%则完全反转

:::demo

```css
img:nth-child(1) {
	filter: invert(100%);
}
```

```html
<div style="display: flex; gap: 1em;">
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
  <img style="flex: 1; width: calc(100% / 2 - 1em);" src="/banner/1.webp" />
</div>
```

:::

## 应用

#### 1、一张图，改变色相，实现不同颜色效果

:::demo

```html
<div class="frame">
  <div class="car">
    <div class="car__bodywork"></div>
  </div>
</div>

<div class="panel">
  <button class="btn btn--color btn--color-5"></button>
  <button class="btn btn--color btn--color-4"></button>
  <button class="btn btn--color btn--color-3"></button>
  <button class="btn btn--color btn--color-2"></button>
  <button class="btn btn--color btn--color-1"></button>
  <button class="btn btn--color btn--color-0 btn--is-active"></button>
</div>
```

```css
/* 简化 CSS 层级，只保留必要的 */
@layer reset, layout, filter;

/* ---------------------------------------------------- */
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

/* ---------------------------------------------------- */
@layer layout {
  .frame {
    margin: auto;
    inset: 0;
    width: 555px;
    height: 366px;
  }

  .panel {
    width: 555px;
    text-align: center;
    margin: auto;

    & button {
      margin: 0 3px;
    }
  }

  /* 基础车体样式 */
  .car {
    width: 555px;
    height: 366px;
    position: relative;

    .car__bodywork {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      /* 车辆图片和过渡效果 */
      background-image: url(http://i.imgur.com/Yx121H3.png);
      transition: filter 1s; /* 保持过渡平滑 */
    }
  }

  /* 按钮基本样式 */
  .btn {
    border: 0 none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: box-shadow 0.3s, filter 1s; 
    
    /* === 修复点 1：恢复按钮的背景图样式 === */
    background-image: url(http://i.imgur.com/vfIXJBI.png);
    background-size: 250%;
    background-position: 0px; /* 原代码中，所有的btn--color按钮都有这个背景 */
    
    box-shadow: 0 0 0 0px #fff inset;
    
    &:hover {
      box-shadow: 0 0 0 2px #fff inset;
    }
    &.btn--is-active {
      box-shadow: 0 0 0 4px #fff inset;
    }
  }
}

/* ---------------------------------------------------- */
@layer filter {
  /* 基础滤镜，确保图片可以接受 hue-rotate 变化 */
  :is(.btn--color, .car__bodywork) { 
    --hue: 0deg;
    filter: sepia() saturate(1000%) hue-rotate(var(--hue));
  }

  /* 定义每个色相对应的 CSS 变量值 (现在同时作用于按钮和车体) */
  .car__color-0, .btn--color-0 { --hue: 0deg; }
  .car__color-1, .btn--color-1 { --hue: 60deg; }
  .car__color-2, .btn--color-2 { --hue: 120deg; }
  .car__color-3, .btn--color-3 { --hue: 180deg; }
  .car__color-4, .btn--color-4 { --hue: 240deg; }
  .car__color-5, .btn--color-5 { --hue: 300deg; }
}
```

```js
// 获取 DOM 元素
const bodyWork = document.querySelector('.car__bodywork');
const colorBtns = document.querySelectorAll('.btn--color');

for (const btn of colorBtns) {
  btn.onclick = () => {
    const num = parseInt(Array.from(btn.classList).find(i => i.startsWith('btn--color-')).replace('btn--color-', ''))
    applyHue(num)
  }
}

/**
 * 改变车身图片的色相，并切换按钮的激活状态
 * @param {number} number - 色相对应的编号 (0-5)
 */
function applyHue(number) {
  // 1. 移除所有按钮的激活状态
  colorBtns.forEach(btn => btn.classList.remove('btn--is-active'));
  
  // 2. 激活当前被点击的按钮
  const clickedBtn = document.querySelector(`.btn--color-${number}`);
  if (clickedBtn) {
    clickedBtn.classList.add('btn--is-active');
  }

  // 3. 更新车身元素的类名，触发 CSS 变量 --hue 的变化
  // 只需要设置 car__color-N 这个类名
  bodyWork.className = `car__bodywork car__color-${number}`;
}

// 确保初始状态时，btn--color-0 处于激活状态
document.addEventListener('DOMContentLoaded', () => {
    applyHue(0);
});
```

:::

#### 2、Gooey Effect（粘滞效果）

$$
\text{Gooey Effect} = \text{Blur (模糊)} + \text{Contrast (强对比度)}
$$



1. 第一步：模糊 (`blur(10px)`)
   - 两个圆（`::before` 和 `::after`），当应用 `filter: blur(10px)` 时，这两个圆的**边缘变得模糊**，变成了像光晕一样的团块
2. 第二步：强对比度 (`contrast(30)`)
   - `30` 是一个非常大的值（即 3000% 的对比度）
   - 对比度滤镜的作用是：**把“既不黑也不白”的中间色，强制推向极端**
     - 颜色浅（淡）的地方 -> 变成纯白（或透明/背景色）
     - 颜色深（浓）的地方 -> 变成纯色（实体）
   - 

:::demo

```css
div {
  filter: blur(10px) contrast(30);
  position: relative;
  width: 500px;
  aspect-ratio: 21 / 9;
  background: #fff;
  
  &::before,
  &::after {
    --size: 80px;
    content: "";
    display: block;
    width: var(--size);
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    left: calc(50% - var(--size) / 2);
    top: calc(50% - var(--size) / 2);
  }
  
  &::before {
    --size: 120px;
    background: linear-gradient(
      to bottom left in oklab, 
      oklch(100% .4 95) 0%, oklch(100% .4 95) 100%
    );
     translate: -200px 0;
  }
  &::after {
    background: conic-gradient(
      from 0deg at 0% 0% in oklch, 
      oklch(75% 0.5 156) 0%, oklch(70% 0.5 261) 100%
    );
    translate: 200px 0;
  }
}
```

```html
<div></div>
```

:::