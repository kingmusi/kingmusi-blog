# react-router-dom

## 准备

1. 引入包

   ```shell
   npm install react-router-dom --save
   ```

2. 在 `App.js` 中使用

   ```jsx
   import { BrowserRouter, Route } from 'react-router-dom'
   import Home from './pages/home/index'
   
   const App = () => (
       <div className="App">
           <BrowserRouter>
               <Switch>
                   <Route path="/" exact component={Home}></Route>
               </Switch>
           </BrowserRouter>
       </div>
   )
   ```

## 路由

1、**普通路由**

- `path` 是路由地址
- `exact` 是只有路由地址与 `url` 完全匹配才显示，若不加，`url` 包含 `path` 中的字符串就显示
- `component` 是引入组件

```jsx
<Route path="/" exact component={Home}></Route>
```

**2、父组件需要向渲染组件添加参数**

```jsx
<Route path="/" exact render={() => {<Home data={data}/>}}></Route>
```

**3、带参数路由**

- params 传参

  - 刷新页面参数不消失，参数显示在地址栏上

  - 配置

    ```jsx
    <Route path="/detail/:id" exact component={Detail}></Route>
    ```

  - 跳转

    ```jsx
    <Link to=/detail/1 />
    ```

    ```js
    this.props.history.push('/detail/2')
    ```

  - 获取

    ```js
    this.props.match.params.id
    ```

- state 传参

  - 刷新页面参数不消失，参数不会显示在地址栏上

  - 配置

    ```jsx
    <Route path="/detail" exact component={Detail}></Route>
    ```

  - 跳转

    ```jsx
    <Link to={ {pathname: '/detail', state: {id: 1}} } />
    ```

    ```js
    this.props.history.push( {pathname: '/detail', state: {id: 1}} )
    ```

  - 获取

    ```js
    this.props.location.state.id
    ```

- query 传参

  - 刷新页面参数消失，参数不会显示在地址栏上

  - 配置

    ```jsx
    <Route path="/detail" exact component={Detail}></Route>
    ```

  - 跳转

    ```jsx
    <Link to={ {pathname: '/detail', query: {id: 1}} } />
    ```

    ```js
    this.props.history.push( {pathname: '/detail', query: {id: 1}} )
    ```

  - 获取

    ```js
    this.props.location.query.id
    ```

> 函数组件需要用 `WithRouter` 包裹导出才能接受到 `history、match、location`
>
> ```js
> import { WithRouter } from 'react-router-dom'
> ```

## 重定向

**通过 `Redirect` 标签重定向**

```jsx
import { Redirect } from 'react-router-dom'

<Redirect to='跳转地址' />
```

## 懒加载

1、**Suspense**

```jsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

const App = () => {
    <BrowserRouter>
    	<Suspense fallback={<div>Loading</div>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </Suspense>
    </BrowserRouter>
}
```

2、**react-loadable**

- 引入包

  ```shell
  npm install react-loadable --save
  ```

- 创建一个 `loadable.js`（一个路由组件对应一个）

  ```jsx
  import React from 'react'
  import Loadable from 'react-loadable'
  
  const LoadableComponent = Loadable({
      loader: () => import('./'), //这个其实就是引入文件夹下的index,js
      loading: () => (<div>正在加载</div>) // 这个是加载时显示的样子
  })
  
  export default () => <LoadableComponent />
  ```

- 在路由 `App.js` 中引入

  ```jsx
  import xxx from 'xxx/loadable.js'
  
  <Route path="/xxx" exact component={xxx} />
  ```

> 注意`loadable.js`导出的是函数组件，如需用到参数，请用 `withRouter` 包裹