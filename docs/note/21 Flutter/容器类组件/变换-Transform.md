# 变换-Transform

`Transform`的变换是应用在绘制阶段，而并不是应用在布局(layout)阶段，所以无论对子组件应用何种变化，其占用空间的大小和在屏幕上的位置都是固定不变的，因为这些是在布局阶段就确定的

## 平移

使用 `Transform.translate` 对子组件进行平移

平移的原点是左上角（可通过 **alignment** 属性改变），通过 **offset** 指定平移的距离

```dart
Container(
  color: Colors.lightBlue,
  child: Transform.translate(
    offset: Offset(10, 10),
    child: Text('hello world'),
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111114200.png)

## 旋转

使用 `Transform.translate` 对子组件进行旋转

旋转的原点是中心点（可通过 **alignment** 属性改变），通过 **angle** 指定旋转的角度

```dart
import 'dart:math' as math;

Container(
  color: Colors.lightBlue,
  child: Transform.rotate(
    angle: math.pi / 2,
    child: Text('hello world'),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111114633.png)

使用 `RotatedBox` 也可以对旋转自组件，但它的绘制是在layout阶段，所以会影响其他组件的位置和大小

```dart
Container(
  color: Colors.lightBlue,
  child: RotatedBox(
    quarterTurns: 1, // 旋转90度(1/4圈)
    child: Text('hello world', style: TextStyle(fontSize: 30)),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111115011.png)

## 缩放

使用 `Transform.scale` 对子组件进行缩小或放大

缩放的原点是中心点（可通过 **alignment** 属性改变），通过 **scale** 指定缩放因子

```dart
Container(
  color: Colors.lightBlue,
  child: Transform.scale(
    scale: 1.5,
    child: Text('hello world', style: TextStyle(fontSize: 30)),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111115307.png)

## 倾斜

```dart
Container(
  color: Colors.lightBlue,
  child: Transform(
    alignment: Alignment.topRight, // 相对于坐标系原点的对齐方式
    transform: Matrix4.skewY(0.3), // 沿Y轴倾斜0.3弧度
    child: Text('hello world', style: TextStyle(fontSize: 30)),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111144023.png)

> `Matrix4`是一个4D矩阵，还可以完成各种变换操作

