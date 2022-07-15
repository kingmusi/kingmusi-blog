# JSX本质

## React.createElement

**编译jsx**

- 假设有 **jsx**

  ```jsx
  <div id="div1" class="container">
      <img src={this.state.url} />
      <p>a</p>
  </div>
  ```

- 则编译即

  ```js
  var App = React.createElement(
      'div', 
      {
          id: "div1",
          className: "container"
      },
      React.createElement("img", { src: this.state.url }),
      React.createElement("a", null)
  )
  ```

**编译组件**

- 假设有 **jsx**

  ```jsx
  <div>
  	<List data={this.state.list}></List>
  </div>
  ```

- 则编译即

  ```js
  // 注意 tag 不一定是字符串，也可能是变量
  var App = React.createElement('div', null, React.createElement(
  	List, {data: this.state.list}
  ))
  ```

> - 第一个参数：字符串 或 变量
> - 第二个参数：对象{} 或 null
> - 第三个（多个）参数：[] 或 多个参数
> - React.createElement('div', null, [child1, child2]);
>   React.createElement('div', {...}, [child1, child2]);
>   React.createElement('div', null, child1, child2);
>   React.createElement(变量, null, child1, child2);
> - 返回 vnode