var createError = require('http-errors'); // 引入处理 404 等情况的模块
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 引入解析 cookie 的模块
var logger = require('morgan'); // 引入写日志的模块
const fs = require('fs')
const session = require('express-session')

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
  // 线上环境
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

// 注册 session
app.use(session({
  secret: 'kingmusi_123', // 密钥，最好是大写 小写 _ 数字 的组合
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000 // 过期时间
  }
}))

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
