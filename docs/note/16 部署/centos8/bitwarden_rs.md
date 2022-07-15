# centos8 -- bitwarden_rs

## 安装 Docker

原因：bitwarden_rs 使用 Docker 进行安装

1. 在 [Docker 官网](https://docs.docker.com/get-docker/) 查看安装步骤，以下是文章书写时的安装命令

   ```shell
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

   常用命令

   ```shell
   docker version #检查安装结果
   systemctl start docker #启动 Docker
   systemctl status docker #查看 Docker 启动状态(内容中包含绿色 active)
   systemctl enable docker #设置 Docker 自启动
   docker start $name # 启动容器
   docker stop $name # 停止容器
   docker rm $name # 删除容器
   ```

2. 安装 docker-compose

   - Docker-Compose项目是Docker官方的开源项目，负责实现对Docker容器集群的快速编排，可以让Docker管理起来更方便

   - 在 [github](https://github.com/docker/compose/releases/) 上下载 **docker-compose-linux-x86_64** 软件，并更名为 **docker-compose**，把它传送到服务器的 `/usr/local/bin/` 目录下

   - 更改 **docker-compose** 的权限

     ```shell
     chmod +x /usr/local/bin/docker-compose
     ```

   - 检测是否能正常运行

     ```shell
     docker-compose -v
     ```

## 创建目录及 docker-compose 配置文件

1. 创建运行目录

   ```shell
   cd ~ && mkdir bitwarden && cd bitwarden
   ```

2. 创建配置文件

   ```yml
   cat >> docker-compose.yml <<EOF
   version: '3'
   
   services:
     # 服务名称
     bitwarden:
       # 指定使用 Docker Hub 中的最新镜像
       image: bitwardenrs/server:latest
       # 容器名称
       container_name: bitwarden
       # 开机自动启动
       restart: always
       # 指定容器内的 /data 目录挂载到宿主机的当前目录下的 /root/bitwarden/data 目录，这样你可以在宿主机上执行数据库的备份操作
       volumes:
         - /root/bitwarden/data:/data
       # bitwarden配置
       environment:
         # 开启网页访问
         WEB_VAULT_ENABLED: 'true'
         # 开启新用户注册，我们注册后关闭即可
         SIGNUPS_ALLOWED: 'true'
         # 开启长连接
         WEBSOCKET_ENABLED: 'true'
         # 日志文件
         LOG_FILE: /root/bitwarden/bitwarden.log
       # 将容器内的80/3012端口映射到宿主机的7006/7007端口；其中80端口为 HTTP 服务，3012 端口是 websockets 服务
       ports:
         - 7006:80
         - 7007:3012
   EOF
   ```

## nginx 反向代理

要求必须是 https 连接，具体 https 的部署可以在本站搜索

```shell
server {
    listen               443 ssl http2;

    # bitwarden
    location / {
            proxy_pass http://localhost:7006;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /notifications/hub {
            proxy_pass http://localhost:7007;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
    }
    location /notifications/hub/negotiate {
            proxy_pass http://localhost:7006;
    }
}
```

> 有路由前缀
>
> ```shell
> server {
>     listen               443 ssl http2;
> 
>     # bitwarden
>     location ^~/password/ {
>             proxy_pass http://localhost:7006/;
>             proxy_set_header Host $host;
>             proxy_set_header X-Real-IP $remote_addr;
>             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>             proxy_set_header X-Forwarded-Proto $scheme;
>     }
> 
>     location ^~/password/notifications/hub/ {
>             proxy_pass http://localhost:7007/;
>             proxy_set_header Upgrade $http_upgrade;
>             proxy_set_header Connection "upgrade";
>     }
>     location ^~/password/notifications/hub/negotiate/ {
>             proxy_pass http://localhost:7006/;
>     }
> }
> ```

## 启动 bitwarden_rs

```shell
docker-compose up -d
```

## 关闭注册

1. 先关掉 bitwarden_rs

   ```shell
   cd ~/bitwarden
   docker-compose down
   ```

2. 修改 `docker-compose.yml` 文件

   - 将 **SIGNUPS_ALLOWED** 设置为 **false**

3. 重启

   ```shell
   docker-compose up -d
   ```

## 更新

```shell
cd /root/bitwarden
# 停止运行的bitwarden容器
docker-compose stop
# 拉取最新镜像
docker-compose pull
# 重新构建并启动
docker-compose up -d --build
```

