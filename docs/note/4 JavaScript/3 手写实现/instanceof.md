# instanceof

```js
function myinstanceof(left, right) {
  const origin = right.prototype
  let proto = left.__proto__
  while (proto) {
    if (proto === origin) return true
    proto = proto.__proto__
  }
  return false
}
```

