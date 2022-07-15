# JSONP

```js
function jsonP(path, params = {}, callback = 'callback') {
  const url = Object.keys(params).reduce((u, k) => `${u}${k}=${params[k]}&`, `${path}?`)

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${url}callback=${callback}`
    script.onerror = reject

    window[callback] = function (res) {
      try {
        resolve(res)
      } catch (e) {
        reject(e)
      } finally {
        document.body.removeChild(script)
      }
    }

    document.body.appendChild(script)
  })
}

jsonP('http://appbase.ot-hs.com:19990/r.html', {
  code: 'CA1998',
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
```

