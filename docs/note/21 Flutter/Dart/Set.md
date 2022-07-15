# Set

## Sets

- 一个无序的，元素唯一的集合

- 因为一个 set 是无序的，所以无法通过下标（位置）获取 set 中的元素

## 基本定义

```dart
var set = <String>{};
```

## 构造 API

- `Set()`
  - 构造一个空 Set
- `Set.from(Iterable elements)`
  - 创建一个包含所有元素的 Set
- `Set.of(Iterable elements)`
  - 创建一个包含所有元素的 Set

## 属性

- `first`
  - 返回 Set 第一项
- `isEmpty`
  - 返回 Set 是否为空
- `isNotEmpty`
  - 返回 Set 是否不为空
- `last`
  - 返回 Set 最后一项
- `length`
  - 返回 Set 长度
- `reversed`
  - 返回翻转后的 Set 
- `single`
  - 返回 Set 是否只有一项

## 方法

- `add(E value) → void`

  - 将值添加到此 Set 的末尾，将长度延长一

- `addAll(Iterable<E> iterable ) → void`

  - 将 iterable 的所有对象附加到此Set的末尾

  ```dart
  var arr = [1, 2];
  arr.addAll([3, 4]); // [1, 2, 3, 4]
  ```

- `any(bool test(E element)) → bool`

  - 是否所有的元素都满足条件

- `clear() → void`

  - 将 Set 清空

- `contains(Object? element) → bool`

  - Set 是否包含等于 element 的元素

- `containsAll((Iterable<E> iterable) → bool`

  - Set 是否包含其他所有元素

- `elementAt(int index) → E`

  - 返回下标为 index 的元素

- `every(bool test(E element)) → bool`

  - 检查此迭代的每个元素是否满足测试

  ```dart
  arr.every((e) => e == 1));
  ```

- `firstWhere(bool test(E element)) → E`

  - 返回满足条件的第一个元素

- `forEach(void action(E element)) → void`

  - 循环 Set

- `join([String separator = ""]) → String`

  - 将每个元素转换为字符串并连接字符串

- `lastWhere(bool test(E element)) → E`

  - 返回满足条件的最后一个元素

- `lookup(Object? object) →  E`

  - 如果 Set 中存在等于 object 的对象，则返回它

- `map<T>(T toElement(E e)) → Iterable<T>`

  - 根据 Set 返回一个新 Set

- `reduce(E combine(E value, E element)) → E`

  - 通过使用提供的函数迭代组合集合的元素，将集合减少到单个值

- `remove(Object? value) → bool`

  - 删除一个元素

- `removeAll(Iterable<Object?> elements) → void`

  - 从此 Set 中删除元素的每个元素

- `retainWhere(bool test(E element)) → void`

  - 删除这个 Set 中所有不满足测试的元素

- `   toList({bool growable = true}) → List<E> `

  - 创建一个包含此 Iterable 元素的列表

- ` toString() → String `

  - 返回此元素（部分）的字符串表示形式

