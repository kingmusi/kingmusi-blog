# redux-toolkit

## 好处

- 简化配置
- 内置 **Immer** 包，可以直接修改数据，而不用在进行 **immutable**（当然核心还是 **immutable**，但写法上不需要再**immutable**，因为 **immer** 包会帮助我们自动进行）
- 内置 **thunk** 包，可以更好的封装异步操作
- 内置了 **redux-devtools**

## 安装

```shell
npm install @reduxjs/toolkit react-redux --save
```

## js 中使用

##### 1. 创建一个根仓库

- 在 `src/store/index.js` 中

```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

##### 2. 在 **index.js** 中引入

```jsx
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

##### 3. 创建一个子仓库 **user.slice.js**

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	username: ''
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login(state, action) {
        state.username = action.payload
    },
    logout(state) {
        state.username = ''
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
```

##### 4. 在根仓库中引入

```js
import userReducer from '../components/user/user.slice.js'

export default configureStore({
  reducer: {
      user: userReducer
  },
})
```

##### 5. 使用

- 如 `src/components/user/user.js`

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './user.slice'

export function Counter() {
  const username = useSelector(state => state.user.username)
  const dispatch = useDispatch()

  return (
    <div>
      <div>username: {username}</div>
      <div>
        <input onChange={e => dispatch(login(e.target.value))} />
        <button
          onClick={() => dispatch(logout())}
        >logout</button>
      </div>
    </div>
  )
}
```

## ts 中使用

##### 1. 创建一个根仓库

- 在 `src/store/index.ts` 中

```typescript
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})

// 根仓库类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

##### 2. 使用自定义 hook 简化使用

- 在 `src/store/hooks.ts` 中

```js
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

##### 3. 在 **index.ts** 中引入

```jsx
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

##### 4. 创建一个子仓库 **user.slice.ts**

```js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    username: string;
}

const initialState: UserState = {
    username: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        logout(state) {
            state.username = ''
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
```

##### 5. 在根仓库中引入

```js
import userReducer from '../components/user/user.slice.js'

export default configureStore({
  reducer: {
      user: userReducer
  },
})
```

##### 6. 使用

- 如 `src/components/user/user.js`

```jsx
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login, logout } from './user.slice'

export function Counter() {
  const username = useAppSelector(state => state.user.username)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>username: {username}</div>
      <div>
        <input onChange={e => dispatch(login(e.target.value))} />
        <button
          onClick={() => dispatch(logout())}
        >logout</button>
      </div>
    </div>
  )
}
```

## 异步操作

##### 1. 创建一个管理异步操作的文件 **async.js / async.ts**

```js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getName = createAsyncThunk(
    'user/getName',
    async () => {
        const { data: { name } } = await axios.get('/api/getName')
        return name
    }
)

export const setName = createAsyncThunk(
	'user/setName',
    async (name) => {
		const { status } = await axios.post('/api/setName', { name })
        if ( (status >= 200 && status <= 299) || status === 301 ) {
			return
        }
        throw `服务器错误：${status}`
    }
)
```

##### 2. 加入到子仓库中

```js
import { getName, setName } from './async.js'
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        logout(state) {
            state.username = ''
        }
    },
    extraReducers: {
        [getName.fulfilled]: (state, action) => {
            state.username = action.payload
        },
        [setName.fulfilled]: (state, action) => {
			state.username = action.payload
        },
        [setName.rejected]: (state, action) => {
			consle.log(action.payload)
        }
    }
})
```

##### 3. 使用

```js
dispatch(getName())
dispatch(setName('kinmgusi'))
```

