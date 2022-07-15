# DOM 深度优先遍历

## 深度优先遍历

下面 **DOM** 遍历顺序如下

```html
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <p><b>hello</b> world!</p>
    </body>
</html>
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210508230548.png)

## NodeIterator

##### 1. 创建实例

通过 `document.createNodeIterator(root, whatToShow, filter, entityReferenceExpansion)` 创建实例

| 参数                       | 说明                                                  |
| -------------------------- | ----------------------------------------------------- |
| `root`                     | 作为遍历根节点的节点                                  |
| `whatToShow`               | 数值，表示应该访问哪些节点                            |
| `filter`                   | **NodeFilter** 对象或函数，表示是否接受或跳过特定节点 |
| `entityReferenceExpansion` | 布尔值，表示是否扩展实体引用。没什么用                |

##### 2. whatToShow 详解

**whatToShow** 是一个位掩码，可以决定访问哪些类型的节点，以下是常用的几个值

| 值                         | 说明               |
| -------------------------- | ------------------ |
| `NodeFilter.SHOW_ALL`      | 显示所有类型的节点 |
| `NodeFilter.SHOW_ELEMENT`  | 显示元素节点       |
| `NodeFilter.SHOW_TEXT`     | 显示文本节点       |
| `NodeFilter.SHOW_COMMENT`  | 显示注释节点       |
| `NodeFilter.SHOW_DOCUMENT` | 显示文档节点       |

> 这些值除了 **NodeFilter.SHOW_ALL** 外，可以组合使用
>
> ```js
> NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
> ```

##### 3. filter 详解

可以自定义过滤函数，返回 **NodeFilter.FILTER_ACCEPT** 表示访问此节点，返回 **NodeFilter.FILTER_SKIP** 表示不访问此节点

```js
const filter = node => node.tagName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
```

##### 4. 遍历方法

- `nextNode()`：以深度优先方式前进一步。第一次调用，返回根节点
- `previousNode()`：以深度优先方式后退一步

```js
// 可以如下遍历
const body = document.body
const filter = node => node.tagName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP

const iterator = document.createNodeIterator(body, NodeFilter.SHOW_ELEMENT, filter, false)
let node = iterator.nextNode()

while (node !== null) {
    // ...
    node = iterator.nextNode()
}
```

## TreeWalker

**TreeWalker** 是 **NodeIterator** 的高级版，和 **NodeIterator** 一样

##### 1. 创建实例

通过 `document.createTreeWalker(root, whatToShow, filter, entityReferenceExpansion)` 创建实例

##### 2. 更多遍历方法

在其上添加更多的遍历方法

| 方法                | 说明                           |
| ------------------- | ------------------------------ |
| `parentNode()`      | 遍历到当前节点的父节点         |
| `firstChild()`      | 遍历到当前节点的第一个子节点   |
| `lastChild()`       | 遍历到当前节点的最后一个子节点 |
| `nextSibling()`     | 遍历到当前节点的下一个兄弟节点 |
| `previousSibling()` | 遍历到当前节点的上一个兄弟节点 |

> 这样可以更自由的进行遍历

##### 3. 节点过滤器（filter）多了一个返回值

- **NodeFilter.FILTER_REJECT**：表示跳过该节点以及该节点的整个子树

##### 4. 读写当前节点

- 可以通过属性 **currentNode**访问当前正在遍历的那一个节点
- 可以改写此属性，以改变遍历的指针