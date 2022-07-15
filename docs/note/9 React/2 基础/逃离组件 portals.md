# 逃离组件 portals

- 功能：把组件渲染到某个 **dom** 下
- 使用场景
  1. 父组件 **z-index** 值太小，需要逃离父组件
  2. **fixed** 需要放在 **body** 第一层级

```jsx
import ReactDOM from 'react-dom' // 需要引入 react-dom 组件

render() {
    {/*
    	param1: 组件模板
    	param2：dom元素
    */}
    return ReactDOM.createProtal(
    	<div className="fixed">模拟 fixed 布局</div>,
        document.body
    )
}
```