# 通过 value 找 key

```js
function searchValue(obj, value, index = 1) {
  const res = []
  for (const key in obj) {
    if (obj[key] === value) {
      // 如果不在第一层，则直接返回结果
      if (index !== 1) return [key]
      // 在第一层，则加入结果集中
      res.push([key])
      continue
    }

    // 没找到，且为 object、array 则继续向下寻找（暂时不考虑其他数据结构）
    if (obj[key] instanceof Object) {
      const temp = searchValue(obj[key], value, index + 1)
      if (temp) {
        // 如果不在第一层，则向上返回结果集
        if (index !== 1) return [key, ...temp]
        res.push([key, ...temp])
      }
    }
  }
  // 如果在第一层，返回结果
  // 不在第一层，能到这里，证明没找到，返回 null
  return index === 1 ? res : null
}

let obj = {
  a: 1,
  b: {
    c: 2
  },
  d: [1, 2, 3],
  e: {
    f: {
      g: 5
    }
  }
}
console.log(searchValue(obj, 2)) // [ [ 'b', 'c' ], [ 'd', '1' ] ]
```

