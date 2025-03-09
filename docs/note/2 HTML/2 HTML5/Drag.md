# Drag

## 拖放元素

- 默认情况下，图片、链接、选中文本是可拖动的
- 可以让除上面三种元素外的元素可拖动，添加`draggable` 属性，并且设置值为 `true`

:::demo
```html
<div draggable="true">拖拽我！！</div>
```
```css
div {
	width: 100px;
	line-height: 100px;
	background: #e9ddb6;
	color: #c02c38;
	text-align: center;
	border-radius: 8px;
}
```
:::

- 事件

| type      | 触发时间   |
| --------- | ---------- |
| dragstart | 开始拖放时 |
| drag      | 拖放过程中 |
| dragend   | 拖放完成时 |

## 放置目标

- 事件

| type      | 触发时间                           |
| --------- | ---------------------------------- |
| dragenter | 拖放元素进入目标元素时时           |
| dragover  | 拖放元素在目标元素上移动时         |
| drop      | 拖放元素在目标元素上，且松开鼠标时 |

> 自定义放置目标
>
> - 阻止 **dragenter** 和 **dragover** 的默认事件，才可以触发 **drop**，此时才能算一个放置目标
>
>   ```js
>   droptarget.addEventListener('dragenter', e => {
>       e.preventDefault()
>   })
>   droptarget.addEventListener('dragover', e => {
>       e.preventDefault()
>   })
>   ```
>
> - 拖动 **URL** 和图片会默认导航至对应页面，为阻止这个行为，可以阻止 **drop** 的默认事件
>
>   ```js
>   droptarget.addEventListener('drop', e => {
>       e.preventDefault()
>   })
>   ```

## dataTransfer 对象

##### 1. 获取拖放数据

- 对于文件或图片：通过 `e.dataTransfer.files` 获取
- 对于文字：通过 `e.dataTransfer.getData('Text')` 获取
- 对于链接，通过 `e.dataTransfer.getData('URL')` 获取

##### 2. 自定义数据

- 一般在 **dragstart** 事件中，通过 `e.dataTransfer.setData(key, value)` 来设置自定义数据
- 在 **drop** 事件中，通过 **getData** 获取

##### 3. 其他成员

- `setDragImage(element, x, y)`：指定拖动发生时显示在光标下的图片。**element** 是一个 **HTML** 元素，可以是图片
- `types`：当前存储的数据类型列表，可以根据判断是否接受数据，或获取数据的方法

