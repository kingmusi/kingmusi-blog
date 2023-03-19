# npm 模块安装机制

> 摘自 [阮一峰网站](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)

## 基础用法

[`npm install`](https://docs.npmjs.com/cli/install) 命令用来安装模块到`node_modules`目录

```shell
$ npm install <packageName>
```

安装之前，`npm install`会先检查，`node_modules`目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此

## 强制安装

如果希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用`-f`或`--force`参数

```shell
$ npm install <packageName> --force
```

## 更新

如果想更新已安装模块，就要用到[`npm update`](https://docs.npmjs.com/cli/update)命令

它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装

```shell
$ npm update <packageName>
```

## registry

npm 模块仓库提供了一个查询服务，叫做 registry

以 npmjs.org 为例，它的查询服务网址是 [`https://registry.npmjs.org/`](https://registry.npmjs.org/) 。这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 [`https://registry.npmjs.org/react`](https://registry.npmjs.org/react)，就会看到 react 模块所有版本的信息

它跟下面命令的效果是一样的

```shell
$ npm view react
```

返回的 JSON 对象里面，有一个`dist.tarball`属性，是该版本压缩包的网址，到这个网址下载压缩包，在本地解压，就得到了模块的源码。`npm install`和`npm update`命令，都是通过这种方式安装模块的

## 缓存目录

`npm install`或`npm update`命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。

这个缓存目录，在 Linux 或 Mac 默认是用户主目录下的`.npm`目录，在 Windows 默认是`%AppData%/npm-cache`。通过配置命令，可以查看这个目录的具体位置

```shell
$ npm config get cache
```

里面存放着大量的模块，储存结构是`{cache}/{name}/{version}`

## 模块的安装过程

1. 发出`npm install`命令
2. npm 向 registry 查询模块压缩包的网址
3. 下载压缩包，存放在`~/.npm`目录
4. 解压压缩包到当前项目的`node_modules`目录

一个模块安装以后，本地其实保存了两份。一份是`~/.npm`目录下的压缩包，另一份是`node_modules`目录下解压后的代码

npm 提供了一个`--cache-min`参数，用于从缓存目录安装模块

`--cache-min`参数指定一个时间（单位为分钟），只有超过这个时间的模块，才会从 registry 下载

```shell
$ npm install --cache-min 9999999 <package-name>
```

上面命令指定，只有超过999999分钟的模块，才从 registry 下载。实际上就是指定，所有模块都从缓存安装，这样就大大加快了下载速度