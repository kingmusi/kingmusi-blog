# 装饰-DecoratedBox

## DecoratedBox

可以在其子组件绘制前(或后)绘制一些装饰

```dart
const DecoratedBox({
  Decoration decoration,
  DecorationPosition position = DecorationPosition.background,
  Widget? child
})
```

- `decoration`：代表将要绘制的装饰
- `position`：此属性决定在哪里绘制`Decoration`
  - `background`：在子组件之后绘制，即背景装饰
  - `foreground`：在子组件之上绘制，即前景

## BoxDecoration

它是一个Decoration的子类，实现了常用的装饰元素的绘制

```dart
BoxDecoration({
  Color color, //颜色
  DecorationImage image,//图片
  BoxBorder border, //边框
  BorderRadiusGeometry borderRadius, //圆角
  List<BoxShadow> boxShadow, //阴影,可以指定多个
  Gradient gradient, //渐变
  BlendMode backgroundBlendMode, //背景混合模式
  BoxShape shape = BoxShape.rectangle, //形状
})
```

#### 例子

带阴影的背景色渐变的按钮样式

```dart
DecoratedBox(
   decoration: BoxDecoration(
     gradient: LinearGradient(colors:[Colors.red,Colors.orange.shade700]), //背景渐变
     borderRadius: BorderRadius.circular(3.0), //3像素圆角
     boxShadow: [ //阴影
       BoxShadow(
         color:Colors.black54,
         offset: Offset(2.0,2.0),
         blurRadius: 4.0
       )
     ]
   ),
  child: Padding(
    padding: EdgeInsets.symmetric(horizontal: 80.0, vertical: 18.0),
    child: Text("click", style: TextStyle(color: Colors.white),),
  )
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220111112930.png)

