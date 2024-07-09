# loader

```ts
// 资源
const config = [{
  name: 'yangguang',
  url: 'https://static.xiaohoucode.com/codegame-static-test/adventure/sunshine/yangguang.json'
}, {
  name: 'tree',
  url: 'https://static.xiaohoucode.com/scratch-res-test/285201/0a91108c59d9967d0adb842d5dd596d3.png'
}, {
  name: 'hua',
  url: 'https://static.xiaohoucode.com/codegame-static-test/adventure/flowers/hua.json'
}]
```

## 全局加载资源

> 注意以下方式，在同一时间段内，只能有一个正在load

```ts
const loader = PIXI.Loader.shared
const resources = PIXI.Loader.shared.resources

loader.add(config).load(() => {
  console.log(resources)
  /**
 	*{
 	 		hua: {...},
 	 		hua_atlas: {...},
 	 		hua_atlas_page_hua.png: {...},
 	 		tree: {...},
 	 		yangguang: {...},
 	 		yangguang_atlas: {...},
 	 		yangguang_atlas_page_yangguang.png: {...}
 	 }
 	 */
})
```

```ts
const loader = PIXI.Loader.shared
const resources = PIXI.Loader.shared.resources

loader.add(config[0].url).load(() => {
  console.log(resources)
  /**
 	*{
 	 		https://static.xiaohoucode.com/codegame-static-test/adventure/sunshine/yangguang.json: {...},
 	 		
https://static.xiaohoucode.com/codegame-static-test/adventure/sunshine/yangguang.json_atlas: {...},
 	 		https://static.xiaohoucode.com/codegame-static-test/adventure/sunshine/yangguang.json_atlas_page_yangguang.png: {...},
 	 }
 	 */
})
```

## 单独一个loader空间

> 下面两个loader能同时进行

```ts
const loader1 = new PIXI.Loader()
loader1.add(config).load(() => {
  console.log(loader1.resources)
  /**
 	*{
 	 		hua: {...},
 	 		hua_atlas: {...},
 	 		hua_atlas_page_hua.png: {...},
 	 		tree: {...},
 	 		yangguang: {...},
 	 		yangguang_atlas: {...},
 	 		yangguang_atlas_page_yangguang.png: {...}
 	 }
 	 */
})

const loader2 = new PIXI.Loader()
loader2.add(config).load(() => {
  console.log(loader2.resources)
  /**
 	*{
 	 		hua: {...},
 	 		hua_atlas: {...},
 	 		hua_atlas_page_hua.png: {...},
 	 		tree: {...},
 	 		yangguang: {...},
 	 		yangguang_atlas: {...},
 	 		yangguang_atlas_page_yangguang.png: {...}
 	 }
 	 */
  console.log(PIXI.Loader.shared.resources) // {}
})
```

