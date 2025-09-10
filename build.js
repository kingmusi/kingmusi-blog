/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { join } = require('path')
const childProcess = require('child_process')
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')

// kingmusi-blog-dist path
const distPath = join(__dirname, 'dist')

// 生成站点地图 sitemap
async function sitemap() {
  const notePrefix = 'note'
  const notePath = join(__dirname, 'docs', notePrefix)
  const ignorePath = ['', '.vuepress', '.git', '.DS_Store', 'index.md']

  const links = []
  const firstDir = fs.readdirSync(notePath)
  for (const firstDirName of firstDir) {
    if (ignorePath.includes(firstDirName)) continue

    const secondDir = fs.readdirSync(join(notePath, firstDirName))
    for (const secondDirName of secondDir) {
      if (ignorePath.includes(secondDirName)) continue

      const thirdDir = fs.readdirSync(join(notePath, firstDirName, secondDirName))
      for (const thirdDirName of thirdDir) {
        if (ignorePath.includes(thirdDirName)) continue
        if (!/.md$/.test(thirdDirName)) continue

        links.push({
          url: `/${notePrefix}/${firstDirName}/${secondDirName}/${thirdDirName}`.replace('.md', '.html'),
          changefreq: 'weekly',
          // 提高下面分类的优先级
          priority: ['web', 'html', 'css', 'javascript', 'typescript', 'vue', 'react', '工程化'].includes(
            firstDirName.replace(/\d*\s*/, '').toLocaleLowerCase()
          )
            ? 1
            : 0.5
        })
      }
    }
  }

  const stream = new SitemapStream({ hostname: 'https://www.musiblog.com/' })
  const data = await streamToPromise(Readable.from(links).pipe(stream))
  fs.writeFileSync(join(distPath, 'sitemap.xml'), data)
}

// git 操作
function git() {
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
}

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

async function start() {
  await sitemap()
  git()
  delFile(distPath)
}

start()
