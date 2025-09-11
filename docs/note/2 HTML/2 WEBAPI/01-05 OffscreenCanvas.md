# OffscreenCanvas

> OffscreenCanvas和canvas都是渲染图形的对象。
>
> 但是OffscreenCanvas即可以在window环境下使用，也可以在**web worker**中使用，这让**不影响浏览器主线程**的离屏渲染成为可能

## 创建

1. 实例化 `OffscreenCanvas` 类

```js
const offscreen = new OffscreenCanvas(width, height)
```

2. 通过`canvas`的`transferControlToOffscreen`函数获取一个`OffscreenCanvas`对象，在`OffscreenCanvas`对象上的绘制，会同时在 `canvas` 和 `OffscreenCanvas` 上生效

```js
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();
```

> 注意：
>
> canvas对象调用了函数transferControlToOffscreen移交控制权之后，不能再获取绘制上下文，调用canvas.getContext('2d')会报错； 同样的原理，如果canvas已经获取的绘制上下文，调用transferControlToOffscreen会报错。

## OffscreenCanvas.transferToImageBitmap()

`transferToImageBitmap()`可以从OffscreenCanvas对象的绘制内容创建一个ImageBitmap对象。该对象可以用于到其他canvas的绘制

一个常见的使用：

- 把一个比较耗费时间的绘制放到web worker下的OffscreenCanvas对象上进行
- 绘制完成后，创建一个ImageBitmap对象
- 把该对象传递给页面端，在页面端绘制ImageBitmap对象

主线程代码：

```ts
const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
const ctx = canvas.getContext('2d')!
const worker = new Worker('worker.js')

function init() {
  worker.postMessage({ type: 'init', width: canvas.width, height: canvas.height })
  worker.onmessage = (e) => {
    // 从 worker 中获取绘制好图像的 ImageBitmap 对象，并进行绘制
    ctx.drawImage(e.data.imageBitmap, 0, 0)
  }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  worker.postMessage({ type: 'redraw' })
}

init()
```

worker线程的代码：

```ts
let offscreen: OffscreenCanvas | null = null
let ctx: OffscreenCanvasRenderingContext2D | null = null

self.onmessage = (e) => {
  if (e.data.type === 'init') {
    init(e.data.width, e.data.height)
    draw()
  } else if (e.data.type === 'redraw') {
    draw()
  }
}

function init(width: number, height: number) {
  offscreen = new OffscreenCanvas(width, height)
  ctx = offscreen.getContext('2d')!
}

function draw() {
  if (!offscreen || !ctx) return

  ctx.clearRect(0, 0, offscreen.width, offscreen.height)
  // 模拟耗时操作
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 1000; j++) {
      ctx.fillRect(i * 3, j * 3, 2, 2)
    }
  }

  // 转换成 ImageBitmap 对象，并发送给主线程
  const imageBitmap = offscreen.transferToImageBitmap()
  postMessage({ imageBitmap })
}
```

## ImageBitmapRenderingContext

`ImageBitmapRenderingContext`接口是 canvas 的渲染上下文，它只提供使用 ImageBitmap 替换 canvas 的功能

这个接口可用于 window context 和 worker context

上面主线程例子中可这样修改：

改成获取 `ImageBitmapRenderingContext` 类

```diff
- const ctx = canvas.getContext('2d')!
+ const ctx = canvas.getContext('bitmaprenderer')!
```

直接渲染 `ImageBitmap` 对象

```diff
- ctx.drawImage(e.data.imageBitmap, 0, 0)
+ ctx.transferFromImageBitmap(e.data.imageBitmap)
```

## transferControlToOffscreen函数

> `transferControlToOffscreen`相比`new OffscreenCanvas`的优势：
>
> 上面例子中通过`new OffscreenCanvas`的实现，需要绘制，然后获取ImageBitmap对象，通过web worker通信再把ImageBitmap传递给页面，多了一层通信上的消耗
>
> 而如果通过canvas.transferControlToOffscreen生成的OffscreenCanvas对象，OffscreenCanvas对象的绘制会自动在canvas元素上面显示出来

通过transferControlToOffscreen函数创建的OffscreenCanvas对象有两大功能：

- 避免绘制中大量的计算阻塞主线程
- 避免主线程的重任务阻塞绘制

以下是一个列子：

首先创建一个Circle类，这个类的作用主要是用于绘制一个圆，并且可以启动动画，不断的改变圆的半径大小。

另外还有一个函数changeColor，表示改变绘制的颜色，并且会在此函数内调用fibonacci函数，模拟费时操作

```js
export default class Circle {
  constructor(ctx) {
    this.ctx = ctx;
    this.r = 0;
    this.rMax = 50;
    this.color = 'black';
    this.bindAnimate = this.animate.bind(this);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.ctx.canvas.width / 2,this.ctx.canvas.height / 2, this.r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  animate(){
     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
     this.r =  this.r + 1;
     if(this.r > this.rMax){
       this.r = 0;
     }
     this.draw();
     requestAnimationFrame(this.bindAnimate);
  }

  // 斐波那契数列（模拟耗时计算）
  fibonacci(num) {
    return (num <= 1) ? 1 : this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }

  changeColor(){
    this.fibonacci(41);
    if (this.color == 'black'){ 
      this.color = 'blue';
    } else {
      this.color = 'black';
    }
    this.r = 0;
  }
}
```

定义两个canvas，一个用于普通的canvas应用，一个用于呈现离屏绘制的内容：

```html
<canvas id="canvas-window" width="300" height="400"></canvas>
<canvas id="canvas-worker" width="300" height="400"></canvas>
```

第一个canvas，直接在其上不断绘制半径变化的圆形：

```ts
const canvasInWindow = document.getElementById('canvas-window') as HTMLCanvasElement;
const ctx = canvasInWindow.getContext('2d')!;
var circle = new Circle(ctx);
circle.animate();
canvasInWindow.addEventListener('click', function () {
  circle.changeColor();
});
```

第二个canvas，使用webworker线程渲染：

```ts
const canvasInWorker = document.getElementById('canvas-worker') as HTMLCanvasElement;
const offscreen = canvasInWorker.transferControlToOffscreen();
const worker = new Worker('worker.js');
worker.postMessage({ type: 'start', canvas: offscreen }, [offscreen]);
canvasInWorker.addEventListener('click', function () {
  worker.postMessage({ type:'changeColor' });
});
```

```ts
// worker
let circle: any

self.onmessage = function (e) {
    var data = e.data;
    if(data.type == 'start'){
      const ctx = data.canvas.getContext('2d');
      circle = new Circle(ctx);
      circle.animate();
    } else if (data.type == 'changeColor' && circle) {
      circle.changeColor();
    }
}
```



当点击第一个canvas后，主线程会卡住，但不会影响第二个canvas的继续绘制：

<video src="http://cdn.musiblog.com/HTML/WEBAPI/Offscreen-%E4%B8%BB%E7%BA%BF%E7%A8%8B%E4%B8%8D%E9%98%BB%E5%A1%9E%E7%A6%BB%E5%B1%8F%E7%9A%84%E6%B8%B2%E6%9F%93.mp4" autoplay muted loop  />

当点击第二个canvas后，work线程会卡住，但不会影响第一个canvas的继续绘制：

<video src="http://cdn.musiblog.com/HTML/WEBAPI/Offscreen-%E7%A6%BB%E5%B1%8F%E4%B8%8D%E9%98%BB%E5%A1%9E%E4%B8%BB%E7%BA%BF%E7%A8%8B%E6%B8%B2%E6%9F%93.mp4" autoplay muted loop  />