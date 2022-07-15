# DOM Text 和 Comment 类型

## Text 类型

##### 1. 特征

- **nodeType** 等于 3
- **nodeName** 值为元素 **#text**
- **nodeValue** 值为节点中包含的文本
- 不支持子节点

> 可以通过 **nodeValue** 和 **data** 获取包含的文本，两个值是一样的

##### 2. 操作文本的方法

| 方法                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| `appendData(text)`                 | 像节点末尾添加文本 **text**                                  |
| `deleteData(offset, count)`        | 从位置 **offset** 开始删除 **count** 个字符                  |
| `insertData(offset, text)`         | 在位置 **offset** 插入 **text**                              |
| `replaceData(offset, count, text)` | 用 **text** 替换从位置 **offset** 到 **offset + count** 的文本 |
| `splitText(offset)`                | 在位置 **offset** 将当前文本节点拆分为两个文本节点           |
| `substringData(offset, count)`     | 提取从位置 **offset** 到 **offset + count** 的文本           |

##### 3. 操作文本节点

- 一般只有一个文本节点

```js
const textNode = div.firstChild
textNode.nodeValue = 'hello world'
```

- 当父节点中有多个子文本节点时，可以调用 **normalize()** 方法合并子节点

```js
const div = document.createElement('div')
div.appendChild( document.createTextNode('hello') )
div.appendChild( document.createTextNode('world') )

console.log(div.childNodes.length) // 2
div.normalize()
console.log(div.childNodes.length) // 1
```

## Comment 类型

##### 1. 特征

- **nodeType** 等于 8
- **nodeName** 值为元素 **#comment**
- **nodeValue** 值为注释内容
- 不支持子节点

