# ref

## 使用

```jsx
class Refdemo extends Component{
	constructor(props) {
		super(props)
		this.fileRef = React.createRef(); // 创建ref
	}

	alertName = () => {
		const dom = this.fileRef.current // 获取 dom
		alert( dom.files[0].name )
	}

	render() {
		return <div>
			<input type="file" ref={this.fileRef} /> {/* 把 input 和 this.fileRef 做关联 */}
			<button onClick={this.alertName}>文件名字</button>
		</div>
	}
}
```

## 使用场景

1. 必须手动操作 **DOM** 元素，**setState** 实现不了
2. 文件上传
3. 富文本编辑器

>**受控组件和非受控组件的选择**
>
>1. 优先使用受控组件，符合数据驱动视图
>2. 必须操作 `DOM `时，则使用非受控组件