# Container

`Container`是一个组合类容器，它本身不对应具体的`RenderObject`，它是`DecoratedBox`、`ConstrainedBox、Transform`、`Padding`、`Align`等组件组合的一个多功能容器

## 属性

```dart
Container({
  this.alignment, // 子组件在容器内的对齐方式
  this.padding, // 容器内补白，属于decoration的装饰范围
  Color color, // 背景色
  Decoration decoration, // 背景装饰
  Decoration foregroundDecoration, //前景装饰
  double width, // 容器的宽度
  double height, // 容器的高度
  BoxConstraints constraints, // 容器大小的限制条件
  this.margin, // 容器外补白，不属于decoration的装饰范围
  this.transform, // 变换
  this.child,
  ...
})
```

- 容器的大小可以通过`width`、`height`属性来指定，也可以通过`constraints`来指定；如果它们同时存在时，`width`、`height`优先
- `color`和`decoration`是互斥的，如果同时设置它们则会报错！实际上，当指定`color`时，`Container`内会自动创建一个`decoration`

- `padding` 和 `margin` 可以使用`EdgeInsets`提供的便捷方法进行填充
  - `fromLTRB(double left, double top, double right, double bottom)`：分别指定四个方向的填充
  - `all(double value)` : 所有方向均使用相同数值的填充
  - `only({left, top, right ,bottom })`：可以设置具体某个方向的填充(可以同时指定多个方向)
  - `symmetric({ vertical, horizontal })`：用于设置对称方向的填充

## 示例

```dart
Container(
  constraints: BoxConstraints.expand(width: 200, height: 150),
  decoration: BoxDecoration(
    gradient: RadialGradient(
      colors: [Colors.red, Colors.orange],
      center: Alignment.topLeft,
      radius: 0.98
    ),
    boxShadow: [
      BoxShadow(
        color: Colors.black,
        offset: Offset(2, 2),
        blurRadius: 4
      )
    ]
  ),
  transform: Matrix4.rotationZ(.2),
  alignment: Alignment.center,
  child: Text('hello', style: TextStyle(color: Colors.white, fontSize: 40)),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111150041.png)

## padding 和 margin

```dart
Container(
  margin: EdgeInsets.all(20.0), //容器外补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
Container(
  padding: EdgeInsets.all(20.0), //容器内补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111150417.png)

直观的感觉就是`margin`的留白是在容器外部，而`padding`的留白是在容器内部

事实上，`Container`内`margin`和`padding`都是通过`Padding` 组件来实现的，上面的示例代码实际上等价于

```dart
Padding(
  padding: EdgeInsets.all(20.0),
  child: DecoratedBox(
    decoration: BoxDecoration(color: Colors.orange),
    child: Text("Hello world!"),
  ),
),
DecoratedBox(
  decoration: BoxDecoration(color: Colors.orange),
  child: Padding(
    padding: const EdgeInsets.all(20.0),
    child: Text("Hello world!"),
  ),
),
```

