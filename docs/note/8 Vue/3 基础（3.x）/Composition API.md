# Composition API

## defineComponent

- 在 **TypeScript** 下，给予了组件 `正确的参数类型推断` 

```js
import { defineComponent } from 'vue'
export default defineComponent({})
```

## setup

- **Composition API** 的`入口`
- **vue** 会在 `beforeCreate 之前调用`
- 没有 `this`
- `返回对象`中的属性刻在模板中使用

```js
export default defineComponent({
    setup(){
        return {}
    }
})
```

> **参数**
>
> 1. **props**：父组件传入的参数
> 2. **context**：一些方法
>    - **attrs**：父组件传过来的，但未在 **props** 中声明的数据
>    - **slots**：插槽
>    - **emit**：触发父组件函数

> **props** 和 **context.attrs** 的区别
>
> **props** 和 **context** `获取都是响应式`的，但``编译模板``上`不会响应式变化`，如果想直接渲染，需要使用 `toRefs` 包裹返回
>
> 1. **props** 需要声明才能获取；**attrs** 不需要声明，并且可以获得 父组件传过来的，但 **props** 未声明的数据
>
>    ```vue
>    <div class="parent">
>        <Child a="A" b="B" />
>    </div>
>    ```
>
>    ```js
>    // CHild.vue 子组件中
>    export default defineComponent({
>        props: {
>          a: String  
>        },
>        setup(props, { attrs }){
>            console.log(props) // { a: "A" }
>            console.log(attrs) // { b: "B" }
>        }
>    })
>    ```
>
> 2. **props** 可以获取 `string` 外的类型；**attrs** 获取 **string** 外的类型，会是 `undefined`
>
>    ```vue
>    <div class="parent">
>        <Child :a="true" :b="true" />
>    </div>
>    ```
>
>    ```js
>    // CHild.vue 子组件中
>    export default defineComponent({
>        props: {
>          a: Boolean  
>        },
>        setup(props, { attrs }){
>            console.log(props) // { a: true }
>            console.log(attrs) // { b: undefined } 并且控制台会有 vue warning
>        }
>    })
>    ```
>
> 3. **props** 不包含`事件`；**attrs** 可以获取到事件，但不可以执行
>
>    ```vue
>    <div class="parent">
>        <Child @clic="handleClick" />
>    </div>
>    ```
>
>    ```js
>    // CHild.vue 子组件中
>    export default defineComponent({
>        setup(props, { attrs }){
>            console.log(attrs.onClick) 
>            /**
>            	ƒ () {
>                    ...
>                }
>            **/ 
>        }
>    })
>    ```

## props

声明 props 类型，为 typescript 的`Array` 类型和 `Object` 类型时，需要引入 `PropType` 类型

```typescript
interface Student {
    id: number;
    name: string;
    class?: string;
}
```

```typescript
import { PropType } from "vue";

props: {
	studentList: Array as PropType<Student[]>
}
```

## ref —— 响应式变量

- 定义一个`响应式变量`
- 传入`值`

```js
import { ref } from 'vue'

setup(){
    const number = ref(0) // 传入初始值
    return {
        number
    }
}
```

> `setup`中`获取`和`改变`都需要用 `.value`
>
> ```js
> const change = () => {
> 	number.value = number.value * 2
> }
> ```
>
> `编译模板`中，直接使用
>
> ```vue
> <div> {{ number }} </div>
> ```

## 函数

```js
import { ref } from 'vue'

setup(){
    const number = ref(0)
    const add = () => {
        number.value++
    }
    return { number, add }
}
```

- 模板中正常使用

```vue
<button @click="add">Add</button>
```

## reactive —— 变量集合

- 定义一个集合所需变量的对象
- 传入`对象`
- 需要配搭 `toRefs` 使用，不然有可能会造成集合里的变量不是响应式的

```js
import { reactive, toRefs } from 'vue'

setup(){
    const data = reactive({
      number: 0,
      add: () => {
        data.number++
      }
    })
    
    // 使用不需要 .value，直接改变即可
    const change = () => {
		data.number = 1
    }
    
    return {
        ...toRefs(data)
    }
}
```

> **setup** 和 **编译模板** 中都``不``需要 `.value`，直接 `data.number` 即可获取和改变 

## computed —— 计算变量

- 定义一个计算变量
- 传入`函数`

```js
import { ref, computed } from 'vue'

setup(){
    const number = ref(0)
    const double = computed( () => {
      return number * 2
    } )
    return {
        double
    }
}
```

> `setup`中`获取`和`改变`都需要用 `.value`

## watch —— 监听器

1. 监听单一来源

   ```js
   import { watch } from 'vue'
   
   // watching a getter
   const state = reactive({ count: 0 })
   watch( () => state.count, (newValue, olgValue) => {
       /* ... */
   })
   
   // watching a ref
   const count = ref(0)
   watch( count, (newValue, olgValue) => {
     /* ... */
   })
   ```

2. 监听多个来源

   ```js
   watch( [count, () => state.count], (newValue, oldValue) => {
       // newValue：[newCOunt1, newCount2]
   })
   ```

> `深层监听`，添加第三个参数 `{deep: true}`