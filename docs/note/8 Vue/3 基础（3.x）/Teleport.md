# Teleport

## 使用

使被 **teleport** 包围的标签逃离某个组件下

- `to` - `string`。需要 prop，必须是有效的查询选择器或 HTMLElement
- `isabled` - `boolean`。此可选属性可用于禁用 `<teleport>` 的功能，禁用时其插槽内容将不会移动到任何位置，切换 **disabled** 只是移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态

```vue
<teleport to="#app" :disabled="disabled"></teleport>
```

## 场景

- 常用于弹出框组件、背景组件等

- 逃到的那个标签可在 **index.html** 中定义，也可以在 **setup** 中创建标签（这样更符合组件，不需要自己在index.html中添加）



