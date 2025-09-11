# Svg-foreignObject

## 简介

`<foreignObject>`元素的作用是可以在其中使用具有其它XML命名空间的XML元素

也就是可以实现SVG和XHTML的混合使用

> 作用：
>
> - 实现 SVG 难实现，但 CSS 好实现的特性（如果文本自动换行）
> - 可以把 HTML 渲染成图片

:::demo

```html
<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="50" height="50">
      <p>hello world</p>
  </foreignObject>
</svg>
```

:::

## 图片生成

原理：

1. 获取对应DOM元素的`outerHTML`代码
2. 放在`<foreignObject>`元素中
3. 通过图片方式显示SVG图形
4. 借助 `canvas` 的 `drawImage()` 渲染到画布上，然后使用 `canvas.toDataURL()` 转换成图片

:::demo

```html
<img />
```

```js
function genSvg(html) {  
  const nssvg = "http://www.w3.org/2000/svg";
  const nsxhtml = "http://www.w3.org/1999/xhtml";
  const svgRoot = document.createElementNS(nssvg, "svg");
  const foreignObject = document.createElementNS(nssvg, "foreignObject");
  const domElement = document.createElementNS(nsxhtml, "div");
  const styleElement = document.createElementNS(nsxhtml, "style");
  
  domElement.innerHTML = html
  domElement.style.display = 'inline-block'
  document.body.appendChild(domElement)
  const contentBounds = domElement.getBoundingClientRect()
  foreignObject.setAttribute("width", contentBounds.width);
  foreignObject.setAttribute("height", contentBounds.height);
  domElement.remove()

  svgRoot.appendChild(foreignObject);
  foreignObject.appendChild(styleElement)
  foreignObject.appendChild(domElement)
  
  const image = new Image()
  image.width = contentBounds.width
  image.height = contentBounds.height
  const svgURL = new XMLSerializer().serializeToString(svgRoot)
  image.onload = () => {
		const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const showimg = document.querySelector('img')
    showimg.src = canvas.toDataURL('image/png')
  }
  image.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgURL)}`
}

genSvg(`<div style="width:50px; height:50px">hello world</div>`)
```

:::