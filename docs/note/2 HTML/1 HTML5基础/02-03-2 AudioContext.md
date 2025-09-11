# AudioContext

## 简介

浏览器原生提供`AudioContext`对象，该对象用于生成一个声音的上下文，与扬声器相连

以下是一段播放声音的实现代码

:::demo

```html
<button>播放</button>
```

```js
let playing = false
const audioctx = new AudioContext()
const src = 'https://m701.music.126.net/20250909112803/f92eed3d1e957714d186f989f5f3dea3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096574205/2af1/3638/a50f/26d7ddabb6dbf2e2253ea0122d5a413e.mp3'

function playAudio() {
  if (playing) return
  playing = true
  fetch(src)
  	// 获取二进制数据
  	.then(res => res.arrayBuffer())
  	// 二进制数据解码为音频数据
  	.then(buffer => audioctx.decodeAudioData(buffer))
  	.then(buffer => {
  		const source = audioctx.createBufferSource()
    	source.buffer = buffer
  		source.connect(audioctx.destination)
  		source.start()
  	})
}

const button = document.querySelector('button')
button.addEventListener('click', playAudio)
```

:::

#### 图解

可以把 `AudioContext` 想象成一个图

一开始只有一个节点，叫 `destination`，这是创建 AudioContext 就会自带的节点，是音频上下文的出口，相当于水龙头的出口，音频要从水龙头的出口出来才能播放

:::dom

```html
<div class="container">
	<span>AudioContext</span>
  <div>destination</div>
</div>
```

```less
.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 500px;
  height: 300px;
  background: #eee;
  background-image:
    linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .2) 0),
    linear-gradient(45deg, rgba(0, 0, 0, .2) 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .2) 0),
    linear-gradient(45deg, rgba(0, 0, 0, .2) 25%, transparent 0);
  background-size: 25px 25px;
  background-position: 0 0, 12.5px 12.5px, 12.5px 12.5px, 25px 25px;
  color: #000;
  
  div {
    display: flex;
  	justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 50px);
    right: 100px;
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, .8);
  }
}
```

:::

当获取到一个音频数据后，通过 `createBufferSource` 创建一个 source 节点，然后将 source 节点和 destination 节点相连

source 节点可以看成一个水源，connect 则是将水源和水龙头连接，最后水流出水龙头完成播放

:::dom

```html
<div class="container">
	<span>AudioContext</span>
  <div class="source">source</div>
  <div class="arrow"></div>
  <div class="destination">destination</div>
</div>
```

```less
.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 500px;
  height: 300px;
  background: #eee;
  background-image:
    linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .2) 0),
    linear-gradient(45deg, rgba(0, 0, 0, .2) 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .2) 0),
    linear-gradient(45deg, rgba(0, 0, 0, .2) 25%, transparent 0);
  background-size: 25px 25px;
  background-position: 0 0, 12.5px 12.5px, 12.5px 12.5px, 25px 25px;
  color: #000;
  
  .destination, .source {
    display: flex;
  	justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 50px);
    right: 100px;
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, .8);
  }
  
  .source {
    top: calc(50% - 50px);
    left: 100px;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    left: 200px;
    width: 100px;
    height: 3px;
    background: rgba(0, 0, 0, .8);
    &::before, &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 30px;
      height: 3px;
      background: rgba(0, 0, 0, .8);
      transform: rotate(45deg);
      transform-origin: right center;
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
}
```

:::

## AudioNode

每个AudioNode代码一个处理声音的模块，处理完成后交由下个AudioNode来处理，传递的方式由`audioNode1.connect(audioNode2)`来实现

以下是较为常用的 node 节点

| 节点名称                    | 创建方式                                       | 含义                                               |
| --------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| AudioDestinationNode        | `audioContext.destination`属性获取（默认创建） | 表示 context 的最终节点，一般是音频渲染设备        |
| AudioBufferSourceNode       | `audioContext.createBufferSource()`创建        | 音源                                               |
| GainNode                    | `audioContext.createGain()`创建                | 调节音量                                           |
| AnalyserNode                | `audioContext.createAnalyser()` 创建           | 分析音频数据。可以用于获取音频的频谱信息、时域信息 |
| MediaElementAudioSourceNode | `audioContext.createMediaElementSource()`创建  | 从 HTML5 `<audio>` 或 `<video>` 元素播放音频数据   |

#### AudioBufferSourceNode

该节点代表音源

| 属性/方法/事件                        | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `buffer`                              | 播放的数据                                                   |
| `loop`                                | 是否为循环播放                                               |
| `loopStart/loopEnd`                   | 循环区间                                                     |
| `playbackRate`                        | 播放倍速，可以通过`source.playbackRate.value = 2`的方式来修改值 |
| `start([when][, offest][, duration])` | when是何时被播放，如果when小于audioContext.currentTime或者是0，声音会被立即播放<br />duration播放的持续时间，如果没有设置就会播放到最后 |
| `stop()`                              | 停止播放                                                     |
| `onended`                             | 播放结束事件                                                 |

```js
fetch('sound.mp4')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    // 播放声音
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  });
```

#### GainNode

该节点代表音量控制

通过设置`gainNode.gain.value`的值来设置音量，值的范围是 `[0, 1]`

```js
const source = context.createBufferSource();
source.buffer = audioBuffer;
// 改变音量
const gainNode = context.createGain();
gainNode.gain.value = 0.5;
source.connect(gainNode);
gainNode.connect(context.destination);
source.start();
```

#### AnalyserNode

分析音频数据。可以用于获取音频的频谱信息、时域信息。实现数据可视化，它不对音频有任何修改作用，仅仅是分析。

| 属性/方法               | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| fftSize                 | 快速傅立叶变换样本的窗口大小，fftSize的值必须是32-32768范围内的2的非零幂（就是$2^5$, $2^6$, $2^7$等等），默认值是2048 |
| getByteTimeDomainData() | 获取时域                                                     |
| getByteFrequencyData()  | 获取频域                                                     |

以下是音频可视化的例子

:::demo

```html
<canvas></canvas>
<button>播放</button>
```

```ts
const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const ctx = canvas.getContext('2d')!

const context = new AudioContext()
let audioBuffer: AudioBuffer | null = null
const src = 'https://m701.music.126.net/20250909112803/f92eed3d1e957714d186f989f5f3dea3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096574205/2af1/3638/a50f/26d7ddabb6dbf2e2253ea0122d5a413e.mp3'

// 预加载音频
fetch(src)
  .then(res => res.arrayBuffer())
  .then(buffer => context.decodeAudioData(buffer))
  .then(buffer => {
    audioBuffer = buffer
  })
  .catch(error => {
  	ctx.fillText('音频加载失败')
    console.error('音频加载失败:', error)
  })

// 播放音频函数
function playAudio() {
  if (!audioBuffer) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText('音频还未加载完成，请稍后重试')
    return
  }

  // 确保 AudioContext 处于运行状态
  if (context.state === 'suspended') {
    context.resume()
  }

  let playing = true
  // 创建音频源
  const source = context.createBufferSource()
  source.buffer = audioBuffer
  // 创建AnalyserNode，获取音频可视化数据
  const analyser = context.createAnalyser()
  analyser.fftSize = 512
  source.connect(analyser)
  analyser.connect(context.destination)
  source.start()
  source.addEventListener('ended', () => {
    let playing = false
  })

  const visualization = () => {
    if (!playing) return
    // 将当前频率数据复制到传入的Uint8Array（无符号字节数组）中
    const arr = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(arr);
		// 使用canvas绘制音频图谱
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const start = ((canvas.width / 2) - ((arr.length / 2) * 3))
    arr.forEach((item, index) => {
      ctx.beginPath();
      ctx.strokeStyle = '#B2AFF4';
      ctx.lineWidth = 3;
      ctx.moveTo(start + (index * 4), canvas.height);
      ctx.lineTo(start + (index * 4), canvas.height - item / 2);
      ctx.stroke();
    })

    requestAnimationFrame(visualization);
  }
  visualization()
}

// 添加点击事件监听器
document.querySelector('button')?.addEventListener('click', playAudio)
```

:::

