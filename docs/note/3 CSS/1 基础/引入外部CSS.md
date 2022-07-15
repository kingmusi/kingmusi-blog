# 引入外部css

## 引入方式

#### `link`

```html
<link href="CSSurl路径" rel="stylesheet" type="text/css" />
```

#### `@import`

```css
@import url
```

## 区别

1.  **link** 是 **HTML** ⽅式， **@import** 是 **CSS** ⽅式
2. **link**  最⼤限度⽀持并⾏下载， **@import** 过多嵌套导致串⾏下载
3. 浏览器对 **link** ⽀持早于 **@impor**，可以使⽤ **@import** 对⽼浏览器隐藏样式 
4. **@import** 必须在样式规则之前
5. 总体来说： **link** 优于 **@import**