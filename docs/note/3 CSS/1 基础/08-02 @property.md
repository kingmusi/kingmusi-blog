 # @property

> 允许 Web 开发者显式地定义他们的 CSS 自定义属性，而且允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承

## 语法

#### 属性

- `@property --property-name` 中的 `--property-name` 就是自定义属性的名称，定义后可在 CSS 中通过 `var(--property-name)` 进行引用
- syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型
- inherits：是否允许继承
- initial-value：初始值

`@property` 规则中的 syntax 和 inherits 描述符是必需的

```css
@property --custom-property-name {
    syntax: "<color>";
    inherits: false;
    initial-value: #c0ffee;
}
```

```js
CSS.registerProperty({
  name: "--custom-property-name",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee"
});
```

#### 支持的 syntax 语法类型

- **`<length>`** ：任何有效的[长度值](https://www.w3.org/TR/css3-values/#length-value)，例如 `10px` ，`10vw` 等
- **`<number>`** ：任何有效的[数字值](https://www.w3.org/TR/css3-values/#number-value)，例如 `1` 、`1000` 等
- **`<percentage>`** ：任何有效的[百分比值](https://www.w3.org/TR/css3-values/#percentage-value)，例如 `10%`
- **`<length-percentage>`** ：任何有效的长度值（`<length>`）或百分比值（`<percentage>`），例如 `10px` 或 `10%`
- **`<color>`** ：任何有效的[颜色值](https://www.w3.org/TR/css-color-3/#valuea-def-color)，例如 `red` 、`#fff` 、`rgb(0 0 0)` 等
- **`<image>`** ：任何有效的[图像值](https://www.w3.org/TR/css3-images/#image-type)，例如 `url()` 函数引入的图像，`<gradient>` （渐变）绘制的图像等
- **`<url>`** ：任何有效的 `url 值`，例如 `url(star.png)`
- **`<integer>`** ：任何有效的[整数值](https://www.w3.org/TR/css3-values/#integer-value)，例如 `1` 、`2` 等
- **`<angle>`** ：任何有效的[角度值](https://www.w3.org/TR/css3-values/#angle-value)，例如 `360deg` 、`400grad` 、`1rad` 和 `1turn` 等
- **`<time>`** ：任何有效的[时间值](https://www.w3.org/TR/css3-values/#time-value)，例如 `.2s` 、`200ms` 等
- **`<resolution>`** ：任何有效的[分辨率值](https://www.w3.org/TR/css3-values/#resolution-value)，例如 `dpi`、`dpcm` 和 `dppx`等
- **`<transform-list>`** ：任何有效的[变换函数](https://www.w3.org/TR/css-transforms-1/#typedef-transform-function)，例如 `rotate()` 、`translate()` 等
- **`<custom-ident>`** ：任何有效的 `ident 值`，例如 `easing` 、`linear` 等

syntax 中的 `+`、`#`、`|` 符号

- `+` ：接受以空格分隔的列表，例如 `<length>+` ，表示接受以空格分隔的长度值（`<length>`）列表
- `#` ：接受以逗号分隔的列表，例如 `<color>#` ，表示接受以逗号分隔的颜色值（`<color>`）列表
- `|` ：接受以竖线分隔的列表，例如 `<length> | <lenthg>+` ，表示接受单个长度值（`<length>`）或者以空格分隔的长度值列表

```css
syntax: "<color>";                 /* 接收一个颜色值 */
syntax: "<length> | <percentage>"; /* 接收长度或百分比参数，但是二者之间不进行计算合并 */
syntax: "small | medium | large";  /* 接收这些参数值之一作为自定义标识符 */
syntax: "*";                       /* 任何有效字符 */
```

## 变量过渡

`transition` 属性可以接受 `@property` 定义的变量，实现过渡的动画效果

:::demo

```vue
<template>
	<div></div>
</template>

<style scoped>
@property --color {
  syntax: '<color>';
  inherits: false;
  initial-value: #f00;
}

div {
  width: 100px;
  height: 100px;
  background: var(--color);
  /* 对变量定义过渡效果 */
  transition: --color 1s;
  
  /* hover 修改颜色 */
  &:hover {
    --color: #0f0;
  }
}
</style>
```

:::

## @keyframe 变量动画

:::demo

```vue
<template>
	<div class="box2"></div>
</template>

<style scoped>
@property --offset2 {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 0px;
}

.box2 {
  width: 50px;
  height: 50px;

  --offset2: 0;
  transform: translateX(var(--offset2));
  background-color: #09f;
  -webkit-animation: moveBox 2s linear infinite;
  animation: moveBox 2s linear infinite;
}

@keyframes moveBox {
  0% {
    --offset2: 0px;
  }
  50% {
    --offset2: 200px;
  }
  100% {
    --offset2: 400px;
  }
}
</style>
```

:::

> 如果不使用 @property 定义的变量，直接在 @keyframes 中改变，效果会是一跳一跳的，而不是有丝滑的动画效果

## 渐变色过渡

使用 `@property` 可以实现渐变色的过渡效果

:::demo

```vue
<template>
	<div></div>
</template>

<style scoped>

@property --colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

@property --colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}

div {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, var(--colorA), var(--colorB));
  transition: 1s --colorA, 1s --colorB;

  &:hover {
    --colorA: yellowgreen;
    --colorB: deeppink;
  }
}

</style>
```

:::

## 饼图过渡动画

:::demo

```vue
<template>
	<div></div>
</template>

<style scoped>
@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 25%;
}

div {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(yellowgreen, yellowgreen var(--per), transparent var(--per), transparent 100%);
  transition: --per 0.3s linear;

  &:hover {
    --per: 60%;
  }
}
</style>
```

:::