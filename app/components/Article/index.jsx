import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Article extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		const title = this.props.data ? this.props.data.title : '',
			  content = this.props.data ? this.props.data.content : '';
		this.state = {
			title,
			content
		}
	}
	render(){
		return(
			<div>
				<h2>文章标题</h2>
				<input value={this.state.title}
					   placeholder='请输入文章标题'
					   onChange={this.titleChange.bind(this)} />
				<h2>文章内容</h2>
				<textarea value={this.state.content}
						  placeholder='请输入文章内容'
						  onChange={this.contentChange.bind(this)} />
				<button onClick={this.clickHandler.bind(this)}>
					{ this.props.data ? '更新' : '发表' }
				</button>
			</div>
		)
	}
	titleChange(e){
		this.setState({
			title: e.target.value
		})
	}
	contentChange(e){
		this.setState({
			content: e.target.value
		})
	}
	clickHandler(){
		if (!this.state.title || !this.state.content) {
			console.log('请输入文章内容和标题');
			return;
		}
		const postFn = this.props.postFn;
		postFn(this.state.title,this.state.content);
	}
}

export default Article