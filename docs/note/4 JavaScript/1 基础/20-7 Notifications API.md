# Notifications API

## 作用

1. 用于向用户显示通知
2. 有更多的自定义能力
3. 可以跨页面通知，即使用户切换页面了，也可以通知成功

## 请求通知权限

- 需要用户通过权限才能正常使用
- 可以使用 `Notification.requestPermission()` 方法获取权限
  - 返回一个 **Promise**，如果值是 **granted**，则表示用户授权了，其他值均拒绝授权

```js
Notification.requestPermission()
    .then(permission => {
        console.log(permission)
    })
```

## 通知

- 创建一个 **Notification** 实例，并传入想通知的内容，即可创建通知

```js
new Notification('hello world')
```

```js
// 增强通知
new Notification('hello world', {
    body: 'i am body',        // 主题内容
    image: '../static/1.jpg', // 图片
    vibrate: true             // 是否震动
})
```

- 可以通过 ` close()` 关闭通知

```js
const n = new Notification('hello world')
n.close()
```

## 事件

| 事件  | 触发时间                  |
| ----- | ------------------------- |
| show  | 在通知显示时              |
| click | 在通知被点击时            |
| close | 在通知消失或调用 close 时 |
| error | 发生错误阻止通知显示时    |

```js
const n = new Notification('hello world')
n.onshow = () => { console.log('show') }
```

