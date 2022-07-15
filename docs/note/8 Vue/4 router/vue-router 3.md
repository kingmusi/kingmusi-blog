# vue-router3

## 准备

1. 引包

   ```shell
   npm install vue-router --save
   ```

2. 在 **vue** 实例中注册（在 **main.js**）

   ```js
   import router from './router.js'
   
   new Vue({
     el: '#app',
     //让vue知道我们的路由规则
     router,
     render: c => c(App),
   })
   ```

3. 创建一个 **router** 管理（新建 **router.js**）

   ```js
   import Vue from 'vue';
   import Router from 'vue-router';
   
   import Home from './components/home.vue'
   
   Vue.use(VueRouter); //挂载属性
   
   //创建路由对象并配置路由规则
   const router = new Router({
     routes: [
       { path: '/home', component: Home }
     ]
   })
   export default router
   ```

## 传参

1. **params**：不会出现在 url 上

```js
// 跳转
router.push({ name: 'user', params: { username: 'kingmusi' } })
// 获取
this.$route.params.username
```

> 必须是命名路由（name）

2. **query**：会出现在 url 上

```js
// 跳转
router.push({ path: '/register', query: { plan: 'private' } })
// 获取
this.$route.query.plan
```

## 高级路由

1、**动态路由**

- 定义：` : `

  ```js
  routes: [
      { path: '/detail/:id', component: Detail }
  ]
  ```

- 获取 **url** 的 **id**

  ```js
  this.$route.params.id
  ```

2、**懒加载**

```js
routes: [
    { 
        path: '/home', 
     	component: () => import('../Home')
    }
]
```

3、**二级路由**

```js
routes: [
    { 
        path: '/home', 
     	component: () => import('../Home'),
        children: [
        	{
        		path: '/',
        		component: () => import('../home/tab')
    		},
            {
        		path: 'controller',
        		component: () => import('../home/controller')
    		}
        ]
    }
]
```

## 重定向

```js
routes: [
    { 
        path: '/', 
     	redirect: '/home'
    }
]
```

## 路由跳转

1、**原生跳转，会刷新**

```js
window.location.href = '路由地址'
```

2、**router跳转，不会刷新**

```js
this.$router.push(‘路由地址’)
```

3、**标签跳转，不会刷新**

```html
<router-link to="路由地址"></router-link>
```

## 路由守卫

**路由需要登录了才能进去，未登录跳转到登录页面**

- meta：路由信息

```js
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { requireLogin: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
```

```js
/**
	to: 要去的那个路由
	from: 从哪个路由来
	next: 下一步
*/
router.beforeEach((to, from, next) => {
    if(to.meta.requireLogin && !store.state.user.isLogin){
        next('/login')
    }else {
        next()
    }
}) 
```

## 路由模式

#### hash 模式（默认）

- 现象：通过锚点值（#后面的值）的改变，根据不同的值，渲染指定 **DOM** 位置的不同数据

  1. **hash** 变化会触发网页跳转，即`浏览器的前进、后退`
  2. **hash** 变化`不会刷新页面`，SPA必需的特点
  3. **hash** 永远不会提交到 **server** 端，不论是否刷新页面（前端自生自灭）

- 例子：www.abc.com/#/login

- 原理

  ```js
  // 改变浏览器地址，生成一条新的历史记录
  window.location.assign('#/index')
  // 改变浏览器地址，不会生成新的历史记录
  window.location.replace('#/index/' + n++)
  // 改变路由hash 值的监听方法
  window.location.onhashchange = function(e){
      // ajax
  }
  ```

#### H5 history 模式

- 现象：不会自带 **#**，但需要服务器端的配置

  1. 改变 **url** ，但`不刷新页面`
  2. 需要`后端配合`，不用返回信息，只是在请求不到对应资源时返回 **404**

- 例子：www.abc.com/login

- 原理

  ```js
  //监听浏览器前进、后退
  window.onpopstate = e => {
      // event.state
      // location.pathname`
  }
  // 改变浏览器地址，生成一条新的历史记录
  window.history.pushstate(null, null, '/index')
  // 改变浏览器地址，并覆盖当前历史记录，不会产生新的历史记录
  window.history.replacestate(null, null, '/index')
  ```

  