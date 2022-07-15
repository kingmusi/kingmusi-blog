# 图片及ICON

## 图片

#### 加载本地图片

1. 工程目录中有图片，并且在 `pubspec.yaml` 加入图片路径

2. 加载图片

   ```dart
   Image(
     image: AssetImage("images/avatar.png"),
     width: 100.0
   );
   ```

   Image提供了一个快捷的构造函数`Image.asset`用于从asset中加载、显示图片

   ```dart
   Image.asset("images/avatar.png",
     width: 100.0,
   )
   ```

#### 加载网络图片

```dart
Image(
  image: NetworkImage(
      "https://avatars2.githubusercontent.com/u/20411648?s=460&v=4"),
  width: 100.0,
)
```

Image提供了一个快捷的构造函数`Image.network`用于从网络加载、显示图片：

```dart
Image.network(
  "https://avatars2.githubusercontent.com/u/20411648?s=460&v=4",
  width: 100.0,
)
```

#### 参数

Image 的主要参数

```dart
const Image({
  ...
  this.width, //图片的宽
  this.height, //图片高度
  this.color, //图片的混合色值
  this.colorBlendMode, //混合模式
  this.fit,//缩放模式
  this.alignment = Alignment.center, //对齐方式
  this.repeat = ImageRepeat.noRepeat, //重复方式
  ...
})
```

- `width`、`height`：用于设置图片的宽、高，当不指定宽高时，图片会根据当前父容器的限制，尽可能的显示其原始大小，如果只设置`width`、`height`的其中一个，那么另一个属性默认会按比例缩放，但可以通过 `fit`属性来指定适应规则
- `fit`：该属性用于在图片的显示空间和图片本身大小不同时指定图片的适应模式。适应模式是在`BoxFit`中定义，它是一个枚举类型，有如下值：
  - `fill`：会拉伸填充满显示空间，图片本身长宽比会发生变化，图片会变形
  - `cover`：会按图片的长宽比放大后居中填满显示空间，图片不会变形，超出显示空间部分会被剪裁
  - `contain`：这是图片的默认适应规则，图片会在保证图片本身长宽比不变的情况下缩放以适应当前显示空间，图片不会变形
  - `fitWidth`：图片的宽度会缩放到显示空间的宽度，高度会按比例缩放，然后居中显示，图片不会变形，超出显示空间部分会被剪裁
  - `fitHeight`：图片的高度会缩放到显示空间的高度，宽度会按比例缩放，然后居中显示，图片不会变形，超出显示空间部分会被剪裁
  - `none`：图片没有适应策略，会在显示空间内显示图片，如果图片比显示空间大，则显示空间只会显示图片中间部分

![](https://book.flutterchina.club/assets/img/3-18.3ae1737a.png)

- `color`和 `colorBlendMode`：在图片绘制时可以对每一个像素进行颜色混合处理，`color`指定混合色，而`colorBlendMode`指定混合模式

  ```dart
  Image(
    image: AssetImage("images/avatar.png"),
    width: 100.0,
    color: Colors.blue,
    colorBlendMode: BlendMode.difference,
  );
  ```

![](https://book.flutterchina.club/assets/img/3-19.feb336de.png)

## ICON

#### [Material Design字体图标](https://material.io/tools/icons/)

1. 在`pubspec.yaml`文件中的配置

   ```dart
   flutter:
     uses-material-design: true
   ```

2. 使用

   ```dart
   Icon(Icons.accessible, color: Colors.green)

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220105205535.png)

#### 使用字体库图标

1. 导入字体图标文件

   ```dart
   fonts:
     - family: myIcon  #指定一个字体名
       fonts:
         - asset: fonts/iconfont.ttf
   ```

2. 为了使用方便，我们定义一个`MyIcons`类，功能和`Icons`类一样

   ```dart
   class MyIcons{
     // book 图标
     static const IconData book = const IconData(
         0xe614, 
         fontFamily: 'myIcon', 
         matchTextDirection: true
     );
     // 微信图标
     static const IconData wechat = const IconData(
         0xec7d,  
         fontFamily: 'myIcon', 
         matchTextDirection: true
     );
   }

3. 使用

   ```dart
   Row(
     mainAxisAlignment: MainAxisAlignment.center,
     children: <Widget>[
       Icon(MyIcons.book,color: Colors.purple),
       Icon(MyIcons.wechat,color: Colors.green),
     ],
   )
   ```

![](data:image/png;base64,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)