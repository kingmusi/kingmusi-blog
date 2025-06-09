# 模块-`__init__`

## 作用

一个包下创建一个 `__init__.py` 文件：

1. 明确目录为包：在一个目录下创建 `__init__.py` 文件，可以把这个目录标识为这是一个包
2. 执行初始化逻辑：包在被导入的时候，会执行 `__init__.py` 中的代码，在这里可以执行初始化逻辑



> 以下内容，基于此目录结构举例
>
> ```
> math_utils/
> │── __init__.py
> │── basic.py
> │── advanced.py
> ```

## 内部实现

有些模块只希望被包内部使用，不希望导出。可以在 `__init__.py` 里手动控制 **对外暴露的内容**

```python
# math_utils/__init__.py
from .basic import add, subtract

__all__ = ["add", "subtract"]  # advanced.py 里的东西就不会被直接 import
```

## 版本控制

可以给包加上版本号，让外部代码可以访问：

```python
# math_utils/__init__.py
__version__ = "1.0.0"
```

## 动态导入子模块

在大型 Python 项目中，随着模块越来越多，手动维护`__init__.py`将变得特别复杂还容易出错，这时候动态导入子模块就可以通过以下代码进行自动加载引入

```python
# math_utils/__init__.py
import os
import importlib

# 获取当前包的路径
package_path = os.path.dirname(__file__)

# 遍历当前目录下的所有 .py 文件（不包括 __init__.py 本身）
for module in os.listdir(package_path):
    if module.endswith(".py") and module != "__init__.py":
        module_name = module[:-3]  # 去掉 .py 后缀
        importlib.import_module(f"{__name__}.{module_name}")  # 动态导入模块
```

别人导入时就可以直接这样写

```python
import math_utils
print(math_utils.basic.add(1,2))
```

> 没动态导入，需要这样写才不会报错：
>
> ```python
> import math_utils.basic
> print(math_utils.basic.add(1,2))
> ```

## 懒加载

如果某些模块比较大，加载它们会影响性能，那可以用 **懒加载**（lazy import）技术，在需要时才导入，而不是在 `import mypackage` 时一次性全加载。

```python
# math_utils/__init__.py
import importlib

def lazy_import(name):
    return importlib.import_module(f"{__name__}.{name}")

module1 = lazy_import("basic")
```

这样，`basic` 只有在第一次被使用时才会真正导入，提高了性能！
