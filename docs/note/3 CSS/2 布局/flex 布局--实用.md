# flex布局--实用

## 等高布局

效果：父元素的高由子元素决定，且每个子元素的高都是相同的

实现：

1. 父为 **flex** 布局，无高度
2. 子无高度

:::demo

```html
<div class="parent">
    <div class="child">
        <div>child</div>
        <div>child</div>
        <div>child</div>
        <div>child</div>
    </div>
    <div class="child">
        <div>child</div>
    </div>
</div>
```

```css
.parent {
    display: flex;
    justify-content: space-between;
    width: 200px;
    background: pink;
}
.child {
    background: skyblue;
}
```

:::

##  左右布局

效果：一行有两个子元素，分别在左边和右边，其中间的间距自动计算

![](https://gitee.com/kingmusi/imgs/raw/master/blog/202110040113839.png)

#### 1、margin-left(right): auto

:::demo

```html
<div class="parent">
    <div>left</div>
    <div>right</div>
</div>
```

```css
.parent {
    display: flex;
    background: #ef475d;
}
.child {
    background: skyblue;
}
.parent div:nth-of-type(1) {
    margin-right: auto;
}
```

:::

#### 2、space-between

:::demo

```html
<div class="parent">
    <div>left</div>
    <div>right</div>
</div>
```

```css
.parent {
    display: flex;
    justify-content: space-between;
    background: #ef475d;
}
.child {
    background: skyblue;
}
```

:::

## 两行 / 三行布局

效果：两行或一行宽度固定，其中一行宽度自动计算

实现：只需要给需要自动计算的那一个子元素添加，`flex-grow: 1`

## 粘性 footer

效果：footer 在没有滚动条时，一直在视口底部，有滚动条时，则视口滚动到底部才能看到底部

实现：假设页面有三层，分别为 `header` 、 `main` 、 `footer` ，则给 `main` 添加 `flex-grow: 1`，让其自动撑开

:::demo

```html
<div>
    <header>头部</header>
    <main>中间</main>
    <footer>底部</footer>
</div>
```

```less
div {
    display: flex;
    flex-direction: column;
    height: 200px;

    header {
		height: 50px;
        background-color: #b083c0;
    }
    main {
      	flex-grow: 1;
      	background-color: #877ebf;
    }
    footer {
        height: 50px;
        background-color: #5373bf;
    }
}
```

:::

## 溢出布局

效果：子元素超出父元素宽度

通过子元素设置 `flex-shrink: 0` 实现

:::demo

```html
<div class="parent">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
```

```css
.parent {
    display: flex;
    width: 100px;
    height: 50px;
    align-items: center;
    background: pink;
}
.child {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    flex-shrink: 0;
    background: skyblue;
}
```

:::



