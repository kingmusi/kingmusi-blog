# Objetc 类型

## 定义

- 对象其实就是一组数据和功能的集合
- 通过 **new** 操作符后跟对象类型的名称来创建

## 固有属性和方法

- **constructor**：用于创建当前对象的函数。

- **hasOwnProperty(propertyName)**：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串或符号。

- **isPrototypeof(object)**：用于判断当前对象是否为另一个对象的原型。
- **propertyIsEnumerable(propertyName)**：用于判断给定的属性是否可以使用 **for-in** 语句枚举。与 `hasOwnProperty()`一样，属性名必须是字符串。

- **toLocalestring()**：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
- **tostring()**：返回对象的字符串表示。

- **valueof()**：返回对象对应的字符串、数值或布尔值表示。通常与 `tostring()` 的返回值相同。