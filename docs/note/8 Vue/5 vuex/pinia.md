# pinia

## 安装

```shell
npm i pinia --save
```

并在 `src` 下创建 `store` 目录存放仓库（不是必须，但是一个比较好的模式）

## 仓库

```typescript
// src/store/count.ts
import { defineStore } from 'pinia'

interface State {
  count: number
}

export const useCounterStore = defineStore('counter', {
  state: (): State => {
    return { 
      count: 0
    }
  },
  actions: {
    increment(count) {
      this.count = count
    },
  },
})
```

## Getter

```js
import { useOtherStore } from './other-store'

export const useCounterStore = defineStore('counter', {
  state: (): State => {
    return { count: 0 }
  },
  getters: {
    // 1. 写法1
    double(state) {
      return state.count * 2
    },
    // 2. 写法2
    pown: state => state.count * state.count,
    // 3. 希望获取其他 getter
	doubleAddOne: () => this.double + 1,
    // 4. 访问其他仓库 getter
    other(statee) {
      const otherStore = useOtherStore()
      return otherStore.data
    }
  }
})
```

## 使用

##### 1. 普通使用

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    // 1. 直接改变值
    counter.count++
    // 2. 通过 $patch
    counter.$patch({ count: counter.count + 1 })
    // 3. 使用定义好的 action
    counter.increment(counter.count + 1)
  },
}
```

##### 2. 解构获取值

- 直接解构将失去响应性，因为 store 本质上是一个 **reactive**

  ```js
  // ❌  错误
  const { count } = store
  ```

- 如果希望保持响应性情况下解构，使用 **storeToRefs**

  ```js
  import { storeToRefs } from 'pinia'
  
  const { count } = storeToRefs(store)
  ```

## 重置状态

```js
const store = useStore()
store.$reset()
```

## 监听状态

```js
store.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // store.$id
  mutation.storeId
  // 只有使用 $patch（mutation.type === ''patch object'），才会有值
  mutation.payload

  // 打印新状态的 count
  console.log(state.count)
})
```



