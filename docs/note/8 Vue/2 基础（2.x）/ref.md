# ref

## 基本dom

在模板中加入 `ref="[name]"`

```vue
<div ref="dom"></div>
```

则可通过 `this.$refs.[name] `获取

```js
const dom = this.$refs.dom
```

## 子组件

- 有子组件

```vue
<template>
	<div id="child"></div>
</template>
<script>
export default {
    data() {
        return {
            name: 'child'
        }
    }
}
</script>
```

- 父组件中给子组件绑定 **ref**

```vue
<template>
	<Child ref="child" />
</template>
<script>
import Child from './child.vue'
export default {
    components: { Child },
    mounted() {
        console.log( this.$refs.child.name ) // child
    }
}
</script>
```

> 即绑定子组件的引用（ **this** ）