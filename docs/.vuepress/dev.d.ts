import { HomeList, CategoryList } from './types'

declare global {
  declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  declare const __VUEPRESS_SSR__: boolean

  declare const __LIST__: HomeList
  declare const __CATEGORYS__: CategoryList
}

export {}
