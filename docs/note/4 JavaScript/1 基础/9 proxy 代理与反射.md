# proxy 代理与反射

## 基础

##### 1. 代理目的

- 定义捕获器。当调用代理对象基本操作时，可以拦截并修改相应行为

##### 2. 代理原始行为

- 全局 **Reflect** 对象上的同名方法可以构建原始行为

  ```js
  const proxy = new Proxy({}, {
      get() {
          return Reflect.get(...arguments)
      }
  })
  ```

##### 3. 撤销代理

- 在某些情况，要中断代理对象与目标对象的联系，可以撤销代理，撤销后再调用代理会抛出错误。

  ```js
  const { proxy, revoke } = Proxy.revocable({foo: 'foo'}, {})
  revoke()
  proxy.foo // 报错
  ```

> 对原始对象的操作不会触发拦截，只有对代理操作才会拦截

## get

- 参数

| 参数     | 说明                           |
| -------- | ------------------------------ |
| target   | 目标对象                       |
| property | 引用的目标对象上的字符串键符号 |
| receiver | 代理对象                       |

- 返回值：无限制

- 拦截的操作
  - **proxy.property**
  - **proxy[property]**
  - **Object.create(proxy)[property]**
  - **Reflect.get(proxy, property, receiver)**

```js
// 有返回值，没有返回提示
let arr = [1, 2, 3]

const arrProxy = new Proxy(arr, {
	get(target, property, recevier) {
		return property in target ? target[property] : '没有对应下标的值'
	}
})

console.log( arrProxy[1] ) // 2
console.log( arrProxy[5] ) // 没有对应下标的值
```

## set

- 参数

| 参数     | 说明                           |
| -------- | ------------------------------ |
| target   | 目标对象                       |
| property | 引用的目标对象上的字符串键符号 |
| value    | 要赋给属性的值                 |
| receiver | 代理对象                       |

- 返回值：返回 **true** 表示成功；返回 **false** 表示失败，严格模式下会抛出 **TypeError**

- 拦截的操作
  - **proxy.property = value**
  - **proxy[property] = value**
  - **Object.create(proxy)[property] = value**
  - **Reflect.set(proxy, property, value, receiver)**

```js
// 根据代表数字设置不同的性别字符串
const obj = { sex: 'male' }

const objProxy = new Proxy(obj, {
	set(target, property, value, recevier) {
		if (value === 0) {
			target[property] = 'male'
		} else if (value === 1) {
			target[property] = 'famale'
		} else {
			target[property] = 'unknown'
		}
        return true
	}
})

objProxy.sex = 1
console.log(objProxy.sex) // famale
```

## has

- 参数

| 参数     | 说明                           |
| -------- | ------------------------------ |
| target   | 目标对象                       |
| property | 引用的目标对象上的字符串键符号 |

- 返回值：必须返回布尔值，表示属性是否存在

- 拦截的操作
  - **property in proxy**
  - **property in Object.create(proxy)**
  - **with(proxy){ (property) }**
  - **Reflect.has(proxy, property)**

```js
// 数字是否在某个范围内
const range = {
	start: 1,
	end: 5
}

const rangeProxy = new Proxy(range, {
	has(target, property) {
		return property >= target.start && property <= target.end
	}
})
console.log( 2 in rangeProxy ) // true
console.log( 9 in rangeProxy ) // false
```

## deleteProperty

- 参数

| 参数     | 说明                           |
| -------- | ------------------------------ |
| target   | 目标对象                       |
| property | 引用的目标对象上的字符串键符号 |

- 返回值：必须返回布尔值，表示删除属性是否存在

- 拦截的操作
  - **delete proxy.property**
  - **delete proxy[property]**
  - **Reflect.deleteProperty(proxy, property)**

```js
const user = {
	id: 1,
	username: 'kingmusi'
}

const userProxy = new Proxy(user, {
	deleteProperty(target, property) {
		if (property !== 'id') {
			return Reflect.deleteProperty(target, property)
		}
	}
})

delete userProxy.id // false
console.log(userProxy) // {id: 1, username: "kingmusi"}
```

## ownKeys

- 参数

| 参数   | 说明     |
| ------ | -------- |
| target | 目标对象 |

- 返回值：必须返回包含字符串或符号的可枚举对象

- 拦截的操作
  - **Object.getOwnPropertyNames(proxy)**
  - **Object.getOwnPropertySymbols(proxy)**
  - **Object.keys(proxy)**
  - **Reflect.ownKeys(proxy)**

```js
// 不显示 password
const user = {
	id: 1,
	username: 'kingmusi',
	password: '123'
}

const userProxy = new Proxy(user, {
	ownKeys(target) {
		return Object.keys(target).filter(key => key !== 'password')
	}
})

for(const key in userProxy){
	console.log(key)
} // id username
```

## apply

- 参数

| 参数          | 说明                   |
| ------------- | ---------------------- |
| target        | 目标对象               |
| thisArg       | 调用函数时的 this 参数 |
| argumentsList | 调用函数时的参数列表   |

- 返回值：无限制

- 拦截的操作
  - **proxy(...argumentsList)**
  - **Function.prototype.apply(thisArg, argumentsList)**
  - **Function.prototype.call(thisArg, ...argumentsList)**
  - **Reflect.apply(target, thisArg, argumentsList)**

```js
// 验证参数类型
function pushNumber(arr, number) {
    arr.push(number)
}

const funProxy = new Proxy(pushNumber, {
    apply(target, thisArg, argumentsList) {
        if (!Array.isArray(argumentsList[0])) {
            throw '第一个参数不是数组'
        }
        if (typeof argumentsList[1] !== 'number') {
            throw '第二个参数不是数值类型'
        }
        return Reflect.apply(...arguments)
    }
})

funProxy([1], '2') // 第二个参数不是数值类型
```

## construct

- 参数

| 参数          | 说明                 |
| ------------- | -------------------- |
| target        | 目标对象             |
| argumentsList | 调用函数时的参数列表 |
| newTarget     | 最初被调用的构造函数 |

- 返回值：目标构造函数

- 拦截的操作
  - **new proxy(...argumentsList)**
  - **Reflect.construct(target, argumentsList, newTarget)**

```js
// 必须给构造函数传参正确
class User {
    constructor(id) {
        this.id = id
    }
}

const UserProxy = new Proxy(User, {
    construct(target, argumentsList, newTarget) {
        if (argumentsList[0] === undefined) {
            throw '第一个参数为 undefined'
        } else {
            return Reflect.construct(...arguments)
        }
    }
})

new UserProxy() // 第一个参数为 undefined
```

