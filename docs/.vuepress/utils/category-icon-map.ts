const getIcon = (key: string) => `/category-icon/${key}.svg`
const map = new Map([
  ['web', getIcon('web')],
  ['html', getIcon('html')],
  ['css', getIcon('css')],
  ['javascript', getIcon('javascript')],
  ['移动端', getIcon('mobile')],
  ['jquery', getIcon('jquery')],
  ['typescript', getIcon('typescript')],
  ['vue', getIcon('vue')],
  ['react', getIcon('react')],
  ['echarts', getIcon('echarts')],
  ['node', getIcon('node')],
  ['electron', getIcon('electron')],
  ['java', getIcon('java')],
  ['elastic', getIcon('elastic')],
  ['mysql', getIcon('mysql')],
  ['部署', getIcon('deploy')],
  ['python', getIcon('python')],
  ['git', getIcon('git')],
  ['算法', getIcon('algorithm')],
  ['前端工程化', getIcon('webpack')],
  ['flutter', getIcon('flutter')],
  ['图形学', getIcon('graphics')],
  // ['游戏', getIcon('game')],
  ['ai', getIcon('ai')]
])

export default map
