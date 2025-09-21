# dialog

## 基本用法

`<dialog>`标签表示一个可以关闭的对话框，当 `<dialog>` 元素添加了 `open` 属性之后，浏览器会将该元素的 `display` 重置为 `block` ，即：

```css
/* dialog 打开状态 */
dialog[open] {
    display: block;
}

/* dialog 关闭状态 */
dialog:not(open) {
    display: none;
}
```

:::demo

```html
<dialog open>
  Hello world
</dialog>
```

:::

## JS 控制

`<dialog>` 元素提供了以下几个 API 控制其显隐状态：

| 方法        | 定位     | 可否交互               | 更多说明                                                     |
| ----------- | -------- | ---------------------- | ------------------------------------------------------------ |
| `showModal` | fixed    | 阻止用户与其他内容交互 | 模态对话框：<br />拥有==:modal==选择器，可以通过`dialog:modal`匹配<br />会添加了一个 `::backdrop` 伪元素来覆盖 `<dialog>` 元素之外的内容 |
| `show`      | absolute | 不阻止                 | 非模态对话框<br />可以用过 `dialog:not(:modal)` 匹配<br />没有 `::backdrop` 伪元素 |
| `close`     | -        | -                      | 关闭对话框，另外可以使用键盘上的 `Esc` 键直接关闭对话框      |

事件：

| 事件     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| `close`  | 对话框关闭时触发                                             |
| `cancel` | 用户按下`esc`键关闭对话框时触发<br />注意因为会触发对话框关闭，所以后来还会触发 close 事件 |

可读属性：

| 属性          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| `returnValue` | `close` 方法可以接受一个字符串作为参数，用于传递信息。传递的信息可以通过此属性读取 |

## 最简实践例子

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
import { ref, onMounted } from 'vue'
const dialogRef = ref(null)
</script>
```

:::

## 最佳实践例子

在 `<dialog>` 元素中可以内置一个 `method` 为 `dialog` 的表单元素（`<form>`）

它与传统的 `<form>` 有所不同，使用 `<form method="dialog">` 会导致表单提交关闭对话框并将 `returnValue` 属性设置为提交按钮的值。这可以避免编写自定义代码，同时为 Web 页面提供正确的语义

:::demo

```vue
<template>
  <dialog ref="dialogRef" @close="handleClose">
    <form method="dialog">
      <div class="dialog__heading">
        <h3 class="dialog__title">提示</h3>
      </div>

      <div class="dialog__content">
        <p>在 dialog 元素中可以内置一个 `method` 为 `dialog` 的表单元素（form）</p>
      </div>

      <div class="dialog__footer">
        <!-- 在 button 上设置 value 的值，这个很重要 -->
        <button class="button button--cancel" value="Cancel">取消</button>
        <button class="button button--allow" value="Allow">确定</button>
      </div>
    </form>
  </dialog>

  <button class="button" @click="() => dialogRef.showModal()">打开</button>
</template>

<script setup>
import { ref } from 'vue'
const dialogRef = ref(null)

function handleClose() {
  console.log(dialogRef.value.returnValue)
}
</script>

<style scoped>
dialog {
  max-inline-size: min(90vw, 60ch);
  max-block-size: min(80vh, 100%);
  max-block-size: min(80dvb, 100%);
  overflow: hidden;
  margin: auto;
  padding: 2rem;
  border: none;
  border-radius: .5em;
  box-shadow: 0 0 0.2em 0.25em rgb(0 0 0 /.125);
  background: #fff;

  flex-direction: column;
  gap: 2rem;
  font-size: 1rem;
  color: #7F7E85;
  font-weight: 300;
  line-height: 1.625;
}
    
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

dialog[open] {
  display: flex;
  animation: fade-in 0.5s;
}

dialog::backdrop {
  backdrop-filter: blur(25px);
  transition: backdrop-filter .5s ease;
  background-color: rgb(0 0 0 / .5);
  animation: fade-in 0.5s;
}

.dialog__title {
  color: #10023B;
  font-size: 2rem;
  text-transform: capitalize;
}

.dialog__content {
  max-block-size: 100%;
  overscroll-behavior-y: contain;
}

.button {
  --background-color: #42b72a;
  --border-color: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
  color: #fff;
  background-color: var(--background-color);
  border: none;
  border-color: var(--border-color);
  border-radius: 4px;
  font-size: 18px;
  padding-block: 0;
  padding-inline: 16px;
  min-block-size: 3rem;
  font-weight: 700;
}

.button:hover {
  --background-color: #36a420;
  --border-color: #36a420;
}

.dialog__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.button--cancel {
  --background-color: transparent;
  color: #333;
}

.button--cancel:hover {
  --background-color: #F2F4F5;
}

.button--allow {
  --background-color: #B578F5;
}

.button--allow:hover {
  --background-color: #9752DE;
}
</style>
```

:::