# Grid布局--实用

## 合并单元格

1. 通过 `area` 实现

```css
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
    "a a b"
    "a a b"
    "c c c";
    width: 300px;
    height: 300px;
}
.parent div {
    background: pink;
    border: 1px solid black;
}
.parent div:nth-of-type(1) {
	grid-area: a;
}
.parent div:nth-of-type(2) {
 	grid-area: b;
}
.parent div:nth-of-type(3) {
 	grid-area: c;
}
```

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050141038.png)

2. 通过子元素自行确定起始网格线和末尾网格线

```css
.item-1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```

或者使用 `span` 关键字，让其占据**两**个单元格

```css
.item-1 {
    grid-column-start: 1;
    grid-column-end: span 2;
    grid-row-start: 2;
    grid-row-end: span 2;
}
```

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110050203345.png)

## 叠加布局

实现多个元素叠加在一起效果，相较于用定位实现，会更方便

```css
.parent {
    display: grid;
    width: 100px;
    height: 100px;
}
.parent div:nth-of-type(1) {
    grid-area: 1/1/1/1;
    background: skyblue;
}
.parent div:nth-of-type(2) {
    display: inline;
    grid-area: 1/1/1/1;
    justify-self: end;
    margin: 5px;
    background: pink;
}
.parent div:nth-of-type(3) {
    grid-area: 1/1/1/1;
    align-self: end;
    background: gray;
}
```

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110052152946.png)

## 栅格布局

```css
.parent {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: 10px;
    width: 100vw;
    background: skyblue;
}
.parent div {
    background: pink;
}
.parent .col-1 {
    grid-area: auto/auto/auto/span 1;
}
.parent .col-2 {
    grid-area: auto/auto/auto/span 2;
}
...
.parent .col-12 {
    grid-area: auto/auto/auto/span 12;
}
```

```html
<div class="parent">
    <div class="col-6"></div>
</div>
```

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110052159816.png)

