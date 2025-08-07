# 服务器——ts

## 简介

`Model Context Protocol`称为模型上下文协议，旨在AI模型与外部工具、数据源之间的连接，通过标准化接口，确保不同系统之间可以无缝协作，解决了传统数据孤岛带来的限制，提升了AI模型的性能与响应的准确性。

## 环境初始化

> 最新请查看 [官网](https://mcp-docs.cn/quickstart/server#%E7%B3%BB%E7%BB%9F%E8%A6%81%E6%B1%82)

#### 创建并设置项目

::: tabs

@tab MacOS/Linux

```shell
# 为我们的项目创建一个新 directory
mkdir weather
cd weather

# 初始化一个新的 npm 项目
npm init -y

# 安装 dependencies
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript

# 创建我们的 files
mkdir src
touch src/index.ts
```



@tab window

```shell
# 为我们的项目创建一个新 directory
md weather
cd weather

# 初始化一个新的 npm 项目
npm init -y

# 安装 dependencies
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript

# 创建我们的 files
md src
new-item src\index.ts
```

:::

#### 更新 `package.json`

添加 type: “module” 和一个 build script

```json
{
  "type": "module",
  "bin": {
    "weather": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": [
    "build"
  ],
}
```

#### 增加 `tsconfig.json`

在项目的根目录下创建一个 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

#### 代码写完后打包

```shell
npm run build
```

#### `Inspector` 本地开发服务器

```shell
npx @modelcontextprotocol/inspector node build/index.js
```

##  `Server`

> [FastMCP官方API文档](https://gofastmcp.com/getting-started/welcome)

创建 `Server`

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建 server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
```

运行 `Server`

```python
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

## Tool

MCP 中的 Tools 允许 servers 暴露可执行函数，这些函数可以被 clients 调用，并被 LLMs 用于执行操作。

通过 `server.tool` 创建一个工具

```python
server.tool(
  'get_weather',
  '根据城市区域编码获取天气信息',
  {
    areacode: z.string().describe('城市区域编码')
  },
  ({ areacode }) => new Promise((resolve, reject) => {   
   fetch(`https://restapi.amap.com/v3/weather/weatherInfo?Key=xxx&city=${areacode}&output=JSON`, {
    method: 'GET',
    redirect: 'follow'
   })
      .then(response => response.json())
      .then((result: any) => {
        if (result.status === "0") {
          resolve({
            content: [{
              type: 'text',
              text: '未检测到天气数据'
            }]
          })
          return
        } else {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(result)
            }]
          })
        }
      })
      .catch(error => {
        console.error(error)
        resolve({
          content: [{
            type: 'text',
            text: '未检测到天气数据'
          }]
        })
      });
  })
)
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

通过 `server.resource` 创建一个工具

```python
server.resource(
  "城市编码和区域编码映射表",
  "file:///assets/citycode_areacode.json",
  {
    description: "可以获取城市区域的中文名，所属于的城市编码和区域编码",
    mimeType: "application/json",
  },
  async () => {
    const citycodeMap = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/assets/citycode_areacode.json'), 'utf-8'))
    return {
      contents: [
        {
          uri: 'file:///assets/citycode_areacode.json',
          mimeType: 'application/json',
          text: JSON.stringify(citycodeMap)
        }
      ]
    }
  }
)
```

> 也可以在定义McpServer时声明好
>
> ```ts
> const server = new McpServer({
> name: 'weather',
> version: '1.0.0',
> capabilities: {
>  resources: {
>    'file:///assets/citycode_areacode.json': {
>      name: '城市编码和区域编码映射表',
>      description: '可以获取城市区域的中文名，所属于的城市编码和区域编码',
>      mimeType: 'application/json',
>      get: async () => {
>        const citycodeMap = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/assets/citycode_areacode.json'), 'utf-8'))
>        return {
>          contents: [
>            {
>              uri: 'file:///assets/citycode_areacode.json',
>              mimeType: 'application/json',
>              text: JSON.stringify(citycodeMap)
>            }
>          ]
>        }
>      }
>    }
>  },
>  tools: {}
> }
> })
> ```

## prompt

MCP 中的 Prompts 是预定义的模板，可以：

- 接受动态参数
- 包含来自 resources 的上下文
- 链接多个交互
- 引导特定的工作流程
- 呈现为 UI 元素（如斜杠命令）

```python
server.prompt(
  "weather-summary",
  "生成天气查询提示词",
  {
    city: z.string().describe('城市名称'),
  },
  async ({ city }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `请查询${city}的天气，并简要总结。`
          }
        }
      ]
    }
  }
)
```



