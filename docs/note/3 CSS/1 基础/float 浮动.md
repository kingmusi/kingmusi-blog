# 浮动

## 浮动元素与常规流元素的关系

1. 常规流`块级元素认为浮动元素不存在`

```html
<div class="block-red" />
<div class="float-pink" />
```

```css
.block-red {
  width: 100px;
  height: 100px;
  background: red;
}
.float-pink {
  float: left;
  width: 90px;
  height: 90px;
  background: pink;
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201215162550.png)

> 红色的块级元素没有受到粉色浮动元素的影响，还展示在左上角的位置，但是被粉色元素盖住了左边的部分

2. 常规流`行内元素会被浮动元素影响`

```html
<div>
    <div class="float-pink"></div>
	例如：文字出现在浮动元素旁边时，会发生文字环绕的效果。 浮动元素会间接影响父级（块级元素）元素，如这里的body，因为浮动元素的占位导致多了一点宽度，使父级高度增加
</div>
```

```css
.float-pink {
    float: left;
    width: 20px;
    height: 20px;
    background: pink;
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201215164332.png)

> 文字出现在浮动元素旁边时，会发生文字环绕的效果。 浮动元素会间接影响父级（块级元素）元素，如这里的body，因为浮动元素的占位导致多了一点宽度，使父级高度增加

## 浮动元素之间的关系

1. 浮动的框可以向左或向右移动，直到他的 **margin** 碰到父级框或另⼀个浮动框的边框为⽌。
2. 不能超出父级框，除非浮动元素的宽大于父级的宽
3. 不能超过同行的最高点

## 清除浮动的方法

1. 添加空标签：产生多余的标签，不利于阅读

```css
{clear: both}
```

2. 把父级元素变为BFC（**overfloat:hidden**、浮动）：可能会产生冲突

3. `afer`：推荐

```css
.clear::after{  /* 适用于大部分浏览器 */
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clear{  /* IE6清除浮动的方法 */
    *zoom: 1;
}
```