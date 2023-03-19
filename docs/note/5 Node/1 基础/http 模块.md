# http 模块

## 搭建一个简易服务器

1、通过 `http.createServer` 创建一个服务器

2、通过 `listen` 启动服务器

3、根据 `req` 拿取请求的数据，并做解析

4、根据解析结果做不同的处理

5、通过 `res.end` 返回结果给客户端

```js
const http = require('http')  // 引入http模块
const querystring = require('querystring') // 引入querystring模块 详细可见：https://www.jianshu.com/p/78c94673a2e8

const server = http.createServer((req, res) => {
    const method = req.method // 请求的方法：GET 或 POST
    const url = req.url // 请求的url地址，其值从 url 的端口号后开始，即 path + search
    const path = url.split('?')[0] // url ‘？’ 前的部分
    const query = querystring.parse(url.split('?')[1]) // 自动解析 url ‘？’ 后的部分，返回一个对象

    res.setHeader('Content-type', 'application/JSON') // 设置响应的头部 Content-type ，为字符创的JSON格式

    // 把所要输出的值放在一个对象中
    const data = { 
        method,
        url,
        path,
        query
    }
    
    // 如果请求的方法为 GET
    if (method === 'GET') {
        console.log(data) // 在控制台上输出 data 对象

        // end 方法：返回给客户端的数据，只能放入 字符串 或 二进制
        res.end(
        	JSON.stringify(data)
        )
    }

    // 如果请求的方法为 POST
    if (method === 'POST') {
        let postdata = '' // 创建一个空字符串以接受请求时传过来的 POST 数据
        req.on('data', dunck => { // 使用 data 方法监听并接受传过来的 POST 数据，既 dunck
            postdata += dunck 
        })
        req.on('end', () => { // 使用 end 方法监听传输完数据后
            data.postdata = postdata 
            console.log(data) // 在控制台上输出 data 对象

            // end 方法：返回给客户端的数据，只能放入 字符串 或 二进制
            res.end(
                JSON.stringify(data)
            )
        })
    }
})

server.listen(3000, () => { // 使用 3000 端口创建服务器
    console.log('running....')
})
```

> **请求测试**
>
> 1. http://localhost:3000?name=kingmusi
> 2. http://localhost:3000
>    - username=kingmusi
>    - password=123
>
> ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219184731.png)