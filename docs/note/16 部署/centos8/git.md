# centos8--git

1. 安装

   ```shell
   yum install git
   ```

2. 测试

   ```js
   git --version
   ```

3. 设置用户名和邮箱

   ```shell
   git config --global user.name "your username"
   git config --global user.email "your email"
   ```

4. 生成密钥

   ```shell
   ssh-keygen -t rsa -C "your email@xxx.com"
   ```

   