# 映射 URL 参数

## 原生实现

```js
function urlSearchParams(url = '') {
  url = decodeURI(url)
  const [, search] = url.split('?')
  if (!search) return {}
  return search.split('&').reduce((map, item) => {
    const [key, val = ''] = item.split('=')
    map[key] = val
    return map
  }, {})
}
```

## URLSearchParams

```js
function urlSearchParams(url = '') {
  const [, search] = url.split('?')
  const params = {}
  if (!search) return params
  const usp = new URLSearchParams(search)
  for (const [key, val] of usp) {
    params[key] = val
  }
  return params
}
```

