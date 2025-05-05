# spine

## 资源

1. 必须有 json、png、atlas 这三个后缀的资源
2. 文件名必须是同名的
3. atlas 文件内容的第一行，必须是 [文件名].png

正常动效导出的资源就是满足上面条件的

但如果不希望用动效导出的名字，想修改成自定义名称（例改成 custom）：

1. 把三个文件名改成 custom.json、custom.png、custom.atlas
2. 把custom.atlas文件内容的 xxxx.png，改成 custom.png

## 加载资源并生成Spine

```ts
function createSpine(url) {
  return new Promise((resolve) => {
    const loader = new PIXI.Loader()
    loader.add(url).load(() => {
      const spine = new PIXI.spine.Spine(loader.resources[url].spineData)
      resolve(spine)
    })
  })
}

// 可以和 application 章节封装的 useCreateApplication 搭配使用
const { getApp } = useCreateApplication('gb', document.body)
const app = getApp()
if (app) {
  createSpine('xxx').then((spine) => {
    app.stage.addChild(spine)
  })
}
```

## 动画

#### 获取动画名称

```ts
const animationList = new Set(spine.spineData.animations.map(i => i.name))
```

#### 播放

````ts
// 当动画播放完毕后，可以执行回调
let cb: () => void
spine.state.addListener({
  complete: () => {
    if (cb) {
      const fn = cb
      cb = null
      fn()
    }
  }
})

// 播放一次
function playSpineOnce(animation: string, callback?: () => void) {
	if (animationList.has(animation)) {
    spine.state.setAnimation(0, animation, false)
    cb = callback
  }
}

// 无限播放
function playSpineLoop(animation: string) {
  if (animationList.has(animation)) {
    spine.state.setAnimation(0, animation, true)
  }
}

// 停止播放
function stopPlay() {
	spine.state.clearTracks(0)
}
````

## 换肤

#### 获取皮肤的名称

```ts
const skinList = new Set(spine.spineData.skins.map(i => i.name))
```

#### 改变皮肤

```ts
function changeSkin(name: string) {
  if (skinList.has(name)) {
    spine.skeleton.setSkinByName(name)
    spine.skeleton.setSlotsToSetupPose()
  }
}
```

#### 应用多个皮肤

```ts
function combineSkin(names: string[]) {
	const newSkin = spine.createSkin(spine.spineData, 'combineSkin')
  names.forEach((skin) => {
    if (skinList.has(skin)) {
			newSkin.addSkin(spine.spineData.findSkin(skin))
    }
  })
  spine.skeleton.setSkin(newSkin)
  spine.skeleton.setSlotsToSetupPose()
}
```

## 插槽

#### 获取插槽的名称

```ts
const slotList = new Set(spine.spineData.slots.map(i => i.name))
```

#### 替换插槽

```ts
function replaceSlotByTexture(name: string, texture: any) {
  spine.hackTextureBySlotName(name, texture, texture.orig)
}

function replaceSlotByImage(name: string, img: string) {
	const texture = window.PIXI.Texture.from(img)
  replaceSlotByTexture(name, texture)
  return texture
}

function replaceSlotByText(name: string, text: string, style: Record<string, any>) {
	const textSprite = new window.PIXI.Text(text, style)
  window.PIXI.RenderTexture.create({
    width: textSprite.width,
    height: textSprite.height,
  })
  replaceSlotByTexture(name, textSprite.texture)
  return textSprite
}
```

## 封装 class

```ts
class SpineDraw {
  stage: any; // 舞台
  actor: any; // 精灵对象
  animationList = new Set<string>(); // 动画列表
  skinList = new Set<string>(); // 皮肤列表
  slotList = new Set<string>(); // 插槽列表
  playCb: (() => void) | null = null; // 播放动画结束回调
  defaultAniName: string; // 默认动画名称
  mixDuration: number = 0; // 动画过渡时间

  constructor(stage: any, spine: any, defaultAniName?: string) {
    this.stage = stage;
    this.actor = spine;

    if (spine.spineData) {
      if (Array.isArray(spine.spineData.animations)) {
        spine.spineData.animations.forEach((i) => {
          this.animationList.add(i.name);
        })
      }

      if (Array.isArray(spine.spineData.skins)) {
        spine.spineData.skins.forEach((i) => {
          this.skinList.add(i.name);
        })
      }

      if (Array.isArray(spine.spineData.slots)) {
        spine.spineData.slots.forEach((i) => {
          this.slotList.add(i.name);
        })
      }

      if (defaultAniName && this.animationList.has(defaultAniName)) {
        this.defaultAniName = defaultAniName;
      } else {
        this.defaultAniName = Array.from(this.animationList)[0];
      }

      this.actor.state.addListener({
        complete: this.oneAniComplete
      })
    }
  }

  oneAniComplete = () => {
    if (this.playCb) {
      const cb = this.playCb.bind(this);
      this.playCb = null;
      cb();
    }
  }

  preDraw(options: {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    angle?: number,
    scale?: number,
    alpha?: number, // 0 ~ 1
    mixDuration?: number // 0 ~ 1
  } = {}) {
    this.actor.x = options.x ?? 0;
    this.actor.y = options.y ?? 0;
    this.actor.rotation = options.angle ?? 0;
    this.actor.alpha = options.alpha ?? 1;
    this.actor.scale.set(options.scale ?? 1);
    this.mixDuration = options.mixDuration ?? this.mixDuration;

    if (options.width) {
      this.actor.width = options.width;
    }
    if (options.height) {
      this.actor.height = options.height;
    }
  }

  draw() {
    if (this.actor.parent !== this.stage) {
      this.stage.addChild(this.actor);
    }
  }

  clear() {
    if (this.actor.parent === this.stage) {
      this.stage.removeChild(this.actor);
    }
  }

  destroy(params: Record<string, any>) {
    this.clear();
    this.actor.removeListener({
      complete: this.oneAniComplete
    })
    try {
      this.actor.destroy(params);
    } catch (e) {
      console.warn('SpineDraw destroy', e);
    }
  }

  playSpineOnce(animation: string, callback: (() => void) | null = null) {
    if (this.animationList.has(animation)) {
      const ani = this.actor.state.setAnimation(0, animation, false)
      ani.mixDuration = this.mixDuration
      this.playCb = callback
    }
  }

  playSpineLoop(animation: string) {
    if (this.animationList.has(animation)) {
      const ani = this.actor.state.setAnimation(0, animation, true)
      ani.mixDuration = this.mixDuration
    }
  }

  stopPlay() {
    this.actor.state.clearTracks(0)
  }

  changeSkin(name: string) {
    if (this.skinList.has(name)) {
      this.actor.skeleton.setSkinByName(name)
      this.actor.skeleton.setSlotsToSetupPose()
    }
  }

  combineSkin(names: string[]) {
    const newSkin = this.actor.createSkin(this.actor.spineData, 'combineSkin')
    names.forEach((skin) => {
      if (this.skinList.has(skin)) {
        newSkin.addSkin(this.actor.spineData.findSkin(skin))
      }
    })
    this.actor.skeleton.setSkin(newSkin)
    this.actor.skeleton.setSlotsToSetupPose()
  }

  replaceSlotByTexture(name: string, texture: any) {
    this.actor.hackTextureBySlotName(name, texture, texture.orig)
  }
  
  replaceSlotByImage(name: string, img: string) {
    const texture = window.PIXI.Texture.from(img)
    this.replaceSlotByTexture(name, texture)
    return texture
  }
  
  replaceSlotByText(name: string, text: string, style: Record<string, any>) {
    const textSprite = new window.PIXI.Text(text, style)
    window.PIXI.RenderTexture.create({
      width: textSprite.width,
      height: textSprite.height,
    })
    this.replaceSlotByTexture(name, textSprite.texture)
    return textSprite
  }
}

export default SpineDraw;
```

