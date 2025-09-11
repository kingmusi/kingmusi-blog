# cookie

> 随着Web应用的发展，与用户相关的特定信息保存在对应用户的机器上，如登陆信息、个人偏好等
>
> cookie 就是对需求的第一个解决方案

## cookie

用于在客户端存储会话信息，HTTP Cookies 规范要求服务器在响应HTTP请求时，通过发送`Set-Cookie`头，并包含客户端会话信息

```http
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
```

浏览器会存储会话信息，并在之后的每个请求中都会通过 HTTP 头再发回给服务器

```http
GET /index.js HTTP/1.1
Cookie: name=value
```

## 限制

域限制：

- cookie会与请求发送到创建它的域，不被其他域访问

大小（这个知识一般规律，每个浏览器最终不一样）：

- 不超过 300 个 cookie
- 每个 cookie 不超过 4096 个字节

## 构成

cookie由以下参数构成

- 名称（name）：唯一标识 cookie 名称。理论上不区分大小写，但是可能会有部分服务器区分，所以还是按照区分大小对待
- 值（value）：存储在 cookie 里的字符串值
- 域（domain）：有效域。发送到指定域的所有请求都会包含对应的 cookie。这个值可以包含子域（如`www.musiblog.com`），如果设置`.musiblog.com`则标识对这个域下所有子域都生效
- 路径（path）：请求URL包含这个路径才会发送 cookie，例如可以指定 cookie 只能由 `/note`访问，则访问`www.musiblog.com`下的页面都不会发送cookie
- 过期时间（expires）：何时删除cookie的时间戳。默认情况只会保留当前会话，值是 GMT 格式
- 安全标志（secure）：设置后，只在使用 SSL 安全链接才会发送

```http
HTTP/1.1 200 OK
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.musiblog.com; path=/; secure
```

## JS 中的 cookie

通过 `document.cookie` 获取和设置

所有的名和值都是 URL 编码的，所以使用的时候必须通过 `decodeURIComponent()` 解码

以下是读、写、删除的基本封装

```ts
class CookieUtil {
  static get(name: string) {
    const cookieName = `${encodeURIComponent(name)}=`
    const cookieStart = document.cookie.indexOf(cookieName)
    let cookieValue = null

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      )
      return cookieValue
    }
    return null
  }

  static set(name: string, value: string, options: { expires?: Date, path?: string, domain?: string, secure?: boolean } = {}) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires instanceof Date) {
      cookieText += `; expires=${options.expires.toUTCString()}`
    }

    if (options.path) {
      cookieText += `; path=${options.path}`
    }

    if (options.domain) {
      cookieText += `; domain=${options.domain}`
    }

    if (options.secure) {
      cookieText += `; secure`
    }

    document.cookie = cookieText
  }

  static remove(name: string) {
    CookieUtil.set(name, '', { expires: new Date(0) })
  }
}
```

## CookieStore

`CookieStore`是基于`Promise`的方式，能更优雅、更安全地操作Cookie的新API（有浏览器兼容性问题，使用前先查看[是否合适](https://caniuse.com/?search=CookieStore)）

#### 1、写

```ts
await cookieStore.set({
  name: 'user',
  value: 'john',
  expires: Date.now() + 3600 * 1000, // 1小时后过期
  path: '/'
});
```

#### 2、读

```ts
const userCookie = await cookieStore.get('user');
if (userCookie) {
  console.log(userCookie.name);   // 'user'
  console.log(userCookie.value);  // 'john'
}
```

#### 3、删

```ts
await cookieStore.delete('user');
```

