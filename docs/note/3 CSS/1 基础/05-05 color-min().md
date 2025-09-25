# color-min()

`color-mix()` 函数是 **[CSS 颜色模块 Level5](https://www.w3.org/TR/css-color-5/#color-mix)** 新增的一个颜色函数，主要用于混合两种颜色值的 CSS 函数，它可以在不同的颜色空间进行混合，例如 sRGB、HSL 和 LCH 等，这在调整颜色时更加灵活，并且可以根据需要选择合适的颜色空间进行混合

## 语法

![img](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/color-mix.webp)

:::demo

```html
<div>color-mix(in oklch, #f00 50%, #0f0 50%)</div>
```

```css
div {
  width: 330px;
  line-height: 100px;
  background: color-mix(in oklch, #f00 50%, #0f0 50%);
  text-align: center
}
```

:::