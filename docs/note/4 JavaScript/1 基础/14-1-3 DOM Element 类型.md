# DOM Element 类型

## 特征

- **nodeType** 等于 1
- **nodeName** 值为元素标签名

> 可以通过 **nodeName** 和 **tagName** 获取元素标签名，两个值是一样的，注意返回的是**大写形式**

## 标准属性

- 所有 **HTML** 元素都有的特性
- 可以读写这些特性

| 属性          | 说明                                             |
| ------------- | ------------------------------------------------ |
| **id**        | 元素在文档中的唯一标识符                         |
| **title**     | 包含元素的额外信息，鼠标在元素上时，会显示此信息 |
| **lang**      | 元素内容的语言代码                               |
| **dir**       | 语言的书写方向                                   |
| **className** | 相当于 **class** 属性                            |

## 获取、设置和删除属性

| 方法                | 说明     |
| ------------------- | -------- |
| `getAttribute()`    | 获取属性 |
| `setAttribute()`    | 设置属性 |
| `removeAttribute()` | 删除属性 |

> **HTML5** 规范建议自定义属性以 **data-** 为前缀，这样就可以通过 `dataset` 获取和定义这些自定义属性
>
> ```js
> const div = document.getElementsByTagName('div')[0]
> 
> div.dataset.id = 1
> console.log(div.dataset.id)              // 1
> console.log(div.getAttribute('data-id')) // 1
> ```

