# 像素滤镜

## **灰度效果**（黑白）

灰度图（grayscale）就是取红、绿、蓝三个像素值的算术平均值

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const oImg = document.createElement('img')
oImg.src = '/logo.svg'
oImg.onload = () => {
  ctx.drawImage(oImg, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(
  	grayscale(imageData),
    0, 0
  )
}

function grayscale (pixels) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
  }
  return pixels;
};
```

:::

## 调整亮度

亮度效果（brightness）是指让图像变得更亮或更暗。算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const oImg = document.createElement('img')
oImg.src = '/logo.svg'
oImg.onload = () => {
  ctx.drawImage(oImg, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(
  	brightness(imageData, -20),
    0, 0
  )
}

function brightness (pixels, delta) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    d[i] += delta;     // red
    d[i + 1] += delta; // green
    d[i + 2] += delta; // blue
  }
  return pixels;
};
```

:::

## 透明度滤镜

透明度滤镜（opacity）通过调整 alpha 通道来控制图像的透明度。alpha 值范围是 0-255，0 表示完全透明，255 表示完全不透明。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const oImg = document.createElement('img')
oImg.src = '/logo.svg'
oImg.onload = () => {
  ctx.drawImage(oImg, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(
  	opacity(imageData, 0.5),
    0, 0
  )
}

function opacity (pixels, alpha) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    d[i + 3] = Math.round(255 * alpha); // alpha channel
  }
  return pixels;
};
```

:::

## 模糊滤镜

模糊滤镜（blur）通过高斯模糊算法来创建自然的模糊效果。高斯模糊使用高斯分布权重，让中心像素对结果影响最大，周围像素影响逐渐减小。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const oImg = document.createElement('img')
oImg.src = '/logo.svg'
oImg.onload = () => {
  ctx.drawImage(oImg, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(
  	gaussianBlur(imageData, 3),
    0, 0
  )
}

function gaussianBlur (pixels, radius) {
  var d = pixels.data;
  var width = pixels.width;
  var height = pixels.height;
  
  // 生成高斯矩阵
  var gaussMatrix = [];
  var gaussSum = 0;
  var x, y, r, g, b, a, i, j, k, gaussSum;
  
  for (i = -radius; i <= radius; i++) {
    gaussMatrix[i + radius] = Math.exp(-(i * i) / (2 * radius * radius));
    gaussSum += gaussMatrix[i + radius];
  }
  
  // 归一化高斯矩阵
  for (i = 0; i < gaussMatrix.length; i++) {
    gaussMatrix[i] /= gaussSum;
  }
  
  // x 方向一维高斯运算
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = x + j;
        if (k >= 0 && k < width) {
          i = (y * width + k) * 4;
          r += d[i] * gaussMatrix[j + radius];
          g += d[i + 1] * gaussMatrix[j + radius];
          b += d[i + 2] * gaussMatrix[j + radius];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      d[i] = r / gaussSum;
      d[i + 1] = g / gaussSum;
      d[i + 2] = b / gaussSum;
    }
  }
  
  // y 方向一维高斯运算
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = y + j;
        if (k >= 0 && k < height) {
          i = (k * width + x) * 4;
          r += d[i] * gaussMatrix[j + radius];
          g += d[i + 1] * gaussMatrix[j + radius];
          b += d[i + 2] * gaussMatrix[j + radius];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      d[i] = r / gaussSum;
      d[i + 1] = g / gaussSum;
      d[i + 2] = b / gaussSum;
    }
  }
  
  return pixels;
};
```

:::

## 马赛克滤镜

马赛克滤镜（mosaic）通过将图像分割成小块，并用每个块的平均颜色填充来创建马赛克效果。

:::demo

```html
<canvas width="300" height="300" style="background-color: #ccc" />
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const oImg = document.createElement('img')
oImg.src = '/logo.svg'
oImg.onload = () => {
  ctx.drawImage(oImg, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.putImageData(
  	mosaic(imageData, 6),
    0, 0
  )
}

function mosaic (pixels, blockSize) {
  var d = pixels.data;
  var width = pixels.width;
  var height = pixels.height;
  
  for (var y = blockSize; y <= height; y = y + blockSize) {
    for (var x = blockSize; x <= width; x = x + blockSize) {
      var r = 0, g = 0, b = 0;
      
      // 计算块内所有像素的平均颜色
      for (var dy = -blockSize; dy <= blockSize; dy++) {
        for (var dx = -blockSize; dx <= blockSize; dx++) {
          var nx = x + dx;
          var ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            var idx = (ny * width + nx) * 4;
            r += d[idx];
            g += d[idx + 1];
            b += d[idx + 2];
          }
        }
      }
      
      var total = (2 * blockSize + 1) * (2 * blockSize + 1);
      var avgR = r / total;
      var avgG = g / total;
      var avgB = b / total;
      
      // 用平均颜色填充整个块
      for (var dy = -blockSize; dy <= blockSize; dy++) {
        for (var dx = -blockSize; dx <= blockSize; dx++) {
          var nx = x + dx;
          var ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            var idx = (ny * width + nx) * 4;
            d[idx] = avgR;
            d[idx + 1] = avgG;
            d[idx + 2] = avgB;
          }
        }
      }
    }
  }
  
  return pixels;
};
```

:::