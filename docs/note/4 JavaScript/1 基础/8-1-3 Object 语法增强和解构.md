# Object 语法增强和解构

## 语法增强

##### 1. 属性值简写

- 简写属性名为变量名（不使用冒号），会自动被解释为同名的属性键

  ```js
  const name = 'kingmusi'
  const person = { name }
  console.log(person) // { name: 'kingmusi' }
  ```

##### 2. 可计算属性

- 赋值时，使用中括号包围表达式，可以解析表达式的返回值

  ```js
  const name = 'kingmusi'
  const person = {
  	[`${name}1`]: 'a'
  }
  console.log(person) // {kingmusi1: "a"}
  ```

##### 3. 简写方法名

- 直接方法名后带圆括号，即可定义一个方法

  ```js
  const person = {
      getName() {
          return 'kingmusi'
      }
  }
  ```

- 对获取函数和设置函数也适用

  ```js
  const person = {
      name_: 'kingmusi',
      get name() {
          return this.name_
      },
      set name(newVal) {
          this.name = newVal
      }
  }
  ```

## 对象解构

- 等号两边的模式相同，左边的变量就会被赋予对应的值，因为对象是无顺序的，所以通过键来匹配
- 如果解构不成功，变量的值就等于 **undefined**
- 解构是**浅拷贝**

以下举例均采用同一个对象

```js
const person = {
    name: 'kingmusi',
    address: { city: 'shunde' }
}
```

##### 1. 创建新变量

- 普通使用

  ```js
  const { name, age } = person
  console.log(name, age) // 'kingmusi' undefined
  ```

- 别名

  ```js
  const { name: othername } = person
  console.log(othername, name) // 'kingmusi' undefined
  ```

##### 2. 替换旧变量

- 需要用圆括号包裹，如果值为 **undefined** 或 **null** 则不能被解构，并抛出错误

  ```js
  let name = 'musi';
  
  ({name} = person)
  console.log(name) // 'kingmusi'
  ```

##### 3. 初始值

```js
const { age = 22 } = preson
console.log(age) // 22
```

##### 3. 嵌套解构

```js
const { address:{ city } } = person
console.log(city) // 'shunde'
```

##### 4. 参数上下文匹配

```js
function func ({name}, age) {
	console.log(name, age)
}
func(person, 22) // 'kingmusi' 22
```

5. 交换数组两个变量

```js
const arr = [1, 2, 3];
[arr[2], arr[0]] = [arr[0], arr[2]];
console.log(arr) // [3, 2, 1]

function swap(arr, a, b) {
  [arr[b], arr[a]] = [arr[a], arr[b]]
}
```

