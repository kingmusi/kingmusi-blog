# Server-Sent-Events

## 简介

一般来说，HTTP 协议只能客户端向服务器发起请求，服务器不能主动向客户端推送。但是有一种特殊情况，就是服务器向客户端声明，接下来要发送的是流信息（streaming）。也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

## 与 WebSocket 比较

| 特性             | SSE (Server-Sent Events)                                     | WebSocket (WS)                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| **通信方向**     | **单向** (服务器 -> 客户端)                                  | **全双工** (服务器 <-> 客户端)                         |
| **协议基础**     | 基于 **HTTP(S)** (本质上是长连接 HTTP 流)                    | 独立的 **WebSocket 协议** (通过 HTTP 握手升级)         |
| **连接建立**     | 使用标准 HTTP `GET` 请求，头部 `Accept: text/event-stream`   | 使用 HTTP `Upgrade` 请求将连接升级到 WebSocket 协议    |
| **数据格式**     | 纯文本 (通常使用 `data:` 字段，格式简单)                     | **文本或二进制** (非常灵活)                            |
| **自动重连**     | **内置支持** (浏览器自动处理)                                | **需要手动实现**                                       |
| **消息 ID/恢复** | **内置支持** (通过 `id:` 字段，客户端发送 `Last-Event-ID` 恢复) | **需要手动实现**                                       |
| **复杂性**       | **更简单** (API 简单，服务器端相对容易实现)                  | **更复杂** (需要处理协议握手、帧封装、心跳等)          |
| **防火墙/代理**  | **兼容性更好** (使用标准 HTTP/S 端口 80/443)                 | **可能遇到问题** (某些严格防火墙/代理可能阻止 WS 协议) |
| **适用场景**     | 服务器向客户端推送更新                                       | 需要双向实时交互                                       |
| **性能开销**     | 较低 (基于 HTTP，无额外协议开销)                             | 较低 (建立连接后协议开销很小)，但初始握手稍重          |
| **安全性**       | 依赖 HTTPS 提供传输安全                                      | 依赖 WSS (WebSocket Secure) 提供传输安全               |

## 客户端 API - EventSource

浏览器首先生成一个`EventSource`实例，向服务器发起连接。跨域时，可以指定第二个参数，打开`withCredentials`属性，表示是否一起发送 Cookie

```js
const sse = new EventSource(url)
```

```js
const source = new EventSource(url, { withCredentials: true })
```

#### readyState 属性

`readyState`属性，表明连接的当前状态。该属性只读，可以取以下值

- 0：相当于常量`EventSource.CONNECTING`，表示连接还未建立，或者断线正在重连
- 1：相当于常量`EventSource.OPEN`，表示连接已经建立，可以接受数据
- 2：相当于常量`EventSource.CLOSED`，表示连接已断，且不会重连

#### url 属性

`url`属性返回连接的网址，该属性只读

#### withCredentials 属性

`withCredentials`属性返回一个布尔值，表示当前实例是否开启 CORS 的`withCredentials`。该属性只读，默认是`false`

#### onopen 属性

连接建立，就会触发`open`事件，可以在`onopen`属性定义回调函数

```js
sse.onopen = function (event) {
  // ...
}

// 另一种写法
sse.addEventListener('open', function (event) {
  // ...
})
```

#### onmessage 属性

```js
sse.onmessage = function (event) {
  const data = event.data;
};
// 另一种写法
sse.addEventListener('message', function (event) {
  const data = event.data;
});
```

- `data`：服务器端传回的数据（文本格式）

#### onerror 属性

发生通信错误（比如**连接中断**），就会触发`error`事件，可以在`onerror`属性定义回调函数

```js
sse.onerror = function (event) {
  
};
// 另一种写法
sse.addEventListener('error', function (event) {
  
});
```

#### 自定义事件

服务端还可以自定义 SSE 消息，发送回来的数据不会触发`message`事件，这些自定义的会触发对应时间监听器

```js
source.addEventListener('foo', function (event) {
  var data = event.data;
});
```

#### close() 方法

`close`方法用于关闭 SSE 连接

```js
sse.close();
```

