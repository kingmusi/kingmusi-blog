# HTTP/1.1 通用首部字段

## Cache-Control

- 操作缓存的工作机制
- 多个指令之间通过“,”分隔

缓存请求指令

| 指令             | 参数   | 说明                         |
| ---------------- | ------ | ---------------------------- |
| no-cache         | 无     | 强制向源服务器再次验证       |
| no-store         | 无     | 不缓存请求或响应的任何内容   |
| max-age = [秒]   | 必需   | 响应的最大Age值              |
| max-stale = [秒] | 可省略 | 接收已过期的响应             |
| min-fresh = [秒] | 必需   | 期望在指定时间内的响应仍有效 |
| no-transform     | 无     | 代理不可更改媒体类型         |
| only-if-cached   | 无     | 从缓存获取资源               |
| cache-extension  | 无     | 新指令标记（token）          |

缓存响应指令

| 指令             | 参数   | 说明                                           |
| ---------------- | ------ | ---------------------------------------------- |
| public           | 无     | 可向任意方提供响应的缓存                       |
| private          | 可省略 | 仅向特定用户返回响应                           |
| no-cache         | 可省略 | 缓存前必须先确认其有效性                       |
| no-store         | 无     | 不缓存请求或响应的任何内容                     |
| no-transform     | 无     | 代理不可更改媒体类型                           |
| must-revalidate  | 无     | 可缓存但必须再向源服务器进行确认               |
| proxy-revalidate | 无     | 要求中间缓存服务器对缓存的响应有效性再进行确认 |
| max-age = [秒]   | 必需   | 响应的最大Age值                                |
| s-maxage = [秒]  | 必需   | 公共缓存服务器响应的最大Age值                  |
| cache-extension  | 无     | 新指令标记（token）                            |

> 通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字段内的指令
>
> ```http
> Cache-Control: private, community="UCI"
> ```
>
> 如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略

## Connection

- 控制不再转发给代理的首部字段

  ![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018113030.png)

- 管理持久连接

  - `Connection: Keep-Alive` 持久连接
  - `Connection: close` 当服务器端想明确断开连接时，则指定为 **close**

## Date

- 表明创建 HTTP 报文的日期和时间

HTTP 1.0 采用 RFC850 格式

```http
Date: Tue, 03-Jul-12 04:40:59 GMT
```

HTTP 1.1采用 RFC1123 格式

```http
Date: Tue, 03 Jul 2012 04:40:59 GMT
```

## Trailer

- 说明在报文主体后记录了哪些首部字段

## Transfer-Encoding

- 规定了传输报文主体时采用的编码方式

## Upgrade

- 用于检测 HTTP 协议及其他协议是否可使用更高的 版本进行通信，其参数值可以用来指定一个完全不同的通信协议

## Via

- 追踪客户端与服务器之间的请求和响应报文的传输路径
- 报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发

## Warning

- 通常会告知用户一些与缓存相关的问题的警告

格式

`Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])`

# HTTP/1.1 请求首部字段

## Accept

- 通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级
- 可使用 **type/subtype** 这种形式，一次指定多种媒体类型

常用列子

- 文本文件

  text/html, text/plain, text/css

  application/xhtml+xml, application/xml 

- 图片文件

  image/jpeg, image/gif, image/png

- 视频文件

  video/mpeg, video/quicktime

- 应用程序使用的二进制文件

  application/octet-stream, application/zip

## Accept-Charset

- 来通知服务器用户代理支持的字符集及字符集的相对优先顺序

```http
Accept-Charset: iso-8859-5, unicode-1-1;
```

## Accept-Encoding

- 告知服务器用户代理支持的内容编码及 内容编码的优先级顺序

```http
Accept-Encoding: gzip, deflate
```

常用例子

- **gzip**

  由文件压缩程序 gzip（GNU zip）生成的编码格式 （RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）

- **compress**

  由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）

- **deflate**

  组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法 （RFC1951）生成的编码格式

- **identity**

  不执行压缩或不会变化的默认编码格式

## Accept-Language

- 告知服务器用户代理能够处理的自然语言集

```http
Accept-Language: zh-cn,zh;q=0.7,en-us,en;
```

## Authorization

- 用来告知服务器，用户代理的认证信息（证书值）

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018115107.png)

## From

- 用来告知服务器使用用户代理的用户的电子邮件地址

```http
Form: 543657931@qq.com
```

## Host

- 告知服务器，请求的资源所处的互联网主机名和端口号

```http
Host: www.kingmusi.xyz
```

## If-Match

- 告知服务器匹配资源所用 的实体标记（ETag）值
- 服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 412 Precondition Failed 的响应
- 可以使用星号（*）指定 If-Match 的字段值，服务器将会忽略 ETag 的值，只要资源存在就处理请求

## If-Modified-Since

- 若 IfModified-Since 字段值早于资源的更新时间，则希望能处理该请求
- 在 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应

```http
If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT
```

## If-None-Match

- 和首部字段 If-Match 作用相反
- 指定 If-None-Match 字段值的实体标记（ETag）值与请求资源的 ETag 不一致时，它就告知服务器处理该请求

## If-Range

- 若指定的 IfRange 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一致时，则作为范围请求处理
- 反之，则返回全体资源

## If-Unmodified-Since

- 指定的请求资源只有在字段值内指定的日期时间之后，未发生更新的情况下，才能处理请求

```http
If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT
```

## Max-Forwards

- 通过 TRACE 方法或 OPTIONS 方法，发送包含首部字段 MaxForwards 的请求时，该字段以十进制整数形式指定可经过的服务器最大数目

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018120159.png)

## Range

- 器资源的指定范围

```http
Range: bytes=5001-10000
```

请求获取从第 5001 字节至第 10000 字节的资源

## Referer

- 请求的原始资源的 URI
- 客户端一般都会发送 Referer 首部字段给服务器。但当直接在浏览器的地址栏输入 URI，或出于安全性的考虑时，也可以不发送该首部字段

```http
Referer: http://www.hackr.jp/index.htm
```

## TE

- 会告知服务器客户端能够处理响应的传输编码方式及相对优先级
- 和首部字段 Accept-Encoding 的功能很相像

```http
TE: gzip, deflate;
```

## User-Agent

- 将创建请求的浏览器和用户代理名称等信息传达给服务器



# HTTP/1.1 响应首部字段

## Accept-Ranges

- 来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源

**bytes**：可以

**none**：不可以

```http
Accept-Ranges: bytes
```

## Age

- 告知客户端，源服务器在多久前创建了响应。单位为秒

```http
Age: 600
```

## ETag

- 告知客户端实体标识
- 客户端通过判断 ETag 值是否有改变，进行重新获取

```http
ETag: "82e22293907ce725faf67773957acd12"
```

## Location

- 将响应接收方引导至某个与请求 URI 位置不同的资源

- 基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的 URI

```http
Location: http://www.usagidesign.jp/sample.html
```

## Proxy-Authenticate

- 把由代理服务器所要求的认证信息发送给客户端

```http
Proxy-Authenticate: Basic realm="Usagidesign Auth"
```

## Retry-After

- 告知客户端应该在多久之后再次发送请求
- 主要 配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用
- 字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数

```http
Retry-After: 120
```

## Server

- 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息

```http
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```

## Vary

- 对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018142205.png)

上图：当代理服务器接收到带有 Vary 首部字段指定获取资源的请求时，如果使用的 Accept-Language 字段的值相同，那么就直接从缓存返回响应。反之，则需要先从源服务器端获取资源后才能作为响应返回

## WWW-Authenticate

- 告知客户端适用于访问请求 URI 所指定资源的认证方案

# HTTP/1.1 实体首部字段

## Allow

- 通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法
- 当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。并把所有能支持的 HTTP 方法写入首部字段 Allow 后返回

```http
Allow: GET, HEAD
```

## Content-Encoding

- 会告知客户端服务器对实体的主体部分选用的内容编码方式

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018142731.png)

```http
Content-Encoding: gzip
```

## Content-Language

- 会告知客户端，实体主体使用的自然语言

```http
Content-Language: zh-CN
```

## Content-Length

- 表明了实体主体部分的大小（单位是字节）

```http
Content-Length: 15000
```

## Content-Location

- 报文主体部分相对应的 URI
- 和首部字段 Location 不同，Content-Location 表示的是报文主体返回资源对应的 URI

```http
Content-Location: http://www.hackr.jp/index-ja.html
```

## Content-MD5

- Content-MD5 是一串由 MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018143201.png)

上图例子：客户端会对接收的报文主体执行相同的 MD5 算法，然后与首部字段 Content-MD5 的字段值比较

## Content-Range

- 告知客户端作为响应返回的实体的哪个部分符合范围请求

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211018143436.png)

## Content-Type

- 说明了实体主体内对象的媒体类型

## Expires

- 会将资源失效的日期告知客户端

```http
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

## Last-Modified

- 指明资源最终修改的时间

```http
Last-Modified: Wed, 23 May 2012 09:59:55 GMT
```

# 为 Cookie 服务的首部字段

| 首部字段名 | 说明                           | 首部类型     |
| ---------- | ------------------------------ | ------------ |
| Set-Cookie | 开始状态管理所使用的Cookie信息 | 响应首部字段 |
| Cookie     | 服务器接收到的Cookie信息       | 请求首部字段 |

## Set-Cookie 

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| NAME=VALUE   | 赋予 Cookie 的名称和其值（必需项）                           |
| expires=DATE | Cookie 的有效期（若不明确指定则默认为浏览器关闭前为止）      |
| path=PATH    | 将服务器上的文件目录作为Cookie的适用对象（若不指定则默认为文档所在的文件目录） |
| domain=域名  | 作为 Cookie 适用对象的域名 （若不指定则默认为创建 Cookie 的服务器的域名） |
| Secure       | 仅在 HTTPS 安全通信时才会发送 Cookie                         |
| HttpOnly     | 加以限制，使 Cookie 不能被 JavaScript 脚本访问               |

