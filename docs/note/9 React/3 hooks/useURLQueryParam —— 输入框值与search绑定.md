# useURLQueryParam —— 输入框值与search绑定

## useURLQueryParam

```js
import { useMemo } from 'react'
import useSearchParam from 'react-router-dom'

export default function useURLQueryParam <K extends string>(keys: K[]) {
    const [ searchParams, setSearchParams ] = useSearchParam()
    return [
        useMemo(
            () => keys.reduce((prev, cur) => ({ ...prev, [cur]: searchParams.get(cur) || '' }), {} as { [key in K]: string }),
            // eslint-disable-next-line
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = {...Object.fromEntries(searchParams), ...params}
            for (const entrie of Object.entries(o)) {
                const [key, value] = entrie
                if (!value) {
                    delete o[key]
                }
            }
            return setSearchParams(o)
        }
    ] as const
}
```

> useSearchParam 在 react-router-dom@6^ 才有，6 以下的版本可以自己写一个
>
> ```js
> import { useMemo, useCallback } from 'react'
> import { useLocation, useHistory } from 'react-router-dom'
> 
> export default function useSearchParams() {
>     const history = useHistory()
>     const { search } = useLocation()
> 
>     return [
>         useMemo(() => new URLSearchParams(search), [ search ]),
>         useCallback((obj: {[key in string]: any}) => {
>             const arr = []
>             for(const param of Object.entries(obj)) {
>                 const [key, value] = param
>                 arr.push(`${key}=${value}`)
>             }
>             history.push({search: arr.join('&')})
>         }, [history])
>     ] as const
> }
> ```

## 使用

- 当点击提交按钮时，使用 **setSearch** 重新设置 **search**
- 文本框默认值是 **search** 上对应的值，这样用户复制带有 **search** 的 **url** 时，就可以直接查看填充文本框后的样式
- 使用 **url** 的 **search** 管理 **name** 和 **age**
  - 可以通过 **search.name** 和 **search.age** 查看对应的值

```jsx
import React from 'react'
import useURLQueryParam from '../../hooks/useURLQueryParam'

const Test = () => {
    const [ search, setSearch ] = useURLQueryParam(['name', 'age'])

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const elements = e.currentTarget.elements
        const name = (elements[0] as HTMLInputElement).value
        const age = (elements[1] as HTMLInputElement).value
        setSearch({ name, age })
    }

    return <>
        <form action="#" onSubmit={submit}>
            <input type="text" defaultValue={search.name} />
            <input type="text" defaultValue={search.age} />
            <button type="submit">submit</button>
        </form>
		
    	<!-- 查看现在 name 文本框 和 age 文本框的值 -->
        <button onClick={() => console.log(search)}>search</button>
    </>
}
```

