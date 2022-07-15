# MessageChannel和BroadcastChannel

## MessageChannel

#### 基础

MessageChannel 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性（`port1`、`port2`）发送数据，MessageChannel以`DOM Event`的形式发送消息，所以它属于异步的宏任务

```js
const { port1, port2 } = new MessageChannel();
port1.onmessage = function (event) {
  console.log('收到来自port2的消息：', event.data); // 收到来自port2的消息： pong
};
port2.onmessage = function (event) {
  console.log('收到来自port1的消息：', event.data); // 收到来自port1的消息： ping
  port2.postMessage('pong');
};
port1.postMessage('ping');
```

`addEventListener`的写法也可以，`addEventListener`之后要手动调用`start()`方法消息才能流动，因为初始化的时候是暂停的。`onmessage`已经隐式调用了`start()`方法

```js
const { port1, port2 } = new MessageChannel();
port1.addEventListener('message', function (event) {
  console.log('收到来自port2的消息：', event.data); // 收到来自port2的消息： pong
});
port1.start();
port2.addEventListener('message', function (event) {
  console.log('收到来自port1的消息：', event.data); // 收到来自port1的消息： ping
  port2.postMessage('pong');
});
port2.start();
port1.postMessage('ping');
```

MessagePort还有两个方法：`close`和`onmessageerror`

`close`方法能断开MessagePort的连接，之后两个断开之间将无法通信。建议通信结束后主动调用close方法以便资源回收

#### 使用场景1——EventEmitter

作为简单的EventEmitter做事件的订阅发布，实现不同脚本之间的通信

```js
// createChannel.js
const map = new Map();

export default function createChannel(key) {
  if (map.has(key)) {
    return map.get(key).port2;
  } else {
    map.set(key, new MessageChannel());
    return map.get(key).port1;
  }
}
```

```js
// a.js
const port = createChannel("test");
port.addEventListener("message", (e) => {
  console.log("from b", e.data);
});
port.start();

port.postMessage("hello, i am a");
```

```js
// b.js
const port = createChannel("test");
port.addEventListener("message", (e) => {
  console.log("from a", e.data);
  port.postMessage("hello, i am b");
});
port.start();
```

#### 使用场景2——让两个 iframe 或 worker 直接通信

```js
// worker1.js
let port1

self.onmessage = function({ ports }) {
    port1 = ports[0]
    port1.onmessage = function({ data }) {
        console.log(data)
    }
    port1.postMessage('hello, i am 1')
}
```

```js
// worker2.js
let port2

self.onmessage = function({ ports }) {
    port2 = ports[0]
    port2.onmessage = function({ data }) {
        console.log(data)
    }
    port2.postMessage('hello, i am 2')
}
```

```js
// index.js
const { port1, port2 } = new MessageChannel()

const worker1 = new Worker('worker1.js')
const worker2 = new Worker('worker2.js')

worker1.postMessage(null, [port1])
worker2.postMessage(null, [port2])
```

#### 使用场景3——深拷贝

此方式可以深拷贝普通的对象，对象可存在循环引用，但不能拷贝**函数和Symbol**，会报错

```js
function deepClone(obj) {
  return new Promise((resolve, reject) => {
    const { port1, port2 } = new MessageChannel()

    try {
      port2.onmessage = ({ data }) => resolve(data)
      port1.postMessage(obj)
    } catch(e) {
      reject(e)
    }
  })
}

const obj = {
  a: 1,
  b: [1, 2]
}
obj.c = obj

deepClone(obj).then(res => {
  console.log(res === obj) // false
  res.a = 2
  console.log(obj.a) // 1
})
```

## BroadcastChannel

`BroadcastChannel` 接口代理了一个命名频道，可以让指定 `origin` 下的任意 `browsing context` 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 `message` 事件，消息可以广播到所有监听了该频道的 `BroadcastChannel` 对象

```js
// a.js
const bc = new BroadcastChannel('test')
bc.onmessage = function (e) {
	console.log(e)
}
// 同样可以使用 addEventListener
```

```js
// b.js
const bc = new BroadcastChannel('test')
bc.postMessage('hello')
```

使用 `close()` 关闭
