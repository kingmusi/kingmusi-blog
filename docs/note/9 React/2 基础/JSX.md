# JSX

> **引言**
>
> JSX 既不是字符串也不是 HTML，而是一个 JavaScript 的语法扩展
>
> JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式

## 嵌入表达式

- 通过 ` {  } ` 动态的嵌入变量，或者 **JS** 表达式

```jsx
const name = 'kingmusi'
render() {
    return (
    	<div>
     		<h1>{name}</h1>
    		<h2>{`hello world! ${name}`}</h2>   
        </div>
    )
}
```

编译后

```html
<h1>kingmusi</h1>
<h2>hello world! kingmusi</h2>
```

## 样式

1、**class**

- 在 **JSX** 中，定义 **class** 要用 `className`

- 可放静态的 **class** 名

  ```jsx
  render() {
      return (
      	<h1 className="red">kinmgusi</h1>	
      )
  }
  ```

- 也可动态的输入 **js** 表达式

  ```jsx
  let isShow = true
  render() {
      return (
      	<h1 className={isShow ? 'show' : 'disappear'}>kinmgusi</h1>	
      )
  }
  ```

> **引入css文件**
>
> ```js
> import './xx.css'
> ```

2、**style**

- 静态：像平时一样即可

- 动态：`驼峰式写法`

  ```jsx
  let isShow = true
  const Style = {
      display: isShow ? 'block' : 'none',
      fontSize: 30
  }
  render() {
      return (
      	<h1 style={Style}>kinmgusi</h1>
      )
  }
  ```

## 自动防范注入攻击

1、**自动防范**

JSX 会把注入的字符串转化为`文本`，即插入的是 innerText，不是 innerHtml

```jsx
const dangerString = '<span>danger</span>'
render() {
    return (
    	<h1>{dangerString}</h1>
    )
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201218153736.png)

2、`dangerouslySetInnerHTML`

嵌入 html 代码，不再自动防范

```jsx
const dangerString = '<span>danger</span>'
render() {
    return (
    	<h1 dangerouslySetInnerHTML={{__html: dangerString}}></h1>
    )
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201218154115.png)

## 注释

```jsx
{ /* 注释 */ }
```

## 列表

使用 `map` 构建

```jsx
render(){
	return <ul> 
    	{ this.state.arr.map( (item, index) => <li key={item.id}> {item.title} </li> ) }
    </ul>
}
```

