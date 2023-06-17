# 层叠布局(Stack & Positioned)

## Stack

```dart
Stack({
  this.alignment = AlignmentDirectional.topStart,
  this.textDirection,
  this.fit = StackFit.loose,
  this.overflow = Overflow.clip,
  List<Widget> children = const <Widget>[],
})
```

- `alignment`：此参数决定如何去对齐没有定位（没有使用`Positioned`）或部分定位的子组件
- `textDirection`：和`Row`、`Wrap`的`textDirection`功能一样，都用于确定`alignment`对齐的参考系
- `fit`：此参数用于确定**没有定位**的子组件如何去适应`Stack`的大小。`StackFit.loose`表示使用子组件的大小，`StackFit.expand`表示扩伸到`Stack`的大小
- `overflow`：此属性决定如何显示超出`Stack`显示空间的子组件；值为`Overflow.clip`时，超出部分会被剪裁（隐藏），值为`Overflow.visible` 时则不会

## Positioned

```dart
const Positioned({
  Key? key,
  this.left, 
  this.top,
  this.right,
  this.bottom,
  this.width,
  this.height,
  required Widget child,
})
```

- `left`、`top` 、`right`、 `bottom`分别代表离`Stack`左、上、右、底四边的距离
- `width`和`height`用于指定需要定位元素的宽度和高度

> 在水平方向时，你只能指定`left`、`right`、`width`三个属性中的两个，如指定`left`和`width`后，`right`会自动算出(`left`+`width`)，如果同时指定三个属性则会报错，垂直方向同理

## 例子1

```dart
ConstrainedBox(
  constraints: BoxConstraints.expand(),
  child: Stack(
    alignment: Alignment.center,
    children: [
      Text('1', style: TextStyle(fontSize: 40)),
      Positioned(
        left: 18,
        child: Text('2', style: TextStyle(fontSize: 40)),
      ),
      Positioned(
        top: 18,
        child: Text('3', style: TextStyle(fontSize: 40)),
      ),
    ],
  ),
)
```

1. 第一个子文本组件没有指定定位，并且`alignment`值为`Alignment.center`，所以它会居中显示
2. 第二个子文本组件只指定了水平方向的定位(`left`)，所以属于部分定位，所以在垂直方向的对齐方式则会按照`alignment`指定的对齐方式对齐，即垂直方向居中

3. 与二同理

## 例子2

```dart
ConstrainedBox(
  constraints: BoxConstraints.expand(),
  child: Stack(
    alignment: Alignment.center,
    fit: StackFit.expand,
    children: [
      Positioned(
        left: 18,
        child: Text('1', style: TextStyle(fontSize: 40)),
      ),
      Container(
        child: Text('2', style: TextStyle(fontSize: 40)),
        color: Colors.pink,
      ),
      Positioned(
        top: 18,
        child: Text('3', style: TextStyle(fontSize: 40)),
      ),
    ],
  ),
)
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220110202914.png)

由于第二个子文本组件没有定位，所以`fit`属性会对它起作用，就会占满`Stack`

由于`Stack`子元素是堆叠的，所以第一个子文本组件被第二个遮住了，而第三个在最上层，所以可以正常显示
