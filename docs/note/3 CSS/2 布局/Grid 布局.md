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
> }
> .parent div:nth-of-type(1) {
>     grid-area: a;
> }
> .parent div:nth-of-type(2) {
>     grid-area: b;
> }
> .parent div:nth-of-type(3) {
>     grid-area: c;
> }
> ```
>
> ![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050141038.png)

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



![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050146390.png)

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

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050149174.png)

**space-between** 的效果

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050150849.png)

## grid-auto

浏览器自动创建的多余网格的列宽和行高

**grid-auto-columns**：指定多余网格的列宽

**grid-auto-rows**：指定多余网格的行高



每一个新增的单元格高都为 **100px**

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    width: 300px;
    height: 300px;
    background: skyblue;
}
.parent div {
    background: pink;
    border: 1px solid black;
    box-sizing: border-box;
}
```



![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050155841.png)

## 项目位置

网格线从 **1** 开始，最终网格线为单元格的 **length + 1**

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050159811.png)

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线
- `grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置

指定四个值，则可确定一个单元格的位置（合并单元格）

```css
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}
```

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050203345.png)

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

