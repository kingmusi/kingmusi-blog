# Object 属性

## 属性类型

##### 1. 数据属性

- **[[Configurable]]**：表示属性是否可以通过 **delete** 删除并重新定义，是否可以修改它的特性，是否可以把它改成访问器属性。默认值是 **true**
- **[[Enumerable]]**：表示属性是否可以通过 **for-in** 循环返回，默认值是 **true**
- **[[Writable]]**：表示属性的值是否可以被修改，默认值是 **true**
- **[[Value]]**：属性实际的值，默认值是 **undefined**

通过 **Object.defineProperty()** 添加或修改属性，与上述数据属性对应的描述符是：**configurable**、**enumerable**、**writable**、**value**

```js
// 创建一个只读属性
const preson = {}
Object.defineProperty(person, 'name', {
	writable: false,
    value: 'kingmusi'
})
```

> 同一个属性可以多次调用 **Object.defineProperty()**，但在把 **configurabel** 设置为 **false** 后，则不能再修改了

##### 2. 访问器属性

- **[[Configurable]]**：表示属性是否可以通过 **delete** 删除并重新定义，是否可以修改它的特性，是否可以把它改成访问器属性。默认值是 **true**
- **[[Enumerable]]**：表示属性是否可以通过 **for-in** 循环返回，默认值是 **true**
- **[[Get]]**：获取函数，在读取属性时调用，默认值是 **undefined**
- **[[Set]]**：设置函数，在写入属性时调用，默认值是 **undefined**

访问器属性**没有数据值**，通过为一个属性添加 **get** 和 **set** 就可以把一个数据属性转换成访问器属性，访问器属性只能通过 **Object.defineProperty()** 定义

``` js
// 经典应用：vue2 的响应式
const person = { name_: 'kingmusi' }

Object.defineProperty(person, 'name', {
	get() {
		console.log('获取了')
		return this.name_
	},
	set(newVal) {
		console.log('修改了')
		this.name_ = newVal
	}
})

console.log(person.name) // 获取了 // 'kingmusi'
person.name = 'musi'     // 修改了
console.log(person.name_, person.name)  // 'musi' 'musi'
```

## 定义多个属性

- **Object.defineProperties()** 可以一次性定义多个属性

```js
const person = {}
Object.defineProperties(person, {
    id: {
        writable: false,
        value: 1
    },
    name_: {
        value: 'kingmusi'
    },
    name: {
		get() {
            return this.name_
        },
        set(newVal) {
			this.name_ = newVal
        }
    }
})
```

## 读取属性的特性

- 使用 **Object.getOwnPropertyDescriptor()** 可以获得指定属性的属性描述符
- 使用以上作为例子

```js
const idDescriptor = Object.getOwnPropertyDescriptor(person, 'id')
console.log(idDescriptor) // { value: 1, writable: false, enumerable: false, configurable: false }

const nameDescriptor = Object.getOwnPropertyDescriptor(person, 'name')
console.log(nameDescriptor) // { enumerable: false, configurable: false, get: ƒ, set: ƒ }
```

- 使用 **Object.getOwnPropertyDescriptors()**，会在每个自有属性上调用 **Object.getOwnPropertyDescriptor()** ，并在一个新对象中返回它们

```js
const descriptor = Object.getOwnPropertyDescriptors(person)
console.log(descriptor)
/*
{
    id: { value: 1, writable: false, enumerable: false, configurable: false }
	name: { enumerable: false, configurable: false, get: ƒ, set: ƒ }
	name_: { value: "kingmusi", writable: false, enumerable: false, configurable: false }
}
*/
```

## 判断属性位置（实例或原型）

- 单独使用 **in** 时，无论属性是在实例上还是原型上，只要能通过对象访问到，就返回 **true**
- **hasOwnProperty()** 只有属性存在于实例上时才返回 **true**
- 只要 **in** 返回 **true**，**hasOwnProperty()** 返回 **false**，则说明属性在原型上

```js
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() { console.log(this.name) }

const person = new Person('kingmusi')

// 实例独有属性
console.log(person.hasOwnProperty('name')) // true
// 原型属性
console.log('sayName' in person) // true
console.log(person.hasOwnProperty('sayName')) // false
```

> 此节具体在书 **8.2 创建对象**

## 获取属性方法的区别

```js
const obj = Object.create( {a: 'a'} ) // 继承属性
obj.b = 'b' // 枚举属性
Object.defineProperty(obj, 'c', { // 不枚举属性
    value: 'c'
})
obj[Symbol('d')] = 'd' // Symbol属性
```

| 方法                           | 继承属性 | 枚举和不枚举           | Symbol属性 | 结果                    |
| ------------------------------ | -------- | ---------------------- | ---------- | ----------------------- |
| `Reflect.ownKeys`              | 无       | 枚举 + 不枚举          | 有         | `["b", "c", Symbol(d)]` |
| `Object.getOwnPropertyNames`   | 无       | 枚举 + 不枚举          | 无         | `["b", "c"]`            |
| `Object.getOwnPropertySymbols` | 无       | 枚举不枚举的Symbol属性 | 有         | `[Symbol(d)]`           |
| `Object.keys`                  | 无       | 枚举                   | 无         | `["b"]`                 |
| `for in`                       | 有       | 枚举                   | 无         | `a b`                   |

> 此节具体在书 **8.2 创建对象**