# react-redux

1. 引入包

   ```shell
   npm install react-redux redux --save
   ```

2. `使用 Provider 包裹子组件，并传入store`，这样 **Provider** 的子组件都可以使用 **store**

   - App.js

   ```jsx
   import React from "react";
   import Home from './views/Home'
   import { Provider} from 'react-redux' // 引入连接组件
   import store from './store/index' // 引入store
   
   const App = () => (
       <div className="App">
           <Provider store={store}>
               <Home />
           </Provider>
       </div>
   )
   ```

3. 子组件使用 **react-redux**

   - 引入 `connet` 连接组件
   - 创建映射函数 `mapStoreToPorps` —— 把 **store** 的某些值映射到 `props` 上
   - 创建映射函数 `mapDispatchToProps` —— 把要使用 **dispatch** 的方法映射到 `props` 上
   - 导出使用了映射规则的组件

   ```jsx
   import React, { Component } from 'react'
   import { connect } from 'react-redux' // 引入connet连接组件
   
   class Test extends Component{
       render() {
           return (
           	{/*通过调用 props 的属性和方法使用 store*/}
               <input 
                   value={this.props.inputValue} 
                   onChange={this.props.inputValueChange}
               />
           )
       }
   }
   
   // 创建映射函数 mapStoreToPorps —— 把 store 的某些值映射到 props 上
   const mapStoreToPorps = (store) => ({
       inputValue: store.inputValue
   })
   
   // 创建映射函数 mapDispatchToProps —— 把要使用 dispatch 的方法映射到 props 上
   const mapDispatchToProps = (dispatch) => ({
       inputValueChange(e) {
           const action = {
               type: 'input_value_change',
               value: e.target.value
           }
           dispatch(action)
       }
   })
   
   // 导出使用了映射规则的组件
   export default connect(mapStoreToPorps, mapDispatchToProps)(Test)
   ```

   

   