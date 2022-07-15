# idea 创建 maven-archetype-webapp

## 正常创建

**1、创建**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506221931581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70#pic_center)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223705800.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222227235.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222307359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70#pic_center)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222413176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70#pic_center)<br>

**2、把新项目改成标准的maven项目**

1. 创建 `/src/main/java` ，右键把 `java文件夹`改为 `sources Root`
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507112156663.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)<br>
2. 创建 `/src/test`， 再创建 `/src/test/java`，右键 `java`文件夹改为 `Test sources Root`
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507112348727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)<br>

3. 创建 `/src/main/resources`，并右键把`resources` 文件夹改为 `Resources Root`
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051610184277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)<br>
   结果如图：
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200516101939325.png)

**3、启动**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223043528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223132134.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507105640309.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

## 问题1—— maven版本太高，导致404错误（可能遇到）

**1、创建artifact**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222813409.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222824433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050622283415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/202005062228411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222846254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222851233.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/202005062228565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506222905219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

**3、配置tomcat，并把项目插入进去**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223043528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223132134.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223229650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

**4、完成，可以进行以下操作测试**

  1. Web.xml中添加

```xml
<welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223435757.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

  2. 新建index.jsp，编写Hello word
     ![3.](https://img-blog.csdnimg.cn/20200506223530694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)
  3. 启动后，在浏览器访问
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506223612986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)

## 问题2—— 报错unable to import maven project

**1、idea报错unable to import maven project**

我的错误是因为版本太高，我下载的是3.6版本，选一个3.0.6以下的版本即可
[3.0.5版本](http://learning.happymmall.com/maven/windows_apache-maven-3.0.5-bin.zip)

然后重新配置maven

**2、修改maven中央仓库位置**

重新配置maven时，顺便把中央仓库位置也改，不让他占c盘的位置

  1. 把原始的 `repository` 拷贝一份到需要的路径下，可以在以下位置看到自己原始的 repository在那里
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507110751290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507110917158.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)
   2. 在你的新repository的文件夹下，创建一份 `settings.xml` 文件，并写入以下代码，`注意<localRepository>你的repository路径</localRepository>`

```xml
<settings>
 <localRepository>E:\maven-3.0.5\repository</localRepository>
 <servers>
    <server>
       <id>archiva.internal</id>
       <username>admin</username>
       <password>admin123</password>
    </server>

    <server>
       <id>archiva.snapshots</id>
       <username>admin</username>
       <password>admin123</password>
    </server>
 </servers>

 <mirrors>
   <mirror>
     <id>alimaven</id>
     <name>aliyun maven</name>
     <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
     <mirrorOf>central</mirrorOf>
   </mirror>
 </mirrors>
</settings>
```

3. 在idea中重新设置maven
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507110751290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507111526475.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)
4. 每次新建项目都默认使用修改过后的maven
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050711164169.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200507111704816.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzg0ODUzMg==,size_16,color_FFFFFF,t_70)