# 流式布局(Wrap & Flow)



## 弹性布局的局限

如果子 widget 超出屏幕范围，不会自动折行，会报溢出错误

## Wrap

```dart
Wrap({
  ...
  this.direction = Axis.horizontal,
  this.alignment = WrapAlignment.start,
  this.spacing = 0.0,
  this.runAlignment = WrapAlignment.start,
  this.runSpacing = 0.0,
  this.crossAxisAlignment = WrapCrossAlignment.start,
  this.textDirection,
  this.verticalDirection = VerticalDirection.down,
  List<Widget> children = const <Widget>[],
})
```

- `direction`：主轴方向，默认是水平方向
- `alignment`：表示子组件主轴方向上的对齐方式
- `spacing`：主轴方向子 widget 之间的间距
- `runSpacing`：纵轴方向子 widget 之间的间距
- `runAlignment`：表示子组件纵轴方向上的对齐方式
- `crossAxisAlignment`：表示子组件纵轴方向上的对齐方式
- `textDirection`：表示主轴方向子组件的布局顺序
- `verticalDirection`：表示纵轴方向子组件的布局顺序

```dart
 Wrap(
   spacing: 8.0, // 主轴(水平)方向间距
   runSpacing: 4.0, // 纵轴（垂直）方向间距
   alignment: WrapAlignment.center, //沿主轴方向居中
   children: <Widget>[
     Chip(
       avatar: CircleAvatar(backgroundColor: Colors.blue, child: Text('A')),
       label: Text('Hamilton'),
     ),
     Chip(
       avatar: CircleAvatar(backgroundColor: Colors.blue, child: Text('M')),
       label: Text('Lafayette'),
     ),
     Chip(
       avatar: CircleAvatar(backgroundColor: Colors.blue, child: Text('H')),
       label: Text('Mulligan'),
     ),
     Chip(
       avatar: CircleAvatar(backgroundColor: Colors.blue, child: Text('J')),
       label: Text('Laurens'),
     ),
   ],
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110184345.png)

## Flow

优点：性能好、灵活

缺点：使用复杂、不能自适应子组件大小（必须通过指定父容器大小或实现`TestFlowDelegate`的`getSize`返回固定大小）

#### 示例

```dart
Flow(
  delegate: TestFlowDelegate(margin: EdgeInsets.all(10.0)),
  children: <Widget>[
    Container(width: 80.0, height:80.0, color: Colors.red,),
    Container(width: 80.0, height:80.0, color: Colors.green,),
    Container(width: 80.0, height:80.0, color: Colors.blue,),
    Container(width: 80.0, height:80.0,  color: Colors.yellow,),
    Container(width: 80.0, height:80.0, color: Colors.brown,),
    Container(width: 80.0, height:80.0,  color: Colors.purple,),
  ],
)
```

```dart
class TestFlowDelegate extends FlowDelegate {
  EdgeInsets margin;

  TestFlowDelegate({this.margin = EdgeInsets.zero});

  double width = 0;
  double height = 0;

  @override
  void paintChildren(FlowPaintingContext context) {
    var x = margin.left;
    var y = margin.top;
    //计算每一个子widget的位置
    for (int i = 0; i < context.childCount; i++) {
      var w = context.getChildSize(i)!.width + x + margin.right;
      if (w < context.size.width) {
        context.paintChild(i, transform: Matrix4.translationValues(x, y, 0.0));
        x = w + margin.left;
      } else {
        x = margin.left;
        y += context.getChildSize(i)!.height + margin.top + margin.bottom;
        //绘制子widget(有优化)
        context.paintChild(i, transform: Matrix4.translationValues(x, y, 0.0));
        x += context.getChildSize(i)!.width + margin.left + margin.right;
      }
    }
  }

  @override
  Size getSize(BoxConstraints constraints) {
    // 指定Flow的大小，简单起见我们让宽度竟可能大，但高度指定为200，
    // 实际开发中我们需要根据子元素所占用的具体宽高来设置Flow大小
    return Size(double.infinity, 200.0);
  }

  @override
  bool shouldRepaint(FlowDelegate oldDelegate) {
    return oldDelegate != this;
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110184638.png)

