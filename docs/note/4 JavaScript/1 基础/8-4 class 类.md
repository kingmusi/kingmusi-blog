# class 类

> 类只是语法糖，本质仍然是原型和构造函数的概念

## 类定义

1. 类声明

   - 不能变量提升

   ```js
   class Person {}
   ```

2. 类表达式

   ```js
   const Person = class {}
   ```

> 定义的类会被当做一个函数
>
> ```js
> typeof class Person {} // function
> ```

## 实例化

- 使用 **new** 操作符实例化一个类，实例化相当于调用其构造函数 **constructor**
  1. 在内存中创建一个新对象
  2. 这个新对象的 **[[Prototype]]** 被赋值为构造函数的 **prototype** 属性
  3. 构造函数内部的 **this** 被赋值为这个新对象（即 **this** 指向新对象）
  4. 执行构造函数内部的代码（给新对象添加属性）
  5. 如果构造函数返回非空对象，则返回该对象。否则，返回刚创建的新对象
- 实例化传入的**参数**会用作构造函数的参数
- 实例化必须使用 **new**，不然会报错
- 可以使用 **instanceof** 操作符检查实例是否存在于某个原型链上

## 类组成

> 类受块级作用域限制

##### 1. 构造函数 **constructor**

- 为实例（**this**）添加任何类型的属性。引用类型的属性是不会共享的

  ```js
  class Person {
      constructor(name) {
          this.name = name
      }
  }
  ```

##### 2. 原型方法

- 在类块中定义的方法作为原型方法

  ```js
  class Person {
      say() { console.log('hello world') }
  }
  Person.prototype.say() // hello world
  ```

##### 3. 访问器

- 可以获取和设置访问器，行为与普通对象一样

- 一般用于一些比较复杂的业务场景

  ```js
  class People {
      constructor(sex) {
          this.sex_ = sex
      }
      get sex() {
          const sex_ = this.sex_
          if (sex_ === 0) {
              return 'male'
          } else if (sex_ === 1) {
              return 'famale'
          } else {
              return 'unknown'
          }
      }
      set sex(newSex) {
          if (newSex === 0 || newSex === 1) {
              this.sex_ = newSex
          }
      }
  }
  const p = new People(0)
  p.sex = 1
  ```

##### 4. 静态类方法

- 用于定义属于类的公有方法，类似于 **Promise.all**

- 使用 **static** 关键字作为前缀，在静态成员中，**this** 引用类自身

  ```js
  class Person {
      constructor(age) {
          this.age = age
      }
      static random() {
          return new Person(Math.floor(Math.random() * 100))
      }
  }
  ```

##### 5. 迭代器

- 为类添加一个默认的迭代器，把类实例变成可以迭代的对象

  ```js
  class Arr {
      constructor(...rest) {
  		this.arr = rest
      }
      *[Symbol.iterator]() {
          yield* this.arr.entries()
      }
  }
  const arr = new Arr(1, 2, 3)
  for(const [key, value] of arr) {
      console.log(key, value)
  }
  ```

## 继承

##### 1. **extends** 单继承

- 可以继承类也可以继承构造函数

  ```js
  class TestArr extends Array {}
  const test = new TestArr()
  console.log(test instanceof TestArr) // true
  console.log(test instanceof Array)   // true
  ```

##### 2. **super()** 调用父类构造函数

- 在构造函数中使用可以调用父类构造函数

  ```js
  class Parent {
      constructor(name) {
          this.name
      }
  }
  class Child {
      constructor(name, age) {
          super(name)
          this.age = age
      }
  }
  ```

- 在静态方法中使用可以继承类上定义的静态方法

  ```js
  class Parent {
      static identify() {}
  }
  class Child {
      static identify() {
          super.identify()
      }
  }
  ```

- 没有显示定义类构造函数时，在实例化派生类时，会调用 **super()**，并会传入所有实例化的参数

- **super()** 只能在派生类中调用

  ```js
  class Parent {
      constructor() {
          super()
      }
  } // 报错
  ```

##### 3. 抽象基类 / 接口

- 通过 **new.target** 保证其不能被实例化

- 通过 **this** 检查方法是否有定义

  ```js
  class Interface {
      constructor() {
          if (new.target === Interface) {
              throw new Error('Interface 是接口类，不能被实例化')
          }
          
          if (!this.foo) {
              throw new Error('此接口必需含有 foo 方法')
          }
      }
  }
  
  const interface = new Interface() // Uncaught Error: Interface 是接口类，不能被实例化
  
  class Foo extends Interface {}
  const foo = new Foo() // Uncaught Error: 此接口必需含有 foo 方法
  ```

> 可以通过混合、组合实现多继承，具体参考书