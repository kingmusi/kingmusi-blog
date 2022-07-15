# MVVM

 #### 传统组件

1. 静态渲染
2. 更新依赖于操作**DOM**

#### 数据驱动视图

1. M（Model）
2. V（View）
3. VM（ViewModel）

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/746387-20170223155932085-1172851114.png)

- 数据( **Model** )和视图( **View** )是不能直接通讯的，而是需要通过 **ViewModel** 来实现双方的通讯。
- 当数据变化的时候，**viewModel** 能够监听到这种变化，并及时的通知 **view** 做出修改。
- 当页面有事件触发时，**viewModel** 也能够监听到事件，并通知 **model** 进行响应。
- **Viewmodel** 就相当于一个观察者，监控着双方的动作，并及时通知对方进行相应的操作