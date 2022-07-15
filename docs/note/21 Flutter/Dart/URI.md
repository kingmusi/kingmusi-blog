# URI

## 编码与解码

使用 `encodeFull()` 和 `decodeFull()` 方法，对 URI 中除了特殊字符（例如 `/`， `:`， `&`， `#`）以外的字符进行编解码，这些方法非常适合编解码完整合法的 URI，并保留 URI 中的特殊字符

```dart
var uri = 'https://example.org/api?foo=some message';

var encoded = Uri.encodeFull(uri);
assert(encoded == 'https://example.org/api?foo=some%20message');

var decoded = Uri.decodeFull(encoded);
assert(uri == decoded);
```

## 解析 URI

```dart
var uri = Uri.parse('https://example.org:8080/foo/bar#frag');

assert(uri.scheme == 'https');
assert(uri.host == 'example.org');
assert(uri.path == '/foo/bar');
assert(uri.fragment == 'frag');
assert(uri.origin == 'https://example.org:8080');
```

## 构建 URI

```dart
var uri = Uri(
    scheme: 'https',
    host: 'example.org',
    path: '/foo/bar',
    fragment: 'frag');

assert(uri.toString() == 'https://example.org/foo/bar#frag');
```

S