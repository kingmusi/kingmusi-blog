const icons = import.meta.globEager('../public/category-icon/*.svg')

const getIcon = (key: string) => icons[`../public/category-icon/${key}.svg`].default
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
  ['数学', getIcon('math')],
  ['游戏', getIcon('game')]
])

export default map
