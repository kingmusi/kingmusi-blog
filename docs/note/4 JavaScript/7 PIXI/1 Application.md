# Application

## 创建画布

```typescript
import { Application } from 'pixi.js'

const app = new Application({
    resizeTo: window, // 随某个元素的宽高变化
})
document.body.appendChild(app.view)
```

#### 宽高

1. 创建固定的宽高

```typescript
import { Application } from 'pixi.js'

const app = new Application({
    width: 400, // 宽
    height: 400, // 高
})
```

2. 随某个dom的宽高变化

```ts
const app = new Application({
    resizeTo: domElement
})
```

#### 背景颜色

1. 指定背景颜色

```ts
const app = new Application({
    backgroundColor: 0x1099bb, // 背景颜色，0x16进制
})
```

2. 透明

```ts
const app = new Application({
    transparent: true
})
```

#### 像素比

高像素比可以让画面更清晰，下面让像素比最低为2

```ts
const resolution = Math.max(window.devicePixelRatio, 2) || 2
const app = new Application({
    resolution
})
// 因为放大了 resolution 倍，所以舞台要缩小对应倍数
app.view.style.transformOrigin = 'top left'
app.view.style.transform = `scale(${1 / resolution})`
```

#### 抗锯齿

```ts
const app = new Application({
    antialias: true
})
```

## 销毁画布

```typescript
app.destroy() // 清除画布
app.destroy(true) // 清除画布并清除 canvas 元素
```

## 舞台缓存

背景：每创建一个 application，都会生成一个新的`WebGLRenderingContext`，但是 WebGLRenderingContext 创建过多，会使以前的 WebGLRenderingContext 被清除，导致旧的 application 白屏。

一般在业务上，application 是可以复用的

1. 比如错误提醒是一个spine动画，错误提醒是出现2秒后，就销毁了，下一次触发错误再重新创建spine，这多次的错误提醒，其实是可以复用同一个舞台的
2. 比如某些场景，A spine 和 B spine 必然不可能同时出现，那么承载着两个不同 spine 的舞台就可以是同一个

下面写一个 hook 去完成舞台的缓存，已达到复用的目的

```ts
const map = new Map<string, any>()

type DomParam = string | HTMLElement
/**
 * 获取 DOM 节点
 */
function getDom(dom: DomParam) {
  if (typeof dom === 'string') {
    return document.querySelector(dom)
  }
  return dom || null
}

/**
 * 获取已创建的application
 * @param id 
 * @returns 
 */
function getApp(id: string) {
  if (map.get(id)) {
    return map.get(id)
  } else {
    return null
  }
}

/**
 * 重新 resize
 * @param id 
 */
function resize(id: string) {
  const app = getApp(id)
  if (app) {
    app?.resize?.()
  }
}

/**
 * 销毁application
 * @param id 要销毁的 id 对应的 application
 * @param force 是否要完全销毁
 */
function destory(id: string, force = false) {
  const app = getApp(id)
  if (app) {
    if (force) {
      app?.destory?.(true)
      map.delete(id)
    } else {
      const removedChilds = app.stage.removeChildren(0, app.stage.children.length)
      removedChilds.forEach((c: any) => {
        c.destroy({
          children: true,
          texture: false,
          baseTexture: false,
        })
      })
    }
  }
}

export default function useCreateApplication(id: string, dom: DomParam, options: Record<string, any> = {}) {
  if (!map.has(id)) {
    // 创建application
    const domElement = getDom(dom)
    const resolution = options.resolution || Math.max(window.devicePixelRatio, 2) || 1 // 像素比
    if (domElement) {
      const app = new window.PIXI.Application({
        resizeTo: domElement,
        transparent: true, // 透明
        antialias: true, // 抗锯齿
        ...options,
        resolution,
      })
      app.view.style.transformOrigin = 'top left'
      app.view.style.transform = `scale(${1 / resolution})`
      domElement.appendChild(app.view)
      map.set(id, app)
    }
  } else if (map.get(id)) {
    // 使用缓存的application
    const domElement = getDom(dom)
    if (domElement) {
      try {
        const app = getApp(id)
        domElement.appendChild(app.view)
        app.resizeTo = domElement
      } catch (e) {
        console.warn(e)
      }
    }
  }

  return {
    getApp: () => getApp(id),
    destory: () => destory(id),
    resize: () => resize(id),
  }
}
```

```ts
// vue 中使用示例
import { onMounted, onBeforeUnmount } from 'vue'
import useCreateApplication from './useCreateApplication'

const disposeArr: (() => void)[] = []
onMounted(() => {
	const {
    getApp,
    destory
  } = useCreateApplication('message', 'message-dom')
  const app = getApp()
  disposeArr.push(destory)
  // 利用app做事情。。。
})

onBeforeUnmount(() => {
	disposeArr.forEach((fn) => fn())
})
```

