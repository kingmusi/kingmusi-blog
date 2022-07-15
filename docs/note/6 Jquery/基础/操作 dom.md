# 操作dom

## 操作自身

#### css()

- 获取 / 改变 **dom**  的 **css**

> **例子**
>
> 1. 获取 css
>
> ```js
> $().css('width')
> ```
>
> 2. 改变一个css样式
>
> ```js
> $().css('width', '100px')
> ```
>
> 3. 改变多个css样式
>
> ```js
> $().css({ 'width': '100px', ... })
> ```
>
> 需要`驼峰式写法`，如 `margin-left => marginLeft`
>
> **100px** 可以只写 **100**



#### html()

- 获取 / 改变 **dom** 的 **html** 代码

> **例子**
>
> 1. 获取html
>
> ```js
> $().html()
> ```
>
> 2. 改变html
>
> ```js
> $().html(`<div>hello world</div>`)
> ```



#### text()

- 获取 / 改变 **dom** 的 **text**

> **例子**
>
> 1. 获取html
>
> ```js
> $().text()
> ```
>
> 2. 改变html
>
> ```js
> $().text(`hello world`)
> ```



#### prop()

- 获取 / 改变 **dom** 的特有属性

> **例子**
>
> 1. 获取html
>
> ```js
> $().props('className')
> ```
>
> 2. 改变html
>
> ```js
> $().text(`className`, 'demo')
> ```



#### attr()

- 获取 / 改变 **dom** 的自定义属性

> **例子**
>
> 1. 获取html
>
> ```js
> $().props('data-name')
> ```
>
> 2. 改变html
>
> ```js
> $().text(`data-name`, 'kingmusi')
> ```



#### addClass()

- 为 **dom** 添加 **className**

> **例子**
>
> 1. 直接添加
>
> ```js
> $().addClass('demo')
> ```
>
> 2. 筛选性添加
>
> ```js
> $().addClass(index => {
> 	if (index === 0) {
>         return 'demo'
>     }
> })
> ```



#### removeClass()

- 移除 **dom** 的 **className`

> **例子**
>
> 1. 移除全部 className
>
> ```js
> $().removeClass()
> ```
>
> 2. 移除一个 className
>
> ```js
> $().removeClass('demo')
> ```
>
> 3. 筛选性移除
>
> ```js
> $().removeClass(index => {
> 	if (index === 0) {
>         return 'demo'
>     }
> })
> ```



#### toggleClass()

- 如果选中的 **dom** 有这个 **className**，则移除
- 如果选中的 **dom** 没有这个 **className**，则添加



#### scrollTop() / scrollLeft()

- 获取滚动条的高度或宽度

> **例子**
>
> ```js
> $(window).scrollTop()
> ```



#### width()

- 获取 **dom** 的 **content** 的宽度



#### innerWidth()

- 获取 **dom** 的 **content + padding** 的宽度



#### outerWidth()

- 获取 **dom** 的 **content + padding + border (+ margin)** 的宽度
- 无参时，获取 **content + padding + border** 的宽度
- 参数为 **true** 时，获取 **content + padding + border + margin** 的宽度



#### offset()

- 返回一个对象，对象中包括 **dom** 距离文档的距离

- ```js
  // return
  { 
      top: number;
      left: number;
  }
  ```



#### position()

- 返回一个对象，对象中包括 **dom** 距离最近一个定位的距离

- ```js
  // return
  { 
      top: number;
      left: number;
  }
  ```



#### val()

- 获取`输入框`中的值



#### serialize()

- 把 **from** 表单里面的内容拼接成 **name=value&name=value** 的形式

> **例子**
>
> ```js
> <form action="">
>  <input type="text" name="username" />
>  <input type="text" name="age" />
>  <input type="submit" />
> </form>
> ```
>
> ```js
> $('form').serialize() // username=kingmusi&age=18
> ```



#### serializeArray()

- 把 **from** 表单里面的内容变成数组的形式

> **例子**
>
> ```js
> <form action="">
>  <input type="text" name="username" />
>  <input type="text" name="age" />
>  <input type="submit" />
> </form>
> ```
>
> ```js
> $('form').serializeArray()
> 
> // return prop[]
> interface prop {
>  name: string;
>  value: string;
> }
> ```

## 移动 dom

#### A.before(B)

- 把 **B** 剪切到 **A** 的前面

> **例子**
>
> ```html
> <div>A</div>
> <div>B</div>
> ```
>
> ```js
> $('div:eq(0)').before( $('div:eq(1)') )
> ```
>
> 移动完后
>
> ```html
> <div>B</div>
> <div>A</div>
> ```



#### A.insertBefore(B)

- 把 **A** 剪切到 **B** 的前面

> **例子**
>
> ```html
> <div>B</div>
> <div>A</div>
> ```
>
> ```js
> $('div:eq(1)').insertBefore( $('div:eq(0)') )
> ```
>
> 移动完后
>
> ```html
> <div>A</div>
> <div>B</div>
> ```



#### after() 和 insertAfter() 与上面同理



#### father.append(child)

- 向父元素中插入子元素

> **例子**
>
> ```html
> <div>father</div>
> <div>child</div>
> ```
>
> ```js
> $('div.eq(0)').append( $('div:eq(1)') )
> ```
>
> 移动完后
>
> ```html
> <div>
>  father
>  <div>child</div>
> </div>
> ```



#### child.appendTo(father)

- 把子元素插入到父元素中

> **例子**
>
> ```html
> <div>father</div>
> <div>child</div>
> ```
>
> ```js
> $('div.eq(1)').appendTo( $('div:eq(0)') )
> ```
>
> 移动完后
>
> ```html
> <div>
>  father
>  <div>child</div>
> </div>
> ```



#### remove()

- 删除 **dom**，并返回被删除的 **dom**，但不包含生前的任何事件

> **例子**
>
> ```js
> $().remove()
> ```



#### detach()

- 删除 **dom**，并返回被删除的 **dom**，其包含生前的任何事件

> **例子**
>
> ```js
> $().detach()
> ```

