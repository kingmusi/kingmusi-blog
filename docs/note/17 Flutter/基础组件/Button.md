# Button

Material 库中的按钮都有如下相同点

1. 按下时都会有“水波动画”（就是点击时按钮上会出现水波扩散的动画）
2. 有一个`onPressed`属性来设置点击回调

## ElevatedButton

带有阴影和灰色背景。按下后，阴影会变大

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105184345.png)

```dart
ElevatedButton(
  child: Text("normal"),
  onPressed: () {},
);
```

## TextButton

背景透明并不带阴影。按下后，会有背景色

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105184506.png)

```dart
TextButton(
  child: Text("normal"),
  onPressed: () {},
)
```

## OutlineButton

有一个边框，不带阴影且背景透明。按下后，边框颜色会变亮、同时出现背景和阴影(较弱)

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105185421.png)

```dart
OutlineButton(
  child: Text("normal"),
  onPressed: () {},
)
```

## IconButton

可点击的Icon，不包括文字，默认没有背景，点击后会出现背景（圆形）

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105185740.png)

```dart
IconButton(
  icon: Icon(Icons.thumb_up),
  onPressed: () {},
)
```

## 带图标的按钮

`ElevatedButton`、`TextButton`、`OutlineButton`都有一个`icon` 构造函数，通过它可以轻松创建带图标的按钮

```dart
ElevatedButton.icon(
  icon: Icon(Icons.send),
  label: Text("发送"),
  onPressed: () {},
)
```

