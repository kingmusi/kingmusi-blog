# Null 类型

## 值

**Null** 类型只有一个值——**null**

- 逻辑上，**null** 表示一个空对象指针，这也是 `typeof null` 返回 **object** 的原因
- 在定义将来要保存对象值的变量时，建议初始化值为 **null**。这样就可以很好的判断，这个值是不是后来被重新赋予一个引用

## null 与 undefined 区别

**undefined** 和 **null** 表面上相等的，但用途其实完全不一样

```js
undefined == null // true
undefined === null // false
```