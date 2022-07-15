# 初始化CSS

## 为什么

因为`浏览器的兼容问题`，不同浏览器对有些标签的默认值是不同的，如果没对 **CSS** 初始化往往会出现浏览器之间的⻚⾯显示差异

初始化样式会对 `SEO `有⼀定的影响，但⻥和熊掌不可兼得，但⼒求影响最⼩的情况下初始

## Reset CSS

通常在网页开发中，要去掉这些影响尺寸和位置的默认样式及其他影响布局的默认值

```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
```

## Normalize CSS

由于**Reset CSS**相对暴力，不管你有没有用，统统重置成一样的效果，且影响的范围很大，所以更加平和的一种方式**Normalize CSS**诞生了

- 保护有用的浏览器默认样式而不是完全去掉它们
- 一般化的样式：为大部分 **HTML** 元素提供
- 修复浏览器自身的 **bug** 并保证各浏览器的一致性
- 优化 **CSS** 可用性：用一些小技巧
- 解释代码：用注释和详细的文档来

```css
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
main {
  display: block;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
a {
  background-color: transparent;
}
abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
img {
  1 border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}
progress {
  vertical-align: baseline;
}
textarea {
  overflow: auto;
}
[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
details {
  display: block;
}
summary {
  display: list-item;
}
template {
  display: none;
}
[hidden] {
  display: none;
}
```

## 结合二者

会采用**Normalize CSS**和**Reset CSS**结合代码，形成一个更加强大的方案

```css
@charset "utf-8";

/* --------------------重置样式-------------------------------- */
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0
}

/*设置默认字体*/
body {
  font-size: 14px;
  font-style: normal;
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji
}

/*字体太小用户体检不好，让small恢复12px*/
small {
  font-size: 12px
}

h1 {
  font-size: 18px
}

h2 {
  font-size: 16px
}

h3 {
  font-size: 14px
}

h4,
h5,
h6 {
  font-size: 100%
}

ul,
ol {
  list-style: none
}

a {
  text-decoration: none;
  background-color: transparent
}

a:hover,
a:active {
  outline-width: 0;
  text-decoration: none
}

/*重置表格*/
table {
  border-collapse: collapse;
  border-spacing: 0
}

/*重置hr*/
hr {
  border: 0;
  height: 1px
}

/*图形图片*/
img {
  border-style: none
}

img:not([src]) {
  display: none
}

svg:not(:root) {
  overflow: hidden
}

/*下面的操作是针对于html5页面布局准备的，不支持ie6~8以及其他低版本的浏览器*/
html {
  /*禁用系统默认菜单*/
  -webkit-touch-callout: none;
  /*关闭iphone  &  Android的浏览器纵向和横向模式中自动调整字体大小的功能*/
  -webkit-text-size-adjust: 100%
}

input,
textarea,
button,
a {
  /*表单或者a标签在手机点击时会出现边框或彩色的背景区域，意思是去除点击背景框*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

/*重置html5元素的默认样式*/
article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
  display: block
}

audio,
canvas,
progress,
video {
  display: inline-block
}

audio:not([controls]),
video:not([controls]) {
  display: none;
  height: 0
}

progress {
  vertical-align: baseline
}

mark {
  background-color: #ff0;
  color: #000
}

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline
}

sub {
  bottom: -0.25em
}

sup {
  top: -0.5em
}

button,
input,
select,
textarea {
  font-size: 100%;
  outline: 0
}

button,
input {
  overflow: visible
}

button,
select {
  text-transform: none
}

textarea {
  overflow: auto
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px
}

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none
}

::-webkit-input-placeholder {
  color: inherit;
  opacity: .54
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit
}
```

