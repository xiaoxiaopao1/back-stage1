import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { delArticle,articleList } from '../../fetch/article/article';
import ArticleList from '../../components/ArticleList';

class Home extends React.Component {
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
				<Link to='/enter'>
					<span>写文章</span>
				</Link>
				{
					this.state.data
					? this.state.data.length
					  ? <ArticleList data={this.state.data} delFn={this.delHandler.bind(this)}/>
					  : '还没有文章，快去写篇文章吧'
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const result = articleList();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data
			})
		})
	}
	delHandler(id){
		const message = window.confirm('确认要删除吗？');
		if (!message) {
			return;
		}
		const result = delArticle(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				console.log('删除成功');
				location.reload();
			}
		})
	}
}

export default Home;