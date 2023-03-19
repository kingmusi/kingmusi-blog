# gzip 打包

下载并在 `vite.config.js` 中使用插件

```shell
npm install vite-plugin-compression --save
```

```js
import viteCompression from 'vite-plugin-compression';
plugins: [
  viteCompression()
],
```

配置 nginx

```shell
server {
      gzip_static on;
			gzip_http_version   1.1;
}
```

