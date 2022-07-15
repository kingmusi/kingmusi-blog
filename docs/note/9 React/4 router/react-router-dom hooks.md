# react-router-dom hooks

## useHistory

- 跳转，`push`

```js
import { useHistory } from 'react-router-dom'

const history = useHistory()
history.push('/')
```

## useParams

- 获取带参数路由的参数

```js
import { useParams } from 'react-router-dom'

let { id } = useParams()
```

## useLocation

- 查看当前路由，一般和 useEffect 配搭使用

```js
import { useParams } from 'react-router-dom'

const location = useLocation()
```

```js
{pathname: "/blog/4", search: "", hash: "", state: undefined}
pathname: "/blog/4"
search: ""
hash: ""
state: undefined
```

