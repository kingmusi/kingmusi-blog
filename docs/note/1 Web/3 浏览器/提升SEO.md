# 提升SEO

## 使用合理的 title、description、keywords

- **title**：页面的主题，应该为每个页面都创建一个唯一的主题
- **description**：概括总结网页内容
- **keywords**：页面的重要关键词

```html
<head>
	<title></title>
  <meta name="description" content="">
  <meta name="keywords" content="">
</head>
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202202202013164.png)

> 1. `<title>`、` meta description` 和` meta` `keywords` 三者的权重依次减小
> 2. 不能大量堆砌关键字，搜索引擎可能会降低这个网站的排名甚至将其列入黑名单

## 使用语义化标签

- 使用 `<h1>` 标志 logo

  ```html
  <h1>
    <!-- logo 图片使用 background 设置 -->
  	<a href="www.jingdong.com">京东</a>
  </h1>
  ```

- 使用 `<strong>` 标签标志强调内容

- 使用正确的标签标识正确的内容

## `<img>` 的 alt 属性

搜索引擎可抓取到 alt 的内容

## `rel='nofollow'`

对于不需要抓取的 `<a>` 链接，如广告等，使用 `rel='nofollow'` 标识，不然搜索引擎跳转后就不会再回到原本要爬取的页面了

## 扁平化网站层次

一个页面尽可能再点击三次内，进入下一个页面，否则搜索引擎会不愿意再往下爬取

用户在操作一个网页一样，层级大于 3 就很影响用户体验了，“爬虫”就是模仿用户的心理

## 合理安排重要内容的位置

重要内容尽可能在 **html** 的最前面，搜索引擎抓取 **HTML** 顺序是从上到下，有的搜索引擎对抓 取⻓度有限制，保证重要内容⼀定会被抓取 

重要内容不要用 **js** 输出，因为爬⾍不会抓取 **js** 获取内容 

## 提高网页加载速度

一旦加载超时，搜索引擎就会放弃爬取

## 框架提升 SEO

做好上面的提升技巧

1. 把每个单页通过 ssr 服务器端渲染
2. 通过 ssg 把每个单页都静态打包，路由使用 history 路由模式，nginx 再配置每个单页要对应读取的 html 文件

```shell
# ssg 静态打包后的文件目录结构层次如下
home
	index.html
about
	index.html
detail
	index.html
```

3. 利用路由守卫，动态设置每个单页的 title、description、keywords

```js
const route = [
  {
    path: '/home',
    name: "Home",
    component: Home,
    meta: {
      "title": "xxx",
      "description": "xxx",
      "keywords": "xxx"
    }
  }
]

router.beforeEach((to, from, next) => {
  const { title, description, keywords } = to.meta
  document.title = title
  document.querySelector('meta[name="description"]').setAttribute('content', description)
  document.querySelector('meta[name="keywords"]').setAttribute('content', keywords)
})
```



