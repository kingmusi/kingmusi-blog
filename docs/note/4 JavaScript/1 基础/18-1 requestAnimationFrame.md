# requestAnimationFrame

## requestAnimationFrame

- 接受一个参数，此参数是一个要重绘屏幕前调用的函数
- 这个函数修改 **DOM** 样式以反映下一次重绘有什么变化的地方

```js
function run () {
    const div = document.getElementsByTagName('div')[0];
    div.style.left = div.getBoundingClientRect().left + 5 + 'px'
    if (div.style.left !== '900px') {
        requestAnimationFrame(run)
    }
}
requestAnimationFrame(run)
```

## cancelAnimationFrame

- 与 **setTimeout** 一样，**requestAnimationFrame** 返回一个请求 ID，可通过 **cancelAnimationFrame** 取消重绘任务

```js
let id = requestAnimationFrame(() => {})
cancelAnimationFrame(id)
```

## requestAnimationFrame 写节流函数

下面限制 50 毫秒执行一次

```js
let enabled = true

function print() {
    console.log('hello')
}

window.addEventListener('scroll', () => {
	if (enabled) {
        enabled = false
        window.requestAnimationFrame(print)
        setTimeout(() => enabled = true, 50)
    }
})
```

