# redux-thunk

> 对于复杂的action，如 ajax 异步请求后修改 store，可以用 redux-thunk 来发送函数，以达到简化 action 的效果

1. 引入包

   ```shell
   npm i redux-thunk redux --save
   ```

2. 在 store 中引入中间件

   ```js
   import { createStore, applyMiddleware } from 'redux';
   import thunk from 'redux-thunk';
   import reducer from './reducer';
   
   const store = createStore(rootReducer, applyMiddleware(thunk));
   ```

3. 这时候==action就可以是一个函数==了，不用重新在外面定义一个拿到数据后在 `dispatch`，更有==整体性==

   - 这时候 dispatch 的参数为函数，会自动执行这个函数 

   ```js
   componentDidMount(){
   	// 参数 dispatch 是向 store 发送 action
       const action = (dispatch) => {
           // 假设这里ajax异步请求到了数据 list
           const action = {
               type: 'change_list',
               list
           }
           dispatch(action)
       }
       store.dispatch(action) //如果传入函数，会自动执行这个函数
   }
   ```

   

