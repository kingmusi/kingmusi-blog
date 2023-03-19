# mysql 模块

## 准备

1. 启动 mysql

   ```shell
   net start mysql
   ```

2. 引入 mysql 包

   ```shell
   npm install mysql --save
   ```

## 操作 mysql

```js
// 引入mysql模块
const mysql = require('mysql')

// 创建连接对象，开发和线上应该是不同的
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog' // 数据库名
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
    }

    console.log(result)
})

// 关闭连接
con.end()
```

