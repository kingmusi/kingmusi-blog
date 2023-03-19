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