# vue-router4

## 准备

1. 引包

   ```shell
   npm install vue-router --save
   ```

2. 在 **vue** 实例中使用

   ```js
   import router from './router'
   app.use(router)
   ```

## 模板

- `router.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routerHistory = createWebHistory()
export default createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})
```

> **在模本中使用 vuex4，实现路由拦截**
>
> ```js
> import store from './store'
> 
> router.beforeEach((to, from, next) => {
>  	if(to.meta.requireLogin && !store.state.user){
>    		next('/login')
>  	}else {
>    		next()
>  	}
> })
> ```
>

## 使用

1. `useRoute`——`router`对象，可以拿到路由信息，如域名，哈希等

   ```js
   import { useRoute } from 'vue-router'
   
   const route = useRoute()
   const id = route.params.id
   ```

2. `useRouter`——`router`对象，可以使用路由

   ```js
   import { useRouter } from 'vue-router'
   
   const router = useRouter()
   router.push('/')
   ```

## 过渡动效

```vue
<router-view v-slot="{ Component }">
  <transition name="slide">
    <component :is="Component" />
  </transition>
</router-view>
```

```css
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}

.slide-enter-from, .slide-leave-to {
    transform: translate(100%, 0)
}
```

