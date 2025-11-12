# MCP Server Python

## 环境初始化

> 最新请查看 [官网](https://mcp-docs.cn/quickstart/server#%E7%B3%BB%E7%BB%9F%E8%A6%81%E6%B1%82)

#### 系统要求

- 已安装 Python 3.10 或更高版本。
- 必须使用 Python MCP SDK 1.2.0 或更高版本。

#### 创建并设置项目

::: tabs

@tab MacOS/Linux

```shell
# 为我们的项目创建一个新 directory
uv init weather
cd weather

# 创建 virtual environment 并激活它
uv venv
source .venv/bin/activate

# 安装 dependencies
uv add "mcp[cli]" httpx

# 创建我们的 server file
touch main.py
```



@tab window

```shell
# 为我们的项目创建一个新 directory
uv init weather
cd weather

# 创建 virtual environment 并激活它
uv venv
.venv\Scripts\activate

# 安装 dependencies
uv add mcp[cli] httpx

# 创建我们的 server file
new-item main.py
```

:::

#### `Inspector` 本地开发服务器

```shell
npx @modelcontextprotocol/inspector \
  uv \
  --directory path/to/server \
  run \
  package-name \
```

##  `Server`

> [FastMCP官方API文档](https://gofastmcp.com/getting-started/welcome)

创建 `Server`

```python
from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# 初始化 FastMCP server
mcp = FastMCP("ip")
```

运行 `Server`

```python
if __name__ == "__main__":
    # 初始化并运行 server
    mcp.run(transport='stdio')
```

## Tool

MCP 中的 Tools 允许 servers 暴露可执行函数，这些函数可以被 clients 调用，并被 LLMs 用于执行操作。

通过 `@mcp.tool()` 创建一个工具

```python
@mcp.tool()
async def get_city_by_ip(ip: str = '') -> str:
    """
        根据ip获取所在的城市信息
        - ip（可选）：要查询的 IP 地址。如果不填写，则自动获取当前请求的 IP 地址对应的城市信息。
    """
    async with httpx.AsyncClient() as client:
        try:
            response = None
            if ip:
                response = await client.get(f"https://restapi.amap.com/v3/ip?Key=xxx&ip={ip}")
            else:
                response = await client.get(f"https://restapi.amap.com/v3/ip?Key=xxx")
            
            if response:
                response.raise_for_status()
                return response.json()
            else:
                return "获取城市信息失败"
        except Exception:
            return None
```

## resource

Resources 代表 MCP server 想要提供给 clients 的任何类型的数据。这可以包括：

- 文件内容
- 数据库记录
- API 响应
- 实时系统数据
- 屏幕截图和图像
- 日志文件
- 等等

```python
@mcp.resource(
    uri="file:///ip_map.json",
    mime_type="application/json"
)
def get_ip_name_map() -> list[dict[str, str]]:
    """获取ip和好友名称的映射关系"""
    with open("ip_map.json", "r") as f:
        return json.load(f)
```

## prompt

MCP 中的 Prompts 是预定义的模板，可以：

- 接受动态参数
- 包含来自 resources 的上下文
- 链接多个交互
- 引导特定的工作流程
- 呈现为 UI 元素（如斜杠命令）

```python
@mcp.prompt()
def ask_about_topic(topic: str) -> str:
    """生成用户消息，要求对某个主题进行解释。"""
    return f"你能解释一下“{topic}”的概念吗？"
```



