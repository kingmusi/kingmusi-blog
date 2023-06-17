# dynamic var object

#### dynamic

类型可以是任意的，在编译阶段不会进行类型检查，只有在运行阶段才会得知类型使用是否正确

与 ts 中 `let a:any` 差不多

```dart
dynamic a = “hello”;  //是字符串
a = 123;  //分配给int值
a = true;  // 布尔类型
```

#### var

在定义时可以是任何类型，但一旦定义了，就会推断出具体类型，后续编译阶段会进行类型检查

与 ts 中 `let a = 1` 差不多

```dart
var a = 1;
a = '1'; // 报错
```

> 如果一开始定义的时候没有赋值，则又与 dynamic 相同
>
> ```dart
> var a;
> a = 1;
> a = '1'; // 不会报错
> ```

#### Object

Object 是 dart 中的基类，所以所有类型都满足 Object

- 类型定义为 Object 的变量，能改变成任何类型
- 定义为 Object 的变量只能调用 Object 才有的方法和属性，比如 toString，不然会编译阶段会报错

```dart
Object a = 1;
a = '1'; // 不会报错
a.foo(); // 报错
```

