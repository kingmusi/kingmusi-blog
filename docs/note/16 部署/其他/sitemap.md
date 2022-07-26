# sitemap

> 站点地图是网站管理员向搜索引擎通知其网站上可用于抓取的网页的简便方法，可提高网站排名、SEO

## 生成

使用 `sitemap` 库生成

```shell
npm i sitemap --save
```

生成一个 js 文件

```js
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')
const { join } = require('path')

/**
 * 对应页
 * url：相对 host 的路径
 * changefreq：更新时间
 * priority：优先级（0 ～ 1）
 * lastmod：上次更新时间
*/
const links = [{ url: '/page-1/', changefreq: 'weekly', priority: 0.3, lastmod: '202-07-26' }]

// host
const stream = new SitemapStream({ hostname: 'https://www.kingmusi.xyz' })

streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  fs.writeFileSync(join(__dirname, 'sitemap.xml'), data)
)
```

通过 `node xx.js` 执行，就会多出一个 `sitemap.xml` 文件

## 提交

[google](https://search.google.com/search-console) -- 站点地图

[百度](https://ziyuan.baidu.com/linksubmit/index) -- sitemap

[360](https://zhanzhang.so.com/sitetool/sitemap) -- sitemap 提交





