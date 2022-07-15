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
const session = require('koa-generic-session'); 
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

// session 注册
app.keys = ['hfkjahkj']
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}))

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
