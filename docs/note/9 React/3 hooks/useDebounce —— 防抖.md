# useDebounce —— 防抖

## hook

```ts
import { useState, useEffect } from 'react'

function useDebounce(value: any, delay: number = 300) {
    const [ debounceValue, setDebounceValue ] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce
```

> `value` 多次变化时，在变化前会清除上一次留下的副作用，即这里的清除计时器
>
> 最后一次变化会在 `delay`后执行 `setDebounceValue`，导致 `useDebounce` 重新执行，以后 `useEffect` 依赖值无变化，所以不走 `useEffect`，返回最新的 `debounceValue`

## 使用例子

1. 实时搜索

```jsx
import React, { useState, useEffect } from 'react'
import useDebounce from './hooks/useDebounce'

function App() {
  const [ value, setValue ] = useState('')
  const debounceValue = useDebounce(value)
  useEffect(() =>{
    // do something...
  }, [debounceValue])
    
  return (
      <input value={value} onChange={e => setValue(e.target.value)} />
  )
}
```

