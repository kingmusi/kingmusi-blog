# Global 单例内置对象

## 概念

在全局定义的变量和函数都会变成 **Global** 对象的属性

**Global** 不能通过代码显示调用，但可以使用 **window** 对象作为代理

> 可以在其他章节找到的 Global 方法和属性
>
> 1. **isNaN()**、**isFinite()**：`3-4-5 Number 类型`
> 2. **parseInt()**、**parseFloat()**：`3-4-6 String 类型`

## URL 编码方法

用于编码统一资源标识符（URI），以便传给浏览器

- **encodeURI()** 方法不会编码属于 **URI** 组件的特殊字符，如冒号、斜杠、问号、井号
- **encodeURIComponent()** 方法会编码所有除英文外的字符

```js
const uri = 'http://www.kingmusi.github.io/blog#aa a'

console.log( encodeURI(uri) )          // http://www.kingmusi.github.io/blog#aa%20a
console.log( encodeURIComponent(uri) ) // http%3A%2F%2Fwww.kingmusi.github.io%2Fblog%23aa%20a
```

> 对于编码整个 **URI** 的情况，一般使用 **encodeURI**
>
> 对于追加到已有 **URI** 后面的字符串编码情况，一般使用 **encodeURIComponent**

相应解码：**decodeURI()** 和 **decodeURIcomponent()**

## eval() 方法

十分强大，但影响性能，且会产生被 **xss** 攻击的漏洞

**eval** 内的变量只能在 **eval** 自身的作用域使用，外面访问不到

```js
eval('const a = "a"')
console.log(a) // 报错
```



