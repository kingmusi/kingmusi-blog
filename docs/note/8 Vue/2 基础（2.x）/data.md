# data

## vue 实例

`vue`实例的时候定义`data`属性既可以是一个对象，也可以是一个函数

```js
const app = new Vue({
  el: "#app",
  // 对象格式
  data: {
    foo: "foo"
  },
  // 函数格式
  data() {
    return {
      foo: "foo"
    }
  }
})
```

## vue 组件

**组件 data 必须是一个函数**，为什么？

data 是在组件的 prototype 中，如果是一个对象，就会如下

```js
function Component() {}
Component.prototype.data = {
  count: 0
}
```

创建两个组件实例，改变组件 A 中 data 的某一个属性，就同时修改组件 B 中的 data，因为其指向同一个地址

```js
const componentA = new Component()
const componentB = new Component()

console.log(componentB.data.count) // 0
componentA.data.count = 1
console.log(componentB.data.count) // 1
```

如果采用函数的形式，就不会出现这种情况，因为函数执行会重新生成一个内存地址

```js
function Component() {
  this.data = this.data()
}
Component.prototype.data = function () {
  return {
    count: 0
  }
}
```

## 非/响应式数据

vue2 中刚开始定义在 data 中的数据，都会通过 `Object.defineProperty` 实现一遍数据响应式

#### 定义非响应式数据

有一些静态数据，不会在模板上体现响应式变化，这个时候就可以定义为非响应式数据，减少创建响应式数据的时间

```js
create() {
  this.staticData = ['1', '2']
}
```

#### 数组响应式数据

只能通过 `push、pop、shift、unshift、splice` 和直接改变数组地址，才会触发响应式更新

直接改变下标的值不会触发响应式改变

```js
data() {
  return {
    arr: [1, 2, 3]
  }
},
methods: {
  changeArr() {
    this.staticData[0] = 4 // 模板中不会响应式改变
  }
}
```

#### 对象响应式数据

直接改变对象某个属性的值和直接改变数组地址，才会触发响应式更新

增加和删除属性，不会触发响应式改变

```js
data() {
  return {
    obj: {
      a: 'a'
    }
  }
},
methods: {
  changeArr() {
    this.obj.b = 'b' // 模板中不会响应式改变
    delete this.obj.a
  }
}
```

#### 如何实现上面两种的响应式更新？

更新数组某个下标的值，或新增对象属性

1. `Vue.set( target, propertyName/index, value )`
   - `{Object | Array} target`
   - `{string | number} propertyName/index`
   - `{any} value`

删除对象属性

2. `Vue.delete( target, propertyName/index )`
   - `{Object | Array} target`
   - `{string | number} propertyName/index`

迫使`Vue` 实例重新渲染

3. `$forceUpdate`
