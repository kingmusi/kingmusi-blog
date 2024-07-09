# Sprite

## 创建一个精灵

```typescript
// 创建一个纹理
const texture = PIXI.Texture.from('https://static.xiaohoucode.com/scratch-res/common/mit/4ba60d6a976628fba9917ff4024a4ea2.png')
// 根据纹理创建一个精灵
const sprite = new PIXI.Sprite(texture)
// 加入画布中
app.stage.addChild(sprite)
```

## 常用属性

- 锚点

```typescript
sprite.anchor.set(0.5, 0.5) // 设置中心点为自身的中心
```

- 位置

```typescript
// sprite.x = 100
// sprite.y = 100
sprite.position.set(app.screen.width / 2, app.screen.height / 2) // 设置位置为画布的中心
```

- 缩放

```typescript
sprite.scale.set(0.5, 0.5) // 缩小一半
```

- 旋转

```typescript
sprite.angle = 45 // 旋转 45°(角度)
sprite.rotation = 45 * Math.PI / 180 // 旋转 45°（弧度）
```

- 透明度

```typescript
sprite.alpha = 0.5
```

- 镜像翻转

```typescript
sprite.scale.x = -1 // 水平镜像翻转
sprite.scale.y = -1 // 垂直镜像翻转
```

## 裁剪

在 `new PIXI.Sprite` 时，可以传入第二个参数，裁剪出想要位置的图形

比如裁剪出从左上角开始，宽高各一百大小的矩形

```typescript
const bgBaseTexture = PIXI.BaseTexture.from('/game.png')
new PIXI.Texture(bgBaseTexture, new PIXI.Rectangle(50, 100, 2300, 30))
```

## 重复平铺

使用 `TilingSprite` 创建精灵

```typescript
const bgBaseTexture = PIXI.BaseTexture.from('/game.png')
const bgTexture = new PIXI.Texture(bgBaseTexture, new PIXI.Rectangle(50, 100, 2300, 30)) // 也可以裁剪一部分
const bg = new PIXI.TilingSprite(bgTexture)
```

