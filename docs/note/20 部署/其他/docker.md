# Docker

## 安装

- 使用 Homebrew 安装：`brew install --cask docker`
- 桌面版安装：[链接](https://docs.docker.com/desktop/install/mac-install/)

> 检查是否安装成功：`docker -v`
>
> Docker version 24.0.6, build xxxxxx

## 镜像优化

| 镜像加速器          | 镜像加速器地址                                               |
| ------------------- | ------------------------------------------------------------ |
| Docker 中国官方镜像 | [ registry.docker-cn.com](https://link.juejin.cn/?target=https%3A%2F%2Fregistry.docker-cn.com) |
| DaoCloud 镜像站     | [f1361db2.m.daocloud.io](https://link.juejin.cn/?target=http%3A%2F%2Ff1361db2.m.daocloud.io) |
| Azure 中国镜像      | [dockerhub.azk8s.cn](https://link.juejin.cn/?target=https%3A%2F%2Fdockerhub.azk8s.cn) |
| 科大镜像站          | [ docker.mirrors.ustc.edu.cn](https://link.juejin.cn/?target=https%3A%2F%2Fdocker.mirrors.ustc.edu.cn) |
| 阿里云              | [ ud6340vz.mirror.aliyuncs.com](https://link.juejin.cn/?target=https%3A%2F%2Fud6340vz.mirror.aliyuncs.com) |
| 七牛云              | [ reg-mirror.qiniu.com](https://link.juejin.cn/?target=https%3A%2F%2Freg-mirror.qiniu.com) |
| 网易云              | [hub-mirror.c.163.com](https://link.juejin.cn/?target=https%3A%2F%2Fhub-mirror.c.163.com) |
| 腾讯云              | [mirror.ccs.tencentyun.com](https://link.juejin.cn/?target=https%3A%2F%2Fmirror.ccs.tencentyun.com) |

点击`Docker Desktop` 应用图标 -> `Settings` -> `Docker Engine`，编辑 json 文件

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://hub-mirror.c.163.com"
  ]
}
```

修改完成后，点击 `Apply & restart` 按钮，重启并应用配置文件

> 可以执行 `docker info` 检查配置是否生效

## docker 基本简介

#### 概念

`Docker`是一个开源的应用容器引擎，它是基于`Go`语言并遵从`Apache2.0`协议开源

**docker是一种容器技术，它主要是用来解决软件跨环境迁移的问题**

#### 三要素

##### 镜像（image）

Docker 镜像是一种轻量级、可执行的独立软件包，包含运行某个软件所需的所有内容：代码、运行时环境、库、环境变量和配置文件。Docker镜像是容器运行时的读取模板。可以理解成操作系统的镜像

##### 容器（container）

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

简单理解就是**容器是镜像的一个运行实例。当我们运行一个镜像，就创建了一个容器**。

##### 仓库（repository）

Docker仓库用于存放Docker镜像，可以理解为代码控制中的代码仓库。Docker Hub公共仓库是免费下载其他人上传共享镜像文件最多地方，并且你也可以创建自己私有仓库将自己定制化后需要保存备份或者分享给他人使用。

## 镜像

#### 拉取镜像

在[Docker Hub](https://link.juejin.cn/?target=https%3A%2F%2Fhub.docker.com%2Fsearch%3Fq%3D%26type%3Dimage) 上有大量的高质量的镜像可以用，可以使用`docker pull`从镜像仓库中拉取对应的镜像。

```shell
docker pull [选项] [docker Registry 地址[:端口号]/]仓库名[:标签]
```

- docker Registry 地址：格式一般为 `<域名/IP>[:端口号]`。如果不写，则默认使用Docker Hub(`docker.io`）
- 仓库名：格式一般为 `<用户名>/<软件名>`。对于 Docker Hub，如果不给出用户名，则默认为 `library`，也就是官方镜像

>拉取一个 node 镜像：
>
>```shell
>docker pull node:18-alpine
>```

#### 查看镜像

查看本地已经下载的镜像

```shell
docker image ls
```

#### 删除镜像

```shell
docker image rm [选项] <镜像1> [<镜像2>...]
```

`<镜像>` 可以是 `镜像短 ID`、`镜像长 ID`、`镜像名` 或者 `镜像摘要`

#### 打包镜像

根据当前目录下 Dockerfile 文件构建新镜像，并给新镜像命名

```shell
docker build . -t [name]:[tag]
```

- `-q`：不限时构建过程信息
- `-t`：为构建的镜像打上标签
- `-f`：指定 Dockerfile 名称

## 容器

#### 查看容器

查看正在运行的容器

```shell
docker ps
```

查看所有容器

```shell
docker ps -a
```

#### 启动容器

```shell
docker run [选项] <镜像>
```

- `-d`：守护进程，后台运行该容器
- `-p`：指定端口映射，主机(宿主)端口:容器端口
- `--name`：容器名字

> `docker run -d -p 0.0.0.0:9090:80 --name musi-test docker-test`
>
> -d 表示后台运行该容器
>
> -p 0.0.0.0:9090:80 表示将容器的端口映射到宿主机的端口，宿主主机端口 9090，容器端口 80
>
> 容器名字叫 musi-test
>
> 基于 docker-test 镜像来启动容器

#### 停止容器

```shell
docker stop <容器id>
```

#### 进入容器

```shell
docker exec -it <容器id> /bin/bash
```

## 部署一个前端项目

1. 在需要部署的vue项目，跟路径下添加 `Dockerfile` 文件

```dockerfile
# 指定node镜像
FROM node:14-alpine as builder

# 指定工作目录
WORKDIR /code

# 代码复制到容器中
ADD . /code

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 打包
RUN npm run build

# 指定nginx镜像
FROM nginx:latest

# 复制打包后的代码到nginx容器中
COPY --from=builder /code/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80
```

2. 打包镜像

```shell
docker bulid -t image1 .
```

> 在这一步，会拉取 node，并打包进镜像内，这会导致镜像很大（node 要 400MB）
>
> 所以企业应用应该是分阶段打包的
>
> 第一阶段为构建阶段
>
> 1. 拉取代码
> 2. 打包一个构建镜像
>
> ```dockerfile
> # 指定node镜像
> FROM node:14-alpine as builder
> 
> # 指定工作目录
> WORKDIR /code
> 
> # 代码复制到容器中
> ADD . /code
> 
> # 安装依赖
> RUN npm install --registry=https://registry.npm.taobao.org
> 
> # 打包
> RUN npm run build
> 
> # 暴露端口
> EXPOSE 80
> ```
>
> 3. 启动容器，并从容器中复制打包产物到宿主机中
>
> 第二个阶段为打包阶段
>
> 1. 在打包产物目录添加 Dockerfile
>
> ```dockerfile
> # 指定nginx镜像
> FROM nginx:latest
> 
> # 复制打包后的代码到nginx容器中
> COPY --from=builder /code/dist /usr/share/nginx/html
> 
> # 暴露端口
> EXPOSE 80
> ```
>
> 2. 然后打包镜像，构建容器

3. 启动容器

```shell
docker run -d -p 0.0.0.0:8080:80 container1
```

4. 使用 `localhost:8080` 进行访问

