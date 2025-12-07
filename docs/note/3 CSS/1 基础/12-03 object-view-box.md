# object-view-box

## 简介

`object-view-box` 属性为元素指定了一个视窗框（View Box），这个视窗框有点类似于 `<svg>` 元素的 `viewBox` 属性，可以对元素的内容进行**缩放**或**平移**

#### 可使用元素

`object-view-box` 属性只能用于[可替换元素](https://html.spec.whatwg.org/#replaced-elements)（Replaced Elements），比如 `<audio>` 、 `<canvas>` 、`<embed>` 、`<iframe>` 、`<img>` 、 `<input>` （`type` 属性必须为 `image`）、`<object>` 和 `<video>` 等。

#### 参考框宽高

`object-view-box` 属性会根据元素（比如 `img` ）的自然尺寸，将 `<basic-shape-rect>` 解析为一个参考框，以获取元素的视图框（View Box）。比如，上面示例中的图片的自然宽高是 `1024px x 768px` ，`object-view-box` 基于该尺寸为元素 `img` 创建了一个 `1024px x 768px` 的视图框：

![](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/object-view-box1.webp)

#### `inset()`

`object-view-box` 属性的值为 `inset()` 函数，可以使用它来控制四个边缘，指定元素的 `top` 、`right` 、`bottom` 和 `left` 属性的值，按照顺序排列。它遵循与 `padding` 和 `margin` 属性相同的语法（TRBL规则），允许接受 `1 ~ 4` 个值：

![](https://cdn.musiblog.com/CSS/%E5%9F%BA%E7%A1%80/object-view-box2.webp)

`object-view-box` 会先对图片进行裁剪，然后会再对图片进行缩放，并且缩放到与视图框大小相同：

:::demo

```css
img {
  width: 200px;
  object-view-box: inset(500px);
}
```

```html
<img src="/banner/1.webp" />
```

:::

> 裁剪出来的图像宽高比会与图像自然宽高比不一致的情况，会出现变形，可以加入以下代码解决
>
> ```css
> object-fit: cover;
> ```

