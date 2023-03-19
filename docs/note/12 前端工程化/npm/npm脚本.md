# npm 脚本

> 摘自 [阮一峰网站](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

## 基础使用

npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令

```json
{
    "scripts": {
        "build": "node build.js"
    }
}
```

命令行下使用`npm run`命令，就可以执行定义的脚本

```shell
$ npm run build
# 等同于执行
$ node build.js
```

## 原理

npm 脚本的原理非常简单。每当执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。即当前目录的`node_modules/.bin`子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径

比如项目依赖里有 vite，则可以直接写

```json
"dev": "vite"
```

而不用写

```json
"dev": "./node_modules/.bin/vite"
```

## 通配符

`*`表示任意文件名，`**`表示任意一层子目录

```json
"clean:js": "rimraf *.js"
"clean:alljs": "rimraf **/*.js"
```

## 传参

使用 `--` 标明

```json
"dev": "vite --port 3000"
```

## 执行顺序

如果是并行执行（即同时的平行执行），可以使用`&`符号

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用`&&`符号

```shell
# 并行
$ npm run script1.js & npm run script2.js

# 前一个任务成功，才执行下一个任务
$ npm run script1.js && npm run script2.js
```

## 钩子

有`pre`和`post`两个钩子。`pre`最先执行，`post`会最后执行

> 比如有以下脚本
>
> ```json
> "prebuild": "echo I run before the build script",
> "build": "vite build",
> "postbuild": "echo I run after the build script"
> ```
>
> 执行`npm run build`的时候，会自动按照下面的顺序执行
>
> ```shell
> npm run prebuild && npm run build && npm run postbuild
> ```

## 简写

以下四个常用的 npm 脚本有简写形式

- `npm start`是`npm run start`的简写
- `npm stop`是`npm run stop`的简写
- `npm test`是`npm run test`的简写
- `npm restart`是`npm run stop && npm run restart && npm run start`的简写

## 变量

通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段

比如，下面是一个`package.json`

```json
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "test": "node test.js"
  }
}
```

那么，变量`npm_package_name`返回`foo`，变量`npm_package_version`返回`1.2.5`

```js
// test.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

`npm_package_`前缀也支持嵌套的`package.json`字段

```json
{
	"repository": {
        "type": "git"
    }
}
```

```js
// test.js
console.log(process.env.npm_package_repository_type); // git
```

如果是 Bash 脚本，可以用`$npm_package`取到值

```json
{
  "name": "foo", 
  "scripts": {
    "test": "echo $npm_package_name"
  }
}
```



`package.json`里面的`config`对象，可以被环境变量覆盖

```json
{
    "config": {
        "port": 8080
    },
    "scripts": {
        "test": "node test.js"
    }
}
```

上面代码中，`npm_package_config_port`变量返回的是`8080`。这个值可以用下面的方法覆盖

```shell
$ npm config set foo:port 80
```

