# centos8--nvm

1. 安装 curl

   ```shell
   sudo dnf install curl
   ```

2. 在[官网](https://github.com/nvm-sh/nvm)复制最新的下载指令

   ```shell
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

3. 更新环境变量

   ```shell
   source ~/.bashrc
   ```

4. 再 node 官网查看最新稳定版本

   ```shell
   nvm install <verrsion>
   ```

5. 使用此版本 node，并设置为默认版本

   ```shell
   nvm use <version>
   nvm alias default <version>
   ```

   

