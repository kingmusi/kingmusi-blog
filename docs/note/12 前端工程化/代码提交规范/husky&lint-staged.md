# husky&lint-staged

## husky

#### 一、[官方文档](https://typicode.github.io/husky/#/)

#### 二、作用

在 git 提交代码的前后，执行一系列的 git hooks，以对代码、文件等进行预设的检查，一旦检查不通过，就可以阻止当前的代码提交，避免了不规范的代码和 git 提交出现在项目中

#### 三、引入

##### 空项目：初始化一个带有 husky 的项目

```shell
npx husky-init && npm install         # npm
npx husky-init && yarn                # Yarn
pnpm dlx husky-init && pnpm install   # pnpm
```

##### 已有项目

1. 安装 husky

   ```shell
   npm i husky -D # npm
   yarn add husky -D # yarn
   pnpm i husky -D # pnpm
   ```

2. 在 package.json 中添加 prepare 脚本，这样

   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

3. 执行 prepare 脚本

   ```shell
   npm run prepare
   ```

   该命令会创建 `.husky` 目录并指定该目录为 git hooks 所在的目录

4. 创建 hook

   ```shell
   npx husky add <file>/<hook> [cmd]
   # file: 指定保存命令的文件，通常是在 .husky 目录下
   # cmd: 指定 git hooks 的名字，最常使用的是 pre-commit
   ```

   比如

   ```shell
   npx husky add .husky/pre-commit "npm run lint"
   ```

   会在 `.husky` 目录下创建一个名为 pre-commit 的 shell 脚本，在执行 `git commit` 命令时会先执行 pre-commit 这个脚本

   ```shell
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
      
   npm run lint
   ```

## lint-staged

#### 一、作用

 是一个专门用于在通过 `git` 提交代码之前，对**暂存区**的代码执行一系列的格式化的工具

#### 二、引入

1. 安装 lint-staged

   ```shell
   npm i lint-staged -D # npm
   yarn add lint-staged -D # yarn
   pnpm i lint-staged -D # pnpm
   ```

2. 配置（选一个即可）

   - `package.json` 中的 `lint-staged` 配置项

     ```json
     {
       "lint-staged": {
         "<glob-pattern>": "<command>",
         "*.js": ["prettier --list-different", "eslint"]  
       }
     }
     ```

   - 新增 `lint-staged.js` 文件

## 同时集成 husky 与 lint-staged

安装 husky 与 lint-staged

```shell
npm i husky lint-staged -D # npm
yarn add husky lint-staged -D # yarn
pnpm i husky lint-staged -D # pnpm
```

补充 `husky` 和 `lint-staged` 的命令

```shell
npx mrm@2 lint-staged # npm/yarn
pnpx mrm@2 lint-staged # pnpm
```

之后可以看到`package.json` 里多了一个 `lint-staged` 配置项，且根目录下多了一个 `.husky` 目录，里面就包含了 *pre-commit* 文件，里面包含了一个最基础的命令：`npx lint-staged`