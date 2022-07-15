# logstash——数据库基于时间轴导入

## 环境

- 从 **elastic** 官网下载解压

- 进入 **bin**

- 新建文件夹 **mysql** ，用于存放连接的相关配置

- 新建 **/bin/mysql/jdbc.sql** ，用于存放==查询语句==，查找出的数据会自动导入 **elasticsearch** 中

  - 字段名要一一对应
  - where 是使用时间轴的方式更新，值更新比上一次时间还要后的数据

  ```sql
  select name from shop where update_at > :sql_last_value
  ```

- 新建 **/bin/mysql/last_value_meta**，用于存放上一次时间，以实现实时更新

  ```
  --- !ruby/object:DateTime '2021-03-01 12:27:00.224000000 Z'
  ```

- 新建 **/bin/mysql/jdbc.conf**，用于配置配置

  ```json
  input {
      jdbc {
        # 时间基准的区域
        jdbc_default_timezone => "Asia/Shanghai"
        # mysql 数据库链接, dianpingdb为数据库名
        jdbc_connection_string => "jdbc:mysql://127.0.0.1:3306/dianping?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC"
        # 用户名和密码
        jdbc_user => "root"
        jdbc_password => "root"
        # 驱动
        jdbc_driver_library => "E:/elastic/logstash-7.11.1/bin/mysql/mysql-connector-java-8.0.21.jar"
        # 驱动类名
        jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
        jdbc_paging_enabled => "true"
        jdbc_page_size => "50000"
        # 上一次时间存放位置
        last_run_metadata_path => "E:/elastic/logstash-7.11.1/bin/mysql/last_value_meta"
        # 执行的 sql 文件路径+名称
        statement_filepath => "E:/elastic/logstash-7.11.1/bin/mysql/jdbc.sql"
        # 设置监听间隔  各字段含义（由左至右）分、时、天、月、年，全部为*默认含义为每分钟都更新
        schedule => "* * * * *"
      }
  }
  
  output {
      elasticsearch {
        # ES的IP地址及端口
          hosts => ["localhost:9200"]
        # 索引名称
          index => "shop"
    	document_type => "_doc"
        # 自增ID 需要关联的数据库中有有一个id字段，对应索引的id号
          document_id => "%{id}"
      }
      stdout {
       # JSON格式输出
          codec => json_lines
      }
  }
  ```

- 启动，**cmd**进入**bin**

  ```shell
  logstash -f mysql/jdbc.conf
  ```

## 当 elasticsearch 索引更新，如何重新导入数据

- 修改 **last_value_meta** ，时间值小于所有数据的更新时间