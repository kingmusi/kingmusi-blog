# koa2

## 准备

1. 使用 `koa2-generator` 生成 `koa2` 模板

   ```shell
   npx koa2-generator -e [projectName]
   ```

2. 进入目录，并且安装依赖包

   ```shell
   cd [projectName]
   npm install
   ```

3. 引入 `cross-env` 检测开发或线上环境，已做不同的处理

   ```shell
   npm install cross-env --save-dev
   ```

4. 引入 `nodemon` 自动重启项目

   ```shell
   npm install nodemon --save-dev
   ```

5. 重构 package.json

   ```json
   "scripts": {
       "start": "node ./bin/www",
       "dev": "cross-env NODE_ENV=dev nodemon ./bin/www",
       "prd": "cross-env NODE_ENV=production nodemon ./bin/www"
   }
   ```

> **遇到找不到xx模块问题**
>
> 把 node_modules 删了，重新下载依赖包 `npm install`

## 解析和重构 app.js

```js
const Koa = require('koa')
const app = new Koa()                                   // new 一个 koa 实例，赋予 app
const views = require('koa-views')                      // 用于视图层
// const co = require('co')                                // 将koa1包中使用的Generator函数转换成Koa2中的async函数
// const convert = require('koa-convert')                  // 将koa1包中使用的Generator函数转换成Koa2中的async函数
const json = require('koa-json')                        // 用于解析json
const onerror = require('koa-onerror')                  // 用于处理错误
const bodyparser = require('koa-bodyparser')            // 解析 post data
const logger = require('koa-logger')                    // 用于生成配置文件
const debug = require('debug')('koa2:server')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')                    // 引入 koa-morgan 模块，用于写日志
const config = require('./config')                      // 导入配置文件，在里面可以修改端口    

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')

// 错误处理
onerror(app)

// middlewares 中间件
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'ejs': 'ejs'},
    extension: 'ejs'
  }))

// logger 日志
app.use(async (ctx, next) => {
  // 计算运行完全部程序的时间
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})
const ENV = process.env.NODE_ENV;
if(ENV == 'dev'){
  // 测试和开发环境
  app.use(morgan('dev'));      
}else{
  // 线上环境，向日志中追加内容
  const logname = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logname, {
    flags: 'a' // 追加的方式
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
```

> **重构日志**
>
> - 引入包
>
>   ```shell
>   npm install koa-morgan --save
>   ```
>
> - 引入 fs 模块
>
> - 引入以上 `42~55` 行的代码
>
> - 再主文件下创建 `/logs/access.log`

## 路由使用

**重构模板中的路由**

- 如以上 `app.js` 一样删除在 `app.js` 中的 `router`

- 在 `app.js` 引入 `/routers`下的路由，如 `16-18`  行。并且注册，如 `57-58` 行

- 同时改造 `/routers` 下的路由文件

  ```js
  const router = require('koa-router')()
  
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    }
    await ctx.render('index', {title: ctx.state})
  })
  
  module.exports = router
  ```

**获取客户端传来的数据**

- get

  ```js
  const { username } = ctx.query
  ```

- post

  ```js
  const { username } = ctx.request.body
  ```

1. 返回数据给客户端

   - ```js
     ctx.body = 'hello world'
     ```

   > **很多时候，返回的应该是一个模型**
   >
   > - 创建 `/model/resModel.js` 来创建基本模型
   >
   >   ```js
   >   class BaseModel {
   >       constructor(data, message) {
   >           if (typeof data === 'string') { // 如果 data 是字符串（不是对象），则表明只返回一个信息
   >               this.message = data
   >               data = null // 两个设置为 null ，则不走下面的判断了
   >               message = null
   >           }
   >           if (data) { // 
   >               this.data = data
   >           }
   >           if (message) {
   >               this.message = message
   >           }
   >       }
   >   }
   >   // 成功的模型，code = 1
   >   class SuccessModel extends BaseModel {
   >       constructor(data, message) {
   >           super(data, message)
   >           this.code = 1
   >       }
   >   }
   >   // 失败的模型，code = 0
   >   class ErrorModel extends BaseModel {
   >       constructor(data, message) {
   >           super(data, message)
   >           this.code = 0
   >       }
   >   }
   >   
   >   module.exports = {
   >       SuccessModel,
   >       ErrorModel
   >   }
   >   ```
   >
   > - 在路由中使用
   >
   >   ```js
   >   const { SuccessModel, ErrorModel } = require('../model/resModel') 
   >   router.get('/', (ctx, next) => {
   >       const { username } = ctx.query
   >   	ctx.body = new SuccessModel({ username })
   >   });
   >   ```
   >
   >   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219232004.png)

## 使用session

1. 引入包

   ```shell
   npm install koa-generic-session --save
   ```

2. 再 `app.js` 中引入并注册

   ```js
   const session = require('koa-generic-session'); 
   
   // 在日志下注册
   app.keys = ['hfkjahkj']
   app.use(session({
     // 配置 cookie
     cookie: {
       path: '/',
       httpOnly: true,
       maxAge: 24 * 60 * 60 * 1000
     }
   }))
   ```

3. 在路由中设置 / 获取

   ```js
   ctx.session.username = 'kingmusi'
   ```

## 操作 mysql

1. 引入包

   ```shell
   npm install mysql --save
   ```

2. 创建 `/db` 文件夹管理

   - 创建 `/db/config.js` 文件管理 mysql 的基本参数

     ```js
     // 获取环境变量
     const env = process.env.NODE_ENV
     let MYSQL_CONF
     
     if (env === 'dev') {
         MYSQL_CONF = {
             host: 'localhost',
             user: 'root',
             password: '123',
             port: '3306',
             database: 'myblog'
         }
     }
     
     if (env === 'production') {
         MYSQL_CONF = {
             host: 'localhost',
             user: 'root',
             password: '123',
             port: '3306',
             database: 'myblog'
         }
     }
     
     module.exports = MYSQL_CONF
     ```

   - 创建 `/db/helper.js` 文件管理 mysql 的自定义方法

     ```js
     const MYSQL_CONF = require('./config.js') 
     const mysql = require('mysql')
     
     // 创建连接对象
     const con = mysql.createConnection( MYSQL_CONF )
     
     // 开始连接
     con.connect()
     
     // 统一执行 sql 的函数
     function exec(sql) {
         return new Promise((resolve, reject) => {
             con.query(sql, (err, result) => {
                 if (err) reject(err)
                 else resolve(result)
             })
         })
     }
     
     module.exports = {
         exec, // 执行 sql 的函数
         escape: mysql.escape // sql 预处理，防止 sql 注入
     }
     ```

3. 路由的使用示例

   ```js
   router.get('/', async (ctx, next) => {
     const { username } = ctx.query
     const sql = `select password from users where username=${escape(username)}`
     const result = await exec(sql)
     ctx.body = result
   });
   ```

   > 用 escape 就不用 `‘’`
   >
   > 如果不用，则sql应该这样写
   >
   > ```js
   > const sql = `select password from users where username='${username}''`
   > ```

4. mysql 的逻辑应当和 router 的逻辑分开，这样能更好的维护

   - 创建 `/controller/[路由名]s.js`，用于管理 mysql 的逻辑

     ```js
     const { exec, escape } = require('../db/helper')
     
     const getPassword = async ( username ) => {
         const sql = `select password from users where username=${escape(username)}`
         const result = await exec(sql)
         return result[0].password
     } 
     
     module.exports = {
         getPassword
     }
     ```

   - 路由调用

     ```js
     const { SuccessModel, ErrorModel } = require('../model/resModel') 
     const { getPassword } = require('../controller/indexs')
     
     /* GET home page. */
     router.get('/', async (ctx, next) => {
       const { username } = req.query
       const password = await getPassword(username)
       ctx.body = new SuccessModel({ password })
     });
     ```

     

