# Widget

## 概念

Flutter 中所有对象都是一个 `Widget`，它不仅可以表示**UI元素**，也可以表示一些**功能性组件**，比如用于手势检测的 `GestureDetector`

## 接口

```dart
/**
 * Widget 是不可变的
 * 这会限制 Widget 中定义的属性必须是不可变的（final）
 * Flutter 中如果属性发生变化则会重新构建Widget树，即重新创建新的 Widget 实例来替换旧的 Widget 实例，所以允许 Widget 的属性变化是没有意义的，因为一旦 Widget 自己的属性变了自己就会被替换
 */
@immutable
/** DiagnosticableTree 即“诊断树”，主要作用是提供调试信息 */
abstract class Widget extends DiagnosticableTree {
  const Widget({ this.key });

  /** key属性类似于 React/Vue 中的key，主要的作用是决定是否在下一次build时复用旧的 widget ，决定的条件在canUpdate()方法中 */
  final Key? key;

  /** Flutter 框架在构建UI树时，会先调用此方法生成对应节点的Element对象 */
  @protected
  @factory
  Element createElement();

  /** 主要是设置诊断树的一些特性 */
  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.defaultDiagnosticsTreeStyle = DiagnosticsTreeStyle.dense;
  }

  static bool canUpdate(Widget oldWidget, Widget newWidget) {
    return oldWidget.runtimeType == newWidget.runtimeType
        && oldWidget.key == newWidget.key;
  }
  ...
}
```

## Flutter中的四棵树

Flutter 框架的的布局、绘制流程是这样的：

1. 根据 Widget 树生成一个 Element 树，Element 树中的节点都继承自 `Element` 类。
2. 根据 Element 树生成 Render 树（渲染树），渲染树中的节点都继承自`RenderObject` 类。
3. 根据渲染树生成 Layer 树，然后上屏显示，Layer 树中的节点都继承自 `Layer` 类。

Widget 树是非常**不稳定**的，动不动就执行 build 方法，一旦调用 build 方法意味着这个 Widget 依赖的所有其他 Widget 都会重新创建，如果 Flutter 直接解析 Widget树，将其转化为 RenderObject 树来直接进行渲染，那么将会是一个非常消耗性能的过程，那对应的肯定有一个东西来消化这些变化中的不便，来做 `cache`。因此，这里就有另外一棵树 Element 树。Element 树这一层将 Widget 树的**变化**（类似 React 虚拟 DOM diff）做了抽象，可以只将真正需要修改的部分同步到真实的 RenderObject 树中，最大程度降低对真实渲染视图的修改，提高渲染效率，而不是销毁整个渲染视图树重建。

三棵树中，**Widget 和 Element 是一一对应**的，但并不和 RenderObject 一一对应。

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202303051751873.png)

