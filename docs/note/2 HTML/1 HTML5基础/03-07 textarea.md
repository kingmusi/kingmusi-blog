# textarea

## 简介

`<textarea>`是一个块级元素，用来生成多行的文本框

| 属性        | 值                                                           | 说明                     |
| ----------- | ------------------------------------------------------------ | ------------------------ |
| cols        | number                                                       | 文本框的宽度，单位为字符 |
| disabled    | boolean                                                      | 是否禁用该控件           |
| maxlength   | number                                                       | 允许输入的最大字符数     |
| minlength   | number                                                       | 允许输入的最小字符数     |
| placeholder | string                                                       | 输入为空时显示的提示文本 |
| readonly    | boolean                                                      | 控件是否为只读           |
| required    | boolean                                                      | 控件是否为必填           |
| rows        | number                                                       | 文本框的高度，单位为行   |
| spellcheck  | boolean                                                      | 是否打开浏览器的拼写检查 |
| wrap        | `hard`（浏览器自动插入换行符`CR + LF`，使得每行不超过控件的宽度）<br />`soft`（输入内容超过宽度时自动换行，但不会加入新的换行符，并且浏览器保证所有换行符都是`CR + LR`，这是默认值）<br />`off`（关闭自动换行，单行长度超过宽度时，会出现水平滚动条） | 输入的文本是否自动换行   |

:::demo

```html
<textarea id="story" name="story"
          rows="5" cols="33">
hello world
</textarea>
```

:::
