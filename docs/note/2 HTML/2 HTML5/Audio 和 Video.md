# Audio 和 Video

## 标签

- 可以通过 **audio** 嵌入音频，通过 **video** 嵌入视频

  ```html
  <audio src="m.mp3"/>
  <video src="m.mp4" width=320 height=400 />
  ```

- 可以向标签中插入文本，用于浏览器不支持这两个标签时，显示提示文字

  ```html
  <audio src="m.mp3">您的浏览器不支持</audio>
  ```

- 由于浏览器对标准音频和视频的编解码支持并不一致，所以通常需要使用`<source>`元素来为指定不同格式的媒体源

  ```html
  <audio> 
    <!-- source 不用关闭-->
    <source src="m.mp3" type="audio/mpeg">   
    <source src="m.ogg" type="audio/ogg;codec='vorbis'">  
    您的浏览器不支持
  </audio>
  ```

##### 公共的属性

| 标签名                 | 值                                                           | 说明                                                    |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| autoplay               | autoplay                                                     | 如果出现该属性，则在就绪后马上播放。                    |
| controls               | controls                                                     | 如果出现该属性，则向用户显示控件（比如播放/暂停按钮）。 |
| loop                   | loop                                                         | 如果出现该属性，则每当结束时重新开始播放。              |
| muted                  | muted                                                        | 如果出现该属性，则输出静音。                            |
| preload                | auto：页面加载后载入整个音频<br/>metadata：假面加载后只载入元数据<br/>none：无需加载数据 | 规定当网页加载时，是否默认被加载以及如何被加载。        |
| src                    | url                                                          | 文件的url                                               |
| poster*（video 独有）* | url                                                          | 视屏封面用一张图片替代                                  |
| height*（video 独有）* | number                                                       | 视频元素的高度                                          |
| width*（video 独有）*  | number                                                       | 视频元素的宽度                                          |

## 使用 JavaScript 操控

##### 1. 创建 / 获取元素

```js
// 获取
var audio = document.getElementById('audio')
// 创建
var audio = new Audio('./成都.mp3')
var audio = document.createElement('audio')
```

> video 没有 new 方法

##### 2. 只读属性

| 属性         | 数据类型   | 说明                                                         |
| ------------ | ---------- | ------------------------------------------------------------ |
| duration     | Float      | 整个媒体文件的播放时长，以秒为单位。如果无法获取时长，则返回 **NaN** |
| paused       | Boolean    | 如果媒体文件当前被暂停，则返回 **true**。如果还未开始播放，默认返回 **true** |
| ended        | Boolean    | 如果媒体文件已经播放完毕，则返回 **true**                    |
| currentLoop  | Integer    | 返回媒体已经播放的循环次数                                   |
| currentSrc   | String     | 返回当前正在播放或已加载的文件。对应 **source** 元素中选择的文件 |
| seeking      | Boolean    | 如果播放器正在跳到一个新的播放点，值为 **true**              |
| networkState | Integer    | 表示媒体当前网络连接状态。0 表示空，1 表示加载中，2 表示加载元数据，3 表示加载了第一帧，4 表示加载完成 |
| readyState   | Integer    | 表示媒体是否已经准备就绪。0 表示媒体不可用，1 表示可以显示当前帧，2 表示媒体可以开始播放，3 表示媒体可以从头播放到尾 |
| played       | TimeRanges | 返回已经播放的时间段                                         |
| buffered     | TimeRanges | 返回当前已经缓冲的时间段                                     |
| seekable     | TimeRanges | 返回当前播放器需要跳到的时间段                               |

> TimeRanges 对象：包括一个或多个时间范围
>
> - length：表示有多少个时间范围
> - start(index)：返回 index 对应的时间范围的开始时间
> - end(index)：返回 index 对应的时间范围的结束时间

##### 3. 可读写属性

| 属性     | 数据类型 | 说明                                                       |
| -------- | -------- | ---------------------------------------------------------- |
| autoplay | Boolean  | 取得或设置 **autoplay** 标签                               |
| controls | Boolean  | 取得或设置 **controls** 标签，用于显示或影藏浏览器内置控件 |
| loop     | Boolean  | 取得或设置媒体是否应该在播放完再循环开始                   |
| muted    | Boolean  | 取得或设置媒体是否静音                                     |
| start    | Float    | 取得或设置媒体文件中的位置，以秒为单位，从该处开始播放     |
| volume   | Float    | 取得或设置当前音量，值为 **0.0** 带 **1.0**                |

##### 方法

| 方法名  | 说明     |
| ------- | -------- |
| play()  | 播放     |
| pause() | 停止     |
| load()  | 重新加载 |

##### 事件监听

| type           | 触发时间点           |
| -------------- | -------------------- |
| abort          | 播放中断时           |
| play           | 开始播放时           |
| pause          | 暂停播放时           |
| loadedmetadata | 获取完媒体的元数据时 |
| ended          | 播放结束时           |

