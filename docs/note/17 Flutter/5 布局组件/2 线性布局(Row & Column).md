# 线性布局(Row & Column)

## 主轴和纵轴

对齐方式的枚举类`MainAxisAlignment`和`CrossAxisAlignment`，分别代表主轴对齐和纵轴对齐

`Row` 主轴为水平方向，纵轴为垂直方向

`Column` 主轴为垂直方向，纵轴为水平方向

## Row

沿水平方向排列其子 **widget**

```dart
Row({
  ...  
  TextDirection textDirection,    
  MainAxisSize mainAxisSize = MainAxisSize.max,    
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  VerticalDirection verticalDirection = VerticalDirection.down,  
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  List<Widget> children = const <Widget>[],
})
```

- `textDirection`：表示水平方向子组件的布局顺序(是从左往右还是从右往左)，默认为系统当前Locale环境的文本方向(如中文、英语都是从左往右，而阿拉伯语是从右往左)
- `mainAxisSize`：表示`Row`在主轴(水平)方向占用的空间
  - `MainAxisSize.max`（默认），表示尽可能多的占用水平方向的空间，此时无论子 widgets 实际占用多少水平空间，`Row`的宽度始终等于水平方向的最大宽度
  - `MainAxisSize.min`表示尽可能少的占用水平空间，当子组件没有占满水平剩余空间，则`Row`的实际宽度等于所有子组件占用的的水平空间
- `mainAxisAlignment`：表示子组件在`Row`所占用的水平空间内对齐方式，如果`mainAxisSize`值为`MainAxisSize.min`，则此属性无意义，因为子组件的宽度等于`Row`的宽度。只有当`mainAxisSize`的值为`MainAxisSize.max`时，此属性才有意义
  - `MainAxisAlignment.start`表示沿`textDirection`的初始方向对齐
  - `MainAxisAlignment.end`表示沿`textDirection`的反方向对齐
  - `MainAxisAlignment.center`表示居中对齐
- `verticalDirection`：表示`Row`纵轴（垂直）的对齐方向，默认是`VerticalDirection.down`，表示从上到下。
- `crossAxisAlignment`：表示子组件在纵轴方向的对齐方式
- `children` ：子组件数组。

#### 例子

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: <Widget>[
    Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text("hello"),
        Text("world"),
      ],
    ),
    Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text("hello"),
        Text("world"),
      ],
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.end,
      textDirection: TextDirection.rtl,
      children: <Widget>[
        Text("hello"),
        Text("world"),
      ],
    ),
    Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        Text("hello", style: TextStyle(fontSize: 30.0),),
        Text("world"),
      ],
    ),
  ],
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110151109.png)

## Column

沿垂直方向排列其子 **widget**

参数和`Row`一样，不同的是布局方向为垂直，主轴纵轴正好相反

## 约束

`Row`和`Column`都只会在主轴方向占用尽可能大的空间，而纵轴的长度则取决于他们最大子元素的长度

```dart
Container(
  color: Colors.green,
  child: Column(
    children: [
      Container(
        color: Colors.red,
        child: Text('kingmusi'),
      )
    ],
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110153830.png)

如果想将`Column`的宽度指定为屏幕宽度，可以通过`ConstrainedBox`或`SizedBox`来强制更改宽度限制

```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: double.infinity), 
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: <Widget>[
      Text("kingmusi"),
    ],
  ),
);
```

> `Row`和`Column` 对其子级是宽松约束，即不超过自身的约束下，大小按照子级自己定
