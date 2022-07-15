# setState 原理

## 流程

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2020.12.18.png)

## 同步和异步

1. 事务机制

   - 前置（**initialize**）动作 ——> 执行函数 ——> 收尾（**close**）工作
   - 前置工作中设置了 `isBatchingUpdates = true`
   - 收尾工作中设置了`isBatchingUpdates = false`

2. 因为 **setState** 是在函数中执行的，所以应该进行以下流程

   ```js
   initialize —— isBatchingUpdates = true
   fn()
       setState
       console.log(this.state)
   close —— isBatchingUpdates = false
   ```

   可以看到在 **console.log(this.state)** 时，**isBatchingUpdates** 为 **true**，所以还没有更新 **pending** 队列中的 **newState**，导致了“异步”的现象

   ```js
   initialize —— isBatchingUpdates = true
   fn()
       setState
       setTimeout(function() {
           console.log(this.state)
       }, 0)
   close —— isBatchingUpdates = false
   ```

   因为 **setTimeout** 会在宏队列中执行，而那时候同步代码已经执行完了，即已经进行了收尾工作，**isBatchingUpdates** 为 **false** 了，再执行 **setTimeout** 里的 **console.log(this.state)**，就会导致了“同步”的现象