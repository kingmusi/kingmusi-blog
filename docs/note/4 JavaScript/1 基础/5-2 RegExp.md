# RegExp

## 基础使用

引用值。正则表达式

定义

- 字面量形式，双斜杠

  ```js
  /pattern/flags
  ```

- 使用 **RegExp** 构造函数。接受两个参数：模式字符串和标记字符串（可选）
  
  ```js
  new RegExp("pattern", "flags")
  ```
> 模式字符串是字符串，所以 `\` 需要二次转译 `\\`
>
> ```js
> // 下面两个才是一样
> /\[/
> new RegExp("\\[")
> ```

以下**元字符**需要转译才能获得原本意思

`( [ { \ ^ $ | ) ] } ? * + .`

## 标记（flag） 

| 标识 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| g    | 全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束 |
| i    | 不区分大小写                                                 |
| m    | 多行模式，表示查找到一行文本末尾时会继续查找                 |

## toLocaleString、toString、valueOf

toLocaleString、toString 都返回正则表达式的字面量表示的字符串

```js
const reg = new RegExp("ab", "gi")
reg.toString() // "/ab/gi"
reg.toLocaleString() // "/ab/gi"
```

valueOf 返回正则表达式本事

## 实例方法

##### 1. **exec()**

- 参数，应用模式的字符串
- 如果找到匹配项，返回第一个匹配信息的数组。如果没找到，返回 null
  - 数组包含两个额外属性：index 和 input
  - index：字符串中匹配模式的其实位置
  - input：查找的字符串

```js
let text = "cat,bat,sat,fat"
let reg = /.at/g
let matches = reg.exec(text)

console.log(matches.index) // 0
console.log(matches[0])    // cat
console.log(reg.lastIndex) // 3

matches = reg.exec(text)
console.log(matches.index) // 4
console.log(matches[0])    // bat
console.log(reg.lastIndex) // 7
```

##### 2. **test()**

- 参数，应用模式的字符串
- 如果输入的文本于模式匹配，则返回 true，否则返回 false

## 分组

1. 捕获型：用`()`包围的正则表达式分支
2. 非捕获型：用`(?:)`包围的正则表达式分支

```js
const reg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)$/g
const url = "http://www.kingmusi.cn"

const match = reg.exec(url)
console.log(match) // ['http://www.kingmusi.cn', 'http', '//', 'www.kingmusi.cn']
```

## 构造函数属性

这些属性可以提取出与 **exec()** 和 **test()** 执行的操作相关信息

| 全名         | 简写 | 说明                                      |
| ------------ | ---- | ----------------------------------------- |
| input        | $_   | 最后搜索的字符串                          |
| lastMatch    | $&   | 最后匹配的文本                            |
| lastParen    | $+   | 最后匹配的捕获者                          |
| leftContext  | $`   | input 字符串中出现在 lastMatch 前面的文本 |
| rightContext | $‘   | input 字符串中出现在 lastMatch 后面的文本 |

```js
const text = 'this has been a short summer'
const reg = /(.)hort/g

if (reg.test(text)) {
    console.log( RegExp.input )         // this has been a short summer
    console.log( RegExp.leftContext )   // this has been a 
    console.log( RegExp.rightContext )  //  summer
    console.log( RegExp.lastMatch )     // short
    console.log( RegExp.lastParen )     // s

    console.log(RegExp["$_"])           // this has been a short summer
}
```

