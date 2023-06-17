# 绝对定位（Align）

## Align

```dart
Align({
  Key key,
  this.alignment = Alignment.center,
  this.widthFactor,
  this.heightFactor,
  Widget child,
})
```

- `alignment` : 需要一个`AlignmentGeometry`类型的值，表示子组件在父组件中的起始位置。`AlignmentGeometry` 是一个抽象类，它有两个常用的子类：`Alignment`和 `FractionalOffset`
- `widthFactor`和`heightFactor`是用于确定`Align` 组件本身宽高的属性；它们是两个缩放因子，会分别乘以子元素的宽、高，最终的结果就是`Align` 组件的宽高。如果值为`null`，则组件的宽高将会占用尽可能多的空间

## 示例

```dart
Container(
  width: 120,
  height: 120,
  color: Colors.lightGreen,
  child: Align(
    alignment: Alignment.topRight,
    child: FlutterLogo(size: 60),
  ),
)
```

用缩放因子也可以达到同样的效果

```dart
Container(
  color: Colors.lightGreen,
  child: Align(
    widthFactor: 2,
    heightFactor: 2,
    alignment: Alignment.topRight,
    child: FlutterLogo(size: 60),
  ),
)
```

因为`FlutterLogo`的宽高为 60，则`Align`的最终宽高都为`2*60=120`

## Alignment

表示矩形内的一个点，他有两个属性`x`、`y`，分别表示在水平和垂直方向的偏移

```dart
Alignment(this.x, this.y)
```

当 `Align` 使用 `Alignment` 时，会以**矩形的中心点作为坐标原点**

`x`、`y`的值从-1到1分别代表矩形左边到右边的距离和顶部到底边的距离

`Alignment`可以通过其**坐标转换公式**将其坐标转为子元素的具体偏移坐标

```dart
(Alignment.x * childWidth/2 + childWidth/2, Alignment.y * childHeight/2 + childHeight/2)
```

#### 例子

```dart
 Align(
  widthFactor: 2,
  heightFactor: 2,
  alignment: Alignment(2, 0),
  child: FlutterLogo(
    size: 60,
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110205615.png)

## FractionalOffset

`FractionalOffset` 的坐标原点为矩形的左侧顶点

`FractionalOffset`的坐标转换公式

```dart
(FractionalOffse.x * childWidth, FractionalOffse.y * childHeight)
```

#### 例子

```dart
Align(
  widthFactor: 2,
  heightFactor: 2,
  alignment: FractionalOffset(2,0.0),
  child: FlutterLogo(
    size: 60,
  ),
)
```

## Center

`Center` 继承自 `Align`，它比 `Align` 只少了一个 `alignment` 参数，因为`Align` 的构造函数中 `alignment` 值为 `Alignment.center`

## Align和Stack区别

1. 定位参考系统不同；`Stack`/`Positioned`定位的的参考系可以是父容器矩形的四个顶点；而`Align`则需要先通过`alignment` 参数来确定坐标原点，不同的`alignment`会对应不同原点，最终的偏移是需要通过`alignment`的转换公式来计算出
2. `Stack`可以有多个子元素，并且子元素可以堆叠，而`Align`只能有一个子元素，不存在堆叠
