# 不可变数据 setState

> **不可变数据**
>
> `this.state` 不能直接改变，必须通过 `this.setState({ })`来改变

****

## 数组的操作

1、**copy**一个出来操作

```js
const newArr1 = this.state.arr.slice()
const newArr2 = [ ...this.state.arr ]
```

2、追加

```js
this.setState({
    arr: this.state.arr.concat('a'),
    // arr: [ ...this.state.arr, 'a' ]
})
```

3、截取

```js
this.setState({
    arr: this.state.arr.slice(0, 3)
})
```

> 不能直接用 push、pop、splice 等，因为会直接改变原数组

## 对象的操作

1、追加或改变

```js
this.setState({
    obj: { ...this.state.obj, a: 100 }
    // obj: Object.assign({}, this.state.obj, {a: 100})
})
```

> 不能直接对某个 key 改变

## 同步更新和异步更新

1、异步更新

- 用 setState 的第二个参数可使用异步更新后的值

```js
this.setState({
    count: this.state.count + 1
}, () => {
    console.log(this.state.count) // 能拿到正确的结果
})
```

2、同步更新

- setTimeout

  ```js
  // 记得要在 componentWillUnmount 中销毁（这里就没写了）
  setTimeout(() => {
      this.setState({
          count: this.state.count + 1
      })
      console.log(this.state.count) // 能拿到正确的结果
  }, 0)
  ```

- 自定义事件中

  ```js
  // 记得要在 componentWillUnmount 中销毁（这里就没写了）
  componentDidMount() {
      document.body.addEventListener('click', () => {
          this.setState({
              count: this.state.count + 1
          })
          console.log(this.state.count) // 能拿到正确的结果
      })
  }
  ```

## 多次改变会合并

1. 传入对象，会被合并

```js
// 执行结果只 +1
add = () => {
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 1
    })
}
```

2. 传入函数，不会被合并

```js
// 执行结果只 +3
add = () => {
    this.setState((preState, props) => ({
       count: preState.count + 1 
    }))
    this.setState((preState, props) => ({
       count: preState.count + 1 
    }))
    this.setState((preState, props) => ({
       count: preState.count + 1 
    }))
}
```

## immutable

1. 引入包

   ```shell
   npm install immutable --save
   ```

2. **Immutable Data** 就是一旦创建，就 `不能再被更改的数据`。对 **Immutable** 对象的任何修改或添加删除操作都会 `返回一个新的 Immutable 对象`，且这个新对象是`深拷贝`得到的

3. 把一个数据变成 **immutable** 数据

   ```js
   import { fromJS } from 'immutable'
   
   // 注：数据应该是一个对象
   const 数据名 = fromJS( 数据 )
   ```

4. 获取

   ```js
   // 注意键名是字符串
   
   // 取单层的值
   immutable数据名.get( 键名 )
   
   // 取多层的值
   1、 immutable数据名.get( 第一层键名 ).get( 第二层键名 )
   2、 [immutable数据名].getIn([ 第一层键名， 第二层键名 ])
   ```

5. 设置，设置完后会返回一个新的 **immutable** 数据

   ```js
   // 注意键名是字符串
   // 如果新的数据是数组或对象，但不是immutable类型，记得先把他变为 immutable 数据再设置
   
   // 设置一个
   immutable数据名.set( 键名, 键值 )
   
   // 设置多个
   immutable数据名.set( 键名, 键值 ).set( 键名, 键值 )
   immutable数据名.merge({
   	键名1: 键值1,
   	键名2: 键值2
   })
   
   // 以追加的方式设置
   immutable数据名.get( 键名 ).concat( 数据 )
   ```

6. 删除

   ````js
   // index 从0开始
   immutable数据名.delete(index)
   ````

   