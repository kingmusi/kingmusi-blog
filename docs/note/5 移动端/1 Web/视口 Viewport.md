# 视口 Viewport

##  viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- **width**：控制 **viewport** 的宽度，可以指定的一个值，如 600，或者特殊的值，如 **device-width** 为设备的宽度
- **height**：设置 **viewport** ⾼度，⼀般设置了宽度，会⾃动解析出⾼度，可以不⽤设置 
- **initial-scale**：初始缩放比例
  - `视口大小 / 显示大小`，如**initial-scale=0.5**，移动端的视口宽为**375px**，但**body**宽为**750px**，看上去会缩小很多
- **maximum-scale**：允许用户缩放到的最大比例
- **minimum-scale**：允许用户缩放到的最小比例
- **user-scalable**：用户是否可以手动缩放，默认可以，**no**为不可以

> 1. 使宽为视口宽，和初始缩放为**1**，显示结果是一样的
> 2. 用户不可以手动缩放，和允许用户缩放的最大、最小比例都为1，结果是一样的
> 3. 但为了兼容性，一般都写上，所以下面是标准写法
>
> ```html
> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1. user-scalable=no">
> ```

## JS 获取视口宽

```js
// 1
window.innerWidth
// 2
document.documentElement.clientWidth
// 3
document.documentElement.getBoundingClientRect().width
// 兼容写法
const viewWidth = document.documentElement.clientWidth || window.innerWidth
```

## 怎样处理移动端 1px 被渲染成 2px 问题

**局部处理**

1. **mate**标签中的 **viewport**属性 ， **initial-scale** 设置为 **1** 
2. **rem** 按照设计稿标准⾛，外加利⽤ **transfrom** 的 **scale(0.5)** 缩⼩⼀倍即可；

**全局处理**

1. **mate**标签中的 **viewport** 属性 ， **initial-scale** 设置为 **0.5 **
2. **rem** 按照设计稿标准⾛即