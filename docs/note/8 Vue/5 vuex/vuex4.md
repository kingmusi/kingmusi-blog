# vuex4

## 准备

1. 引包

   ```shell
   npm install vuex --save
   ```

2. 在 **vue** 实例中使用

   ```js
   import store from './store'
   app.use(store)
   ```

## 仓库模板

- `store.js`

```typescript
import { createStore } from "vuex";

export interface StoreProps {
	user: string | null;
}

export default createStore({
    state: {
         user: null
    },
    mutations: {
         login (state, user) {
              state.user = user
         }
    },
    actions: {},
    modules: {}
})
```

## 使用

- 通过 `useStore` 获取 **Store** 实例

```js
import { computed } from 'vue'
import { useStore } from 'vuex'
import { StoreProps } from './store'

const { state, commit } = useStore<StoreProps>()
const user = computed(() => state.user) // 要用 computed 形成响应式变化
commit('addCount')
```



