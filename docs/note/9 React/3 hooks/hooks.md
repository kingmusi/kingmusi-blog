# hooks

## useState

**创建 / 修改一个响应式数据**

- 参数
  1. 初始值
- 返回数组
  1. `响应式变量`
  2. 设置响应式变量的方法

```js
import React, { useState } from 'react'

const Demo = () => {
    const [ data, setData ] = useState(init)
}
```

> **当数据为引用类型时，设置方法应当传入一个新地址的数据**
>
> ```js
> // 假设 data 是一个 Object
> setData({
>    ...data,
>    updateItem: xxx
> })
> ```

## useEffect

**副作用：自定义事件、ajax 等**

- 参数
  1. 回调函数：执行的副作用
  2. 数组：执行的依赖值
- 执行机制
  - 在 **render** 的时候（`mount`，`update`）被调用
  - 每次调用，会“记住”数组参数，当下一次被调用的时候，逐个比较数组中的元素，看和上一次调用的数组元素是否完全一样，如果完全一样，第一个参数就不执行，如果不一样，就执行第一个参数

**可以理解为 `componentDidMount` ， `componentDidUpdate` 和 `componentWillUnmount` 三个函数的组合**

> 1. `componentDidMount` 时执行
>
>    ```js
>    useEffect(() => {}, [])
>    ```
>
> 2. `componentDidMount` ， `componentDidUpdate` 时都执行
>
>    ```js
>    useEffect(() => {})
>    ```
>
> 3. `componentDidMount` ， `componentDidUpdate` 时都执行（只在某些`data`更新才执行）
> 可以用于`监听`，监听某些数据的变化，做某些事情
>
>    ```js
>    useEffect(() => {}, [updateData1, updateData2, ...])
>    ```
>
> 4. `componentWillUnmount`时都执行，在1、2、3基础上加上返回函数
>
>    ```js
>    useEffect(() => {
>        return () => {}
>    }, [])
>    ```

```js
import { useEffect } from 'react'
useEffect(() => {
    const handleClick = () => { console.log('hello world') }
    document.addEventListener('click', handleClick)
    return () => { document.removeEventListener('click', handleClick) }
})
```

## useRef

> 1. **useRef** 会在每次渲染时返回同一个 **ref** 对象，即返回的 **ref** 对象在组件的整个生命周期内保持不变。
> 2. **ref** 对象的值发生改变之后，不会触发组件重新渲染。

1、**获取 dom 节点**

- 返回对象

  ```typescript
  interface { current: Element; }
  ```

```jsx
// 例子
import { useRef } from 'react'

const Demo = () => {
    const inputRef = useRef(null)
    return ( 
        <input 
            ref={inputRef} 
            onChange={e => console.log( inputRef.current.value )}
        /> 
    )
}
```

2、**创建一个不受副作用影响的数据 **

- 返回对象

  ```typescript
  interface { current: any; }
  ```

```jsx
// useEffect [] 中的 state 会固定在 componentDidMount 那刻，无论怎么 set 也拿不到最新的数据
import { useRef } from 'react'

const Demo = () => {
    const timer = useRef(null)
    let count = 0
    useEffect(() => {
        timer.current = setInterval(() => {
            count++
        }, 1000)
        if (count === 10) timer.current = null
    }, [])
}
```

## useContext

函数组件的 **context**

```js
export const AppContext = React.createContext({}); // 使用 React Context API，在组件外部建立一个 Context
```

```jsx
<AppContext.Provider value={{
	username: 'kingmusi'
}}>
 	<A/>
</AppContext.Provider>
```

```jsx
const A = () => {
	const { username } = useContext(AppContext);
	return (
   		<p>{ username }</p>
	);
}
```

## useReducer

对于对象类的数据，可以用 **useReducer** 统一管理

```jsx
import React, { useReducer } from 'react'

interface StateProps {
    a: number;
    b: string;
}

const set = (state: StateProps, action: { type: string, payload?: string }) => {
    const {a, b} = state
    switch (action.type) {
        case 'changeA':
            return { a: a + 1, b }
        case 'changeB':
            return { a, b: action.payload || b }
        default:
            return state
    }
}

const Test = () => {
    const [state, dispatch] = useReducer(set, {
        a: 0,
        b: 'kingmusi'
    })

    return <div>
        home
        <div>{`a: ${state.a} -- b: ${state.b}`}</div>
        <button onClick={() => dispatch({type: 'changeA'})}>addA</button>
        <input type="text" onChange={e => dispatch({type: 'changeB', payload: e.target.value})}/>
    <div/>
}
```

