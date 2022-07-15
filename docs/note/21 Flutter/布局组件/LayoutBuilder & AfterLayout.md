# LayoutBuilder & AfterLayout

## LayoutBuilder

在**布局过程**中拿到父组件传递的约束信息，然后可以根据约束信息动态的构建不同的布局

即相当于 Web 中的**响应式布局（@media）**

#### 例子

> 当当前可用的宽度小于 200 时，将子组件显示为一列，否则显示为两列

定义一个可适应的 Column

```dart
class LayoutColumn extends StatelessWidget {
  LayoutColumn({Key? key, required this.children}) : super(key: key);
  
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        if (constraints.maxWidth < 200) { // 小于 200 时，排一列
          return Column(children: children, mainAxisSize: MainAxisSize.min);
        } else {
          var _children = <Widget>[];
          for (var i = 0; i < children.length; i += 2) { // 大于 200 时，排两列
            if (i + 1 < children.length) { // 子元素总个数为双数
              _children.add(Row(
                children: [children[i], children[i + 1]],
                mainAxisSize: MainAxisSize.min,
              ));
            } else { // 子元素总个数为单数
              _children.add(Row(children: [children[i]]));
            }
          }
          return Column(children: _children, mainAxisSize: MainAxisSize.min);
        }
      },
    );
  }
}
```

封装一个能打印父组件传递给子组件约束的组件，便于排错

```dart
class LayoutLog<T> extends StatelessWidget {
  const LayoutLog({
    Key? key,
    this.tag,
    required this.child
  }) : super(key: key);

  final T? tag; // 指定日志tag
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      // assert在编译release版本时会被去除
      assert(() {
        print('${tag ?? key ?? child}: $constraints');
        return true;
      }());
      return child;
    });
  }
}
```

使用

```dart
class LayoutBuilderRoute extends StatelessWidget {
  const LayoutBuilderRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var _children = List.filled(6, Text("A"));
    // Column在本示例中在水平方向的最大宽度为屏幕的宽度
    return Column(
      children: [
        // 限制宽度为190，小于 200
        SizedBox(width: 190, child: ResponsiveColumn(children: _children)),
        ResponsiveColumn(children: _children),
        LayoutLogPrint(child:Text("xx")) // 下面介绍
      ],
    );
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202201110018095.png)

控制台会打印出

```shell
Text("log"): BoxConstraints(0.0<=w<=411.4, 0.0<=h<=Infinity)
```

## AfterLayout

Flutter 是响应式 UI 框架，只关注数据的变化，当数据变化后框架会自动重新构建UI而不需要开发者手动去操作每一个组件，所以 Flutter 没有提供任何操作组件的 API，所以想在 Flutter 中获取某个组件的大小和位置就会很困难，但如果想获取呢？

只有当布局完成时，每个组件的大小和位置才能确定，所以获取的时机肯定是布局完成后

《Flutter 实战》作者封装了一个 AfterLayout 组件，它可以在子组件布局完成后执行一个回调，并同时将 RenderObject 对象作为参数传递

```dart
class AfterLayout extends SingleChildRenderObjectWidget {
  AfterLayout({
    Key? key,
    required this.callback,
    Widget? child,
  }) : super(key: key, child: child);

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderAfterLayout(callback);
  }

  @override
  void updateRenderObject(
      BuildContext context, RenderAfterLayout renderObject) {
    renderObject..callback = callback;
  }
  ///组件树布局结束后会被触发，注意，并不是当前组件布局结束后触发
  final ValueSetter<RenderAfterLayout> callback;
}

class RenderAfterLayout extends RenderProxyBox {
  RenderAfterLayout(this.callback);

  ValueSetter<RenderAfterLayout> callback;

  @override
  void performLayout() {
    super.performLayout();
    // 不能直接回调callback，原因是当前组件布局完成后可能还有其它组件未完成布局
    // 如果callback中又触发了UI更新（比如调用了 setState）则会报错。因此，我们
    // 在 frame 结束的时候再去触发回调。
    SchedulerBinding.instance!
        .addPostFrameCallback((timeStamp) => callback(this));
  }

  /// 组件在屏幕坐标中的起始点坐标（偏移）
  Offset get offset => localToGlobal(Offset.zero);
  /// 组件在屏幕上占有的矩形空间区域
  Rect get rect => offset & size;
}
```

#### 示例

获取组件大小和相对于屏幕的坐标

```dart
AfterLayout(
  callback: (RenderAfterLayout ral) {
    print(ral.size); //子组件的大小
    print(ral.offset);// 子组件在屏幕中坐标
  },
  child: Text('test'),
)
```

运行后控制台输出：

```dart
flutter: Size(105.0, 17.0)
flutter: Offset(42.5, 290.0)
```

可以看到 Text 文本的实际长度是 105，高度是 17，它的启示位置坐标是（42.5, 290.0）