# Object 构造函数方法

## 合并对象 **Object.assign()**

- 第一个参数：目标对象
- 第二个以后面的参数：源对象，但源对象属性只有满足一下条件才能被复制
  - 可枚举，**Object.propertyIsEnumerable()** 返回 **true**
  - 自有属性，**Object.hasOwnProperty()** 返回 **true**
  - 键为字符串或符号
- 返回：**修改目标对象**，并把修改后的目标对象返回

```js
const obj1 = { name: 'obj1', id: 1 }
const obj2 = { name: 'obj2', disable: true }
Object.assign(obj1, obj2) // { name: "obj2", id: 1, disable: true }
```

> 复制源对象的属性是 **浅复制**

## 相等判定 **Object.is()**

改善 **===**，相比于 **===**，考虑到边界情形

```js
console.log(+0 === -0)           // true
console.log(+0 === 0)            // true
console.log(-0 === 0)            // true

console.log(Object.is(+0, -0))   // false
console.log(Object.is(+0, 0))    // true
console.log(Object.is(-0, 0))    // false

console.log(NaN === NaN)         // false

console.log(Object.is(NaN, NaN)) // true
```

