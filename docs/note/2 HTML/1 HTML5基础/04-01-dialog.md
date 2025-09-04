# dialog

## 基本用法

`<dialog>`标签表示一个可以关闭的对话框

当拥有 `open` 属性时，对话框显示就会显示

:::demo

```html
<dialog open>
  Hello world
</dialog>
```

:::

## JS 控制

`<dialog>`元素的 JavaScript API 提供`Dialog.showModal()`和`Dialog.close()`两个方法，用于打开/关闭对话框

:::demo

```vue
<template>
	<dialog ref="dialogRef">
      Hello world
      <button @click="() => dialogRef.close()">关闭</button>
    </dialog>

	<button @click="() => dialogRef.showModal()">打开</button>
</template>

<script setup>
import { ref } from 'vue'
const dialogRef = ref(null)
</script>
```

:::

`Dialog.close()`方法可以接受一个字符串作为参数，用于传递信息。`<dialog>`接口的`returnValue`属性可以读取这个字符串，否则`returnValue`属性等于提交按钮的`value`属性

```js
dialogRef.close('ok')
dialogRef.returnValue // ok
```

`Dialog.showModal()`方法唤起对话框时，会有一个透明层，阻止用户与对话框外部的内容互动。CSS 提供了一个 Dialog 元素的`::backdrop`伪类，用于选中这个透明层，因此可以编写样式让透明层变得可见

```css
dialog {
  padding: 0;
  border: 0;
  border-radius: 0.6rem;
  box-shadow: 0 0 1em black;
}
dialog::backdrop {
  /* make the backdrop a semi-transparent black */
  background-color: rgba(0, 0, 0, 0.4);
}
```

## 事件

`<dialog>`元素有两个事件，可以监听。

- `close`：对话框关闭时触发
- `cancel`：用户按下`esc`键关闭对话框时触发