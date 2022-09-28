# visualViewport

## 介绍

移动页面中有两种窗口

1. layout 窗口：页面上所有元素
2. visual  窗口：屏幕上课看到的内容

当**键盘**弹起、或其他系统级遮挡页面时，visual  窗口就会发生变化

## API

```js
const viewportHandler = () => {
    console.log(window.visualViewport.height)
    console.log(window.visualViewport.width)
    // ...
}

window.visualViewport.addEventListener('scroll', viewportHandler)
window.visualViewport.addEventListener('resize', viewportHandler)
```

## 获取系统键盘高度

```js
const viewportHandler = () => {
    document.documentElement.clientHeight - window.visualViewport.height
}

window.visualViewport.addEventListener('scroll', viewportHandler)
window.visualViewport.addEventListener('resize', viewportHandler)
```

