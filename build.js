/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { join } = require('path')
const childProcess = require('child_process')

// kingmusi-blog-dist path
const distPath = join(__dirname, 'dist')

function start() {
  // git 操作
  const init = childProcess.execSync('git init', { cwd: distPath })
  console.log(init.toString())

  const add = childProcess.execSync('git add .', { cwd: distPath })
  console.log(add.toString())

  const commit = childProcess.execSync(`git commit -m "${new Date()} build"`, { cwd: distPath })
  console.log(commit.toString())

  const remote = childProcess.execSync('git remote add origin git@gitee.com:kingmusi/kingmusi-blog-dist.git', { cwd: distPath })
  console.log(remote.toString())

  const push = childProcess.execSync('git push -u -f origin master', { cwd: distPath })
  console.log(push.toString())

  // 删除dist
  delFile(distPath)
}

start()

/**
 * 删除文件夹
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
function delFile(path, reservePath) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path)
      files.forEach((file) => {
        let currentPath = path + '/' + file
        if (fs.statSync(currentPath).isDirectory()) {
          delFile(currentPath, reservePath)
        } else {
          fs.unlinkSync(currentPath)
        }
      })
      if (path != reservePath) {
        fs.rmdirSync(path)
      }
    } else {
      fs.unlinkSync(path)
    }
  }
}
