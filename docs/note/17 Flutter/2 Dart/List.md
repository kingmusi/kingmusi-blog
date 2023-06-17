# List

## 基本定义

```dart
var arr = <String>[];

var arr = ['musi'];
```

## 构造 API

- `List.generate(int length, E generator(int index))`

  - 创建给定长度的列表，并在每个位置填充构造的元素

  ```dart
  List.generate(3, (index) {
      return index * 2
  }) // [0, 2, 4]
  ```

- `List.filled(int length, E fill)`
  - 创建给定长度的列表，并在每个位置填充

- `List.from(Iterable elements)`
  - 创建一个包含所有元素的列表
- `List.of(Iterable elements)`
  - 创建一个包含所有元素的列表

## 属性

- `first`
  - 返回列表第一项
- `isEmpty`
  - 返回列表是否为空
- `isNotEmpty`
  - 返回列表是否不为空
- `last`
  - 返回列表最后一项
- `length`
  - 返回列表长度
- `reversed`
  - 返回翻转后的列表
- `single`
  - 返回列表是否只有一项

## 方法

- `add(E value) → void`

  - 将值添加到此列表的末尾，将长度延长一

- `addAll(Iterable<E> iterable ) → void`

  - 将 iterable 的所有对象附加到此列表的末尾

  ```dart
  var arr = [1, 2];
  arr.addAll([3, 4]); // [1, 2, 3, 4]
  ```

- `asMap() → Map<int, E>`

  - 将列表转成 Map

- `clear() → void`

  - 将列表清空

- `contains(Object? element) → bool`

  - 列表是否包含等于 element 的元素

- `elementAt(int index) → E`

  - 返回下标为 index 的元素

- `every(bool test(E element)) → bool`

  - 检查此迭代的每个元素是否满足测试

  ```dart
  arr.every((e) => e == 1));
  ```

- `fillRange(int start, int end, [E? fillValue]) → void`

  - 用 fillValue 覆盖一系列元素

- `firstWhere(bool test(E element)) → E`

  - 返回满足条件的第一个元素

- `forEach(void action(E element)) → void`

  - 循环列表

- `getRange(int start, int end) → Iterable<E>`

  - 返回子列表

- `indexOf(E element, [int start = 0]) → int`

  - 返回对应第一个 element 的索引

- `insert(int index, E element) → void`

  - 在此列表中的位置索引处插入元素

- `insertAll(int index, Iterable<E> iterable) → void`

  - 在此列表中的位置索引处插入一组迭代

- `join([String separator = ""]) → String`

  - 将每个元素转换为字符串并连接字符串

- `lastIndexOf(E element, [int start = 0]) → int`

  - 返回对应最后一个 element 的索引

- `lastWhere(bool test(E element)) → E`

  - 返回满足条件的最后一个元素

- `map<T>(T toElement(E e)) → Iterable<T>`

  - 根据列表返回一个新列表

- `reduce(E combine(E value, E element)) → E`

  - 通过使用提供的函数迭代组合集合的元素，将集合减少到单个值

- `remove(Object? value) → bool`

  - 删除一个元素

- `removeAt(int index) → E`

  - 删除对应索引的元素

- `removeRange(int start, int end) → void`

  - 删除对应范围的元素

- `replaceRange(int start, int end, Iterable<E> replacements) → void`

  - 用替换元素替换一系列元素

- `sort([int compare(E a, E b)?]) → void`

  -  排序