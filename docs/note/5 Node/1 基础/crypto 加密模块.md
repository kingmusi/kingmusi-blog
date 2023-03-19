# crypto 加密模块

## MD5 和 SHA1

- MD5可以产生出一个128位（16字节)）的散列值

```js
const crypto = require('crypto')

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
```

> 如果要计算`SHA1`，只需要把`md5`改成`sha1`

## AES

- 常用的对称加密算法，加解密都用同一个密钥。
- 密钥：16位
- 向量（iv）：应该是随机的，攻击者无法预测的，长度位16位

```js
const crypto = require('crypto');

// 加密
function encrypt (data, key, iv) {
    let decipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    decipher.setAutoPadding(true)
    return decipher.update(data, 'binary', 'base64') + decipher.final('base64')
}
//解密
function decrypt (data, key, iv) {
    data = Buffer.from(data, 'base64').toString('binary')
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    return decipher.update(data, 'binary', 'utf8') + decipher.final('utf8')
}
```

> 测试
>
> ```js
> let key = '123456789abcdefg';
> const iv = new Date().toString().slice(0, 16)
> let data = "This is an example";
> console.log("需要加密的数据:", data);
> let crypted = encrypt(data, key, iv);
> console.log("数据加密后:", crypted);
> let dec = decrypt(crypted, key, iv);
> console.log("数据解密后:", dec);
> ```
>
> ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201219212319.png)