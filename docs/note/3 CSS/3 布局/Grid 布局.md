# Grid布局

## 概念

- `容器` 和 `项目`

  ```html
  <div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
  </div>
  ```

  最外层的 **div** 是容器，内层的三个 **div** 是项目

- **Grid** 布局是一个二维布局，有`列和行`

- 定义一个容器为 **grid** 布局

  ```css
  display: grid
  ```

## 行列

1. `grid-template-columns`属性定义每一列的列宽
2. `grid-template-rows`属性定义每一行的行高

> **repeat()**：重复函数
>
> 定义一个三行三列，列宽和行高都是 **100px** 的网格
>
> ```css
> .container {
> 	display: grid;
> 	grid-template-columns: repeat(3, 100px);
> 	grid-template-rows: repeat(3, 100px);
> }
> ```

> **auto-fill**：自动填充
>
> 用于单元格大小固定，但容器大小不固定，并希望每一行（列）容纳尽可能多的单元格
>
> ```css
> .container {
>   	display: grid;
>   	grid-template-columns: repeat(auto-fill, 100px);
> }
> ```

> **fr**：比例
>
> 定义两个单元格，一个占据容器宽度的 1/3，一个占据容器宽度的 2/3
>
> ```css
> .container {
>  	display: grid;
>   	grid-template-columns: 1fr 2fr;
> }
> ```

> **minmax()**：范围
>
> 产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值
>
> 定义一个单元格，最小为 **100px**，最大随着容器宽度变化
>
> ```css
> .container {
>  	display: grid;
>   	grid-template-columns: minmax(100px, 1fr);
> }
> ```

> **auto**：自动填充
>
> 三列布局
>
> ```css
> .container {
>  	display: grid;
>   	grid-template-columns: 100px auto 100px;
> }
> ```

## 间隔

1. `row-gap`属性设置行与行的间隔（行间距）
2. `column-gap`属性设置列与列的间隔（列间距）
3. `gap`属性是`column-gap`和`row-gap`的合并简写形式

## 区域

通过 `grid-template-areas` 可以自定义区域

> 自定义一个单元格（合并单元格）
>
> :::demo
>
> ```html
> <div class="parent">
>     <div>1</div>
>     <div>2</div>
>     <div>3</div>
> </div>
> ```
>
> ```css
> .parent {
>     display: grid;
>     grid-template-columns: repeat(3, 1fr);
>     grid-template-rows: repeat(3, 1fr);
>     grid-template-areas: 
>     "a a b"
>     "a a b"
>     "c c c";
>     width: 300px;
>     height: 300px;
> }
> .parent div {
>     background: pink;
>     border: 1px solid black;
>     color: #000;
> }
> .parent div:nth-of-type(1) {
> 	grid-area: a;
> }
> .parent div:nth-of-type(2) {
>  	grid-area: b;
> }
> .parent div:nth-of-type(3) {
>  	grid-area: c;
> }
> ```
>
> :::

## 单元格里的元素排列方式

当子元素的大小小于单元格的大小，才生效

`justify-items`属性设置单元格内容的水平位置

`align-items`属性设置单元格内容的垂直位置

`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    place-items: center;
    width: 300px;
    height: 300px;
    background: skyblue;
}
.parent div {
    width: 50px;
    height: 50px;
    background: pink;
}
```



:::demo

```html
<div class="parent">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
</div>
```

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    place-items: center;
    width: 300px;
    height: 300px;
    background: skyblue;
}
/** div 一个格子为 100 * 100，但自身宽高为 50 * 50，所以有 50 * 50的空余  */
.parent div {
    width: 50px;
    height: 50px;
    background: pink;
    color: #000;
}
```

:::

## 整个内容区在父容器内的排列方式

`justify-content`属性是整个内容区域在容器里面的水平位置

`align-content`属性是整个内容区域的垂直位置

`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式

> - start - 对齐容器的起始边框。
> - end - 对齐容器的结束边框。
> - center - 容器内部居中。
> - stretch - 项目大小没有指定时，拉伸占据整个网格容器。
> - space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
> - space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
> - space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

**center** 的效果

:::dom

```vue
<template>
	<div class="container">
        <div v-for="(_, i) of Array(9).fill('')" :key="i">child{{ i + 1}}</div>
    </div>
</template>

<style scoped lang="less">
.container {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
	width: 400px;
    padding: 20px;
    border: 3px dotted var(--vp-c-text);
    box-sizing: border-box;
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(249 148 58);
        border-radius: 16px;
        border: 3px solid #000;
        color: #000;
    }
}
</style>
```

:::

**space-between** 的效果

:::dom

```vue
<template>
	<div class="container">
        <div v-for="(_, i) of Array(9).fill('')" :key="i">child{{ i + 1}}</div>
    </div>
</template>

<style scoped lang="less">
.container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
	width: 400px;
    padding: 20px;
    border: 3px dotted var(--vp-c-text);
    box-sizing: border-box;
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(249 148 58);
        border-radius: 16px;
        border: 3px solid #000;
        color: #000;
    }
}
</style>
```

:::

## grid-auto

浏览器自动创建的多余网格的列宽和行高

**grid-auto-columns**：指定多余网格的列宽

**grid-auto-rows**：指定多余网格的行高



:::demo

```html
<div class="parent">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
```

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /** 每一个新增的单元格高都为 100px */
    grid-auto-rows: 100px;
    width: 300px;
    height: 300px;
    background: skyblue;
}
.parent div {
    background: pink;
    border: 1px solid black;
    box-sizing: border-box;
    color: #000;
}
```

:::

## 项目位置

网格线从 **1** 开始，最终网格线为单元格的 **length + 1**

![](data:image/webp;base64,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)

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线
- `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置

指定四个值，则可确定一个单元格的位置（合并单元格）

:::demo

```html
<div class="parent">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
</div>
```

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    height: 300px;
}
.parent div {
    background: pink;
    border: 1px solid black;
    color: #000;
}
.parent div:nth-of-type(1) {
	grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```

:::

这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格

```css
.item-1 {
	grid-column-start: 1;
  grid-column-end: span 2;
  grid-row-start: 2;
  grid-row-end: span 2;
}
```

> 指定了1号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线
>

## 自定义子元素在单元格中的位置

`justify-self`属性设置单元格内容的水平位置（左中右）

`align-self`属性设置单元格内容的垂直位置

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

