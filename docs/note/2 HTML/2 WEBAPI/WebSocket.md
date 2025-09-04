# WebSocket

## 特点

1. 长时连接实现与服务器全双工、双向的通信
2. 与 `HTTP` 协议有着良好的`兼容`性
3. 数据格式比较`轻量，性能开销小，通信高效`
4. 可以发送`文本`，也可以发送`二进制数据`
5. `没有同源限制`，客户端可以与任意服务器通信。
6. 协议标识符是**ws**（如果加密，则为**wss**）

## 使用

1. 使用 **WebSocket** 构造函数创建一个 **WebSocket**对象，并传入一个连接的绝对 **URL**
2. 监听相应事件（只支持 **on** 形式），并作出相应操作

```js
const ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = () => { // 打开并发送信息
  ws.send("Hello WebSockets!"); // 可传字符串、Blob、ArrayBuffer
};

ws.onmessage = e => { // 接受信息
  console.log( "Received Message: " + e.data);
  ws.close();
};

ws.onclose = e => { // 关闭
  /**
  	1. e.wasClean: 布尔值，表示是否干净地关闭
  	2. e.code：来自服务器的数值状态码
  	3. e.reason：字符串，包含服务器发来的消息
  **/
  console.log("Connection closed.");
}
```

## 除了 WebCocket ，还有什么可以做到聊天功能？

 ##### 一、Ajax 轮询

 采用Ajax定时向服务端发送请求检查有无消息更新。网页定时向服务器发送请求，若服务器有消息推送，则返回消息，否则返回空消息

 这种轮询方式需要发送大量无效请求，大大消耗了服务器资源，且推送消息的实时性较低

 

 ##### 二、Ajax 长轮询

 Ajax长轮询对前面的Ajax轮询方式做了改进，服务端收到请求后，不再立即返回，而是等待有消息推送时返回。网页收到服务端返回的消息后，立即发起一个新的请求，等待下一个推送消息。

 

 ##### 三、**Server-Send Event**

 1. 单向通道，只允许服务器向浏览器发送信息
 2. 使用 http 协议

 ```js
 var source = new EventSource('http://localhost:8080');    
 source.addEventListener('message', function(e) { console.log(e.data); }, false);
 ```

