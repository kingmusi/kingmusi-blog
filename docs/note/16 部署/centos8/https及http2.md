# centos8-https及http2

## 购买及申请 ssl 证书

1. 在云盾证书服务中选择购买 ssl 证书
2. 选择 **DV单域名证书【免费使用】** 即可零元购
3. 在 **SSL证书管理控制台** 中进行**申请**
   - 由于阿里云 UI 不断升级，所以请根据提示进行**申请**
4. 申请完成后点击**下载**

## nginx 部署 ssl

1. 查看 nginx 能否部署 https

   ```shell
   nginx -V
   ```

   查看是否有 `with-http_ssl_module `，若无则自行查找如何安装（一般 2021 年以上的 nginx 是默认安装的）

2. 解压下载好的证书文件，并按个人习惯找一个文件夹放置好

3. 修改 nginx.conf 配置

   ```shell
   cd /etc/nginx
   vim nginx.conf
   ```

4. 修改配置

   ```shell
   server {
   	listen                   443 ssl;
   	server_name         域名 ip localhost;
   	ssl                       on;
   	ssl_certificate        /root/blog/ssl/xxx.pem;  # pem 文件
   	ssl_certificate_key  /root/blog/ssl/xxx.key;   # key 文件
   	location / {                                               # 前端
   		root  /root/blog/dist;
   		index index.html;
   	}
   	location /api {                                           # 后端
   		proxy_pass http://localhost:3001;
   	}
   }
   
   server {
   	listen      80;
   	server_name 域名 ip localhost;
   	rewrite ^(.*)$ https://$host$1 permanent;     # http 重定向到 https
   }
   ```

5. 重启 nginx

   ```shell
   nginx -s reload
   ```

6. 阿里云开放 443 端口

> 解决是有 https 后，websocket 连接失败问题
>
> 前端
>
> - 开发环境：使用 `ws://localhost:3001/socket` 为前缀，devserver 无需新增 proxy
> - 线上环境：使用 `wss://www.xxx.com/socket` 为前缀
>
> 后端
>
> - websocket 路由需要添加前缀 `/socket`
>
> 服务器（nginx）
>
> - 添加反向代理规则
>
>   ```shell
>   location /socket {
>         proxy_pass http://localhost:3001;
>         proxy_http_version 1.1;
>         proxy_set_header Upgrade $http_upgrade;
>         proxy_set_header Connection "Upgrade";
>         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>         proxy_set_header X-Real-IP $remote_addr;
>   }
>   ```

## 开启 http2

Http2 是建立在 https 上的，所以必须先完成上面部署

1. 查看是否有 openssl

   ```shell
   openssl version
   ```

   若无则自行查找如何安装（一般 centos8 是自带的）

2. 查看 nginx 能否使用 http2

   ```shell
   nginx -V
   ```

   查看是否有 `with-http_v2_module `，若无则自行查找如何安装（一般 2021 年以上的 nginx 是默认安装的）

3. 修改 nginx.conf

   ```shell
   server {
   	listen                   443 ssl http2;  # 增加 http2
   }
   ```

4. 重启 nginx

   ```shell
   nginx -s reload
   ```

   