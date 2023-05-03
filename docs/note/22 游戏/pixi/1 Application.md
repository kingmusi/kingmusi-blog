# Application

## 创建画布

```typescript
import { Application } from 'pixi.js'

const app = new Application({
    width: 400, // 宽
    height: 400, // 高
    // resizeTo: window, // 随某个元素的宽高变化
    backgroundColor: 0x1099bb, // 背景颜色，0x16进制
    resolution: window.devicePixelRatio || 1, // 像素比
    antialias: true // 抗锯齿
})
```

> 设置 `resizeTo` 后，发现会出现滚动条，可以通过 CSS 解决下面问题
>
> ```css
> canvas {
>   position: fixed;
>   top: 0;
>   left: 0;
> }
> ```

## 销毁画布

```typescript
app.destroy() // 清除画布
app.destroy(true) // 清除画布并清除 canvas 元素
```

