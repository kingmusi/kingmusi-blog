# DOM Document 类型

> 被节混杂了书 14.1.2 和 15 的内容

## 特征

- 是 **window** 对象的属性
- **nodeType** 等于 9
- **nodeName** 值为 **#document**

## 子节点

| 子节点                     | 说明                          |
| -------------------------- | ----------------------------- |
| `document.documentElement` | 指向 `<html>` 元素          |
| `document.body`            | 指向 `<body>` 元素          |
| `document.head`            | 指向 `<head>` 元素          |
| `document.doctype`         | 可能存在，指向 `<!doctype>` |

> 可以通过 **childNodes** 获取，但这样获取更便捷

## 文档信息

| 文档信息                | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `document.title`        | 可以读写 `<title>` 元素中的文本，通常显示在浏览器窗口的标题栏 |
| `document.URL`          | 当前页面的完整 **URL**，可以读写                             |
| `document.domain`       | 当前页面的域名。处于安全考虑，设置 **domain** 属性的值只能是域名或子域名，即是 **URL** 包含的值 |
| `document.referrer`     | 链接到当前页面的那个页面的 **URL**                           |
| `document.characterSet` | 可以读写文档使用的字符集，即 `<meta>` 元素中的字符集       |
| `document.readyState`   | 只读，用于判断文档是否加载完成<br />- **loading**，表示文档正在加载<br />- **complete**，表示文档加载完成 |
| `document.compatMode`   | 只读，用于判断文档的渲染模式<br />- **CSS1Compat**，标准模式<br />- **BackCompat**，混杂模式 |

## 定位元素

| 定位方法                          | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `document.getElementById()`       | 接受获取元素的 **ID**<br />返回获取的元素，如没找到，则返回 **null** |
| `document.getElementsByTagName()` | 接受要获取元素的标签名<br />返回 **HTMLCollection** 对象     |
| `document.getElementsByName()`    | 接受要获取元素的 **name** 值<br />返回 **HTMLCollection** 对象 |
| `document.querySelector()`        | 接受选择器或选择器组<br />返回匹配的第一个元素               |
| `document.querySelectorAll()`     | 接受选择器或选择器组<br />返回匹配的元素列表                 |
| `getElementByClassName()`         | 接受一个字符串参数，包含一个或多个类名（空格分隔）<br />返回匹配的元素列表<br />在 **document** 上调用，则匹配文档所有元素<br />在特定元素上调用，则匹配该元素后代的元素 |

> **HTMLCollection** 对象与 **NodeList** 相似，只是多了一个额外方法 **namedItem()**，其可输入标签的 **name** 属性取得某一项引用
>
> 字符索引会自动调用 **namedItem()** 方法
>
> ```js
> const divList = document.getElementsByTagName('div')
> divList.namedItem('first')
> divList['first']
> ```

## 创建元素

- `document.createElement()`：传入要创建元素的标签名，创建一个新元素
- `document.createTextNode()`：传入字符串内容，创建一个新的文本元素
- `document.createDocumentFragment()`：创建一个片段，可以向里面插入节点

```js
const fragment = document.createDocumentFragment()
fragment.appendChild( document.createElement('div') )
```

## 焦点管理

- `document.activeElement`：指向当前拥有焦点的 **DOM** 元素
- `document.hasFocus()`：返回布尔值，表示文档是否拥有焦点
