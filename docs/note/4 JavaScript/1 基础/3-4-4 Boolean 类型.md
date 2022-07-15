# Boolean 类型

## 值

**Boolean** 类型有两个字面值：**true** 和 **false**

## 转换规则

所有类型的值都有布尔值的等价形式

| 数据类型  | 转换为 true            | 转换为 false   |
| --------- | ---------------------- | -------------- |
| Boolean   | true                   | false          |
| String    | 非空字符串             | “”（空字符串） |
| Number    | 非零数值（包括无穷值） | 0、NAN         |
| Object    | 任意对象               | null           |
| Undefined | N/A（不存在）          | undefined      |

## 包装类型方法

请看 `5-3 原始值包装类型` 的 `Boolean 包装类型方法`



