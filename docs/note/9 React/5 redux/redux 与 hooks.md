# redux 与 hooks

## 准备

- 引入包

  ```shell
  npm install redux react-redux --save
  ```

- 创建 store 仓库：`src/store/index.js`

  ```js
  import { createStore } from 'redux'
  import reducer from './reducer'
  
  export default createStore(reducer) // 把下面的记录本内容传给store
  ```

- 创建 store 的记事本：`src/store/reducer.js`

  ```ts
  import { Reducer } from 'redux/index'
  
  export interface StoreProps {
      // store 的类型
  }
  
  const defalutStore: StoreProps = {
      // 默认数据
  }
  
  const reducer: Reducer<StoreProps> = (state = defalutStore, action) => {
      switch (action.type) {
          default:
              return state       
      }
  }
  
  export default reducer
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


## 使用

1. **commit**

   ```js
   import { useDispatch } from 'react-redux'
   
   const dispatch = useDispatch()
   dispatch(action)
   ```

2. 获取数据

   ```js
   import { useSelector } from 'react-redux'
   import { StoreProps } from '../../store/reducer'
   
   const user = useSelector<StoreProps>(state => state.user)
   ```

   