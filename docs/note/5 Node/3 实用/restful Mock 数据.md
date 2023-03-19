# restful Mock 数据

## 安装

- 引入包

```bash
npm i json-server --save-dev
```

- 在项目根目录新建文件夹 `__json_server_mock__`

- 在 **__json_server_mock__** 中新建文件 `db.json`

```json
// 模拟的数据
{
	"users": []
}
```

- 在 **package.json** 中加入启动命令

```json
"scripts": {
	"json-server": "json-server __json_server_mock__/db.json --watch"
}
```

## 使用
```http
GET /users         // 获取列表
GET /users/1     // 获取某一项
POST /user        // 添加一项
PUT /user/1       // 替换某一项
PATCH /user/1   // 修改某一项
DELETE /user/1 // 删除某一项
```