# BigInt 类型

## 概念

- 原始类型
- 可安全的定义超出 `MAX_SAFE_INTEGER` 和 `MIN_SAFE_INTEGER` 的整数

## 定义

1. 在数字后面加 `n`

   ```js
   const bigint = 9007199254740993n
   console.log(bigint) // 9007199254740993n
   ```

2. BigInt()

   ```js
   const bigint = BigInt(9007199254740993)
   ```

## 运算

取值：只能取成字符串

```js
console.log( bigint.toString() ) // 9007199254740993
```

**BigInt** 之间的运算

```js
10n + 20n;    // → 30n
10n - 20n;    // → -10n
+10n;         // → TypeError: Cannot convert a BigInt value to a number
-10n;         // → -10n
10n * 20n;    // → 200n
20n / 10n;    // → 2n
23n % 10n;    // → 3n
10n ** 3n;    // → 1000n

const x = 10n;
++x;          // → 11n
--x;          // → 9n
```

**BigInt** 与 **Number** 的比较

```js
console.log( 10n == 10 ) // true
console.log( 10n === 10 ) // false 因为三等号还会比较类型
console.log( 10n > 10 ) // false
10 + 10n     // → TypeError
```