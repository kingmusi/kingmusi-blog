# Cookie 和 Session

## 区别

1. **cookie**数据存放在客户的浏览器上，**session**数据放在服务器上
2. **cookie**不是很安全，别人可以分析存放在本地的**cookie**并进行**cookie**欺骗
   - 考虑到安全应当使用**session**
3. **session**会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   - 考虑到减轻服务器性能方面，应当使用**cookie**
4. **cookie**有大小限制

## Cookie 理解

产生原因：**HTTP** 是无状态协议，但现代有大量需要服务器辨别客户端的场景

运行理解：

1. 服务器在响应报文设置 **Set-Cookie**，通知客户端保存 **Cookie**
2. 下次客户端再往该服务器 发送请求时，客户端会自动在请求报文中加入 **Cookie** 值
3. 服务器可以根据请求报文的 **Cookie** 中的自定义的唯一表示标识辨别客户端身份

列子：

> 没有 **Cookie** 信息状态下的请求，服务器为它生成一个 **sid**，并存入 **Cookie** 中返回
>
> ![](https://cdn.musiblog.com/Web/%E7%BD%91%E7%BB%9C/cook%E5%92%8Csessino-cookie%E7%90%86%E8%A7%A31.webp)
>
> 请求报文（没有 Cookie 信息的状态）
>
> ```javascript
> GET /reader/ HTTP/1.1
> Host: hackr.jp
> ```
>
> 响应报文（服务器端生成 Cookie 信息）
>
> ```javascript
> HTTP/1.1 200 OK
> Date: Thu, 12 Jul 2012 07:12:20 GMT
> Server: Apache
> ＜Set-Cookie: sid=1342077140226724; path=/; expires=Wed,
> 10-Oct-12 07:12:20 GMT＞
> Content-Type: text/plain; charset=UTF-8
> ```

> 第 **2** 次以后（存有 **Cookie** 信息状态）的请求
>
> ![](https://cdn.musiblog.com/Web/%E7%BD%91%E7%BB%9C/cook%E5%92%8Csessino-cookie%E7%90%86%E8%A7%A32.webp)
>
> 请求报文（自动发送保存着的 Cookie 信息）
>
> ```javascript
> GET /image/ HTTP/1.1
> Host: hackr.jp
> Cookie: sid=1342077140226724
> ```





