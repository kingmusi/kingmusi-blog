# Suspense

- 用于在等待某个异步组件解析时显示`loading`

```vue
<Suspense>
    <template #default>
      <AsyncComponent1 />
      <AsyncComponent2 />	
    </template>
    <template #fallback>
    	<h1>Loading! ...</h1>
    </template>
</Suspense>
```

> **捕抓异步组件发生的错误**
>
> - `onErrorCaptured`