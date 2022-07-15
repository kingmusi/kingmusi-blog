# @elastic/elasticsearch

## 环境

在 Node 中使用 ElasticSearch7

安装

```shell
npm i @elastic/elasticsearch --save
```

## 连接

创建 `client.js` 文件

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
module.exports = client
```

## 创建 index

```js
import client from './client.js'

await client.indices.create({
  index: 'student',
  body: {
    mappings: {
      properties: {
        id: { type: 'integer' },
        name: { type: 'text' }
      }
    }
  }
}, { ignore: [400] })
```

## 批量导入数据

```js
import client from './client.js'

const dataset = [{
  id: 1,
  name: 'king'
}, {
  id: 2,
  name: 'musi'
}]

const body = dataset.flatMap(doc => [{ index: { _index: 'student' } }, doc])
const { body: bulkResponse } = await client.bulk({ refresh: true, body })
// 错误提示
if (bulkResponse.errors) {
  const erroredDocuments = []
  bulkResponse.items.forEach((action, i) => {
    const operation = Object.keys(action)[0]
    if (action[operation].error) {
      erroredDocuments.push({
        status: action[operation].status,
        error: action[operation].error,
        operation: body[i * 2],
        document: body[i * 2 + 1]
      })
    }
  })
  console.log(erroredDocuments)
}

// 创建个数
const { body: { count } } = await client.count({ index: 'category' })
console.log(count)
```

## 添加单个

```js
import client from './client.js'

await client.index({
  index: 'student',
  id: '1',
  body: {
    id: 1,
    name: 'kingmusi'
  }
})
```

## 获取

根据 id

```js
const { body } = await client.get({
  index: 'student',
  id: '1'
})
```

查询

```js
const { body } = await client.search({
  index: 'student',
  refresh: true,
  body: {
    query: {
      match: {
        name: 'musi'
      }
    }
  }
})
```

## 更新

根据 id 更新

```js
await client.update({
  index: 'student',
  id: '1',
  body: {
    doc: {
      name: 'musi1'
    }
  }
})
```

批量更新（未测试，可能有误）

```js
await client.updateByQuery({
  index: 'student',
  refresh: true,
  body: {
    script: {
      lang: 'painless',
      source: 'ctx._source["house"] = "musi"'
    },
    query: {
      match: {
        name: 'musi'
      }
    }
  }
})
```

## 删除

```js
await client.deleteByQuery({
    index: 'student',
    body: {
      query: {
        match_all: {}
      }
    }
})
```

