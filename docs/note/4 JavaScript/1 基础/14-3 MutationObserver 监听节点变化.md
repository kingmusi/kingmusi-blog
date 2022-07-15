# MutationObserver 监听节点变化

## 构造一个 MutationObserver 对象

调用 **MutatuibObserver** 构造函数并传入一个回调函数来创建监听器

```js
const observer = new MutationObserver(() => console.log('change'))
```

回调函数接受一个 **MutationRecord** 对象，记录了发生的变化

| 属性                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| **target**             | 被修改影响的目标节点                                         |
| **type**               | 变化的类型。<br />如果是 **attributes**，表示变化的节点的属性<br />如果是 **characterData**，表示 **Text** 或 **Comment** 节点发生变化<br />如果是 **childList**，表示节点发生变化 |
| **oldValue**           | 当启用了 **attributeOldValue** 或 **characterDataOldValue** 时，记录被替换的值。否则为 **null** |
| **attributeName**      | 对于 **attributes** 类型的变化，保存了被修改属性的名子。否则为 **null** |
| **attributeNamespace** | 对于使用了命名空间的 **attributes** 类型的变化，保存了被修改属性的名子。否则为 **null** |
| **addNodes**           | 对于 **childList** 类型的变化，保存了变化中添加节点的 **NodeList**。否则为空的 **NodeList** |
| **removeNodes**        | 对于 **childList** 类型的变化，保存了变化中删除节点的 **NodeList**。否则为空的 **NodeList** |
| **previousSibling**    | 对于 **childList** 类型的变化，保存了变化节点的前一个兄弟节点。否则为 **null** |
| **nextSibling**        | 对于 **childList** 类型的变化，保存了变化节点的后一个兄弟节点。否则为 **null** |

> 处于性能的考虑，其核心时异步回调的，每次变化都会记录到记录队列中，记录队列会添加进微任务队列。
>
> 在其返回的实例上调用 **takeRecords()**，可以清空记录队列

## Observe() 方法

通过 `observe()` 方法把监听器与 **DOM** 关联起来

- 参数
  1. 要观察其变化的 **DOM** 节点
  2. 一个 **MutationObserverInit** 对象

| 属性                      | 方法                                                         |
| ------------------------- | ------------------------------------------------------------ |
| **subtree**               | 设为 `true` 以将监视范围扩展至目标节点整个节点树中的所有节点。默认值为 `false` |
| **attributes**            | 设为 `true` 以观察受监视元素的属性值变更。默认值为 `false`   |
| **attributeFilter**       | 要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值 |
| **attributeOldValue**     | 当监视节点的属性改动时，将此属性设为 `true` 将记录任何有改动的属性的上一个值。 |
| **characterData**         | 设为 `true` 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值 |
| **characterDataOldValue** | 设为 `true` 以在文本在受监视节点上发生更改时记录节点文本的先前值。 |
| **childList**             | 设为 `true` 以监视目标节点（如果 `subtree` 为 `true`，则包含子孙节点）添加或删除新的子节点。默认值为 `false` |

##### 1. 观察属性变化

- 观察属性的添加、移除、修改。设置 **attributes**

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body, { attributes: true })

document.body.setAttribute('foo', 'bar')
document.body.removeAttribute('foo')
// [MutationRecord, MutationRecord] 
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210506221042.png)

- 可以只观察其中几个属性。设置 **attributeFilter**

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body, { attributeFilter: ['foo'] })

document.body.setAttribute('foo', 'bar')
document.body.setAttribute('baz', 'bar')
// [MutationRecord] 
```

- 想记录属性原来的值。设置 **attributeOldValue**

```js
const observer = new MutationObserver(
    mutationRecords => console.log(mutationRecords.map(item => item.oldValue))
)
observer.observe(document.body, { attributeOldValue: true })

document.body.setAttribute('foo', 'foo')
document.body.setAttribute('foo', 'bar')
// [null, "foo"]
```

##### 2. 观察字符数据

- 观察字符的添加、移除、修改。设置 **characterData**

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body.firstChild, { characterData: true })

document.body.firstChild.textContent = 'hello world'
// [MutationRecord]
```

- 想记录字符原来的值。设置 **characterDataOldValue**

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body.firstChild, { characterDataOldValue: true })

document.body.firstChild.textContent = 'hello world'
// [MutationRecord]
```

##### 3. 观察子节点

- 观察子节点变化。设置 **childList**

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body, { childList: true })

document.body.appendChild(document.createElement('div'))
// [MutationRecord]
```

- 重新排序会报告两次变化事件

```js
document.body.innerHTML = ''
document.body.appendChild(document.createElement('div'))
document.body.appendChild(document.createElement('span'))

const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body, { childList: true })

document.body.insertBefore(document.body.lastChild, document.body.firstChild)
// [MutationRecord, MutationRecord]
// 第一次时节点被移除，第二次时节点被添加
```

##### 4. 观察子树

- 观察一个元素及其后代子节点的变化。设置 **subtree**

## disconnect()

- 取消 **DOM** 和监听器的联系

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))
observer.observe(document.body, { attributes: true })

document.body.setAttribute('foo', 'bar')

observer.disconnect()

document.body.setAttribute('foo', 'baz')
// 没有日志输出
```

## 可以复用 **MutationObserver**

- 多次调用 **observe()**，可以观察多个节点

```js
const observer = new MutationObserver(mutationRecords => console.log(mutationRecords))

const childA = document.createElement('div')
document.body.appendChild(childA)
observer.observe(childA, { attributes: true })

const childB = document.createElement('span')
document.body.appendChild(childB)
observer.observe(childB, { attributes: true })

childA.setAttribute('foo', 'bar')
childB.setAttribute('foo', 'bar')
// [MutationRecord, MutationRecord]
```

