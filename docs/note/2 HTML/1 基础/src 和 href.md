# src 和 href

## href

-  `Hypertext Reference`的缩写，表示超文本引用。用来**建立当前元素和文档之间的链接**

- 常用的有：`link`、`a`

:::demo

```html
<a href="www.baidu.com">百度</a>
```

:::

## src

- 在请求 src 资源时会**将其指向的资源下载**并应用到文档中
- 常用的有 `script`，`img` 、`iframe`

:::demo

```html
<img src="https://s.cn.bing.net/th?id=OHR.HornbillPair_ZH-CN3380997666_1920x1080.webp&qlt=50" />
```

```css
img {
	width: 100%;
}
```

:::

