# 扩展运算符和 rest

## 扩展运算符

**把数组或对象展开成用逗号隔开的值**

1. 把数组扩展成一个一个参数

   ```js
   const args = [1, 2, 3]
   function fn(a, b, c) {
       console.log(a, b, b)
   }
   fn(...args) // 1, 2, 3
   ```

2. 合并

   ```js
   const arr1 = [1, 2]
   const arr2 = [3]
   arr1.push(...arr1)
   ```

   ```js
   const obj1 = {name: 'kingmusi', age: 18}
   const obj2 = {...obj1, age: 20} 
   obj // {name: 'kingmusi', age: 20}
   ```

   

## rest 参数

**把逗号隔开的值组合成一个数组或对象**

1. 不定参数：把确定的值先定义，不确定的用不定参数接受

   ```js
   function fn(a, ...args) {
       console.log(x, args)
   }
   fn(1, 2, 3) // 1, [2, 3]
   fn(1, 2, 3, 4) // 1, [2, 3, 4]
   ```

2. 结构赋值：拿取剩下的

   ```js
   const [x, ...args] = [1, 2, 3]
   x // 1
   args // [2, 3]
   ```

   ```js
   const {['name']: name, ...rest} = {
       name: 'kingmusi',
       age: 18
   }
   name // kingmusi
   rest // {age: 18}
   ```

   