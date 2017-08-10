import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Link } from 'react-router';

class ArticleItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		return(
			<div>
				<span>{data.title}</span>
				<span>{data.content}</span>
				<Link to={`/single/${data._id}`}>查看</Link>
				<Link to={`/enter/${data._id}`}>更新</Link>
				<button onClick={this.delHandler.bind(this)}>删除</button>
			</div>
		)
	}
	componentDidMount(){
	}
	delHandler(){
		const data = this.props.data,
			  delFn = this.props.delFn;

		delFn(data._id);
	}
}

export default ArticleItem