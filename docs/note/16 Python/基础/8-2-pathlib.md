# pathlib

```markmap
# pathlib
## 📁 获取目录
- cwd()：当前工作目录
- home()：用户主目录
- parent：父目录
## 🔗 目录拼接
- / 运算符
## 🏗️ 创建/删除目录
- mkdir()：创建目录
- rmdir()：删除空目录
## 📄 读写文件
- write_text()/read_text()：文本
- write_bytes()/read_bytes()：二进制
## 🧩 路径部分
- name/stem/suffix/parent/parts
- resolve()：绝对路径
## ❓ 路径判断
- exists()/is_file()/is_dir()
## 📊 文件统计
- stat()：文件信息
- iterdir()：目录遍历
## 🔍 匹配查找
- glob()/rglob()
```

> **总结**：`pathlib` 是 Python 3.4+ 引入的面向对象的文件系统路径操作模块，极大提升了代码的可读性和易用性。它统一了不同操作系统下的路径处理方式，是现代 Python 文件与目录操作的首选。`Path` 对象可直接用于 `open()`、`os` 等标准库函数

---

## 🌟 基本概念

- `pathlib` 提供了 `Path` 类（及其子类），用于表示文件系统路径。
- 支持多种操作系统（Windows、Linux、macOS），自动处理路径分隔符。

```python
from pathlib import Path
```

---

## 📁 获取目录与目录拼接

### 获取当前目录、用户主目录、父目录

```python
Path.cwd()         # 获取当前工作目录
Path.home()        # 获取用户主目录
Path('/Users/tal/Desktop').parent  # 获取父目录
```

### 路径拼接（推荐用 `/` 运算符）

```python
p = Path('/Users/tal')
new_path = p / 'Desktop' / 'test'  # 推荐写法，自动处理分隔符
print(new_path)
```
> **重点**：`/` 运算符是 `pathlib` 的语法糖，**比字符串拼接更安全、更直观**。

## 🏗️ 创建与删除目录

### 创建目录

```python
p = Path('new_folder')
p.mkdir()  # 创建单层目录
# p.mkdir(parents=True, exist_ok=True)  # 创建多层目录，已存在不报错
```
> `parents=True` 递归创建多级目录，`exist_ok=True` 目录已存在时不会抛异常。

### 删除目录

```python
p.rmdir()  # 只能删除空目录
```
> 只能删除空目录，**非空目录需用 `shutil.rmtree()`**。

## 📄 文件读写

### 写文件

```python
p = Path('example.txt')
p.write_text('Hello, pathlib!')  # 写入文本
p.write_bytes(b'Binary data')    # 写入二进制
```

### 读文件

```python
text = p.read_text()     # 读取文本
data = p.read_bytes()    # 读取二进制
```
> `write_text`/`read_text` 方法从 **Python 3.5** 开始支持。  
> 在 Python 3.4 中可用 `open()` 配合 `Path` 对象实现读写。

## 🧩 获取文件路径的不同部分

```python
p = Path('/Users/tal/Desktop/test/example.txt')
print(p.name)      # 文件名: example.txt
print(p.stem)      # 主体名: example
print(p.suffix)    # 后缀: .txt
print(p.parent)    # 父目录: /Users/tal/Desktop/test
print(p.parts)     # 所有部分: ('/', 'Users', 'tal', 'Desktop', 'test', 'example.txt')
print(p.resolve()) # 文件的完整路径：/Users/tal/Desktop/test/example.txt
```
> **重点**：`parts` 属性返回一个元组，**便于跨平台处理路径**。  
> `resolve()` 会返回绝对路径，并解析符号链接。

## ❓ 路径是否存在

```python
p = Path('example.txt')
print(p.exists())      # 路径是否存在
print(p.is_file())     # 是否为文件
print(p.is_dir())      # 是否为目录
```

## 📊 文件统计

- 目录子文件信息

```python
p = Path('/Users/tal/Desktop/test')
for child in p.iterdir():
    print(child)
```
> `iterdir()` 只能用于目录，**不能用于文件路径**，返回的是一个生成器类型。

- 文件信息

```python
p = Path('example.txt')
stat = p.stat()
print(stat.st_size)    # 文件大小（字节）
print(stat.st_mtime)   # 最后修改时间（时间戳）
```
> `stat()` 返回一个类似 `os.stat_result` 的对象，包含文件的详细信息。

## 🔍 匹配与查找

### 匹配文件（glob）

```python
p = Path('.')
for file in p.glob('*.py'):  # 匹配当前目录下所有 .py 文件
    print(file)
```

### 递归查找（rglob）

```python
for file in p.rglob('*.txt'):  # 递归查找所有 .txt 文件
    print(file)
```
> `rglob` 是 `pathlib` 的递归查找方法，**比 `os.walk` 更简洁**。
