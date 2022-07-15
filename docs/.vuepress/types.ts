export interface HomeListItem {
  category: string // 分类
  subcatalog: string // 所属子目录
  title: string // 标题
  content: string // 内容
  path: string // 跳转路径
  time: number // 修改时间
}
export type HomeList = HomeListItem[]

export type CategoryList = {
  name: string // 名称
  path: string // vueprerss 绝对路径
  markdown: string // 生成的 markdown 内容
}[]
