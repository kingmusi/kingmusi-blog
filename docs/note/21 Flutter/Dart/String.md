# String

## 创建字符串

使用**单引号**或者**双引号**创建一行字符串

```dart
var s1 = '使用单引号创建字符串字面量。';
var s2 = "双引号也可以用于创建字符串字面量。";
```

使用**三个**单引号或双引号创建多行字符串

```dart
var s1 = '''
你可以像这样创建多行字符串。
''';
```

在字符串前加上 `r` 作为前缀创建 “raw” 字符串（即不会被做任何处理（比如转义）的字符串）

```dart
var s = r'在 raw 字符串中，转义字符串 \n 会直接输出 “\n” 而不是转义为换行。';
```

## 插值

以 `${表达式}` 的形式使用表达式

- 如果表达式是一个标识符，可以省略掉 {}
- 如果表达式的结果为一个对象，则 Dart 会调用该对象的 `toString` 方法来获取一个字符串

```dart
var s = '字符串插值';

assert('Dart 有$s，使用起来非常方便。' == 'Dart 有字符串插值，使用起来非常方便。');
assert('使用${s.substring(3,5)}表达式也非常方便' == '使用插值表达式也非常方便。');
```

> `==` 运算符负责判断两个对象的内容是否一样，如果两个字符串包含一样的字符编码序列，则表示相等。

## 在字符串中搜索

```dart
// 检查一个字符串是否包含另一个字符串
assert('Never odd or even'.contains('odd'));

// 一个字符串是否以另一个字符串开头
assert('Never odd or even'.startsWith('Never'));

// 一个字符串是否以另一个字符串结尾
assert('Never odd or even'.endsWith('even'));

// 查找字符串中字符串的位置
assert('Never odd or even'.indexOf('odd') == 6);
```

## 从字符串中提取数据

```dart
// 获取子串
assert('Never odd or even'.substring(6, 9) == 'odd');

// 使用字符串模式拆分字符串
'structured web apps'.split(' ');

// 通过索引获取UTF-16代码单元
assert('Never odd or even'[0] == 'N');

for (final char in 'hello'.split('')) {
  print(char);
}
```

## 字母大小写转换

- **toUpperCase**：转换为大写字母
- **toLowerCase**：转换为小写字母

## Trimming 和空字符串

- 使用 `trim()` 移除首尾空格
- 使用 `isEmpty` 检查一个字符串是否为空

```dart
// Trim a string.
assert('  hello  '.trim() == 'hello');

// Check whether a string is empty.
assert(''.isEmpty);

// Strings with only white space are not empty.
assert('  '.isNotEmpty);
```

## StringBuffer

在调用 `toString()` 之前， StringBuffer 不会生成新字符串对象。 `writeAll()` 的第二个参数为可选参数，用来指定分隔符

```dart
var sb = StringBuffer();
sb
  ..write('Use a StringBuffer for ')
  ..writeAll(['efficient', 'string', 'creation'], ' ')
  ..write('.');

var fullString = sb.toString();

assert(fullString ==
    'Use a StringBuffer for efficient string creation.');
```



