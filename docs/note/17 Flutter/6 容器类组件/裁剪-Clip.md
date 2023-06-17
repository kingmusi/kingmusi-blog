# 裁剪-Clip

## API

| 剪裁Widget | 默认行为                                                 |
| ---------- | -------------------------------------------------------- |
| ClipOval   | 子组件为正方形时剪裁成内贴圆形；为矩形时，剪裁成内贴椭圆 |
| ClipRRect  | 将子组件剪裁为圆角矩形                                   |
| ClipRect   | 默认剪裁掉子组件布局空间之外的绘制内容（溢出部分剪裁）   |
| ClipPath   | 按照自定义的路径剪裁                                     |

## 例子

定义一个正方形组件函数

```dart
MyRect(Color color) => Container(
  constraints: BoxConstraints.expand(width: 80, height: 80),
  color: color,
);
```

使用常规的 API 进行裁剪

```dart
Column(
  children: [
    MyRect(Colors.blue),
    ClipOval(child: MyRect(Colors.red)),
    ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: MyRect(Colors.green),
    ),
    ClipRect(
      child: Transform.translate(
        offset: Offset(40, 0),
        child: MyRect(Colors.orange),
      )
    )
  ]
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111154217.png)

## 自定义裁剪

首先，自定义一个`CustomClipper`：

```dart
class MyClipper extends CustomClipper<Rect> {
  @override
  Rect getClip(Size size) => Rect.fromLTWH(20, 20, 40, 40);

  @override
  bool shouldReclip(CustomClipper<Rect> oldClipper) => false;
}
```

通过`ClipRect`来执行剪裁

```dart
DecoratedBox(
  decoration: BoxDecoration(color: Colors.black),
  child: ClipRect(
    clipper: MyClipper(),
    child: MyRect(Colors.grey),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111154536.png)

