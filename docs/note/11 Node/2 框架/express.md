# express

## 准备

1. 使用 `express-generator` 生成 `express` 模板

   ```shell
   npx express-generator --view=pug [projectName]
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
       "prd": "cross-env NODE_ENV=production pm2 start ./bin/www"
   }
   ```

> **遇到找不到xx模块问题**
>
> 把 node_modules 删了，重新下载依赖包 `npm install`

## 解析和重构 app.js

```js
var createError = require('http-errors'); // 引入处理 404 等情况的模块
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 引入解析 cookie 的模块
var logger = require('morgan'); // 引入写日志的模块
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 修改写日志的模块
const ENV = process.env.NODE_ENV;
if (ENV === 'dev') {
  // 测试和开发环境
  app.use(logger('dev'));      
} else {
  // 线上环境，把日志写进文件中
  const logname = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logname, {
    flags: 'a' // 追加的方式
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json()); // 注册解析 POST 的 JSON 格式 的模块
app.use(express.urlencoded({ extended: false })); // 注册解析除 JSON 外的格式的模块
app.use(cookieParser()); // 注册解析 cookie 的模块
app.use(express.static(path.join(__dirname, 'public'))); // 注册一些静态文件的应用

// 处理路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

> **重构日志**
>
> - 引入 fs 模块
> - 把 `app.use(logger('dev'));` 修改成如上的样子
> - 再主文件下创建 `/logs/access.log`

## 路由使用

1. 获取客户端传来的数据

   - get

     ```js
     const { username } = req.query
     ```

   - post

     ```js
     const { username } = req.body
     ```

2. 返回数据给客户端

   - send()：发送HTTP响应。参数可以是一个Buffer对象，一个字符串，一个对象，或者一个数组。
   - json()：发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同

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
   >   router.get('/', (req, res, next) => {
   >     const { username } = req.query
   >     res.json(
   >       new SuccessModel({ 
   >         username
   >       })
   >     )
   >   });
   >   ```
   >
   >   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219232004.png)

## 使用session

1. 引入包

   ```shell
   npm install express-session --save
   ```

2. 再 `app.js` 中引入并注册

   ```js
   const session = require('express-session'); 
   
   app.use(express.static(path.join(__dirname, 'public'))); // 注册一些静态文件的应用
   // 在上面代码下注册
   app.use(session({
     secret: 'kingmusi_123', // 密钥，最好是大写 小写 _ 数字 的组合
     cookie: {
       // path: '/', // 默认配置
       // httpOnly: true, // 默认配置
       maxAge: 24 * 60 * 60 * 1000 // 过期时间
     }
   }))
   ```

3. 在路由中设置 / 获取

   ```js
   req.session.username = 'kingmusi'
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
   router.get('/', async (req, res, next) => {
     const { username } = ctx.query
     const sql = `select password from users where username=${escape(username)}`
     const result = await exec(sql)
     res.send(result)
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
     router.get('/', async (req, res, next) => {
       const { username } = req.query
       const password = await getPassword(username)
       res.json(
           new SuccessModel({ password })
       )
     });
     ```

     