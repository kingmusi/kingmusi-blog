# 集合 react

## 安装

1. 先安装 `react`

   ```shell
   npx create-react-app [projectName] [--template typescript]
   ```

2. 安装 `electron` 和 `electron-is-dev`

   ```shell
   npm install electron concurrently wait-on cross-env --save-dev
   ```

   > **解析**
   >
   > 2. **concurrently**：并行执行管理两条命令
   > 3. **wait-on**：等待一条命令准备完成再执行下一跳命令（先开启`react`再开启`electron`，避免还要刷新`electron`）
   > 4. **cross-env**：跨平台设置环境变量（用于设置`react`不在浏览器打开）

3. 安装 `electron-is-dev` ，用于`electron`判断是不是生产环境

   ```shell
   npm install electron-is-dev --save
   ```

4. 在项目文件夹下创建 main.js

   ```js
   const { app, BrowserWindow } = require('electron')
   const isDev = require('electron-is-dev')
   const { join } = require('path')
   
   let mainWindow;
   
   app.on('ready', () => {
       mainWindow = new BrowserWindow({
           width: 1024,
           height: 680,
           webPreferences: {
               nodeIntegration: true
           }
       })
       const urlLocation = isDev ? 'http://localhost:3000' : `file://${join(__dirname, 'build', 'index.html')}` // 判断是生产环境还是上线环境
       mainWindow.loadURL(urlLocation)
   })
   ```

5. 修改 `package.json`

   - 在 `version` 下添加

     ```json
     "version": "0.1.0",
     "main": "main.js", // 添加行
     ```

   - 在 `scripts` 中添加

     ```json
     "scripts": {
         // other
         "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""   // 添加行
     }
     ```

> **在 react 中使用 node 的模块，要加 window**
>
> ```js
> const fs = window.require('fs')
> ```

## 打包

1. 安装 `electron-builder` 

   ```shell\
   npm install electron-builder --save-dev
   ```

2. 完善 `package.json` 的基本信息

   ```json
   "name": "markdown-editor-react",
   "version": "0.1.0",
   "main": "main.js",
   "description": "markdown Editor for learning electron + react",
   "author": {
   "name": "kingmusi",
   "email": "543657931@qq.com"
   },
   "repository": "https://github.com/electron/electron-quick-start",
   "private": true
   ```

3. 在 `package.json` 的 `scripts` 中添加打包命令

   ```json
   "scripts": {
       "pack": "electron-builder --dir",
       "dist": "electron-builder",
       "prepack": "npm run build",
       "predist": "npm run build && npm run buildMain"
   }
   ```

   > **prepack**
   >
   > - npm的钩子命令，表示执行 `pack` 前要做的事情

4. 自定义 `main.js` 的打包

   - 在主目录下新建 `webpack.config.js`

     ```js
     const path = require('path')
     
     module.exports = {
       target: 'electron-main',
       entry: './main.js',
       output: {
         path: path.resolve(__dirname, './build'),
         filename: 'main.js'
       },
       node: {
         __dirname: false
       }
     }
     ```

   - 因为上面可看出把 `main.js` 打包到 `build` 文件夹里了，所以记得把主渲染进程（main.js）里的 loadURL 修成成对的位置

     ```js
     urlLocation = isDev ? 'http://localhost:3000' : `file://${join(__dirname, 'index.html')}`
     ```

   - 添加 `mian.js` 的打包命令

     ```js
     "scripts": {
         "buildMain": "webpack",
         "prepack": "npm run build && npm run buildMain"
     }
     ```

     > 第一次打包的话，会提示是否下载 webpack-cli ，yes 即可

5. history 路由要添加以下代码才能正确找到文件路径

   ```json
   "homepage": "./"
   ```

6. 在主文件下新建 `assets` 文件夹，放置打包需要的静态文件

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201220231502.png)

   - 前两个是 mac 安装包用的文件
   - 第三个是程序的 `icon`

7. 添加打包后程序的配置

   ```json
   "build": {
       "appId": "markdown-editor-react",
       "productName": "markdown笔记记录",
       "copyright": "Copyright © year ${author}",
       "files": [
         "build/**/*",
         "node_modules/**/*",
         "settings/**/*",
         "package.json"
       ],
       "directories": {
         "buildResources": "assets"
       },
       "extraMetadata": {
         "main": "./build/main.js"
       },
       "extends": null,
       "mac": {
         "category": "public.app-category.productivity",
         "artifactName": "${productName}-${version}-${arch}.${ext}"
       },
       "dmg": {
         "background": "assets/appdmg.png",
         "icon": "assets/icon.icns",
         "iconSize": 100,
         "contents": [
           {
             "x": 380,
             "y": 280,
             "type": "link",
             "path": "/Applications"
           },
           {
             "x": 110,
             "y": 280,
             "type": "file"
           }
         ],
         "window": {
           "width": 500,
           "height": 500
         }
       },
       "win": {
         "target": [
           "msi",
           "nsis"
         ],
         "icon": "assets/icon.ico",
         "artifactName": "${productName}-Web-Setup-${version}.${ext}",
         "publisherName": "kingmusi"
       },
       "nsis": {
         "allowToChangeInstallationDirectory": true,
         "oneClick": false,
         "perMachine": false
       }
   }
   ```

   > **解析**
   >
   > 1. **appId**：打包程序的id，应该是所有electron唯一的
   > 2. **projectName**：程序名称
   > 3. **files**：程序运行要依赖的文件
   >    - settings是子设置渲染程序的文件入口

8. 优化：electron-builder 不会打包 devDependencies 里的 modules，但 react 和 electron（main.js）通过 webpack 会自动打包

   - 所以把子渲染程序用到的包（也可添加到 webpack.config.json，自动打包）

   - 和把==除 react 中自己 npm 的，并且 window.require 引入==的包
   - 仍需留在`dependencies` 外。其他可全部移动到 `devDependencies` 中
   - ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201220232618.png)

   > **这样移动打包时可能会找不到包，所以建议删除 `node_modules` ，重新 `npm install`**

9. 打包程序

   ```shell
   npm run pack
   ```

10. 打包安装包

    ```shell
    npm run dist
    ```

## 自动更新

- 项目和 github 关联

- 在`package.json` 的 `build` 中添加

  ```json
  "publish": ["github"]
  ```

- 在 `package.json` 的 `scripts` 中添加

  ```shell
  "release": "electron-builder",
  "prerelease": "npm run build && npm run buildMain",
  ```

- 改变 `package.json` 的 `version`

- 提交到 github 中

- 运行命令

  ```shell
  npm install release
  ```

- 然后就可以看到 github 仓库的 release 中有新的版本安装包

