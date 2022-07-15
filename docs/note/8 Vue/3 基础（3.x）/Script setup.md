# Script setup

## 基础概念

1. 与 script 不同，每次创建组件实例时，`<script setup>` 内部代码都会执行一次

2. 任何定义在内部的**顶级**声明可以在模板和 style 中使用

   ```vue
   <template>
     <div @click="log">{{ msg }}</div>
   </template>
   
   <script setup>
   const msg = 'Hello!'
   
   function log() {
     console.log(msg)
   }
   </script>
   ```

## 组件

1. 直接引入即可在模板中使用

   ```vue
   <template>
     <MyComponent />
   </template>
   
   <script setup>
   import MyComponent from './MyComponent.vue'
   </script>
   ```

2. 动态组件

   ```vue
   <template>
     <component :is="Foo" />
     <component :is="someCondition ? Foo : Bar" />
   </template>
   
   <script setup>
   import Foo from './Foo.vue'
   import Bar from './Bar.vue'
   </script>
   ```

3. 命名空间组件

   可以使用带点的组件标记来引用嵌套在对象属性下的组件

   ```vue
   <template>
     <Form.Input>
       <Form.Label>label</Form.Label>
     </Form.Input>
   </template>
   
   <script setup>
   import * as Form from './form-components'
   </script>
   ```

## `defineProps` 和 `defineEmits`

通过 `defineProps` 声明 `props`，通过 `defineEmits` 声明 `emit`

其只能在 script setup 中使用，无需导入，接受与 vue2.x 同样的参数

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
</script>
```

> 如果与 Typescript 使用，还可以通过传入泛型简化
>
> ```typescript
> const props = defineProps<{
>     foo: string
>     bar?: number
> }>()
> 
> const emit = defineEmits<{
>     (e: 'change', id: number): void
>     (e: 'update', value: string): void
> }>()
> ```
>
> 如果想为 props 定义默认值，则可以使用 **withDefaults**
>
> ```typescript
> interface Props {
>     msg?: string
>     labels?: string[]
> }
> 
> const props = withDefaults(defineProps<Props>(), {
>     msg: 'hello',
>     labels: () => ['one', 'two']
> })
> ```

## `defineExpose`

默认情况下，使用`<script setup>`的组件内部是**关闭**的，即不能通过 `componentRef` 获取内部的定义声明

要显式公开`<script setup>`组件中的属性，请使用`defineExpose`编译器宏

```js
import { ref } from 'vue'

const a = 1
const b = ref(2)
const changeB = (value) => b.value = value

defineExpose({
  a,
  b,
  changeB: () => changeB() // 不知道为什么，函数导出需要返回引用值
})
```

## `useSlots` 和 `useAttrs`

可以通过上面它们直接访问 slot 和 attr

```js
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
```

> 利用 `useSlots` 简化 `Tab` 的写法
>
> ```vue
> <!-- Tab.vue -->
> <template>
>   <nav>
>     <button
>       v-for="(tab, index) of tabs"
>       :key="tab"
>       :class="{ 'button--active': active === index }"
>       @click="active = index"
>     > {{ tab }} </button>
>   </nav>
> 
>   <div v-for="(item, index) of tabs" v-show="index === active" :key="item">
>     <slot :name="tabs[index]" />
>   </div>
> </template>
> 
> <script lang="ts" setup>
>   import { useSlots, computed } from 'vue'
>   const slots = useSlots()
> 
>   const tabs = computed(() => Object.keys(slots))
>   const active = ref(0)
> </script>
> ```
>
> 使用
>
> ```vue
> <Tab>
> 	<template #哈哈> <Ha /> </template>
>     <template #啦啦> <La /> </template>
>     <template #嘻嘻> <Xi /> </template>
> </Tab>
> ```

## 顶级 `await`

顶级`await`可以在里面使用`<script setup>`。生成的代码将被编译为`async setup()`：

```vue
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

## 动态 CSS

可通过 v-bind 把变量动态链接到 style 中

若变量只有一层，则可以在 **script setup** 和 **script** 中使用

```vue
<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

若有多层，则可以用 **.** 的方式获取，但只能在 **script setup** 中使用

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

> 背景图片（尽量不要用于图片，会造成图片切换时，出现闪烁的问题）
>
> ```vue
> <script setup>
> import Img from 'xx.png'
> 
> const BackgroundImage = `url(${Img})`
> </script>
> 
> <style scoped>
>   div {
> 		background-image: v-bind(BackgroundImage);
>   }
> </style>
> ```
>
> 

