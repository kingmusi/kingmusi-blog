# mybatis pager的应用

> 场景：有许多商品，前端通过分页来展示这些商品

### 1、逻辑部分

  1. 调用 PageHelper 的 startPage  
  2. 把全部的 Product 通过 sql 从数据库中取出（mybatis pager 会自动帮我们取出所传参数的数量）
  3. 创建 pageInfo 把 全部的 Product 当做参数传入


```java
	/**
     * @param pageNum 第几页
     * @param pageSize 每页展示多少个
     * ServerResponse 是我所创建的通用的类，不想用去掉即可
     */
    public ServerResponse<PageInfo> getProductList(int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<Product> productList = productMapper.selectList(pageNum, pageSize); //调用sql查询
        PageInfo pageResult = new PageInfo(productList);
        return ServerResponse.createBySuccess(pageResult);
    }
```

 - 若从数据库取出的Product不合要求，需要修改，可用下面的代码，不需修改则跳过

```java
/**
     * @param pageNum 第几页
     * @param pageSize 每页展示多少个
     * newProduct是自定义的新的类
     * ServerResponse 是我所创建的通用的类，不想用去掉即可
     */
    public ServerResponse<PageInfo> getProductList(int pageNum, int pageSize){
		PageHelper.startPage(pageNum, pageSize);
        List<Product> productList = productMapper.selectList(pageNum, pageSize); // 调用sql查询
        List<newProduct> newProductList = Lists.newArrayList();
        for(Product productItem : productList){
            newProduct newProductItem = change(productItem);
            newProductList.add(newProductItem);
        }
        PageInfo pageResult = new PageInfo(productList);
        pageResult.setList(mewProductList); // !!!需要用setList重构
        return ServerResponse.createBySuccess(pageResult);
    }
```

### 2、sql部分

 - mybatis pager 会自动在后面加上 `limit #{pageSize} offset #{pageNum}` 

```xml
  <select id="selectList" resultMap="BaseResultMap">
    select <include refid="Base_Column_List" /> from mmall_product
    order by id asc
  </select>
```