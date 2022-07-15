# 虚拟DOM和diff算法

## 价值

- 虚拟 DOM 比直接操作真实 DOM ，但是虚拟DOM算法在中大型项目上，性能比直接操作真实 DOM 更高
- 虚拟DOM算法 = 虚拟DOM + Diff算法

## 虚拟DOM

通过模板编译，使用 `createElement(tag,  props, children)` 创建`虚拟 dom`

```html
<div id="div1" class="container">
    <p>a</p>
    <div style="font-size: 20px">b</div>
</div>
```

```javascript
{
    tag: 'div',
    props: {
        id: 'div1',
        className: 'container'
    },
    children: [
        {
            tag: 'p',
           	chilren: 'a'
        },
        {
            tag: 'div',
            prosp: {style: 'font-size: 20px'},
            chilren: 'b'
        }
    ]
}
```

## diff算法

#### 算法复杂度

- 如果把旧的 **dom** 扫描一遍，把新的 **dom** 扫描一遍，最后再比较新旧 **dom** 的不同，这样将去到恐怖的 $O(n^3)$
- **diff** 算法把时间复杂度从 $O(n^3)$ 优化到 $O(n)$
- 只比较同一层级，不跨级比较

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/批注 2020-07-22 171131.png)

#### sameVnode 方法

判断是否为同一类型节点

```js
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
  )
}
```

#### patch 方法

对比当前同层的虚拟节点是否为同一种类型的标签

- 是：继续执行`patchVnode方法`进行深层比对
- 否：没必要比对了，直接整个节点替换成`新虚拟节点`

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2020_12_17.png)

#### updateChildren 方法

使用 `首尾指针法` 对比新旧虚拟节点的子节点

1. `oldS` 和 `newS` 使用 sameVnode 比较，如果相同，深度比较两个对应的节点，oldS 和 newS 右移
2. `oldE` 和 `newE` 使用 sameVnode 比较，如果相同，深度比较两个对应的节点，oldE 和 newE 左移
3. `oldS` 和 `newE` 使用 sameVnode 比较，如果相同，深度比较两个对应的节点，oldS 左移，newE 右移
4. `oldE` 和 `newS` 使用 sameVnode 比较，如果相同，深度比较两个对应的节点，oldE 右移，newS 左移
5. 把旧子节点的 `key` 做一个映射到旧节点下标的 `key -> index` 表，然后寻找 `newS` 对应 key 在旧子节点中的 vnode，并把其更新到 `oldS` 对应 dom 前

```js
function updateChildren(parentElm, oldCh, newCh) {
  let oStart = 0, nStart = 0
  let oEnd = oldCh.length - 1, nEnd = newCh.length - 1
  let oStartVnode = oldCh[oStart], oEndVnode = oldCh[oEnd]
  let nStartVnode = newCh[nStart], nEndVnode = newCh[nEnd]
  let mapOldKeyToIndex

  while (oStart <= oEnd && nStart <= nEnd) {
    if (oStartVnode == null) {
      oStartVnode = oldCh[++oStart]
    } else if (oEndVnode == null) {
      oEndVnode = oldCh[--oEnd]
    } else if (nStartVnode == null) {
      nStartVnode = newCh[++nStart]
    } else if (nEndVnode == null) {
      nEndVnode = newCh[--nEnd]
    } else if (sameVNode(oStartVnode, nStartVnode)) {
      // 继续深度比较，并把指针右移
      patchVnode(oStartVnode, nStartVnode)
      oStartVnode = oldCh[++oStart]
      nStartVnode = newCh[++nStart]
    } else if (sameVNode(oEndVnode, nEndVnode)) {
      // 继续深度比较，并把指针左移
      patchVnode(oEndVnode, nEndVnode)
      oEndVnode = oldCh[--oEnd]
      nEndVnode = newCh[--nEnd]
    } else if (sameVNode(oStartVnode, nEndVnode)) {
      // 因为在 newCh 中，vnode 在最后，所以把旧头子节点，更新到末尾
      patchVnode(oStartVnode, nEndVnode)
      api.insertBefore(parentElm, oStartVnode.el, api.nextSibling(oEndVnode.el))
      oStartVnode = oldCh[++oStart]
      nEndVnode = newCh[--nEnd]
    } else if (sameVNode(oEndVnode, nStartVnode)) {
      // 因为在 newCh 中，vnode 在最前，所以把旧尾子节点，更新到头部
      patchVnode(oEndVnode, nStartVnode)
      api.insertBefore(parentElm, oEndVnode.el, api.nextSibling(oStartVnode.el))
      oEndVnode = oldCh[--oEnd]
      nStartVnode = newCh[++nStart]
    } else {
      if (mapOldKeyToIndex === undefined) {
        // 没有映射表，则创建映射表
        mapOldKeyToIndex = createOldKeyToIndex(oldCh, oStart, oEnd)
      }
      // 寻找旧子节点中，可复用的 newS 对应的 vnode
      const index = mapOldKeyToIndex[nStartVnode.key]
      if (!index) {
        // 如果找不到，证明是新增的，向 oldS 前新增
        api.insertBefore(parentElm, createElement(nStartVnode).el, oStartVnode.el)
      } else {
        // 如果找到，证明可复用，把旧子节点中可复用的节点，移动到 oldS 前
        const vNode = oldCh[index]
        patchVnode(vNode, nStartVnode)
        api.insertBefore(parentElm, vNode.el, oStartVnode.el)
        oldCh[index] = null
      }
      nStartVnode = newCh[++nStart]
    }
  }

  if (oStart > oEnd) {
    // oldCh 先遍历完，证明 newCh 比 oldCh 多，所以需要把多出的节点新增进去
    const before = newCh[nEnd] ? newCh[nEnd].el : null
    addVnodes(parentElm, before, newCh, nStart, nEnd)
  } else if (nStart > nEnd) {
    // 反之，则要删除多出的节点
    removeVnodes(parentElm, oldCh, oStart, oEnd)
  }
}
```

#### 举例

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202203151832609.png)

