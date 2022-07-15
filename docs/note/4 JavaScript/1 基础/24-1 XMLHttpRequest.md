# XMLHttpRequest

## 使用 XHR

1. 构造 **XMLHttpRequest** 对象

2. 监听 **readystatechange** 事件，其会在 **readyState** 属性改变时触发，可以观察到此时请求的阶段

   - 0：未初始化，没调用 **open()** 方法

     1：已打开，已调用 **open()** 方法，未调用 **send()** 方法

     2：已发送，**send()** 方法调用完成，但未接受到响应

     3：接受中，已接受到部分内容

     4：完成，接受到所有内容

3. 调用 `open()` 方法

   - 参数：请求类型，请求 **URL**，是否异步的布尔值

4. 调用 `send()` 方法

   - 参数：请求体发送的数据，如果不需要请求体，必须传入 **null**

5. 收到响应后，会自动填充以下属性

   - **responseText**：响应体返回的文本
   - **responseXML**：如果响应类容类型是 **text/xml** 或 **application/xml**，那就是包含响应数据的 **XML DOM** 文档
   - **status**：响应的 **HTTP** 状态
   - **statusText**：响应的 **HTTP** 状态描述

> 想要取消异步请求，可以调用 `abort()` 方法

```js
/** 1. 构造对象 **/ 
const xhr = new XMLHttpRequest(); 
/** 2. 监听请求阶段，在第 4 阶段，获取数据 **/
xhr.onreadystatechange = function(){  
    if(xhr.readyState == 4){   
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){    
            success(xhr.responseText);   
        } else {     
            /** false **/    
            fail && fail(xhr.status);   
        }  
    }
}
/** 3. 连接服务器 **/ /** 第三个参数为是否异步，true为是，false为不是 **/
xhr.open('method', url, true); 
/** 4. 发送请求 **/ 
xhr.send(data);  
```

## 头部信息

##### 1. 请求

- 会自动发送以下头部信息

| 键              | 说明                         |
| --------------- | ---------------------------- |
| Accept          | 浏览器可以处理的内容类型     |
| Accept-Charset  | 浏览器可以显示的字符集       |
| Accept-Encoding | 浏览器可以处理的压缩编码类型 |
| Accept-Language | 浏览器使用的语言             |
| Connection      | 浏览器与服务器的连接类型     |
| Cookie          | 页面中设置的 Cookie          |
| Host            | 发送请求的页面所在的域       |
| Referer         | 发送请求的页面的 URI         |
| User-Agent      | 浏览器的用户代理字符串       |

- 自定义头部：`setRequestHeader()` 方法

```js
const xhr = new XMLHttpRequest(); 
xhr.open('get', 'xxx.do', true)
xhr.setRequestHeader('key', 'value')
```

##### 2. 响应

- 获取单个响应头部信息：`getResponseHeader()`
- 获取全部响应头部信息：`getAllResponseHeaders()`

## GET 请求

- 需要注意查询字符串的键值需要使用 `encodeURIComponent()` 方法编码，可以使用以下方法

```js
function addURLParam(url, name, value) {
    url += url.indexOf('?') == -1 ? '?' : '&'
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    return url
}
```

## POST 请求

##### 1. XMLHttpRequest Level 0

- 需要比 **Content-Type** 头部设置为 **application/x-www-formurlencoded**
- 传送对应格式的字符串

```js
xhr.open('post', 'xx.do', false)
xhr.setRequestHeader('Content-Type', 'application/x-www-formurlencoded')
xhr.send( serialize(document.forms[0]) )
```

##### 2. XMLHttpRequest Level 2

新增了 **FormData** 类型，可以用于表单序列化，发送此类型，就不再需要再为 **XHR** 设置头部了

```js
xhr.open('post', 'xx.do', false)
const formData = new FormData() // new FormData(document.forms[0])
formData.append('key', 'value')
xhr.send(formData)
```

## 超时

可以设置 `timeout` 属性，用于表示发送请求后等待多少毫秒，如果响应不成功就中断请求，并会触发 **timeout** 事件

```js
xhr.timeout = 1000
xhr.ontimeout = function () {
	alert('timeout')
}
```

## 进度事件

| 事件      | 触发时间                                       |
| --------- | ---------------------------------------------- |
| loadstart | 在接受到响应的第一个字节时                     |
| progress  | 在接受响应期间不断触发                         |
| error     | 在请求出错时                                   |
| abort     | 在调用 abort() 终止连接时                      |
| load      | 在成功接受完响应时                             |
| loadend   | 在通讯完成时，且在 error、abort、load 之后触发 |

> **progress** 的 **event** 对象接受三个额外属性
>
> - **lengthComputable**：布尔值，表示进度信息是否可用
> - **position**：接受到的字节数
> - **totalSize**：响应的 **Content-Length** 头部定义的总字节数
>
> 在 **open()** 之前添加 **progress** 事件

