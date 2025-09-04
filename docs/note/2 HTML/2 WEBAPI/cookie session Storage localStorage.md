# cookie sessionStorage localStorage

## cookie

- 使用 `document.cookie` 获取和改变

:::demo

```vue
<template>
	<json-viewer :data="data"></json-viewer>
	<input v-model="inputValue" />
</template>

<script setup>
import { ref, watch } from 'vue'

// json 显示的值
const data = ref(jsonStringify({
    cookie: document.cookie
}))

// input 值
const inputValue = ref(document.cookie)
// 把inputValue设置为当前 document.cookie，重新更新显示
watch(inputValue, (value) => {
    document.cookie = value
    data.value = jsonStringify({
    	cookie: document.cookie
	})
})
</script>
```

:::

> **cookie** 作用域
>
> 1. 省略**domain**参数，那么**domain**默认为当前域名。
> 2. **domain**参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则**cookie**不起作用。
> 3. 有效作用域：**domain**本身以及**domain**下的所有子域名。

## sessionStorage localStorage

- 设置数据：**setItem(key,value)**
- 获取数据：**getItem(key)**
- 删除数据：**removeItem(key)**
- 清空所有数据：**clear()**
- 获取所有keys

```js
const keys = Array.from(
  { length: localStorage.length },
  (_, index) => localStorage.key(index)
);
```

:::demo

```vue
<template>
	<json-viewer :data="jsonData"></json-viewer>

	<div class="input-container">
        <label for="key">key：</label>
        <input id="key" v-model="key" />
        <label for="value">value：</label>
        <input id="value" v-model="value" />
    </div>

	<div class="button-container">
        <button @click="handleSetItem">setItem</button>
        <button @click="handleRemoveItem">removeItem</button>
        <button @click="handleClear">clear</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
    
const jsonData = ref('{}')
const key = ref('')
const value = ref('')
reset()

function reset() {
    // 重置input框值
    key.value = ''
    value.value = ''
    
    // 重置显示的json
    // 获取所有 localStorage key
    const keys = Array.from(
      { length: localStorage.length },
      (_, index) => localStorage.key(index)
    );
    const obj = {}
    for (const key of keys) {
        obj[key] = localStorage.getItem(key)
    }
    jsonData.value = jsonStringify(obj)
}

// 设置
function handleSetItem() {
    if (!key.value || !value.value) {
        alert('key 或者 value 有一个为空')
    }
    localStorage.setItem(key.value, value.value)
    reset()
}
// 移除
function handleRemoveItem() {
    const value = localStorage.removeItem(key.value)
    reset()
}
// 清空
function handleClear() {
	localStorage.clear()
    reset()
}
</script>

<style scoped lang="less">
.input-container {
    margin-top: 20px;
    label:nth-of-type(2) {
        margin-left: 20px;
    }
}
.button-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
</style>
```

:::

当前页面使用的 **localStorage** 被其他页面修改时会触发 **StorageEvent** 事件

> 事件在同一个域下的不同页面之间触发，即在 A 页面注册了 storge 的监听处理，只有在跟 A 同域名下的 B 页面操作 storage 对象，A 页面才会被触发 storage 事件

:::demo

```html
<json-viewer data="{}"></json-viewer>
```

```js
window.addEventListener('storage', (e) => {
    console.log(e)
    const jsonViewer = document.querySelector('json-viewer')
    jsonViewer.setAttribute('data', jsonStringify({
        e: {
            isTrusted: e.isTrusted,
            key: e.key,
            newValue: e.newValue,
            oldValue: e.oldValue,
            url: e.url,
            storageArea: e.storageArea
        }
    }))
})
```

:::

- **key**：被设置或删除的键
- **newValue**：键被设置的新值，若键被删除则为 **null**
- **oldValue**：键变化之前的值

## 三者区别

#### 传递：

1. **cookie**数据始终在同源的**http**请求中携带（即使不需要），即会在浏览器和服务器间来回传递
2. **sessionStorage** 和 **localStorage** 不会⾃动把数据发给服务器，仅在本地保存

#### 存储⼤⼩：

1. **cookie** 数据⼤⼩不能超过 **4k**
2. **sessionStorage** 和 **localStorage** 虽然也有存储⼤⼩的限制，但⽐ **cookie** ⼤得 多，可以达到**5M或更⼤**

####  有期时间：

1. **localStorage** 存储持久数据，浏览器关闭后数据不丢失除⾮主动删除数据 
2. **sessionStorage** 数据在当前浏览器窗⼝关闭后⾃动删除
3. **cookie** 设置的 **cookie** 过期时间之前⼀直有效，即使窗⼝或浏览器关闭

#### API 简易性

1. **cookie** 需要自己封装
2. **sessionStorage** 和 **localStorage** 都有现成的**API**