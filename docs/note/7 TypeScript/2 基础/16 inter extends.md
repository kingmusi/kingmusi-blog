# infer extends

## 问题

从 **xx[]** 中提取元素，默认会推导为 **unknown** 类型，

```typescript
type TestLast<Arr extends string[]> =
    Arr extends [...infer Rest, infer Last]
        ? `最后一个是：${Last}`
        : never
// // Type 'Last' is not assignable to type 'string | number | bigint | boolean | null | undefined'
```

4.7 以前的处理方式有

```typescript
// 1. 加一层判断
type TestLast<Arr extends string[]> = 
    Arr extends [...infer Rest, infer Last]
        ? Last extends string
            ? `最后一个是：${Last}`
            : never
        : never

// 2. 和 string 取交叉类型
type TestLast<Arr extends string[]> = 
    Arr extends [...infer Rest, infer Last]
        ? `最后一个是：${Last & string}`
        : never
```

## infer extends

4.7 后引入新语法解决上面问题

**infer 的时候加上 extends 来约束推导的类型，这样推导出的就不再是 unknown 了，而是约束的类型。**

```typescript
type TestLast3<Arr extends string[]> = 
    Arr extends [...infer Rest, infer Last extends string]
        ? `最后一个是：${Last}`
        : never
```

## 4.7 与 4.8 区别

比如这样一个类型：

```typescript
type NumInfer<Str> = 
    Str extends `${infer Num extends number}`
        ? Num
        : never
```

4.7 推导出的就是 extends 约束的类型

```typescript
type test = NumInfer<'123'> // number
```

而 4.8 时，如果是基础类型，会推导出字面量类型

```typescript
type test = NumInfer<'123'> // 123
```

## 用例

提取枚举的值的类型

```typescript
enum Code {
    a = 111,
    b = 222,
    c = "abc"
}
```

以前提取

```typescript
type res = `${Code}` // '111' | '222' | '333'
```

现在提取

```typescript
type StrToNum<Str> =
  Str extends `${infer Num extends number}`
    ? Num
    : Str
```

```typescript
type res = StrToNum<Code> // 'abc' | 111 | 222
```

