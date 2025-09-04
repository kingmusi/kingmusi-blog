# iframe

## 基础

`<iframe>` 标签生成一个指定区域，在该区域中嵌入其他网页。

| 属性            | 数据类型         | 说明                                           |
| --------------- | ---------------- | ---------------------------------------------- |
| allowfullscreen | Boolean          | 允许嵌入的网页全屏显示                         |
| frameborder     | 0 \| 1           | 是否绘制边框，`0`为不绘制，`1`为绘制（默认值） |
| src             | String           | 嵌入的网页的 URL                               |
| width           | String \| Number | 显示区域的宽度                                 |
| height          | String \| Number | 显示区域的高度                                 |
| sandbox         | String           | 设置嵌入的网页的权限                           |

## sandbox 属性

为了限制`<iframe>`的风险，HTML 提供了`sandbox`属性，允许设置嵌入的网页的权限，等同于提供了一个隔离层，即“沙箱”

`sandbox`可以当作布尔属性使用，表示打开所有限制

```html
<iframe src="https://www.baidu.com/" width="100%" height="300" sandbox></iframe>
```

`sandbox`属性可以设置具体的值，表示逐项打开限制。未设置某一项，就表示不具有该权限。

- `allow-forms`：允许提交表单。
- `allow-modals`：允许提示框，即允许执行`window.alert()`等会产生弹出提示框的 JavaScript 方法。
- `allow-popups`：允许嵌入的网页使用`window.open()`方法弹出窗口。
- `allow-popups-to-escape-sandbox`：允许弹出窗口不受沙箱的限制。
- `allow-orientation-lock`：允许嵌入的网页用脚本锁定屏幕的方向，即横屏或竖屏。
- `allow-pointer-lock`：允许嵌入的网页使用 Pointer Lock API，锁定鼠标的移动。
- `allow-presentation`：允许嵌入的网页使用 Presentation API。
- `allow-same-origin`：不打开该项限制，将使得所有加载的网页都视为跨域。
- `allow-scripts`：允许嵌入的网页运行脚本（但不创建弹出窗口）。
- `allow-storage-access-by-user-activation`：允许在用户激动的情况下，嵌入的网页通过 Storage Access API 访问父窗口的储存。
- `allow-top-navigation`：允许嵌入的网页对顶级窗口进行导航。
- `allow-top-navigation-by-user-activation`：允许嵌入的网页对顶级窗口进行导航，但必须由用户激活。
- `allow-downloads-without-user-activation`：允许在没有用户激活的情况下，嵌入的网页启动下载。

注意，不要同时设置`allow-scripts`和`allow-same-origin`属性，这将使得嵌入的网页可以改变或删除`sandbox`属性

## loading 属性

`<iframe>`指定的网页会立即加载，有时这不是希望的行为。`<iframe>`滚动进入视口以后再加载，这样会比较节省带宽

- `auto`：浏览器的默认行为，与不使用`loading`属性效果相同。
- `lazy`：`<iframe>`的懒加载，即将滚动进入视口时开始加载。
- `eager`：立即加载资源，无论在页面上的位置如何。