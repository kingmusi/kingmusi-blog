# redis 模块

## 准备

1. 启动 redis

   ```shell
   redis-server.exe redis.windows.conf
   ```

2. 引入包

   ```shell
   npm install redis --save
   ```

## 操作 redis

```js
// 引入模块
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')

// 如果有错误则抛出
redisClient.on('error', err => {
    console.error(err)
})

// 测试
redisClient.set('name', 'musi', redis.print) // 设置键值对  键 值 输出的结果

redisClient.get('name', (err, val) => { // 对出键值对 键 （错误， 值）
    if(err){
        console.error(err)
        return
    }

    console.log(val)
})

// 退出
redisClient.quit()
```

