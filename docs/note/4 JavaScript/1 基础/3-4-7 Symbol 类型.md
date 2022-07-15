# Symbol 类型

## 用途

- 确保对象属性使用唯一标识符，不会发生属性冲突的危险

## 基本用法

1. 无参：定义一个独一无二的变量

```js
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false
```

2. 带参：为 **Symbol** 添加描述信息，用来调试代码，但此 **Symbol** 与描述完全无关
   - 可通过 `.description` 取得描述信息

```js
const s1 = Symbol('foo')
const s2 = Symbol('foo')
console.log(s1 === s2) // false
```

3. 不能与 **new** 关键字使用，即不能初始化为包装对象
   - 如果想使用，可以 `Object( Symbol() )`

## 全局符号（Symbol）注册表

需要共享和重用 **Symbol** 实例，可以在全局符号注册表中创建并重用符号

使用 **Symbol.for()** 方法

- 第一次使用某个字符串调用时，会创建一个新的符号实例，并添加到注册表中
- 后续使用相同字符串调用，查找注册表，并返回对应符号实例

```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // true

const s3 = Symbol('foo')
console.log(s1 === s3) // false
```

使用 **Symbol.keyFor()** 方法，传入一个符号实例，可以返回全局符号对应的键。如果查询的不是全局符号，返回 **undefined**

```js
const s1 = Symbol.for('foo')
const s2 = Symbol('foo')

Symbol.keyFor(s1) // return foo
Symbol.keyFor(s2) // return undefined
```

## 应用场景

1. 使对象的 **key** “可重复“

```js
const stu1 = Symbol('张三')
const stu2 = Symbol('张三')
const class = {
    [stu1]: {},
    [stu2]: {}
}
```

2. 消除魔术字符串，减少代码耦合

```js
const type = {
    one: 'one',
    two: 'two'
}
```

优化，减少信息量

```js
const type = {
    one: Symbol(),
    five: Symbol()
}
```

## 常用内置符号

1. **Symbol.isConcatSpreadable**

   - 默认情况，数组会被打平到已有数组中，类数组会追加到已有数组末尾
   - false 或假值，数组被追加到已有数组末尾
   - true 或真值，类数组会被打平到已有驻足中。其他不是类数组的对象会被忽略

   ```js
   const init = [0]
   const arr = [1]
   const obj = { length: 1, 0: 1 }
   
   // 默认情况
   console.log(init[Symbol.isConcatSpreadable]) // undefined
   console.log(init.concat(arr)) // [0, 1]
   console.log(init.concat(obj)) // [0, { length: 1, 0: 1 }]
   
   // 假
   arr[Symbol.isConcatSpreadable] = false
   console.log(init.concat(arr)) // [0, [1]]
   
   // 真
   obj[Symbol.isConcatSpreadable] = true
   console.log(init.concat(obj)) // [0, 1]
   
   const set = new Set().add(1)
   set[Symbol.isConcatSpreadable] = true
   console.log(init.concat(set)) // [0]
   ```

2. **Symbol.species**

   定义静态的获取器（getter） 方法，可以覆盖新创建实例的原型定义

   ```js
   class MyArray extends Array {
     static get [Symbol.species]() { return Array }
   }
   
   const a = new MyArray(1, 2, 3)
   console.log(a instanceof MyArray) // true
   console.log(a instanceof Array) // true
   
   const mapped = a.map(x => x * x);
   console.log(mapped instanceof MyArray) // false
   console.log(mapped instanceof Array) // true
   ```

3. **Symbol.toStringTag**

   - 通过 **toString()** 获取对象标识时，会检索 **Symbol.toStringTag** 指定的实例标识符，默认是 **Object**
   - 内置类型已经有指定，自定义类型需要明确定义

   ```js
   const set = new Set()
   console.log( set.toString() ) // [object Set]
   console.log( set[Symbol.toStringTag] ) // Set
   
   class Bar {}
   const bar = new Bar()
   console.log( bar.toString() ) // [object Object]
   console.log( bar[Symbol.toStringTag] ) // undefined
   
   class Foo {
   	constructor() {
   		this[Symbol.toStringTag] = 'Foo'
   	}
   }
   const foo = new Foo()
   console.log( foo.toString() ) // [object Foo]
   console.log( foo[Symbol.toStringTag] ) // Foo
   ```

   