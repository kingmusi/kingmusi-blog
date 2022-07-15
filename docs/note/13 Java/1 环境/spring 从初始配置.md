# 从初始配置 spring

## 一、创建项目

1. 选择 **Spring Initializr** 创建

2. 选择对应的 `JDK` 版本

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/1.png)

3. 修改项目信息

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/2.png)

4. 选择 `spring boot` 的版本

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/3.png)

5. 修改项目信息

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/4.png)

> **规定项目启动的端口**
>
> 在 `src\main\resources\application.properties` 中添加 **server.port=8010** ，表明启动端口为 **8010**

## 二、构建 spring boot 项目结构

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/5.png)

1. **Controller** 层：接收客户端的请求
2. **Service** 层：实现业务逻辑
3. **dal** 层：与数据库进行交互
4. **model** 层：模型层

> **因为要和 web 打交道，所以要引入 web 的相关依赖**
>
> ```xml
> <dependency>
>  <groupId>org.springframework.boot</groupId>
>  <artifactId>spring-boot-starter-web</artifactId>
> </dependency>
> ```

## 三、controller 层示例 UserController

1. 添加 **@Controller** 注解，表明其是一个 Controller ，并且完成它的依赖注入
2. 添加 **@RequestMapping** 注解，表明 `/user/**` 下的所有路径都会被这个 Controller 所拦截
3. 在方法上使用 **@RequestMapping**，表明此方法处理某个具体的请求
4. 在方法上使用 **@ResponseBody**，使方法返回的是具体的值，而不是页面

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("/user")
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/test")
    @ResponseBody
    public String test() {
        return "test";
    }
}
```

> **测试是否成功**
>
> 1. 启动项目
> 2. 在浏览器中输入 `localhost:8010/user/test`
> 3. 返回 test 表明成功

## 四、Service 层示例 UserService

> **Service** 层应当使用接口结构，这样一个接口可以对应多个实现，不同情况即可使用不同的实现

1. **/service** 下放接口

   ```java
   public interface UserService {
       
   }
   ```

2. **/service/impl** 下放实现类

   ```java
   import com.kingmusi.dianping.service.UserService;
   import org.springframework.stereotype.Service;
   
   @Service
   public class UserServiceImpl implements UserService {
   
   }
   ```

## 五、与数据库交互

1. 引入依赖

   ```xml
   <!-- 使用mysql数据库 -->
   <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>8.0.17</version>
   </dependency>
   <!-- 使用阿里巴巴链接池 -->
   <dependency>
       <groupId>com.alibaba</groupId>
       <artifactId>druid</artifactId>
       <version>1.1.3</version>
   </dependency>
   <!-- 使用mybatis自动生成 -->
   <dependency>
       <groupId>org.mybatis.spring.boot</groupId>
       <artifactId>mybatis-spring-boot-starter</artifactId>
       <version>1.3.1</version>
   </dependency>
   ```

2. 在 `<build>` 中加上一些 `plugin` 属性

   ```xml
   <build>
       <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
           <plugins>
               <plugin>
                   <groupId>org.mybatis.generator</groupId>
                   <artifactId>mybatis-generator-maven-plugin</artifactId>
                   <version>1.3.2</version>
                   <dependencies>
                       <dependency>
                           <groupId>org.mybatis.generator</groupId>
                           <artifactId>mybatis-generator-core</artifactId>
                           <version>1.3.2</version>
                       </dependency>
                       <dependency>
                           <groupId>mysql</groupId>
                           <artifactId>mysql-connector-java</artifactId>
                           <version>8.0.17</version>
                       </dependency>
                   </dependencies>
                   <executions>
                       <execution>
                           <id>mybatis generator</id>
                           <phase>package</phase>
                           <goals>
                               <goal>generate</goal>
                           </goals>
                       </execution>
                   </executions>
                   <configuration>
                       <!--允许移动生成的文件-->
                       <verbose>true</verbose>
                       <!--允许自动覆盖文件-->
                       <overwrite>true</overwrite>
                       <configurationFile>
                           src/main/resources/mybatis-generator.xml
                       </configurationFile>
                   </configuration>
               </plugin>
           </plugins>
       </pluginManagement>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
           </plugin>
       </plugins>
   </build>
   ```

3. 可以看到上面的第 `35` 行中，在对应文件做相关配置，所以在对应目录创建 `mybatis-generator.xml` 文件

   ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210131161813.png)

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE generatorConfiguration
           PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
           "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
   <generatorConfiguration>
   
       <context id="DB2Tables"    targetRuntime="MyBatis3">
           <!--去除注释-->
           <commentGenerator>
               <property name="suppressDate" value="true"/>
               <property name="suppressAllComments" value="true" />
           </commentGenerator>
           <!--数据库链接地址账号密码-->
           <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver" connectionURL="jdbc:mysql://127.0.0.1:3306/dianping?serverTimezone=Asia/Shanghai" userId="root" password="">
               <property name="nullCatalogMeansCurrent" value="true"/>
           </jdbcConnection>
           <!--生成DataObject类存放位置-->
           <javaModelGenerator targetPackage="com.kingmusi.dianping.model" targetProject="src/main/java">
               <property name="enableSubPackages" value="true"/>
               <property name="trimStrings" value="true"/>
           </javaModelGenerator>
           <!--生成映射文件存放位置-->
           <sqlMapGenerator targetPackage="mapping" targetProject="src/main/resources">
               <property name="enableSubPackages" value="true"/>
           </sqlMapGenerator>
           <!--生成Dao类存放位置-->
           <!-- 客户端代码，生成易于使用的针对Model对象和XML配置文件 的代码
                   type="ANNOTATEDMAPPER",生成Java Model 和基于注解的Mapper对象
                   type="MIXEDMAPPER",生成基于注解的Java Model 和相应的Mapper对象
                   type="XMLMAPPER",生成SQLMap XML文件和独立的Mapper接口
           -->
           <javaClientGenerator type="XMLMAPPER" targetPackage="com.kingmusi.dianping.dal" targetProject="src/main/java">
               <property name="enableSubPackages" value="true"/>
           </javaClientGenerator>
   
           <!--生成对应表及类名-->
           <table tableName="user"  domainObjectName="UserModel" enableCountByExample="false"
                  enableUpdateByExample="false" enableDeleteByExample="false"
                  enableSelectByExample="false" selectByExampleQueryId="false">
               <generatedKey column="id" sqlStatement="MySql" identity="true" />
           </table>
   
       </context>
   </generatorConfiguration>
   ```

4. mybatis 自动生成

   - 点击 Run -> Edit Configurations... 打开设置项

   - 添加 maven 执行

     ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210131163345.png)

   - 执行

     ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210131163454.png)

   - 生成文件

     ![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20210131164948.png)

5. 在 **/resources/application.properties** 中添加内容，以让 `spring boot` 知道对应包的作用

   ```properties
   mybatis.mapperLocations=classpath:mapping/*.xml
   #配置数据库链接等数据源
   spring.datasource.name=dianpingdb
   spring.datasource.url=jdbc:mysql://127.0.0.1:3306/dianpingdb?useUnicode=true&characterEncoding=UTF-8
   spring.datasource.username=root
   spring.datasource.password=
   
   #使用druid做链接池管理
   spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
   spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
   ```

6. 成功，即可和数据库交互

## 问题1：中文乱码

1. rebuild 和 clean + install

2. 如还有乱码，则将 `application.properties` 修改为 `application.yml`

   ```yml
   spring:
     # 应用名称
     application:
       name: dianping
     messages:
       encoding: UTF-8
     http:
       encoding:
         force: true
         charset: UTF-8
         enabled: true
     datasource:
       #配置数据库链接等数据源
       name: dianping
       url: jdbc:mysql://127.0.0.1:3306/dianping?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
       username: root
       password: 852456
       #使用druid做链接池管理
       type: com.alibaba.druid.pool.DruidDataSource
       driver-class-name: com.mysql.cj.jdbc.Driver
       
   server:
     port: 8010
     tomcat:
       uri: UTF-8
   
   # mapper 文件映射
   mybatis:
     mapper-locations: classpath:mapping/*.xml
   ```

   



