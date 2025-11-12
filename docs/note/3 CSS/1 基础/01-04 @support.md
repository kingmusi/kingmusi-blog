# @support

## CSS 特征检测

`@supports` 允许对 CSS 的**属性** 、**值** 或 **选择器** 进行检测

```css
/* 检测属性和值 */
@supports (accent-color: red) {}

/* 检测选择器 */
@supports selector(:is(a)) {}
```

> 可以使用逻辑运算符 `and`、`or`、`not`

注意，目前不支持检测 CSS 的 `@` 规则

## @supports 对应的 JavaScript API

可以使用 `window.CSS.supports` 实现JS中的检测

```js
CSS.supports("(display: grid)")
```

