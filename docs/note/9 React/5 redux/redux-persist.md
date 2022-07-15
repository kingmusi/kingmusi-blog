# redux-persist

## 安装

```shell
npm i redux-persist --save
```

## 使用

- **reducer** 和 **action** 的处理不变，只需修改 **store** 的生成代码

  ```js
  import { createStore } from 'redux'
  import { persistStore, persistReducer } from 'redux-persist'
  import storage from 'redux-persist/lib/storage/session' // sessionStorage
  import storage from 'redux-persist/lib/storage' // localStorage
  import reducer from './reducer'
  
  const persistConfig = {
      key: 'root',
      storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, reducer)
  
  const store = createStore(persistedReducer)
  
  export const persistor = persistStore(store)
  export default store
  ```

- **修改 App.js**

  ```jsx
  import { Provider } from 'react-redux'
  import { PersistGate } from 'redux-persist/integration/react'
  import store, { persistor } from './store'
  
  return (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          ...
      </PersistGate>
  </Provider>
  )
  ```

  