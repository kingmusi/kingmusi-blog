# vuex

## 工作原理

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/vuex.png)

## 准备

1. 引包

   ```shell
   npm install vuex --save
   ```

2. 在 **vue** 实例中注册（在 `main.js`）

   ```js
   import store from './store'
   
   new Vue({
     el: '#app',
     store,//使用store
     template: '<App/>',
     components: { App }
   })
   ```

3. 创建一个 `Store`

   ```js
   import Vue from 'vue'
   import vuex from 'vuex'
   Vue.use(vuex);
   
   export default new vuex.Store({
       state: {}
   })
   ```

> **分组管理** —— `modules`
>
> - 创建一个子 **Store**（创建 **demoStore.js**）
>
>   ```js
>   export default {
>       state: {
>           show: false
>       }
>   }
>   ```
>
> - 添加到主仓库中（创建 **store.js**）
>
>   ```js
>   import demoStore from './demoStore.js'
>   export default new vuex.Store({
>       modules: {
>           demo: demoStore,
>           other: otherStore,//其他store
>       }
>   })
>   ```
>
> - 引入子 **Store**，要多加一个`键名`
>
>   - `$store.state.demo.show`

## state

- 简写：`mapState`

  ```js
  import { mapState } from 'vuex'
  
  computed: {
      ...mapState({
        show: state => state.demo.show
      })
  }
  
  // 调用：this.show
  ```

## getters —— 计算属性

- 定义

  ```js
  export default {
      state: { //state
          show: false
      },
      getters: {
          // 函数名在整个仓库中（包括其他子仓库）应该是唯一的
          /**
          	state: 上面这个 state
          	getter: 整个 getter
          	rootState: 整个大仓库
          */
          not_show(state, getter, rootState){
              return !state.show
          }
      }
  }
  ```

- 引用

  ```js
  this.$store.getters.not_show
  ```

- 简写

  ```js
  import { mapGetters } from 'vuex'
  
  computed: {
      ...mapGetters(['not_show'])
  }
  
  // 调用：this.not_show
  ```

> 同样有缓存特性

## mutations —— 同步操作

**state** 的`改变`应该在 **mutations** 中实现

- 定义

  ```js
  export default {
      state: { 
          show: false
      },
      mutations: {
          // 函数名在整个仓库中（包括其他子仓库）应该是唯一的
          switch_dialog(state) { // 这里的 state 对应着上面这个 state
              state.show = state.show ? false : true
          }
      }
  }
  ```

- 触发

  ```js
  this.$store.commit('switch_dialog')
  ```

- 简写

  ```js
  import { mapMutations } from 'vuex'
  
  methods: {
      ...mapMutations(['switch_dialog'])
  }
  
  // 调用 this.switch_dialog()
  ```

## actions —— 异步操作、触发多个 mutations

`异步操作`必须在 **actions** 中进行

- 定义

  ```js
  export default {
      state: {
          show:false
      },
      mutations: {
          switch_dialog(state) { 
              state.show = state.show ? false : true
          }
      },
      actions: {
          // 函数名在整个仓库中（包括其他子仓库）应该是唯一的
          switch_dialog_action(context) { // 这里的 context 和我们使用的 $store 拥有相同的对象和方法
              context.commit('switch_dialog')
          }
      }
  }
  ```

- 触发

  ```js
  this.$store.dispatch('switch_dialog_action')
  ```

- 调用

  ```js
  import { mapActions } from 'vuex'
  
  methods: {
      ...mapActions(['switch_dialog_action'])
  }
  
  // 调用 this.switch_dialog()
  ```

****

> **actions** 和 **mutations** 的区别
>
> 1.  **action** 中处理`异步`，**mutation** 不可以
> 2.  **action** 提交的是 **mutation**，而`不是直接变更状态`。
> 3.  **mutation** 一般是做`原子操作`，而 **action** 可以整合多个 **mutation**

