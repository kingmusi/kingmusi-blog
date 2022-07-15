# v-model:params

## 同 sync 语法糖

父组件中

```vue
<Child v-model:name="name" />
```

子组件中

```js
emits('update:name', value) // 更新父组件的 name
```

