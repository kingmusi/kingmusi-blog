# Scaffold

`Scaffold` 是一个路由页的骨架，我们使用它可以很容易地拼装出一个完整的页面

| 组件名称             | 解释       |
| -------------------- | ---------- |
| appBar               | 顶部导航栏 |
| drawer               | 抽屉       |
| bottomNavigationBar  | 底部导航栏 |
| floatingActionButton | 漂浮按钮   |

![image-20220112103934934](/Users/tal/Library/Application Support/typora-user-images/image-20220112103934934.png)

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages//img/20220112104102.png)

## AppBar

通过它可以设置导航栏标题、导航栏菜单、导航栏底部的Tab标题等

```dart
AppBar({
  Key? key,
  this.leading, //导航栏最左侧Widget，常见为抽屉菜单按钮或返回按钮。
  this.automaticallyImplyLeading = true, //如果leading为null，是否自动实现默认的leading按钮
  this.title,// 页面标题
  this.actions, // 导航栏右侧菜单
  this.bottom, // 导航栏底部菜单，通常为Tab按钮组
  this.elevation = 4.0, // 导航栏阴影
  this.centerTitle, //标题是否居中 
  this.backgroundColor,
  ...   //其它属性见源码注释
})
```

如果给`Scaffold`添加了抽屉菜单，默认情况下`Scaffold`会自动将`AppBar`的`leading`设置为菜单按钮，点击它便可打开抽屉菜单。如果我们想自定义菜单图标，可以手动来设置`leading`

```dart
appBar: AppBar(
  title: Text("App Name"),
  leading: Builder(builder: (context) {
    return IconButton(
      icon: Icon(Icons.dashboard, color: Colors.white), //自定义图标
      onPressed: () {
        // 打开抽屉菜单  
        Scaffold.of(context).openDrawer(); 
      },
    );
  }),
  ...  
)
```

## Drawer

`Scaffold`的`drawer`和`endDrawer`属性可以分别接受一个Widget来作为页面的左、右抽屉菜单

```dart
class MyDrawer extends StatelessWidget {
  const MyDrawer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: MediaQuery.removePadding(
        context: context,
        //移除抽屉菜单顶部默认留白
        removeTop: true,
        child: Text('drawer')
      ),
    );
  }
}
```

## 底部导航栏

除了上面提供的`BottomNavigationBar`和`BottomNavigationBarItem`两种组件来实现Material风格的底部导航栏

还提供了一个`BottomAppBar` 组件，它可以和`FloatingActionButton`配合实现“打洞”效果

```dart
bottomNavigationBar: BottomAppBar(
  color: Colors.white,
  shape: CircularNotchedRectangle(), // 底部导航栏打一个圆形的洞
  child: Row(
    children: [
      IconButton(icon: Icon(Icons.home)),
      SizedBox(), //中间位置空出
      IconButton(icon: Icon(Icons.business)),
    ],
    mainAxisAlignment: MainAxisAlignment.spaceAround, //均分底部导航栏横向空间
  ),
)
```

打洞的位置取决于`FloatingActionButton`的位置，上面`FloatingActionButton`的位置为：

```dart
floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
```

所以打洞位置在底部导航栏的正中间

`BottomAppBar`的`shape`属性决定洞的外形，`CircularNotchedRectangle`实现了一个圆形的外形
