# SCU

## shouldComponentUpdate

- 默认返回 `true`，即默认重新渲染`所有子组件`

```jsx
// 例如有个渲染背景的组件
// 每次父组件更新，渲染背景的组件也会无条件更新，但其实这个渲染背景的组件没有任何改变，不需要重新渲染，那怎么阻止？
class Background extends Component {
	constructor() {
        this.state = {
            url: 'http://xxxx.com/image1'
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if (nextState.url !== this.state.url) return true // 可以渲染
        return false // 不重复渲染
    }

    render() {
        return <img src={this.state.url} />
    }
}
```

> 既然 **SCU** 可以优化性能，为什么 **react** 不自己做了，而给开发者提供一个 **SCU** 钩子函数？
>
> 1. 当项目比较小的时候，开发者是可以选择不用 **SCU** 优化的，所以 **react** 给我们选择的权利
> 2. 当开发者不遵守不可变值时（如使用 **push** 等），就会提前改变 **state**或 **props**，那么 **SCU**的两个参数会和已经改变好的 **state** 和 **props** 一样，再去比较的时候就没意义了

## PureComponent 和 React.memo

- `PureComponent`，自动在 **SCU** 中实现浅比较（只比较第一层），浅比较已适用大部分情况（设计的时候 **state** 层级不要太深），优化性能，要和不可变值一起使用

  - ```jsx
    import React, { PureComponent } from 'react'
    // 把 Component 换成 PureComponent，其他用法一样
    class Demo extends PureCompoennt {}
    ```

- `memo`，函数组件中的 `PureComponent`

  - ```jsx
    import React, { memo } from 'react'
    function Demo (props) {}
    export default memo(Demo)
    
    // areEqual 和 SCU 差不多，如果想自定义优化方案的话，可传入第二个参数
    // function areEqual(prevProps, nextProps) {}
    // export default memo(Demo, areEqual)
    ```

