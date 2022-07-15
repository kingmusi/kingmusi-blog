# Function 函数

## 函数声明和函数表达式

##### 1. 函数声明

```js
function fn() {}
```

##### 2. 函数表达式

```js
const fn = function() {}
```

> 函数声明会**变量提升**，但函数表达式不会提升
>
> ```js
> console.log(fn1()) // 报错
> console.log(fn2()) // 执行成功
> 
> var fn1 = function() {}
> function fn2() {}
> ```

## 立即调用的函数表达式

- 例子

  ```js
  (function(a, b) {
      console.log(a + b)
  })(1, 2) 
  // 3
  ```

- 可以用于模拟块级作用域

  ```js
  (function() {
      var a = 'a'
  })()
  console.log(a) // 报错
  ```

## 箭头函数

##### 1. 使用

```js
(x, y) => { return x * y}
```

##### 2. 只有一个参数时，可以省略圆括号

```js
x => { return x * x }
```

##### 3. 省略 return

```js
(x) => x * x

// 当想要返回对象时，要使用 () 包裹
() => ({
	name: 'kingmusi'
})
```

> 1. `this` 指向不同
> 2. 不可做为构造函数（即不能  `new`），也没有 **prototype**
> 3. 不能使用 `arguments`、**super**、**new.target**

## 参数

1. 参数可以是任何值，其个数随意，少传的赋值初始值或 **undefined**，多传会忽略

2. 在参数后面用 **=** 可以为此参数赋一个默认值

   ```js
   function say(message = 'hello world') {
       console.log(message)
   }
   say() // 'hello world'
   ```

3. 参数初始化遵循 “暂时性死区”，即前面定义的参数不能引用后面定义的

   ```js
   function names(name1 = 'kingmusi', name2 = name1) {} // 可以
   function names(name1 = name2, name2 = 'kingmusi') {} // 报错
   ```

4. 参数收集

   - **arguments**：传入参数的类数组集合。箭头函数没有

     ```js
     function func() {
         console.log(arguments)
     }
     
     func(1, 2, 3, 4) // { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }
     ```

   - 扩展函数：可以收集传入的参数，是一个数组。普通函数和箭头函数都可以使用

     ```js
     function func(...rest) {
         console.log(rest)
     }
     
     func(1, 2, 3, 3) // [1, 2, 3, 4]
     ```

## 特殊的属性

##### 1. name

- 所有函数对象都有一个只读的 **name** 属性，包含函数指针的信息

- 如果函数是访问器函数，或者使用 **bind()** 实例化，则在前面加一个前缀

  ```js
  function foo() {}
  console.log(foo.name) // foo
  
  console.log(foo.bind(null).name) // bound foo
  ```

##### 2. arguments

- 是一个类数组对象，包含调用函数时传入的所有参数

- 其上有一个 **callee** 属性，是一个指向 **arguments** 对象所在函数的指针。严格模式会报错

  ```js
  function factorial(num) {
      if (num <= 1) {
          return 1
      } else {
          return num * arguments.callee(num - 1)
      }
  }
  ```

##### 3. this

- 在标准函数中，**this** 引用的是把函数当成方法调用的上下文对象

  ```js
  window.color = 'red'
  const obj = {
      color: 'blue'
  }
  
  function getColor() {
      console.log(this.color)
  }
  
  getColor() // red
  
  obj.getColor = getColor
  obj.getColor() // blue
  ```

- 在箭头函数中，**this** 引用的是定义箭头函数的上下文

  ```js
  window.color = 'red'
  const obj = {
      color: 'blue'
  }
  
  let getColor = () => console.log(this.color)
  
  getColor() // red
  
  obj.getColor = getColor
  obj.getColor() // red
  ```

##### 4. caller

- 这个属性是引用调用当前函数的函数，如果是全局作用域，则返回 **null**

  ```js
  function outer() {
      inner()
  }
  
  function inner() {
      console.log(inner.caller)
  }
  
  outer() // f outer(){}
  ```

##### 5. new.target

- 检测函数是否使用 **new** 关键字，如果函数是正常调用，则其值是 **undefined**。如果是使用 **new** 调用的，则其值是被调用的构造函数

  ```js
  function Person() {
      if (!new.target) {
          throw '请使用 new 关键字构造实例'
      }
  }
  
  new King() // 成功
  King()     // 请使用 new 关键字构造实例
  ```

##### 6. length

- 保存函数定义的命名参数的个数

  ```js
  function func(a, b, c) {}
  console.log(func.length) // 3
  ```



