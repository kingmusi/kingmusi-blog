# centos8--ElasticSearch

## 安装 java jdk

```shell
sudo dnf install java-11-openjdk-devel
```

验证是否安装成功

```shell
java -version
```

## 引入 ElasticSearch

从 [elasticSearch download 页](https://www.elastic.co/cn/start) 下载最新版的 Elasticsearch（linux版）

在 centos 的 **/** 路径下

```shell
mkdir elasticsearch
cd elasticsearch
```

向 elasticsearch 中传入下载好的压缩包，并解压

```shell
tar xzvf elasticsearch.tar.gz
```

## 启动 ElasticSearch

因为 ElasticSearch 从 5.x 开始不能以 root 用户身份启动，所以创建一个新的用户用来启动 ElasticSearch

```shell
## 创建 es 用户
adduser es
## 修改密码
passwd es
## root 用户给 es 用户此文件夹的操作权限
chown -R es /elasticsearch/
```

现在切到 es 用户，并启动 ElasticSearch 应该是成功了

```shell
su es
/elasticsearch/bin/elasticsearch
```

但每次启动 elasticsearch 都要切换到 es 用户，会比较麻烦，所以配置远程访问（同时会开机自启动）

```shell
vim  /usr/lib/systemd/system/elasticsearch.service
```

> 可能会遇到以下问题
>
> `max virtual memory areas vm.max_map_count [65530] is too low, increase to at least `
>
> elasticsearch用户拥有的内存权限太小，至少需要262144
>
> 解决：
>
> ```shell
> vim /etc/sysctl.conf
> ```
>
> 追加以下内容
>
> ```shell
> vm.max_map_count=655360
> ```
>
> 保存，执行
>
> ```shell
> sysctl -p
> ```

粘贴以下内容

```
[Unit]
Description=elasticsearch
[Service]
User=es
LimitNOFILE=100000
LimitNPROC=100000
ExecStart=/elasticsearch/bin/elasticsearch
[Install]
WantedBy=multi-user.target
```

加载

```shell
systemctl daemon-reload   		#加载文件配置
systemctl enable elasticsearch  #设置开机启动
```

往后 启动/停止/状态 es 可以通过以下命令

```shell
systemctl start|stop|restart elasticsearch 
```

## 启用 ip 访问

但服务器上 elasticSearch 不是用于本地的，所以要配置端口访问，让后端能访问得到

```shell
vim /elasticsearch/config/elasticsearch.yml
```

开启以下行的注释，并修改

```yml
node.name: node-1

network.host: 0.0.0.0
http.cors.enabled: true
http.cors.allow-origin: "*"

discovery.seed_hosts: ["0.0.0.0:9200"]

cluster.initial_master_nodes: ["node-1"]
```

重启

```shell
# 如果你在 es 用户，记得切回 root
sudo systemctl restart elasticsearch
```

阿里云开启安全组端口 9200

验证是否能正常访问

```shell
curl ip:9200
```

## 安装 ik 插件

从 github 的 release 中下载对应 ElasticSearch 版本的 ik 分词器，并解压到以下目录下

```shell
/elasticsearch/plugins/
```

重启

```shell
sudo systemctl restart elasticsearch
```

## es 常用命令

查看是否正常启动

```shell
curl ip:9200
```

查看集群健康状况

```shell
curl ip:9200/_cat/health?v
```

查看已存在的索引

```shell
curl ip:9200/_cat/indices?v
```

创建索引

```shell
curl -X PUT 'ip:9200/you_index?pretty' -H 'content-Type:application/json' -d '
> {
>     ....
> }
> '
```

