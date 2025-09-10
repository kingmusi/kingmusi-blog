# Text

## Text

`Text` 用于显示简单样式文本，它包含一些控制文本显示样式的一些属性

#### 属性

- `textAlign`：文本的对齐方式
  - 注意，对齐的参考系是 **Text widget** 本身。如果 **Text** 文本内容宽度不足一行，**Text** 的宽度和文本内容长度相等，那么这时指定对齐方式是没有意义的，只有 **Text** 宽度大于文本内容长度时指定此属性才有意义 
- `maxLines`：文本显示的最大行数
- `overflow`：多余文本的截断方式
- `textScaleFactor`：文本相对于当前字体大小的缩放因子，相对于去设置文本的样式 **styl** 属性的 **fontSize**，它是调整字体大小的一个快捷方式

#### 例子

```dart
Text(
  'hello world, ' * 10,
  textAlign: TextAlign.center,
  maxLines: 1,
  overflow: TextOverflow.ellipsis,
  textScaleFactor: 2.0,
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105171849.png)

## TextStyle

`TextStyle`用于指定文本显示的样式如颜色、字体、粗细、背景等

#### 需注意的属性

- `height`：指定行高，具体的行高等于 `fontSize * height`
- `fontSize`：该属性和 Text 的 **textScaleFactor** 都用于控制字体大小。但是有两个主要区别
  - `fontSize`可以精确指定字体大小，而`textScaleFactor`只能通过缩放比例来控制
  - `textScaleFactor`主要是用于系统字体大小设置改变时对 Flutter 应用字体进行全局调整，而`fontSize`通常用于单个文本，字体大小不会跟随系统字体大小变化

#### 例子

```dart
Text("Hello world",
  style: TextStyle(
    color: Colors.blue,
    fontSize: 18.0,
    height: 1.2,  
    fontFamily: "Courier",
    background: Paint()..color=Colors.yellow,
    decoration:TextDecoration.underline,
    decorationStyle: TextDecorationStyle.dashed
  ),
);
```

![](data:image/png;base64,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)

## TextSpan

对一个 **Text** 内容的不同部分按照不同的样式显示

```dart
const TextSpan({
  TextStyle style, // 样式
  Sting text, // 文案
  List<TextSpan> children,
  GestureRecognizer recognizer, // 对该文本片段上用于手势进行识别处理
});
```

#### 例子

```dart
Text.rich(TextSpan(
  children: [
    TextSpan(text: 'Home: '),
    TextSpan(
      text: 'https://www.musiblog.com',
      style: TextStyle(color: Colors.blue)
    )
  ]
))
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105174821.png)

## DefaultTextStyle

在 Widget 树的某一个节点处设置一个默认的文本样式，那么该节点的子树中所有文本都会默认使用这个样式

```dart
DefaultTextStyle(
  // 设置默认文本样式
  style: TextStyle(
    color: Colors.blue,
    fontSize: 20
  ),
  child: Center(
    child: Column(
      children: [
        Text('哈哈哈哈哈哈哈'),
        Text(
          '嘻嘻嘻嘻嘻嘻嘻',
          style: TextStyle(
            inherit: false, // 不继承默认样式
            color: Colors.green
          ),
        ),
      ],
    ),
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105175447.png)

## 字体

#### 自己的字体

1. 在 `pubspec.yaml` 中指定位置

   ```yaml
   flutter:
     fonts:
       - family: Raleway
         fonts:
           - asset: assets/fonts/Raleway-Regular.ttf
           - asset: assets/fonts/Raleway-Medium.ttf
             weight: 500
           - asset: assets/fonts/Raleway-SemiBold.ttf
             weight: 600
       - family: AbrilFatface
         fonts:
           - asset: assets/fonts/abrilfatface/AbrilFatface-Regular.ttf
   ```

2. 使用

   ```dart
   // 声明文本样式
   const textStyle = const TextStyle(
     fontFamily: 'Raleway',
   );
   
   // 使用文本样式
   var buttonText = const Text(
     "Use the font for this text",
     style: textStyle,
   );
   ```

#### package 中的字体

```dart
const textStyle = const TextStyle(
  fontFamily: 'Raleway',
  package: 'my_package', //指定包名
);
```

