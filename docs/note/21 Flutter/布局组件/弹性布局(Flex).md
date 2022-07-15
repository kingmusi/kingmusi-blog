# 弹性布局(Flex)

弹性布局允许子组件按照一定比例来分配父容器空间

## Flex

`Flex`组件可以沿着水平或垂直方向排列子组件

如果你知道主轴方向，使用`Row`或`Column`会方便一些，因为`Row`和`Column`都继承自`Flex`，参数基本相同

```dart
Flex({
  ...
  required this.direction, //弹性布局的方向, Row默认为水平方向，Column默认为垂直方向
  List<Widget> children = const <Widget>[],
})
```

## Expanded

Expanded 只能作为 Flex 的孩子（否则会报错），它可以按比例“扩伸”`Flex`子组件所占用的空间

因为 `Row`和`Column` 继都承自Flex，所以 Expanded 也可以作为它们的孩子

```dart
const Expanded({
  int flex = 1, 
  required Widget child,
})
```

#### 例子

```dart
SizedBox(
  height: 30,
  child: Row(
    children: [
      Expanded(
        flex: 2,
        child: Container(color: Colors.green),
      ),
      Spacer(flex: 1),
      Expanded(
        flex: 1,
        child: Container(color: Colors.red),
      )
    ],
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110165521.png)

> `Spacer`的功能是占用指定比例的空间，实际上它只是`Expanded`的一个包装类
