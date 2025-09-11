# progress

## 简介

`<progress>`标签是一个行内元素，表示任务的完成进度。浏览器通常会将显示为进度条

| 属性  | 值             | 说明           |
| ----- | -------------- | -------------- |
| max   | float          | 进度条的最大   |
| value | float（0~max） | 进度条的当前值 |

:::demo

```html
<progress max="100" value="70"> 70% </progress>
```

:::