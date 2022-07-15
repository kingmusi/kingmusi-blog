# fs 模块

> **用于操作文件**
>
> **`require('fs').promises`**，则返回 **promise** 对象

****

## stat —— 检测文件或目录是否存在

**stat(path, callback)**

- path：绝对路径
- callback：回调函数
  - err：错误信息，文件不存在会报错
  - stats：文件状态对象

```js
fs.stat( path.join(__dirname, 'test.txt'), (err, stats) => {
    if (err) throw err
    console.log(stats)
} )
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219195857.png)

## readFile —— 读取文件内容

**readFile(path, [,options], callback)**

- path：绝对路径
- options：
  - 编码格式，默认 utf8
- callback
  - err：错误信息，文件不存在，写入失败会报错
  - data：读出的文件内容

```js
fs.readFile( path.join(__dirname, 'test.txt'), 'utf8', (err, data) => {
	if (err) throw err
    console.log(data)
} )
```

## writeFile —— 写入内容（覆盖）到文件中

**writeFile(path, data, [,options], callback)**

- path：绝对路径
- data：写入的数据
- options：
  - 编码格式，默认 utf8
- callback
  - err：错误信息，文件不存在，写入失败会报错

```js
fs.writeFile( path.join(__dirname, 'test.txt'), 'hello world!', 'utf8', err => {
	if (err) throw err
    console.log('写入成功')
} )
```

## appendFile —— 追加内容到文件中

**appendFile(path, data, [,options], callback)**

- path：绝对路径
- data：写入的数据
- options：
  - 编码格式，默认 utf8
- callback
  - err：错误信息，文件不存在，写入失败会报错

```js
fs.appendFile( path.join(__dirname, 'test.txt'), 'hello world!', 'utf8', err => {
	if (err) throw err
    console.log('追加成功')
} )
```

## unlink —— 删除文件

**unlink(path, callback)**

- path：绝对路径
- callback：回调函数
  - err：错误信息，文件不存在会报错

```js
fs.unlink( path.join(__dirname, 'test.txt'), err => {
    if (err) throw err
    console.log('删除成功')
} )
```

## rename —— 重命名 / 移动

**rename(oldPath, newPath, callback)**

- oldPath：旧路径
- newPath：新路径
- callback：回调函数
  - err：错误信息，文件不存在会报错

```js
fs.rename( path.join(__dirname, 'test.txt'), path.join(__dirname, 'test2.txt') err => {
    if (err) throw err
    console.log('重命名成功')
} )
```

## mkdir —— 创建文件夹

**mkdir(path, callback)**

- path：绝对路径
- callback：回调函数
  - err：错误信息，文件不存在会报错

```js
fs.mkdir( path.join(__dirname, '新建文件夹'), err => {
    if (err) throw err
    console.log('创建文件夹成功')
} )
```

## rmdir —— 删除==空==文件夹

**rmdir(path, callback)**

- path：绝对路径
- callback：回调函数
  - err：错误信息，文件不存在会报错

```js
fs.rmdir( path.join(__dirname, '新建文件夹'), err => {
    if (err) throw err
    console.log('删除文件夹成功')
} )
```

> 必须是空文件夹，不然会报错

## readdir —— 读取文件夹信息

**readdir(path, callback)**

- path：绝对路径
- callback：回调函数
  - err：错误信息，文件不存在会报错
  - files：目录下所有文件夹和文件的名字数组

```js
fs.rmdir( path.join(__dirname, '新建文件夹'), (err, files) => {
    if (err) throw err
    console.log(files)
} )
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219201912.png)

## stream —— 流

- `process.stdin` 是第一个水桶，是要倒到另一个水桶的源
- `pipe` 是管子，负责一点一点的把 `process.stdin` 的内容流进 `process.stdout` 中
- `process.stdout` 是第二个水桶，是被倒入的水桶
- `process.stdin.pipe(process.stdout)`  把输入流的内容输出到输出流中

```js
// 把一个文件用 Stream 的方式复制给另一个文件
const fs = require('fs')
const path = require('path')

const filename1 = path.join(__dirname, 'readStream.txt') // 获取readStream.txt 的文件路径
const filename2 = path.join(__dirname, 'writeStream.txt') // 获取writetream.txt 的文件路径

const readStream = fs.createReadStream(filename1) // 创建读取流，为第一个水桶，即源
const writeStream = fs.createWriteStream(filename2) // 创建写入流，为第二个水桶，即被倒入的桶

readStream.pipe(writeStream) // 倒入

// 流结束后
readStream.on('end', () => { 
    console.log('finish')
})
```

