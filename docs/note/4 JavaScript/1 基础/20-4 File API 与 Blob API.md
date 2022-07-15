# File API 与 Blob APi

## File 类型

- 每一个 `<input type="file" />` 输入的文件都是一个 **FIle** 对象
- 可以通过 `new File()` 在内存中创意一个文件
  - 第一个参数是一个字符串数组。数组中的每一个元素对应着文件中一行的内容
  - 第二个参数就是文件名字符串
  - 第三个参数可以设定一些文件的属性

```js
new File(["hello world", "baibai"], fileName, { type: "text/plain" })
```

- 每个 **File** 对象都有一些只读属性

| 属性               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| `name`             | 本地系统中的文件名                                           |
| `size`             | 以字节计的文件大小                                           |
| `type`             | 包含文件 **MIME** 类型的字符串                               |
| `lastModifiedDate` | 表示文件最后修改时间的字符串<br />此属性只有 **Chrome** 实现了 |

监听 **input** 的 **change** 事件，即可获取到输入的文件

```js
const files = document.getElementsByTagName('input')[0]
files.addEventListener('change', e => {
    console.log(e.target.files)
})
```

> 拖拽事件，可以从 `event.dataTransfer.files` 中读取文件列表

## FileReader 类型

- 可以进行异步文件读取
- 提供了 4 个读取文件数据的方法和一个终止读取的方法

| 方法                         | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `readAsText(file, encoding)` | 从文件中读取纯文本内容，并保存在 **result** 属性中<br />第二个参数表示编码，是可选的 |
| `readAsDataURL(file)`        | 读取文件并将内容的数据 **URI** 保存在 **result** 属性中      |
| `readAsBinaryString(file)`   | 读取文件并将每个字符的二进制数据保存在 **result** 属性中     |
| `readAsArrayBuffer(file)`    | 读取文件并将文件内容以 **ArrayBuffer** 形式保存在 **result** 属性中 |
| `abort()`                    | 提前结束文件读取                                             |

- 还有以下几个相关事件

| 事件       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| `progress` | 读取的进度，每 **50** 毫秒触发一次。其上有 **lengthComputable**、**loaded**、**total** 属性<br />在这过程中可以读取 **FileReader** 的 **result** 属性，即使尚未包含全部数据 |
| `errror`   | 由于某种原因无法读取文件时触发。其有一个 **code** 属性<br />1：未找到文件；2：安全错误；3：读取被中断；4：文件不可读；5：编码错误 |
| `load`     | 文件成功加载后触发                                           |
| `abort`    | 调用 `abort()` 方法后触发                                    |
| `loadend`  | 在 **load**、**error**、**abort** 事件触发后，触发           |

下面进行一些演示

```js
const files = document.getElementsByTagName('input')[0]

files.addEventListener('change', e => {
    const progress = document.getElementsByTagName('progress')[0], // 进度条
          output = document.getElementById('output')               // 输出的 DOM
          file = e.target.files[0],                                  
          reader = new FileReader()
    let type = ''

    if (/image/.test(file.type)) { // 根据不同文件类型，调用不同方法
        reader.readAsDataURL(file)
        type = 'image'
    } else {
        reader.readAsText(file)
        type = 'text'
    }

    reader.addEventListener('error', error => {
        output.innerHTML = error.code
    })

    reader.addEventListener('progress', e => {
        if (e.lengthComputable) {
            progress.value = Math.round( (e.loaded / e.total) * 100)
        }
    })

    reader.addEventListener('load', () => {
        let html = ''
        switch(type) {
            case 'image':
                html = `<img src="${reader.result}" />`
                break;
            case 'text':
                html = reader.result
                break;
        }
        output.innerHTML = html
    })
})
```

## FileReadSync 类型

- 是 **FileReader** 的同步版本，拥有相同的方法和事件
- 此类型只能在工作线程中使用，因为读取文件耗时太长会影响全局

```js
// worker.js
self.onmessage = e => {
    const syncReader = new FileReaderSync()
    const result = syncReader.readAsDataURI(e.data)
    self.postMessage(result)
}
```

## Blob 类型

- 二进制大对象，是对不可修改二进制数据的封装类型

- 有两个属性：**size** 属性和 **type** 属性

  ```js
  new Blob(['<div>foo</div>'], { type: 'text/html' }) // Blob {size: 14, type: "text/html"}
  ```

- 有一个方法：`slice()` 用于进一步切分数据。如读取文件的前 32 个字节

```js
const files = document.getElementsByTagName('input')[0]

files.addEventListener('change', e => {
    const reader = new FileReader(),
          blob = blobSlice(e.target.files[0], 0, 32)

    if (blob) {
        reader.readAsText(blob)
        reader.addEventListener('load', () => {
            console.log(reader.result)
        })
    }
})
```

## 获取内存图片

- 可以使用 `window.URL.createObjectURL()` 方法，返回一个指向内存中地址的字符串

```js
const files = document.getElementsByTagName('input')[0]

files.addEventListener('change', e => {
    const output = document.getElementById('output')
          file = e.target.files[0],
          url = window.URL.createObjectURL(file)
    if (url) {
        if (/image/.test(file.type)) {
            output.innerHTML = `<img src=${url} />`
        } else {
            output.innerHTML = 'it is not a image'
        }
    }
})
```



