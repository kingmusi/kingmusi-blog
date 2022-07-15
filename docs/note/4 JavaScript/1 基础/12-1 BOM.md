# BOM-window

## 窗口位置

| 属性或方法     | 说明                                  |
| -------------- | ------------------------------------- |
| `screenLeft`   | 窗口相对于屏幕左侧的位置              |
| `screenTop`    | 窗口相对于屏幕顶部的位置              |
| `moveTo(x, y)` | 移动到新位置的绝对坐标 **x** 和 **y** |
| `moveBy(x, y)` | 相对于当前位置移动的像素数            |

## 视口宽高

**可见区域**的宽高

解决浏览器兼容性的写法，获取视口宽高

```js
let pageWidth = window.innerWidth,
    pageHeight = window.innnerHeight

if (typeof pageWidth != 'number') {
    if (document.compatMode === 'CSS1Compat') { // 标准盒模型
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
    } else { // 怪异盒模型
        pageWidth = document.body.clientWidth
        pageHeight = document.body.clientHeight
    }
}
```

## 视口位置

**滚动**的距离

- 水平：`window.pageXoffset`、`window.scrollX`
- 垂直：`window.pageYoffset`、`window.scrollY`

滚动页面的方法

- `scrollTo(x, y)`：要滚动到的坐标
- `scrollBy(x, y)`：滚动的相对距离

## 打开新窗口 **window.open()**

参数

1. 在加载的 url
2. 目标窗口，可以传一个已存在的窗口（frame），传入的窗口不存在，则新窗口的命名为此参数
3. 特性字符串，指定新窗口包含的特性，因为兼容性不一，一般不用，详细看书

返回：新窗口的引用

```js
window.open('http://www.baidu.com', 'top')
// Window {window: Window, self: Window, document: document, name: "top", location: Location, …}
```

## 定时器

| 方法                          | 说明                                        |
| ----------------------------- | ------------------------------------------- |
| `setTimeout(function, time)`  | 指定一定时间后执行某些代码，返回排期 ID     |
| `clearTimeout(ID)`            | 取消该排期任务                              |
| `setInterval(function, time)` | 指定每隔一段时间后执行某些代码，返回排期 ID |
| `clearInterval(ID)`           | 取消该排期任务                              |

## 系统对话框

- 不包含 **html**，也不能通过 **css** 设置其，且每个浏览器的样式不一样

1. 警告框：`alert()`

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210505145322.png)

2. 确认框：`confirm()`，**OK** 按钮返回 **true**，**Cancel** 按钮返回 **false**

   ![image-20210505145516403](/Users/kingmusi/Library/Application Support/typora-user-images/image-20220227231241985.png)

3. 对话框：`prompt()`，**OK** 按钮返回输入的信息，**Cancel** 按钮返回 **null**

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210505145724.png)

# BOM-location

## 获取当前 **URL**

假设当前 **URL**：`https://kingmusi.github.io:80/blog/?q=javascript#hash`

| 属性                | 值                                                   | 说明                       |
| ------------------- | ---------------------------------------------------- | -------------------------- |
| `location.hash`     | `#hash`                                              | 散列值，没有则为空字符串   |
| `location.host`     | `kingmusi.github.io:80`                              | 服务器名及端口号           |
| `location.hostname` | `kingmusi.github.io`                                 | 服务器名                   |
| `location.href`     | `https://kingmusi.github.io/blog/?q=javascript#hash` | 当前加载页面的完整 **URL** |
| `location.pathname` | `/blog/`                                             | 路径和文件名               |
| `location.port`     | `80`                                                 | 端口                       |
| `location.protocol` | `https:`                                             | 协议                       |
| `location.search`   | `?q=javascript`                                      | 查询字符串                 |
| `location.origin`   | `https://kingmusi.github.io`                         | 源地址。只读               |

> **URLSearchParams** 提供了标准的 **API** 方法，获取查询字符串的参数
>
> ```js
> const search = '?username=kingmusi&password=123'
> const searchParams = new URLSearchParams(search)
> 
> searchParams.has('username') // true
> searchParams.get('username') // kingmusi
> 
> searchParams.set('age', 22)
> console.log(searchParams.toString()) // username=kingmusi&password=123&age=22
> 
> searchParams.delete('age')
> console.log(searchParams.toString()) // username=kingmusi&password=123
> 
> for (const param of searchParams) {
> 	console.log(param)
> }
> // ["username", "kingmusi"]
> // ["password", "123"]
> ```

## 操作地址

#### 1. 跳转新地址（会创建新的历史记录）

- `location.assign(url)`
- `location.href = url`
- `window.location = url`

#### 2. 修改当前地址（会创建新的历史记录）

- 修改散列值：`location.hash = '#newHash'`
- 修改查询字符串：`location.search = '?q=css'`
- 修改服务器名：`location.hostname = 'www.baidu.com'`
- 修改路径和文件名：`location.pathname = 'dir'`
- 修改端口：`location.port = 8080`

#### 3. 跳转新地址（不会创建新的历史记录）

- `location.replace(url)`

#### 4. 重新加载当前页面

- `location.reload()`

> 会不会创建新的历史记录，会影响着前进和后退按钮是否如期跳转

# BOM-history

## 导航 **go()**

##### 1. 传入整数，表示前进或后退多少步

```js
// 后退一页
history.go(-1)

// 前进一页
history.go(1)
```

##### 2. 传入URL，导航到最近的此 URL

```js
history.go('www.baidu.com')
```

##### 3. 简写

```js
// 后退一页
history.back()

// 前进一页
history.forward()
```

## 历史状态管理

##### 1. `pushState()`

- 改变 URL，并产生一条新历史记录。虽然 URL 改变了，但浏览器不会向服务器发送请求

- 参数

  1. 一个 **state** 对象
  2. 新标题，因为浏览器实现不一，所以可以传一个空字符串
  3. 调整的相对 **URL**

  ```js
  history.pushState( {id: 1, from: 'index'}, '', '/detail' )
  ```

##### 2. `replaceState()`

- 与 **pushState** 相似，但不会产生新历史记录

> `popstate`事件
>
> - 前进和后退都会触发此事件，其可以获取当前 **URL** 的 **state** 对象
>
>   ```js
>   window.addEventListener('popstate', e => {
>       const state = event.state
>       if (state) { // 第一个页面加载时状态为 null
>           // ...
>       }
>   })
>   ```

# BOM-navigator

## 获取浏览器信息

通过 **navigator.userAgent** 获取用户使用的浏览器和版本

但许多浏览器为了兼容性的问题，会在 **navigator.userAgent** 封装多个浏览器的信息，以确保自己能被检测到

尽管如此，格式上还是会存在差异，所以通过解析 **navigator.userAgent** 还是可以准确的获取以下信息

- 浏览器
- 浏览器版本
- 浏览器渲染引擎
- 设备类型（桌面 / 移动）
- 设备生产商
- 设备型号
- 操作系统
- 操作系统版本

但 **navigator.userAgent** 会随着浏览器的出现，和浏览器的升级不断改变，所以很容易过时，最好通过不断更新的库来准确获取

推荐一些 **GitHub** 上维护比较频繁的解析库：

- [Bowser](https://github.com/lancedikson/bowser)
- [UaParser.js](https://github.com/faisalman/ua-parser-js)
- [Platform.js](https://github.com/bestiejs/platform.js)

## Geolocation API

- 主要作用：让浏览器脚本感知当前设备的地理位置（只在 **HTTPS** 获取的脚本中可用）
- 地理信息来源：GPS、IP地址、射频识别、WIFI、蓝牙 MAC 地址、蜂窝 ID、用户输入的信息



1. 成功查询的回调函数，回调函数的参数主要如下

   ```typescript
   interface Position {
       timestamp: number; // 查询时间的时间戳
       coords: {
           latitude: number; // 经度
           longitude: number; // 纬度
           accuracy: number; // 以米为单位的经纬度的精度
           altitude: number; // 高度，需要设备具备测量的能力，常为空
           speed: number; // 设备每秒移动的速度，需要设备具备测量的能力，常为空
           heading: number; // 相对于正北方向移动的角度（0 <= heading < 360）,需要设备具备测量的能力，常为空
       }
   }
   ```

   ```js
   navigator.geolocation.getCurrentPosition(position => console.log(position))
   ```

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210505202612.png)

2. 查询失败的回调函数，失败的原因主要有三种

   - 浏览器未被允许访问设备位置
   - 不能上网
   - 不能再超时时间内返回位置信息

   ```js
   navigator.geolocation.getCurrentPosition(null, err => {
       console.log(err.code) // 状态码
       console.log(err.message) // 错误信息
   })
   ```

3. 配置项

   ```typescript
   interface Config {
       enableHighAccuracy: boolean; // true 表示位置尽量精准，false表示选择最快、最省电的方式获取
       timeout: number; // 毫秒，表示返回坐标的最长等待时间
       maximumAge: number; // 毫秒，返回坐标的最长有效期，默认值为0，每次都会重新查询，设置后，在有效期内使用缓存值
   }
   ```

## 网络连接状态



| 属性或事件                    | 说明                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| `navigator.onLine`            | 布尔值，联网状态                                             |
| `addEventListemer('online')`  | 事件，联网时候触发                                           |
| `addEventListemer('offline')` | 事件，断网时候触发                                           |
| `navigator.connection`        | 对象，其中有带宽、下行带宽、连接速度和质量、网络连接的技术等 |

> 需要注意的是，各个浏览器定义联网的标准是不统一的，有些认为只要连接到局域网就算 “在线”，而不管知否能真的上网

## 电池状态

- `navigator.getBattery()` 返回一个 **Promise**，其会 **resolve** 一个 **BatteryManager** 对象

  ```typescript
  interface BatteryManager {
      readonly charging: boolean; // 表示设备当前是否正接入电源充电
      readonly chargingTime: number; // 表示预计离电池充满还有多少秒
      readonly dischargingTime: number; // 表示预计离电量耗尽还有多少米，如没有电池，则返回 Infinity
      readonly level: number; // 电量百分比。没电返回 0.0，充满电返回 1.0。若没有电池，则返回 1.0
  }
  ```

- **BatteryManager** 对象还提供了 4 个事件

  | 事件                      | 说明                 |
  | ------------------------- | -------------------- |
  | `onchargingchange`        | 充电状态变化时触发   |
  | `onchargingtimechange`    | 充电时间变化时触发   |
  | `ondischargingtimechange` | 放电时间变化时触发   |
  | `onlevelchange`           | 电量百分比变化时触发 |

```js
navigator.getBattery().then(battery => {
    console.log(battery.charging) // 属性
    
    battery.onchargingchange = function() {}
})
```

## 硬件

| 属性                            | 说明                               |
| ------------------------------- | ---------------------------------- |
| `navigator.hardwareConcurrency` | 处理器核心数，不代表是 CPU 核心数  |
| `navigator.deviceMemory`        | 设备大致的系统内存大小，4GB 返回 4 |
| `navigator.maxTouchPoints`      | 触摸屏支持的最大关联触点数量       |

## Beacon API

- **unload** 事件中创建的任何异步请求后会被浏览器取消
- 使用 `navigator.sendBeacon()` 会保证页面在关闭的情况下，也会发送请求，这个请求为 `POST`
  - 第一个参数是请求的 **URL**
  - 第二个参数是请求体内容：**ArrayBufferView**、**Blob**、**String**、**FormData** 实例
  - 返回 **true** 表示进入任务队列，否则返回 **false**

# BOM-screen

> 保存客户端能力的信息，具体可查文档

