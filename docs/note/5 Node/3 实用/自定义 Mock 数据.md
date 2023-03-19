# 自定义 Mock 数据

## 安装及文档

安装

```bash
npm i mockjs --save-dev
```

在 **src** 下新建 **mock.js**

```js
import Mock from 'mockjs'

// 设置响应时间
Mock.setup({ timeout: '300-600' })

export default Mock
```

在 **app.js** 中引入

```js
import './mock.js'
```



[文档](http://mockjs.com/examples.html)

> 可以使用 [rap2](http://rap2.taobao.org/) 进行图形化操作，并且接口是在线的

## 使用

数据格式：`name|rule:value`

**GET** 请求

```js
Mock.mock('/api/list', function() {
    return Mock.mock({
        "user|1-3": [{
            'name': '@cname',
            'id': 88
        }
      ]
    })
})
```

**POST** 请求

```js
Mock.mock('/api/login', function(options) {
    const {username, password} = JSON.parse(options.body)
    if (username === 'kingmusi' && password === '123') {
        return Mock.mock({
            'code': 0
        })
    } else {
        return Mock.mock({
            'code': 1,
            'msg': '用户名和密码不匹配'
        })
    }
})
```

