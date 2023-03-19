# vite config 常见配置

## 文件路径的别名

```js
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

## devServer

```js
export default defineConfig({
  server: {
		port: 8080, // 端口
    	open: true, // 服务器启动时自动在浏览器中打开应用程序
    	poxy: {
        '/api': {
			target: 'http://jsonplaceholder.typicode.com',
           changeOrigin: true,
        }
      }
  }
})
```

