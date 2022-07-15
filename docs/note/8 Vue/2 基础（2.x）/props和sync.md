# props 和 sync

## 校验

- 给组件加 **props** 接受参数，同时可对参数做校验

> 1. `type` —— 类型
> 2. `required: boolean` —— 是否必须
> 3. `default: any` —— 默认值，当父组件没传时使用
> 4. `validator: (value: any) => boolean` —— 复杂校验

```js
// 例子
props: {
    content: {
        type: String,
        required: false,
        default: 'default content',
        validator: (value) => {
            return value.length > 5
        }
    }
}
```

## props标签

会把 `props` 显示到`子组件最外层标签`上

```vue
<Child content="hello" />
```

在`最终编译`完的 **html** 代码的子组件会如下显示

```vue
<div content="hello">
	...
</div>
```

## sync -- props “双向绑定”

父组件向子组件传递 prop 时，可以使用 `sync` 进行双向绑定，这样父和子都能改变这个属性

```vue
<Child :show.sync="show" />
```

子组件可以通过 `emit` 来改变这个值

```js
this.$emit('update:show', false)
```

