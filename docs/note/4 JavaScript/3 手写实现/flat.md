# flat

## 前置了解

判断是不是数组

```js
Array.isArray
```

`concat` 传入的参数是数组，则会打平一层数组，传入其他元素，则会加入到数组中

```js
[].concat([3]) // [3]
[].concat(3) // [3]
```

测试用例

```js
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "kingmusi" }]
```

## 普通版

```js
const flat = arr => {
  let res = []
  for (const item of arr) {
    res = res.concat(Array.isArray(item) ? flat(item) : item)
  }
  return res
}
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "kingmusi" }]
```

## reduce

```js
const flat = arr => arr.reduce(
  (total, item) => total.concat(Array.isArray(item) ? flat(item) : item),
  []
)
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "kingmusi" }]
```

## 通过第二参数决定拍平的层数

```js
const flat = (arr, n = 1) =>
  n > 0 ?
    arr.reduce(
      (total, item) => total.concat(Array.isArray(item) ? flat(item, n - 1) : item),
      []
    ) : arr

flat(arr)
// [1, 2, 3, 4, 1, 2, 3, [ 1, 2, 3, [ 1, 2, 3 ] ], 5, "string", { name: "kingmusi" }]

flat(arr, Infinity)
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "kingmusi" }]
```

