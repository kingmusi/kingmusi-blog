# 插槽 slot

## 基本使用

父组件中，在子组件标签间添加 **html** 代码或其他组件，子组件通过 **slot** 接受

```vue
<Child>
	<h1>我是插槽内容</h1>
<Child/>
```

```vue
<template>
	<div id="child">
        <slot>默认内容</slot>
    </div>
</template>
```

最终子组件可被渲染为

```vue
<div id="child">
    <h1>我是插槽内容</h1>
</div>
```

## 作用域插槽

父组件传过去的数据中，包含子组件的自身的数据，则用`作用域插槽`

```vue
<Child>
	<template v-slot="slotProps">
    	{{slotProps.data}}
    </template>
<Child/>
```

```vue
<template>
	<div id="child">
        <slot :data="name">默认内容</slot>
    </div>
</template>
<script>
export default{
	data(){
        return{
            name: 'child'
        }
    }
}
</script>
```

最终子组件可被渲染为

```vue
<div id="child">child</div>
```

## 具名插槽

**slot** 的缩写为 `#`

```vue
<Child>
    <!-- 缩写：<template #header> -->
	<template slot="header"> header </template>
    <div> main </div>
    <template slot="footer"> footer </template>
<Child/>
```

```vue
<div id="child">
    <header>
    	<slot name="header"></slot>
    </header>
    <slot></slot>
    <footer>
    	<slot name="footer"></slot>
    </footer>
</div>
```

最终子组件可被渲染为

```vue
<div id="child">
    <header> header </header>
    <div> main </div>
    <footer> footer </footer>
</div>
```

