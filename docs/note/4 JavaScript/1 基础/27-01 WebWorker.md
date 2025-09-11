# webWorker

## 作用

- 允许主线程创建 **Worker** 线程，将一些任务分配给后者运行。在主线程运行的同时，**Worker** 线程在后台运行，两者互不干扰。等到 **Worker** 线程完成计算任务，再把结果返回给主线程

## 主线程

```js
// 构建一个 Worker 线程
const worker = new Worker('work.js');

// 发送消息 postMessage()
worker.postMessage('Hello World');

// 通过 worker.onmessage 监听接收子线程发回来的消息
worker.onmessage = (event) => {
  console.log(event.data);
}

// 关闭子线程
worker.terminate();
```

## 子线程

```js
// 通过 worker.onmessage 监听接收主线程发回来的消息
self.onmessage = (event) => {
  console.log(event.data);
}

// 发送消息 postMessage()
self.postMessage('Finish');

// 关闭自身
self.close();
```

