# react-router-dom 6

[文档](https://reactrouter.com/)

## 安装

```shell
npm install react-router-dom --save
```

## Router

定义不同的路由模式

1. BrowserRouter：h5 history 模式
2. HashRouter：hash 模式

在 `src/index.jsx` 中使用对应模式包裹 App

```jsx
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

> 可以通过设置 **basename**，为生产环境下提供路由前缀
>
> ```jsx
> <Router basename="/child">
> ```

## Link & useNavigate

#### 1. 标签跳转

本质是一个带 href 的 `<a>` ，通过添加 **to** 使其能单击跳转

```jsx
import { Link } from 'react-router-dom'

const app = () => (
	<Link to="/">home</Link>
)
```

`<NavLink>` 是一个特殊的 `<Link>` ，它可以知道当前选择了路由

```jsx
import { NavLink } from 'react-router-dom'

const app = () => (
	<NavLink 
    	to="/"
    	style={({ isActive }) => isActive ? activeStyle : undefined}
    >home</NavLink>
)
```

#### 2. js 跳转

```js
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()
navigate('/about')
```

## Route

`<Routes>` 组件用于多个 `<Route>` 之间的切换

`<Route>`：如果当前的位置与路由的路径匹配，就会渲染对应的 component

```jsx
// App.jsx
import { Route, Routes, Link } from "react-router-dom"
import Home from './components/Home'
import About from './components/About'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
```

## 路由嵌套 & 带参数路由

有以下嵌套路由

```jsx
<Route exact path="/detail" element={<DetailParent />}>
	<Route exact path="default" element={<DetailDefault />} />
	<Route exact path=":id" element={<Detaild />} />
</Route>
```

则父组件通过 `<Outlet>` 显示子组件（当不匹配子路由时，则什么都不显示）

```jsx
import { Outlet } from 'react-router-dom'

const DetailParent = () => (
  <div>
    <header>detail 头部</header>
    
    {/* 被上面命中的子路由替代 */}
    <Outlet />
  </div>
)

export default DetailParent
```

参数路由通过 **useParams** 获取参数

```jsx
import { useParams } from 'react-router-dom'

const DetaliId = () => {
  const { id } = useParams()
  return (<div>{ id }</div>)
}

export default DetaliId
```

## 重定向 & 权限验证

```jsx
<Route
  path="/protected"
  element={
    <RequireAuth>
      <ProtectedPage />
    </RequireAuth>
  }
/>
```

使用 `<Navigate>` 进行重定向

```jsx
import { useLocation, Navigate } from 'react-router-dom'
function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation()

  if (!sessionStorage.get('user')) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children
}
```

