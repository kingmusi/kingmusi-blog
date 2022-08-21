# mask

> 本文学习自 [奇妙的 CSS MASK](https://juejin.cn/post/6846687594693001223)

## 语法

mask 可以接受颜色、渐变、`url()` 图片等类似 background 的参数

**图片与 mask 生成的 transparent 的重叠部分，将会变得透明**

> 和 mask 其他颜色无关，只需要关注透明部分

## 渐变例子

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211752916.png)

```css
{
    background-image: url('./test.png');
    mask: linear-gradient(90deg, transparent, #fff);
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211752935.png)

## 切角例子

```css
{
    background-image: url('./test.webp');
    mask: 
        linear-gradient(135deg, transparent 30px, #fff 0)
        top left,
        linear-gradient(-135deg, transparent 30px, #fff 0)
        top right,
        linear-gradient(-45deg, transparent 30px, #fff 0)
        bottom right,
        linear-gradient(45deg, transparent 30px, #fff 0)
        bottom left;
    mask-size: 50% 50%;
    mask-repeat: no-repeat;
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211756767.png)

## 两张重叠图片

两张图片，一张完全重叠在另外一张之上

```js
div {
	position: relative;
	background-image: url('./test.webp');
}

div::before {
	content: "";
	position: absolute;
	top: 0;left: 0; right: 0;bottom: 0;
	background-image: url('./test2.webp');
	-webkit-mask: linear-gradient(45deg, #000 50%, transparent 50%);
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211808493.png)

上面使用的 mask 的渐变，是完全的实色变化，没有过度效果，稍微修改一下 mask 内的渐变

```diff
- mask: linear-gradient(45deg, #000 50%, transparent 50%)
+ mask: linear-gradient(45deg, #000 40%, transparent 60%)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211809540.png)

## 使用 MASK 进行转场动画

通过动态的去改变 mask 的值来实现图片的显示/转场效果

```css
div {
    background: url(image1.jpg);
    animation: maskMove 2s linear;
}

@keyframes maskMove {
    0% {
      mask: linear-gradient(45deg, #000 0%, transparent 5%, transparent 5%);
    }
    1% {
      mask: linear-gradient(45deg, #000 1%, transparent 6%, transparent 6%);
    }
    ...
    100% {
      mask: linear-gradient(45deg, #000 100%, transparent 105%, transparent 105%);
    }
}
```

当然直接写会很费力，可以借助 SASS/LESS 等预处理器进行操作

```scss
@keyframes maskRotate {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: linear-gradient(45deg, #000 #{$i + '%'}, transparent #{$i + 5 + '%'}, transparent 1%);
        }
    }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211817123.gif)

当然也可以使用角向渐变 `mask: conic-gradient()` 进行切换

```scss
@keyframes maskRotate {
    @for $i from 0 through 100 { 
        #{$i}% {
            mask: conic-gradient(#000 #{$i - 10 + '%'}, transparent #{$i + '%'}, transparent);
        }
    }
}
```



![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211819216.gif)

## mask 与图片

mask 属性传入的图片，并且遵循 background-image 与 mask 图片的透明重叠部分，将会变得透明

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211837702.gif)

此例子主要用到这样一张图片

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211833921.png)

然后，使用了逐帧动画，快速切换每一帧的 mask 

```css
.wrapper {
	position: relative;
	width: 384px;
	height: 216px;
}

.img1 {
	position: absolute;
	top: 0;left: 0; right: 0;bottom: 0;
	background-image: url('./test.webp');
	background-size:  cover;
}

.img2 {
	position: absolute;
	top: 0;left: 0; right: 0;bottom: 0;
	-mask: url(https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202208211833921.png);
    mask-size: 3000% 100%;
    animation: maskMove 2s steps(29) infinite;
}

.img2::before {
	content: "";
	position: absolute;
	top: 0;left: 0; right: 0;bottom: 0;
	background-image: url('./test2.webp');
	background-size:  cover;
}

@keyframes maskMove {
    from {
        mask-position: 0 0;
    }
    to {
        mask-position: 100% 0;
    }
}
```

```html
<div class="wrapper">
	<div class="img1"></div>
	<div class="img2"></div>
</div>