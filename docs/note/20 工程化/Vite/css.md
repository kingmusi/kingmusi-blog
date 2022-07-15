# css

## 预处理器

安装相应预处理器的包

```shell
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

## PostCss

在根目录下创建 `postcss.config.js`，并导入相应的配置

```js
module.exports = {
  plugins: {
    autoprefixer: {}
  }
}
```

## CSS Modules

导入任何以 `.module.css` 为后缀名的 CSS 文件，都会返回一个相应的模块对象

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

预处理器也可以使用