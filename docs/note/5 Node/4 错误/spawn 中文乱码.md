# spawn 中文乱码

- 问题：**spawn** 在 **window** 中文简介命令行下输出中文会乱码，哪怕已经指定了 **utf-8**

- 解决：使用 **iconv** 库

```js
import iconv from 'iconv-lite'
// data： spawn 输出的二进制
const result = iconv.decode(Buffer.from(data, 'binary'), 'cp936')
```

