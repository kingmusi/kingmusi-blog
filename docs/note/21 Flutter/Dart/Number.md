# Number

## 基础

Dart 支持两种 Number 类型：

- **int**：整数值；长度不超过 64 位
- **double**：64 位的双精度浮点数字



int 和 double 都是 **num** 的子类

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202302051902935.png)

## 声明

定义整数

```dart
var num = 1;
int num = 1;
```

定义浮点数

```dart
var num = 1.0;
double num = 1; // 1.0 整型字面量将会在必要的时候自动转换成浮点数字面量
```

同时具有整型和双精度值

```dart
num x = 1;
x += 2.5;
```

## num

num 中定义了一些基本的运算符比如 +、-、*、/ 等，还定义了 `abs()`、`ceil()` 和 `floor()` 等方法

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);
```

