# cookie sessionStorage localStorage

## cookie

- 使用 `document.cookie` 获取和改变

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

上面方法的调用都会触发 **storage** 事件，其 **event** 对象上有以下属性

- **domain**：存储变化对应的域
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