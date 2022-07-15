# redux

## 概念

- 单项数据流

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/%E7%BB%84%E4%BB%B6%201%20%E2%80%93%201.png)

- 中间件

  ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/%E6%89%B9%E6%B3%A8%202020-07-25%20135858.png)

## 准备

- 引入包

  ```shell
  npm install redux react-redux --save
  ```

- 创建 store 仓库：`src/store/index.js`

  ```js
  import { createStore } from 'redux'
  import reducer from './reducer'
  
  const store = createStore(reducer) // 把下面的记录本内容传给store
  export default store
  ```

- 创建 store 的记事本：`src/store/reducer.js`

  ```js
  const defalutStore = {
      // 默认数据
  }
  
  export default (state = defalutStore, action) => {
      switch (action.type) {
          default:
       		return state       
      }
  }
  ```

- 在 `App.js` 中使用 `Provider` 包裹

  ```jsx
  import {Provider} from 'react-redux'
  import store from './store'
  
  function App () {
  	return (
      	<div className="App">
          	<Provider store={store}>
              </Provider>
          </div>
      )
  }
  ```


## 获取 store 的数据

**state**：如果想得到某个时点的数据，就要对 **Store** 生成`快照`。这种时点的数据集合，就叫做 **State**

```jsx
import React, { Component } from 'react'
import store from './store/index'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState() // getState 获取一个时点的数据
    }
    render() {
        return (
        	<div>{this.state.data}</div>
        )
    }
} 
```

**实时获取**：用 `store.subscribe()` 来实时监听 **store** 的变化

```jsx
import React, { Component } from 'react'
import store from './store/index'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(this.storeChange) //实时监听
    }
    render() {
        return (
        	<div>{this.state.data}</div>
        )
    }
    storeChange = () => {
        this.setState(store.getState()) // 把最新的store的值赋给state
    }
} 
```

## 设置 store 的数据

**action**：**action** 就是 **View** 发出的`通知`，表示 **Store** 应该要发生变化了

- **type: string** —— **action** 的名称，此值应该是整个 **store** 唯一的（`必须`）
- **data: any** —— 要修改成的值，可以有 0 ~ 多个

```js
const action = {
    type: 'change_input_value',
    data: this.state.data
}
```

**dispatch**：**View** 发出 **action** 的唯一方法

```js
import store from './store/index'

store.dispatch(action)
```

**reducer**：**store** 的`记事本`，记录数据，和改变的事件

1. 根据 `action.type` 做出不同的动作
2. 把 **state** `深拷贝` 一份出来 —— `newState`
3. 用 **action.value** 改变 **newState** 中对应的值
4. 把 **newState** **return** 出去

```js
const defalutStore = {
    inputValue: ''
}

export default (state = defalutStore, action) => {
    switch (action.type) {
        case 'change_input_value':
            const newState = deepClone(state)
            newState.inputValue = action.data
            return newState
            break
        default:
     		return state       
    }
}
```

