# HTML5 事件

## contextmenu

- 用于取消上下文菜单，自定义上下文菜单

```html
<body>
    <ul id="menu" style="position: absolute; visibility: hidden; background-color: silver">
        <li>编辑</li>
        <li>复制</li>
    </ul>
</body>
```

```js
document.addEventListener('contextmenu', e => {
    e.preventDefault()

    const menu = document.getElementById('menu')
    menu.style.top = e.clientY + 'px'
    menu.style.left = e.clientX + 'px'
    menu.style.visibility = 'visible'
})

document.addEventListener('click', e => {
    document.getElementById('menu').style.visibility = 'hidden'
})
```

## beforeunload

- 给开发者提供阻止页面被卸载的机会
- 在被卸载前显示确认框，将 **event.returnValue** 设置为想要显示的字符串（IE、Firefox），并将其返回（Safari、Chrome）

```js
window.addEventListener('beforeunload', e => {
    const message = '真的要退出吗？'
    e.returnValue = message
    return message
})
```

## DOMContentLoaded

- 会在 **DOM** 树构建完成后立即触发，不用等待图片、**JavaScript** 脚本、**CSS** 脚本加载完成
- 通常用于添加事件处理程序或执行其他 **DOM** 操作
- **event** 对象不包括任何额外信息

```js
document.addEventListener('DOMContentLoaded', () => {
	console.log('content load!')
})
```

## readystatechange

- 提供文档或元素加载状态的信息
- **event** 有一个 **readyState** 属性

| 值              | 说明                         |
| --------------- | ---------------------------- |
| `uninitialized` | 对象存在并尚未初始化         |
| `loading`       | 对象正在加载数据             |
| `loaded`        | 对象已经加载完数据           |
| `interactive`   | 对象可以交互，但尚未加载完成 |
| `complete`      | 对象加载完成                 |

> 但行为难以预测，不建议使用

## haschange

- 用于 **URL** 散列值发生变化时通知开发者。
- 有两个新属性：**oldURL** 和 **newURL**，保存变化前后的 **URL**

- 必须添加给 **window**

```js
window.addEventListener('haschange', e => console.log(e.newURL))
```



