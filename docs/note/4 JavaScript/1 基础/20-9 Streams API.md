# Streams API

> 还没得到很好的支持

## 支持流

1. 流的基本单位是块，块可以是任何数据类型，且大小不一
2. 反压：如果流入口的速度比流出口的速度快，会造成数据积压，当积压到一个阔值。浏览器会反压，即通知流入口停止发送数据，直到队列大小降到某个既定的阔值之下

## 可读流

1. 创建一个 **ReadableStream** 实例，并在一个参数中定义 **start()** 方法
2. 调用 **start** 的参数 **controller** 上的 `enqueue()` 方法，可以把值传入控制器。当所有值传完后，调用 `close()` 关闭流
3. 上面只是把数据加入了流队列，需要创建 **ReadableStreamDefaultReader** 实例 
4. 通过流的 `getReader()` 方法获取实例
5. 使用读取器实例的 `read()` 方法可以读出值

```js
async function* ints() {
    for (let i = 0; i < 5; i++) {
        yield await new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))
    }
}

const readableStream = new ReadableStream({
    async start(controller) {
        for await (let chunk of ints()) {
            controller.enqueue(chunk)
        }
        controller.close()
    }
})

console.log(readableStream.locked) // false
const readableStreamDefaultReader = readableStream.getReader()
console.log(readableStream.locked) // true

// 消费者
async function consumer() {
    while(true) {
        const { done, value } = await readableStreamDefaultReader.read()
        if (done) {
            break
        } else {
            console.log(value)
        }
    }
}
consumer()

// 1 秒后 0
// 2 秒后 1
// 3 秒后 2
// 4 秒后 3
// 5 秒后 4
```

## 可写流

1. 创建一个 **WritableStream** 实例，并在一个参数中定义 **write()** 方法，获得写入的数据
4. 通过流的 `getWriter()` 方法获取 **WritableStreamDefaultWriter** 实例
5. 在写入数据前，需要在写入前确保可写入
4. 使用 **WritableStreamDefaultWriter.ready** 返回一个期约，此期约在能够向流中写入数据时解决
5. 然后把值传给  **WritableStreamDefaultWriter.write()** 即可写入
6. 在全部写入后，调用 `close()` 将流关闭

```js
async function* ints() {
    for (let i = 0; i < 5; i++) {
        yield await new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))
    }
}

const writableStream = new WritableStream({
    write(value) {
        console.log(value)
    }
})

console.log(writableStream.locked)
const writableStreamDefaultWriter = writableStream.getWriter()
console.log(writableStream.locked)

// 生产者
async function producer() {
    for await (const chunk of ints()) {
        await writableStreamDefaultWriter.ready
        writableStreamDefaultWriter.write(chunk)
    }

    writableStreamDefaultWriter.close()
}
producer()

// 1 秒后 0
// 2 秒后 1
// 3 秒后 2
// 4 秒后 3
// 5 秒后 4
```

## 转换流

1.  创建一个 **TransformStream** 实例，通过 `transform()` 方法将每个值翻倍

```js
async function* ints() {
    for (let i = 0; i < 5; i++) {
        yield await new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))
    }
}

const { writable, readable } = new TransformStream({
    transform(chunk, controller) {
        controller.enqueue(chunk * 2)
    }
})

const readableStreamDefaultReader = readable.getReader()
const writableStreamDefaultWriter = writable.getWriter()

// 消费者
async function consumer() {
    while(true) {
        const { done, value } = await readableStreamDefaultReader.read()
        if (done) {
            break
        } else {
            console.log(value)
        }
    }
}
consumer()

async function producer() {
    for await (const chunk of ints()) {
        await writableStreamDefaultWriter.ready
        writableStreamDefaultWriter.write(chunk)
    }

    writableStreamDefaultWriter.close()
}
producer()

// 1 秒后 0
// 2 秒后 2
// 3 秒后 4
// 4 秒后 6
// 5 秒后 8
```

## 通过管道连接流

1. 使用 `pipeThrough()` 把 **ReadableStream** 接入 **TransformStream**

   ```js
   async function* ints() {
       for (let i = 0; i < 5; i++) {
           yield await new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))
       }
   }
   
   const integerStream = new ReadableStream({
       async start(controller) {
           for await (let chunk of ints()) {
               controller.enqueue(chunk)
           }
           controller.close()
       }
   })
   
   const doublingStream = new TransformStream({
       transform(chunk, controller) {
           controller.enqueue(chunk * 2)
       }
   })
   
   const pipeStream = integerStream.pipeThrough(doublingStream)
   const pipeStreamDefaultReader = pipeStream.getReader()
   
   
   // 消费者
   async function consumer() {
       while(true) {
           const { done, value } = await pipeStreamDefaultReader.read()
           if (done) {
               break
           } else {
               console.log(value)
           }
       }
   }
   consumer()
   
   // 1 秒后 0
   // 2 秒后 2
   // 3 秒后 4
   // 4 秒后 6
   // 5 秒后 8
   ```

2. 使用 `pipTo()` 可以将 **ReadableStream** 连接到 **WritableStream**

   ```js
   async function* ints() {
       for (let i = 0; i < 5; i++) {
           yield await new Promise(resolve => setTimeout(() => resolve(i), 1000 * i))
       }
   }
   
   const integerStream = new ReadableStream({
       async start(controller) {
           for await (let chunk of ints()) {
               controller.enqueue(chunk)
           }
           controller.close()
       }
   })
   
   const writableStream = new WritableStream({
       write(value) {
           console.log(value)
       }
   })
   
   const pipedStream = integerStream.pipeTo(writableStream)
   
   // 1 秒后 0
   // 2 秒后 1
   // 3 秒后 2
   // 4 秒后 3
   // 5 秒后 4
   ```

   

