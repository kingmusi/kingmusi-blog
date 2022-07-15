# JSON Web Token

## 组成部分

#### 1、Header

- 一般由两部分组成：`token 的类型`（“JWT”）和`算法名称`（比如：HMAC SHA256 或者 RSA 等等）

- ```json
  {
      "alg": "HS256",
      "typ": "JWT"
  }
  ```

- 用`Base64`对这个JSON编码就得到JWT的第一部分

#### 2、Payload

- 不敏感的数据

- ```json
  {
      "id": 1,
      "max-age": 1600699968418
  }
  ```

- 用`Base64`对这个JSON编码就得到JWT的第二部分

#### 3、Signature

- 服务器端用私钥进行加密（签名），用于验证其他信息是否有被修改

- ```java
  HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
  ```

  > `HMACSHA256`：header头中的签名算法
  > `base64UrlEncode(header) + "." + base64UrlEncode(payload)`：加密的内容
  > `secret`：私钥

- 进行`签名算法`后的内容就得到JWT的第三部分

> **最终 JWT 的组成格式**
>
> Header.Payload.Signature

## 身份认证的过程

1. 用户携带用户名和密码请求访问
2. 服务器校验用户凭据
3. 应用提供一个 **JWT** 给客户端
4. 客户端存储 **JWT**，并且在随后的每一次请求中都带着它
5. 服务器校验 **JWT** 并返回数据
   - 服务器端用私钥解密 **JWT**，如果解密后的数据格式是合法的，则证明数据没有被修改过

> 1. 每次请求都需要 **JWT**
> 2. **JWT** 应该放在 **header** 中
> 3. 服务器端需要设置接收来自所有域的请求，即`Access-Control-Allow-Origin: *`

## 优点

1. 减轻服务器的内存压力
   - 传统做法：一些用户信息需要保存在 **session** 中
   - **JWT**：可以把用户信息放在 **Payload** 中，信息就放在客户端了
2. 安全：身份验证信息不再保存在 **cookie** 中，而是保存在客户端的内存中，这样关于 **cookie** 的攻击就不再生效了