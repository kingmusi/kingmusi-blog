# Proxy实现英文字母升降序

#### 1、设有一组无序英文名

```js
const users = ["Leanne Graham", 
               "Ervin Howell", 
               "Clementine Bauch", 
               "Patricia Lebsack", 
               "Chelsey Dietrich", 
               "Mrs. Dennis Schulist", 
               "Kurtis Weissnat", 
               "Nicholas Runolfsdottir V", 
               "Glenna Reichert", 
               "Clementina DuBuque"
]
```

#### 2、设置代理，实现升降序

```js
const proxy = new Proxy({}, {
    get(target, key) {
        if (key === 'asc') { // 升序
            return [...users].sort((a, b) => a > b ? 1 : -1)
        } else if (key === 'desc') { // 降序
            return [...users].sort((a, b) => b > a ? 1 : -1)
        } else { // 重置
            return users
        }
    }
})
```

#### 3、点击不同按钮，一行代码实现升序、降序、重置

 ```js
AscBtn.onclick = () => proxy.asc
DescBtn.onclick = () => proxy.desc
ResetBtn.onclick = () => proxy.reset
 ```

