# canal——数据库准实时导入

## 环境

**1.mysql**

- 开启 **mysql** 的 `binary log` （8.x 默认是启动的）

- 创建 **canal** 用户

  ```sql
  create user canal identified by 'Canal';                                 #创建canal账户
  grant select,replication slave,replication client on *.* to 'canal'@'%'; #授权canal账户查询和复制权限
  flush privileges;                                                        #刷新授权
  ```

- 登录一次 **canal** 并重启 **mysql**

**2. canal-deployer**

- 下载并解压 **canal.deployer**包

  https://github.com/alibaba/canal/releases

- 修改 **/canal-deployer/conf/example/instance.properties**

  ```yml
  canal.instance.mysql.slaveId=3                                  #修改ID，不能和MySQL数据库一致                
  canal.instance.master.address=127.0.0.1:3306                    #指定mysql数据库地址及端口
  canal.instance.dbUsername=canal                                 #指定账号
  canal.instance.dbPassword=canal                                 #指定密码
  ```

- 启动**canal-deployer**：点击**/canal-deployer/bin/startup.bat**（window）|| **/canal-deployer/bin/startup.sh**（linux）

- 查看是否启动成功：查看**/canal-deployer/logs/example/example.log**，并查看对应端口是否有服务

**3. canal-adapter**

- 下载并解压 **canal.adapter**包

  https://github.com/alibaba/canal/releases

- 修改 **/canal-adapter/conf/application.yml**

  ```yml
  canal.conf:
    srcDataSources:
      defaultDS:
        url: jdbc:mysql://127.0.0.1:3306/dianping?useUnicode=true&characterEncoding=utf-8
        username: canal
        password: canal
    canalAdapters:
    - instance: example # canal instance Name or mq topic name
      groups:
      - groupId: g1
        outerAdapters:
        - name: logger
        - name: es7
          hosts: 127.0.0.1:9300
          properties:
            cluster.name: dianping-app
  ```

- 新建 **/canal-adapter/conf/es7/shop.yml**

  ```yml
  dataSourceKey: defaultDS
  destination: example
  groupId:
  esMapping: 
   _index: shop
   _type: _doc
   _id: id
   upsert: true
   sql: "select a.id,a.name,a.tags,concat(a.latitude,',',a.longitude) as location,a.remark_score,a.price_per_man,a.category_id,b.name as category_name,a.seller_id,c.remark_score as seller_remark_score,c.disabled_flag as seller_disabled_flag from shop a inner join category b on a.category_id = b.id inner join seller c on c.id=a.seller_id"
   commitBatch: 3000
  ```

- 启动**canal-adapter**：点击**/canal-adapter/bin/startup.bat**（window）|| **/canal-adapter/bin/startup.sh**（linux）

