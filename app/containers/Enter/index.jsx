import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router';

import { addArticle,updateArticle,findArticle } from '../../fetch/article/article';
import Article from '../../components/Article';

class Enter extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null
		}
	}
	render(){
		return(
			<div>
				{
					this.props.params.id
					?	this.state.data
						? <Article data={this.state.data}
						  			 postFn={this.postArticle.bind(this)} /> 
						: ''
					:   <Article postFn={this.postArticle.bind(this)} /> 
				}
			</div>
		)
	}
	componentDidMount(){
		const id = this.props.params.id;
		if (id) {
			this.findHandler(id);
		}
	}
	findHandler(id){
		const result = findArticle(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.content) {
				const data = json.content[0];
				this.setState({
					data
				})
			}
		})
	}
	postArticle(title,content){
		if (this.props.params.id) {
			// 如果id存在，就是更新操作
			this.updateHandler(title,content);
		}else{
			// 如果id不存在，就是录入操作
			this.enterHandler(title,content);
		}
	}
	enterHandler(title,content){
		const result = addArticle(title,content);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				hashHistory.push('/');
			}
		})
	}
	updateHandler(title,content){
		const id = this.props.params.id;
		const result = updateArticle(id,title,content);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				hashHistory.push('/');
			}
		})
	}
}

export default Enter
