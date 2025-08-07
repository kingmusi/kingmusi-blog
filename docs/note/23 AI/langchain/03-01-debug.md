# debug

## LangSmith

设置跟踪

1. 创建 `.env` 文件

```shell
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=xxxx
```

2. 使用 `dotenv` 读取

```python
from dotenv import load_dotenv

load_dotenv()
```

## Verbose(详细⽇志打印)

设置 `verbose` 标志将以稍微更易读的格式打印出输⼊和输出，并将跳过记录某些原始输出（例如 LLM 调⽤的令牌使⽤统计信息），以便可以专注于应⽤程序逻辑

```python
from langchain.globals import set_verbose

set_verbose(True)
```

## Debug(调试⽇志打印)

设置全局的 `debug` 标志将导致所有具有回调⽀持的 LangChain 组件（链、模型、代理、⼯ 具、检索器）打印它们接收的输⼊和⽣成的输出。这是最详细的设置，将完全记录原始输⼊和输出。

```python
from langchain.globals import set_debug

set_debug(True)
```

