import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { findArticle } from '../../fetch/article/article';
import SingleComponent from '../../components/Single';

class Single extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data
					? this.state.data.length
					  ? <SingleComponent data={this.state.data} />
					  : ''
					: '没有内容'
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const id = this.props.params.id;
		const result = findArticle(id);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				this.setState({
					data: json.content
				})
			}
		})
	}
}

export default Single