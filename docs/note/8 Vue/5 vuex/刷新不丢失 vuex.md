# 刷新不丢失 Vuex

> - 在 `App.vue` 中

## vue2

```js
export default {
  methods: {
    saveState() {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    }
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, JSON.parse(sessionStorage.getItem("store"))))
        this.$axios.defaults.headers.common['Token'] = this.$store.state.token 
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", this.saveState)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveState)
    this.$axios.defaults.headers.common['Token'] = ''
  }
}
```

## vue3

```js
import { useStore } from 'vuex'

const { replaceState, state } = useStore()
const store = sessionStorage.getItem("store")
let currentState = state
if (store) {
      replaceState({ ...state, ...JSON.parse(store) })
      currentState = useStore().state
}
    
//在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(currentState))
})
```