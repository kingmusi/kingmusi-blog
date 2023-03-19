# Map

## Maps

一个无序的 key-value （键值对）集合

## 基本定义

```dart
// 字面量语法
var map = {
    'a': [1, 2],
    'b': [3, 4]
};
```

```dart
// 构造函数
var map = Map<int, String>();
```

## 属性

- ` entries → Iterable<MapEntry<K, V>> `
  - 返回 Map 的键值对

- `isEmpty`
  - 返回 Map 是否为空
- `isNotEmpty`
  - 返回 Map 是否不为空
- `keys → Iterable<K>`
  - 返回 Map 的 keys
- `length`
  - 返回 Map 长度
- ` values → Iterable<V> `
  - 返回 Map 的 values

## 方法

- ` addAll(Map<K, V> other) → void `
  - 将其他的所有键/值对添加到此映射

- `clear() → void`
  - 将 Map 清空
- `containsKey(Object? element) → bool`
  - Map 是否包含 key 等于 element 的元素
- `containsValue(Object? element) → bool`
  - Map 是否包含 value 等于 element 的元素
- `remove(Object? key) → V?`
  - 如果存在，则删除对应的 key，及其 value
- ` removeWhere(bool test(K key, V value)) → void `
  - 删除 Map 中满足给定测试的所有条目
- ` update(K key, V update(V value), {V ifAbsent()?}) → V `
  - 更新对应 key 的 value

