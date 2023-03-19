# centos8--nginx

1. 安装

   ```shell
   yum install nginx
   ```

2. 配置 nginx.conf

   ```shell
   cd /etc/nginx
   vim nginx.conf
   ```

3. 改变无注释的第一行，nginx 的使用用户

   ```
   user nginx
   ```

   改为

   ```
   user root
   ```

4. 配置服务器，注释 nginx 自带的，并根据自己实际情况添加以下配置

   ```
   server {
         listen      80;                                       #端口
         server_name 101.200.200.224 localhost; #服务器名称，一般顺序为 域名 ip localhost
         location / {
                 root  /root/blog/kingmusi-blog-main/dist; # 前端打包后的文件路径
                 index index.html;                                      # 获取的文件
         }
         location /api {
                 proxy_pass http://localhost:3001;               # 后端请求转发
         }
   }
   ```

5. 启用并启动 nginx

   ```shell
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

6. 重启 nginx

   ```shell
   nginx -s reload
   ```

7. 记得开发 80 端口