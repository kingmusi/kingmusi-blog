# useClickOutSide —— 点击外面

## hook

```ts
import { RefObject, useEffect } from 'react'

function useCLickOutside(ref: RefObject<HTMLElement>, callback: Function) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
              return
            }
            callback(e)
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [ref, callback])
}

export default useCLickOutside
```

