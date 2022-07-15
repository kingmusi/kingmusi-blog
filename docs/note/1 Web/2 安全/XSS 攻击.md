# XSS 攻击

## 原理

- 攻击者通过在目标网站上注入`恶意脚本`，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 **Cookie**、**SessionID** 等，进而危害数据安全。

  ```html
  <input type="text" value="用户更新前的信息" />
  
  <!-- 加入我在输入框输入 " /><script>alert('XSS');</script> -->
  <input type="text" value="" /> 
  <script>alert('XSS');</script>
  "> 
  ```

## 防范

- 前端防范：输入过滤（和对 **”<”,”>”,”;”,”’”** 等字符 做过滤、**encode**）、设置头 **httponly** —— 禁止**javascript**脚本来访问**cookie**

