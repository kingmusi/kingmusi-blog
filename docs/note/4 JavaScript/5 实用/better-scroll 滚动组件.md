# better-scroll 滚动组件

[文档](https://better-scroll.github.io/docs/zh-CN/plugins/)

## 安装

1. 引入全部功能

   ```bash
   npm install better-scroll --save
   ```

2. 按需引入（**推荐**），减少体积

   只安装滚动功能

   ```bash
   npm install @better-scroll/core --save
   ```

## 滚动功能使用

```html
<style>
	.wrap {
        /* 必须有高度 */
        width: 40%;
        height: 80vh;
        margin: 30px auto 0;
        border: 1px solid #000;
        overflow: hidden;
    }
</style>

<div class="wrap">
    <ul class="content">
    	<!--填充 100 个 li-->
    </ul>
</div>
```

- 默认：只有竖向的滚动

```js
import BScroll from '@better-scroll/core'
// import BScroll from 'better-scorll'

// .wrap 元素下第一个子元素拥有滚动功能，即下面的 .content 元素
const bs = new BScroll('.wrap', {})
```

- 只有横向的滚动

```js
const bs = new BScroll('.wrap', {
    scrollX: true,
    scrollY: false
})
```

- 同时横向、竖向滚动

```js
const bs = new BScroll('.wrap', {
    scrollX: true,
    freeScroll: true // 可以斜向滚动
})
```

## 有用的方法，滚动到都某个位置

####  refresh()

**作用**：重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常

#### scrollTo(x, y, time, easing, extraTransform)

**作用**：滚动到 x,y 的距离

- {number} x 横轴坐标（单位 px）
- {number} y 纵轴坐标（单位 px）
- {number} time 滚动动画执行的时长（单位 ms）
- {Object} easing 缓动函数

####  scrollBy(x, y, time, easing)

**作用**：相对于当前位置偏移滚动 x,y 的距离

- {number} x 横轴变化量（单位 px）
- {number} y 纵轴变化量（单位 px）
- {number} time 滚动动画执行的时长（单位 ms）
- {Object} easing 缓动函数

#### scrollToElement(el, time, offsetX, offsetY, easing)

**作用**：滚动到指定的目标元素

- {DOM | string} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
- {number} time 滚动动画执行的时长（单位 ms）
- {number | boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
- {number | boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
- {Object} easing 缓动函数

## Picker —— 滚动选择器

- 按需引入，需要安装 `wheel` 包

```bash
npm install @better-scroll/wheel --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'

BScroll.use(Wheel)
```

#### 单项选择实现

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/录制_2021_04_02_17_32_49_121.gif)

```html
<div class="wheel-wrap">
    <ul class="list">
        <li class="list-item">1</li>
        <li class="list-item">2</li>
        <li class="list-item">3</li>
        <li class="list-item">4</li>
        <li class="list-item disabled-item">5</li>
        <li class="list-item">6</li>
        <li class="list-item">7</li>
        <li class="list-item">8</li>
    </ul>
    <div class="mask-top"></div>
    <div class="mask-bottom"></div>
</div>
```

```css
/*
	一个列表子项为 40 px
	父层高 200 px，即只显示 5 个列表子项，其他隐藏
	mask-top mask-bottom 实现颜色渐变，分别渐变两个子项，即高 80 px
*/
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}	
.wheel-wrap {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}
.mask-top, .mask-bottom {
    position: absolute;
    width: 100%;
    height: 80px;
    pointer-events: none;
}
.mask-top {
    top: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    border-bottom: 1px solid #EBEBEB;
}
.mask-bottom {
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    border-top: 1px solid #EBEBEB;
}
.list {
    margin-top: 80px;
}
.list li {
    font: 20px/40px "宋体";
    text-align: center;
}
```

```js
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'

BScroll.use(Wheel)

const bs = new BScroll('.wheel-wrap', {
    wheel: {
        selectedIndex: 0, // 默认选中第 selectedIndex 项，索引从 0 开始
        rotate: 30, // 弯曲程度
        adjustTime: 200, // 滚动过去的动画时长
        wheelWrapperClass: 'wheel-wrap', // 滚动元素的 class
        wheelItemClass: 'list-item', // 滚动元素的子元素的 class
        wheelDisabledItemClass: 'disabled-item' // 滚动元素中想要禁用的子元素的 class
    }
})

// 2.1 前，监听选中项的方式
// bs.on("scrollEnd", () => {
//     console.log(bs.getSelectedIndex())
// })

// 2.1 后，监听选中项的方式
bs.on("wheelIndexChanged", index => {
    console.log(index)
})

// 选中某项
bs.wheelTo(3)
```

## Slide -- 轮播图（跑马灯）

- 按需引入，需要安装 `slide` 包

```bash
npm install @better-scroll/slide --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)
```

#### 轮播图实现

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/录制_2021_04_02_20_49_21_90.gif)

```html
<div class="box">
    <div class="slide-wrap">
        <div class="list">
            <div style="background-color: #95B8D1">1</div>
            <div style="background-color: #DDA789">2</div>
            <div style="background-color: #C3D899">3</div>
            <div style="background-color: #F2D4A7">4</div>
        </div>
    </div>
    <nav class="nav">
        <div class="active"></div>
        <div></div>
        <div></div>
        <div></div>
    </nav>
    <div class="btn">
        <button class="prev"> &lt; </button>
        <button class="next"> &gt; </button>
    </div>
</div>
```

```css
.box {
    position: relative;
}
.slide-wrap {
    min-height: 1px;
    overflow: hidden;
}
.list {
    height: 200px;
    white-space: nowrap;
    font-size: 0;
    list-style: none;
}
.list div {
    display: inline-block;
    height: 200px;
    width: 100%;
    line-height: 200px;
    text-align: center;
    font-size: 26px;
}
.list div:nth-of-type(1) {
    background-color: #95B8D1;
}
.list div:nth-of-type(2) {
    background-color: #DDA789;
}
.list div:nth-of-type(3) {
    background-color: #C3D899;
}
.list div:nth-of-type(4) {
    background-color: #F2D4A7;
}

.nav {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    height: 15px;
}
.nav div {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 0 3px;
    border-radius: 7.5px;
    background: #EEEEEE;
    cursor: pointer;
}
.nav .active {
    width: 30px;
}

.btn {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50px;
}
.prev, .next {
    float: left;
    height: 50px;
    width: 30px;
    border: 0;
    background: rgba(255, 255, 255, .5);
    font-size: 20px;
    cursor: pointer;
}
.next {
    float: right;
}
```

```js
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

const bs = new BScroll('.slide-wrap', {
    scrollX: true, // 横向滚动
    scrollY: false, // 组织横向滚动
    slide: true, // 开启，也可以是对象，其中有是否自动播放等配置，可自行上官网查询
    momentum: false, // 阻止多次滚动，一次只可以滚动一张
    bounce: false, // 防止循环衔接的时候出现闪烁
    eventPassthrough: 'vertical', // 竖向滑动时，可以有原生滑动
    probeType: 3
})

// 小按钮逻辑
const navs = document.querySelectorAll('.nav div')
// 自动播放中，page 改变，切换选中项
const changeNavActive = (index) => {
    navs.forEach(item => {
        item.classList.remove('active')
    })
    navs[index].classList.add('active')
}
bs.on("slideWillChange", (page) => {
    changeNavActive(page.pageX)
})
// 点击切换选中项
navs.forEach((item, index) => {
    item.addEventListener("click", () => {
        bs.goToPage(index, 0)
        changeNavActive(index)
    })
})

// 按钮逻辑
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
prev.addEventListener('click', () => bs.prev())
next.addEventListener('click', () => bs.next())
```

## scroll-bar -- 滚动条

- 按需引入，需要安装 `scroll-bar` 包

```bash
npm install @better-scroll/scroll-bar --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(Slide)
```

#### 使用库的原生滚动条

```js
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'

const list = document.querySelector('.list')
list.innerHTML = new Array(100).fill(".").map((item, index) => `<li>这是第${index}个li</li>`).join("")

const bs = new BScroll('.wrap', {
    click: true,
    scrollbar: {
        fade: false, // 当滚动停止的时候，滚动条渐隐
        interactive: true, // 滚动条是否可以交互
        scrollbarTrackClickable: true // 滚动条轨道是否允许点击
    }
})
```

#### 自定义滚动条

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210402215456.png)

```html
<div class="wrap">
    <div class="list"></div>
    <div class="vertical-scrollbar">
        <div class="vertical-indicator"></div>
    </div>
</div>
```

```css
.vertical-scrollbar {
    position: absolute;
    top: 0;
    right: 10px;
    height: 100%;
    background-color: rgb(200, 200, 200, 0.3);
}
.vertical-indicator {
    width: 7px;
    height: 100px;
    border-radius: 6px;
    background-color: #db8090;
    cursor: pointer;
}
```

```js
const bs = new BScroll('.wrap', {
    scrollbar: {
        customElements: [verticalEl] // 自定义滚动条
    }
})
```

> *当滚动条是 2 个的时候，数组第一个元素是横向滚动条*

## mouse-wheel -- 鼠标滚轮

- 按需引入，需要安装 `mouse-wheel` 包

```bash
npm install @better-scroll/mouse-wheel --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(MouseWheel)
```

#### 使用库的原生滚动条

```js
const bs = new BScroll('.wrap', {
    mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
    }
})
```

## pull-down -- 下拉刷新

- 按需引入，需要安装 `pull-down` 包

```bash
npm install @better-scroll/pull-down --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'

BScroll.use(PullDown)
```

#### 实现下拉刷新

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/录制_2021_04_02_22_21_22_193.gif)

```html
<div class="wrap">
    <div class="list"></div>
</div>
```

```css
.pull-down:after {
    content: '正在刷新';
    position: absolute;
    top: -50px;
}
```

```js
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'

BScroll.use(PullDown)

const bs = new BScroll('.wrap', {
    pullDownRefresh: {
        threshold: 100, // 顶部下拉的距离来决定刷新时机
        stop: 60 // 回弹悬停的距离
    }
})

bs.on("pullingDown",()=>{
    // 加载下拉刷新时，“正在刷新” 的字样
    list.classList.add("pull-down")
    setTimeout(()=>{
        list.classList.remove("pull-down")
        list.innerHTML = `<li>这是刷新的新数据${Date.now()}</li>` +  list.innerHTML
        // 结束下拉刷新
        bs.finishPullDown()
    },1000);
});
```

## pull-up 上拉加载

- 按需引入，需要安装 `pull-up` 包

```bash
npm install @better-scroll/pull-up --save
```

- 注册

```js
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)
```

#### 实现上拉加载

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/录制_2021_04_02_22_58_53_94.gif)

```html
<div class="wrap">
    <div class="list"></div>
</div>
```

```css
.pull-up:after {
    content: '正在刷新';
    position: absolute;
    bottom: -50px;
}
```

```js
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

const bs = new BScroll('.wrap', {
    pullUpLoad: true
})

bs.on("pullingUp",()=>{
    // 加载下拉刷新时，“正在刷新” 的字样
    list.classList.add("pull-up")
    setTimeout(()=>{
        list.classList.remove("pull-up")
        list.innerHTML =  list.innerHTML + new Array(10).fill(".").map(() => `<li>这是刷新的新数据${Math.random()}</li>`).join("")
        // 结束上拉加载
        bs.finishPullUp()
        bs.refresh()
    },1000);
});
```

