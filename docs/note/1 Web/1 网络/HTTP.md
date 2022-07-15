# HTTP

## 特点
1. `简单快速`：每个资源（比如图片、页面）都通过 **url** 来定位。这都是固定的，在 **http** 协议中，处理起来也比较简单，想访问什么资源，直接输入 **url** 即可
2. `灵活`：**http** 协议的头部有一个，数据类型，通过 **http** 协议，就可以完成不同数据类型的传输。
3. `无连接`：连接一次，就会断开，不会继续保持连接。
4. `无状态`：客户端和服务器端是两种身份。第一次请求结束后，就断开了，第二次请求时，服务器端并没有记住之前的状态，也就是说，服务器端无法区分客户端是否为同一个人、同一个身份。

## HTTP 报文组成

##### 一、HTTP request 报⽂结构是怎样的

1. `请求行`：请求方法、请求 **URL**、**HTTP**协议版本，**CRLF**（换行）
2. `请求头`：若⼲⾏请求头，包括**general-header**，**request-header**或者**entity-header**， 每个⼀⾏以 **CRLF** 结束
3. `空行`
4. `请求体`：根据实际请求需要可能包含⼀个消息实体

```javascript
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1 
Host: www.w3.org 
Connection: keep-alive 
Cache-Control: max-age=0 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/ User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, Referer: https://www.google.com.hk/) 
Accept-Encoding: gzip,deflate,sdch 
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6 
Cookie: authorstyle=yes 
If-None-Match: "2cc8-3e3073913b100" 
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT 

name=qiu&age=25 
```

##### 二、HTTP response 报⽂结构是怎样的

1. `状态行`：HTTP版本，状态码，状态描述，CRLF 
2. `响应头`
3. `空行`
4. `响应体`

```javascript
HTTP/1.1 200 OK 
Date: Tue, 08 Jul 2014 05:28:43 GMT 
Server: Apache/2 
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT 
ETag: "40d7-3e3073913b100" 
Accept-Ranges: bytes 
Content-Length: 16599 
Cache-Control: max-age=21600 Expires: Tue, 08 Jul 2014 11:28:43 GMT P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml" 
Content-Type: text/html; charset=iso-8859-1 
 
{"name": "qiu", "age": 25}
```

## 方法

- `GET`：请求服务器发送某个资源
- `POST`：让资源在服务器上执行一系列操作，如创建新资源、更新资源、变更资源等。
- `PUT`：跟 **POST** ⽅法很像，也是向服务器提交数据。但是， **PUT** 指定了资 源在服务器上的位置，⽽ **POST** 没有
- `HEAD`：只请求⻚⾯的⾸部
- `DELETE`：删除服务器上的某资源
- `OPTIONS`：⽤于获取当前 **URL** 所⽀持的⽅法。如果请求成功，会有⼀个 **Allow** 的头包含类 似 **“GET,POST”** 这样的信息
- `TRACE`：服务器回显收到的客户端请求，主要用于测试或诊断
- `CONNECT`：预留给将连接转换为全双工通信连接

## Get 和 Post 的区别

#### 非 ajax 请求

如浏览器用GET请求来获取一个html页面/图片/css/js等资源；用POST来提交一个`<form>`表单，并得到一个结果的网页

1. **get** 的参数通过 **url**传递， **post**的参数放在 **request body** 中
2. 由于 **url** 有长度限制，所以**get**传递的参数有长度限制， **post**没有
3. **get**比 **post**更不安全，参数暴露在 **url**中，会被历史记录
4. 浏览器在回退时，**get**不会重新请求，但是**post**会重新请求

#### ajax 请求

**get** 和 **post** 已经没有太多的区别了

- **get** 请求的参数可以放在请求体里，**post** 请求的参数同样可以放在 **url** 上

为了规范接口风格。则有了一些约定，如 **REST**

- **get** 请求专用于获取资源或者资源列表，请求参数放在 **url** 上。如果响应报文头部有 **Caching**，则浏览器同样会缓存下来
- **post** 请求用于“创建一个资源”，请求参数放在 **request body** 上
- **PUT** 请求用于更新/替换一个资源，请求参数放在 **request body** 上，则一般有 **id**
- **DELETE** 请求用于删除一个资源

#### 共同

**get**产生一个 **TCP**数据包， 而 **post**可能产生两个 **TCP**数据包

**post** 会先发送头部，让服务器验证头部某些参数（如权限，名称）后，如果能继续执行，会响应 **100** 状态码，然后 **post** 再发送一次请求体。如果验证不正确，则会响应 **400** 状态，不再发送请求体  

## 状态码

##### **1XX** ：信息状态码 

1. `100 Continue` 继续，⼀般在发送 post 请求时，已发送了 http header 之后服务端 将返回此信息，表示确认，之后发送具体参数信息 

##### **2XX**：成功状态码 

1. `200 OK` 正常返回信息 
2. `204 No Contetn` 请求成功，但在返回的响应报文中不含实体的主体部分
3. `206 Partial Content` 客户端进行了范围（Content-Range）请求，而服务器成功执行了这部分的 GET 请求 

##### **3XX**：重定向 

1. `301 Moved Permanently` 永久重定向，请求的资源已被分配了新的 **URI**，会改变保存书签的 **URI**
2. `302 Found` 临时性重定向，请求的资源已被分配了新的 **URI**，不会更新书签
3. `303 See Other` 临时性重定向，且总是使⽤ **GET** 请求新的 **URI** 
4. `304 Not Modified` ⾃从上次请求后，请求的⽹⻚未修改过（浏览器缓存机制）

##### **4XX**：客户端错误

1. `400 Bad Request` 服务器⽆法理解请求的格式，客户端不应当尝试再次使⽤相同的内容发起请求。 
2. `401 Unauthorized` 请求未授权。
3. `403 Forbidden` 服务器已经得到请求，但是拒绝执行。
4. `404 Not Found` 找不到如何与 **URI** 相匹配的资源

##### **5XX**: 服务器错误 

1. `500 Internal Server Error` 最常⻅的服务器端错误。 
2. `503 Service Unavailable` 服务器端暂时⽆法处理请求（可能是过载或维护）

