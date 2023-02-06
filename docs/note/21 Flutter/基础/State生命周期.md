# State 生命周期

## 图解

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202302051928325.png)

## 例子

```dart
class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    print("initState");
  }
    
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies");
  }

  @override
  Widget build(BuildContext context) {
    print("build");
    return Scaffold(
      body: Center(
        child: TextButton(
          child: Text('$_counter'),
          onPressed: () => setState(
            () => ++_counter,
          ),
        ),
      ),
    );
  }
    
  @override
  void reassemble() {
    super.reassemble();
    print("reassemble");
  }

  @override
  void didUpdateWidget(CounterWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print("didUpdateWidget ");
  }

  @override
  void deactivate() {
    super.deactivate();
    print("deactivate");
  }

  @override
  void dispose() {
    super.dispose();
    print("dispose");
  }
}
```

运行应用，会输出

```shell
initState
didChangeDependencies
build
```

点击⚡️按钮热重载，会输出

```shell
reassemble
didUpdateWidget
build
```

点击 0，增加 _counter，会输出

```shell
build
```

在 widget 树中移除`CounterWidget`

```dart
 Widget build(BuildContext context) {
  //移除计数器 
  //return CounterWidget ();
  //随便返回一个Text()
  return Text("xxx");
}
```

然后热重载，会输出

```shell
reassemble
deactive
dispose
```

