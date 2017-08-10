import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ArticleItem from '../ArticleItem';

class ArticleList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		return(
			<div>
				{
					data.map((item,index) => {
						return <ArticleItem key={index} 
											data={item}
											delFn={this.props.delFn} />
					})
				}
			</div>
		)
	}
}

export default ArticleList