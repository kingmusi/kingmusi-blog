# Fetch API

## 基本用法

1. 传入第一个必须的参数，获取资源的 **URL**，返回一个 **Promise**
2. 判断状态码
3. 通过 `text()` 方法返回响应体文本
4. 捕获期约错误，会在以下时候触发
   - 违反 **CORS**、无网络连接、**HTTPS** 错配、浏览器或网络策略问题

```js
fetch('url')
	.then(response => {
    	if((response.status >= 200 && response.status < 300) || response.status == 304){
            return response.text()
        } else {
            alert('error')
        }
	}, err => console.log('网络错误：' + err))
	.then(data => {
    	if (data !== undefined) {
         	console.log(data)   
        }
	})
```

> **url** 会自动补充完整
>
> ```js
> console.log(location.href) // https://foo.com/bar/baz
> 
> fetch('qux').then(response => console.log(response.url))
> // https://foo.com/bar/qux
> 
> fetch('/qux').then(response => console.log(response.url))
> // https://foo.com/qux
> 
> fetch('//qux.com').then(response => console.log(response.url))
> // https://qux.com
> 
> fetch('https://qux.com').then(response => console.log(response.url))
> // https://qux.com
> ```

第二个参数是可选的，可以按照下表键/值进行填充

| 键             | 值                                                           |
| -------------- | ------------------------------------------------------------ |
| body           | 指定请求体的内容<br />Blob、BufferSource、FormData、URLSearchParams、ReadableStream、String的实例 |
| cache          | 控制浏览器与 HTTP 缓存的交互<br />- default：默认，命中有效缓存<br />- no-store：不检查缓存，直接发送请求，不缓存响应<br />- reload：不检查缓存，直接发送请求，缓存响应<br />- no-cache：不检查缓存，直接发送请求，如果响应改变，则缓存响应<br />- force-cache：不发送请求<br />- only-if-cached：只在请求模式为 same-origin 时使用缓存 |
| credentials    | 指定在外发请求中如何包含 cookie<br />- omit：不发送 cookie<br />- same-origin：同源时发送 cookie，默认<br />- include：无论同源还是跨域都发送 cookie |
| headers        | 指定请求头部，最好使用 Headers 对象                          |
| integrity      | 用于强制子资源完整性                                         |
| keepalive      | 指示浏览器允许请求存在时间超出页面生命周期。默认值为 false   |
| method         | 指定 HTTP 请求方法                                           |
| mode           | 指定请求模式。决定来自跨域请求的响应是否有效<br />- cors：允许遵守 CROS 协议的跨域请求<br />- no-cors：允许不需要发送预检请求的跨域请求<br />- same-origin：任何跨域请求都不允许发送<br />- navigate：用于支持 HTML 导航，基本用不到 |
| redirect       | 用于指定如何处理重定向响应<br />- follow：跟踪重定向请求，以最终非重定向 URL 的响应作为最终响应<br />- error：重定向请求会抛出错误<br />- manual：不跟踪重定向请求 |
| referrer       | 用于指定 HTTP 的 Referer 头部内容<br />- no-referrer：以 no-referer 作为值<br />- client/about:client：以当前 URL 或 no-referrer 作为值<br />- `<URL>`：以伪造 URL 作为值 |
| referrerPolicy | 指定 HTTP 的 Referer 头部                                    |
| signal         | 支持通过 AbortController 中断进行中的 fetch() 请求，必须是 AbortSignal 实例 |

## 常见的请求

##### 1. 发送 JSON 数据

```js
const payload = JSON.stringify({ foo: 'bar' })
const headers = new Headers({ 'Content-Type': 'application/json' })
fetch('url', {
    method: 'POST',
    headers,
    body: payload
})
```

##### 2. 在请求体中发送参数

```js
const payload = 'foo=bar&baz=qux'
const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
fetch('url', {
    method: 'POST',
    headers,
    body: payload
})
```

##### 3. 发送文件

```js
const imageFormData = new FormData()
const imageInput = document.querySelector('input[type="file"]')
imageFoemData.append('image', imageInput.files[0])
fetch('url', {
    method: 'POST',
    body: imageFormData
})
```

```js
// 多个文件
const imageFormData = new FormData()
const imageInput = document.querySelector('input[type="file"][multiple]')
for (let i = 0; i < imageFormData.files.length; i++) {
    imageFormData.append('image', imageInput.files[i])
}
fetch('url', {
    method: 'POST',
    body: imageFormData
})
```

##### 4. 加载 Blob 文件

```js
const imageElement = document.querySelector('img')
fetch('url')
	.then(response => response.blob())
	.then(blob => imageElement.src = URL.createObjectURL(blob))
```

##### 5. 中断请求

```js
const abortController = new AbortController()
fetch('xx.zip', { signal: abortController.signal })
	.catch(() => console.log('aborted!'))
setTimeout(() => abortController.abort(), 10)
```

## Headers 对象

- 与 **Map** 相似，都有 `get()`、`set()`、`has()`、`delete()` 等实例方法
- 还多一个 `append()` 方法，支持添加多个值，不会覆盖，而是以逗号分隔

## Request、Response 对象

## 获取相应体内容

1. `Body.text()`：将缓冲区转存得到 **UTF-8** 格式字符串
2. `Body.json()`：将缓冲区转存得到 **JSON**
3. `Body.formData()`：将 **FormData** 对象序列化 / 反序列化为主体
4. `Body.arrayBuffer()`：将主体内容转换为 **ArrayBuffer** 实例
5. `Body.blob()`：将主体内容转换为 **Blob** 实例

```js
fetch('url')
	.then(response => response.text())
	.then(data => console.log(data))
```

