// 根据文档生成 sidebar
import { SidebarConfigArray } from '@vuepress/theme-default'
import { HomeList, CategoryList } from '../types'

import path from 'path'
import fs from 'fs'
import lineByLine from 'n-readlines'

const prefix = 'note' // 位于 docs 下哪个目录下
const notePath = path.join(__dirname, '..', '..', prefix) // docs 目录
const ignorePath = ['', '.vuepress', '.git', '.DS_Store', 'index.md'] // 忽略遍历的文件

function dirsort(a: string, b: string) {
  return parseInt(a) - parseInt(b)
}

export default function traverse() {
  const sidebar: SidebarConfigArray = []
  const list: HomeList = []
  const categorys: CategoryList = []

  // 获取第一层目录（排序）
  const firstDir = fs.readdirSync(notePath).sort(dirsort)
  for (const firstDirName of firstDir) {
    if (ignorePath.includes(firstDirName)) continue
    const category = firstDirName.replace(/\d*\s*/, '')

    // 生成第一层 sidebar
    const sidebarObj = {
      text: category,
      collapsible: true, // 可折叠
      children: [] as SidebarConfigArray
    }

    // 生成 category 数据
    const categoryObj = {
      name: category.toLocaleLowerCase(),
      path: `/${prefix}/${firstDirName}/`,
      markdown: `# ${category}\n\r\n\r`
    }

    // 获取第二层目录（排序）
    const secondDir = fs.readdirSync(path.join(notePath, firstDirName)).sort(dirsort)
    for (const secondDirName of secondDir) {
      if (ignorePath.includes(secondDirName)) continue
      const subcatalog = secondDirName.replace(/\d*\s*/, '')

      // 生成第二层 sidebar
      const sidebarObj2 = {
        text: subcatalog,
        collapsible: true,
        children: [] as SidebarConfigArray
      }

      // 生成第二层 category markdown 数据
      categoryObj.markdown += `## ${subcatalog}\n\r\n\r`

      const thirdDir = fs.readdirSync(path.join(notePath, firstDirName, secondDirName)).sort(dirsort)
      for (const thirdDirName of thirdDir) {
        if (ignorePath.includes(thirdDirName)) continue
        if (!/.md$/.test(thirdDirName)) continue // 只要 markdown 文档

        const link = `/${prefix}/${firstDirName}/${secondDirName}/${thirdDirName}`
        const text = thirdDirName.replace('.md', '')

        // 放入 sidebar 文档数据
        sidebarObj2.children.push({
          text,
          link: link.replace('.md', '.html')
        })

        // 生成第三层 category markdown 数据
        categoryObj.markdown += `- [${text}](${encodeURI(`${secondDirName}/${thirdDirName}`)})\n\r`

        // 放入 list 数据
        list.push({
          category: category.toLocaleLowerCase(),
          subcatalog: subcatalog.toLocaleLowerCase(),
          title: text,
          content: '',
          path: link,
          time: Date.parse(fs.statSync(path.join(notePath, firstDirName, secondDirName, thirdDirName)).mtime.toString())
        })
      }

      // sidebar 放入第二层数据
      sidebarObj.children.push(sidebarObj2)
    }

    // sidebar 放入第一层数据
    sidebar.push(sidebarObj)

    categorys.push(categoryObj)
  }

  // 对于 list 数据，只要最近更新前 30 个
  list.sort((a, b) => b.time - a.time)
  const listLen = Math.min(list.length, 60)
  for (let i = 0; i < listLen; i++) {
    const location = path.join(notePath, ...list[i].path.split('/').slice(2))
    const liner = new lineByLine(location)

    let line = liner.next() && liner.next()
    let count = 0
    while (line && count < 3) {
      const s = line.toString('utf-8')
      line = liner.next()
      if (/^\s*$/.test(s)) continue
      list[i].content += s.replace(/\s*[#*`]\s*/g, '') + '\n\r'
      count++
    }
  }

  return { sidebar, list: list.slice(0, 30), categorys }
}
