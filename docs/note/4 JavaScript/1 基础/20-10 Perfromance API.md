# Perfromance API

## now()

提供精度相对较高的时间计算

1. `window.performance.now()`返回的时间戳没有被限制在一毫秒的精确度内，相反，它们以浮点数的形式表示时间，精度最高可达微秒级

2. `window.performance.now()`是从 0 开始，以一个恒定的速率慢慢增加的，它不会受到系统时间的影响

   ```js
   const relaticeTime = performance.now()
   // performance.timeOrigin 会返回 now 计时器为 0 时的全局系统时钟的值
   const absoluteTime = performance.timeOrigin + relaticeTime
   
   console.log(relaticeTime) // 8479.89999999851
   console.log(absoluteTime) // 1656415861159.7998
   ```

## getEntries()

获取浏览器的性能时间线

#### `getEntries('navigation')`

描述页面是何时以及如何加载的

```js
// demo
{
    "name": "https://www.kingmusi.xyz/detail/3aa95d35-4a56-428b-b2c0-9a8fc8221fe8",
    "entryType": "navigation",
    "startTime": 0,
    "duration": 654.7999999970198,
    "initiatorType": "navigation",
    "nextHopProtocol": "h2",
    "workerStart": 0,
    "redirectStart": 0,
    "redirectEnd": 0,
    "fetchStart": 1.3999999985098839,
    "domainLookupStart": 1.3999999985098839,
    "domainLookupEnd": 1.3999999985098839,
    "connectStart": 1.3999999985098839,
    "connectEnd": 1.3999999985098839,
    "secureConnectionStart": 1.3999999985098839,
    "requestStart": 3,
    "responseStart": 210.60000000149012,
    "responseEnd": 211.29999999701977,
    "transferSize": 1144,
    "encodedBodySize": 844,
    "decodedBodySize": 844,
    "serverTiming": [],
    "workerTiming": [],
    "unloadEventStart": 216.39999999850988,
    "unloadEventEnd": 216.39999999850988,
    "domInteractive": 268,
    "domContentLoadedEventStart": 285,
    "domContentLoadedEventEnd": 285.8999999985099,
    "domComplete": 654.7999999970198,
    "loadEventStart": 654.7999999970198,
    "loadEventEnd": 654.7999999970198,
    "type": "reload",
    "redirectCount": 0
}
```

#### `getEntries('resource')`

描述资源加载的速度

```js
{
    "name": "https://www.kingmusi.xyz/detail/3aa95d35-4a56-428b-b2c0-9a8fc8221fe8",
    "entryType": "navigation",
    "startTime": 0,
    "duration": 654.7999999970198,
    "initiatorType": "navigation",
    "nextHopProtocol": "h2",
    "workerStart": 0,
    "redirectStart": 0,
    "redirectEnd": 0,
    "fetchStart": 1.3999999985098839,
    "domainLookupStart": 1.3999999985098839,
    "domainLookupEnd": 1.3999999985098839,
    "connectStart": 1.3999999985098839,
    "connectEnd": 1.3999999985098839,
    "secureConnectionStart": 1.3999999985098839,
    "requestStart": 3,
    "responseStart": 210.60000000149012,
    "responseEnd": 211.29999999701977,
    "transferSize": 1144,
    "encodedBodySize": 844,
    "decodedBodySize": 844,
    "serverTiming": [],
    "workerTiming": [],
    "unloadEventStart": 216.39999999850988,
    "unloadEventEnd": 216.39999999850988,
    "domInteractive": 268,
    "domContentLoadedEventStart": 285,
    "domContentLoadedEventEnd": 285.8999999985099,
    "domComplete": 654.7999999970198,
    "loadEventStart": 654.7999999970198,
    "loadEventEnd": 654.7999999970198,
    "type": "reload",
    "redirectCount": 0
}
```

