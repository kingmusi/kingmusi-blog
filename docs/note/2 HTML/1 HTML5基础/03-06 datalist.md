# datalist

## 简介

`<datalist>`标签是一个容器标签，用于为指定控件提供一组相关数据，通常用于**生成输入提示**

它的内部使用`<option>`，生成每个菜单项

:::demo

```html
<label for="ice-cream-choice">冰淇淋：</label>
<input type="text" list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice">
<datalist id="ice-cream-flavors">
  <option value="巧克力">
  <option value="椰子">
  <option value="薄荷">
  <option value="草莓">
  <option value="香草">
</datalist>
```

:::

> 注意，`<option>`在这里可以不需要闭合标签