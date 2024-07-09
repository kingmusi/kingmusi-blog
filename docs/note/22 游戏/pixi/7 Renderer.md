# Renderer

> Renderer和Application效果和功能类似，但是Renderer可以指定canvas和context

## 基本

```ts
const width = document.body.clientWidth
const height = document.body.clientHeight

const stage = new window.PIXI.Container()
const spine = new Spine(xxx.spineData)
stage.addChild(spine)

const canvas = document.createElement('canvas')
const context = canvas.getContext('webgl', { stencil: true })
const render = new window.PIXI.Renderer({
    width: width,
    height: height,
    context,
    view: canvas,
    transparent: true,
    antialias: true
})

const renderLoop = () => {
    render.render(stage)
    requestAnimationFrame(renderLoop)
}
renderLoop()
document.getElementById('app').appendChild(canvas)
```

## 获取spine截图

> 可以通过 canvas.toDataURL() 获取截图