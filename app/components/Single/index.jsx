import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Single extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data[0];
		return(
			<div>
				<h1>{data.title}</h1>
				<p>{data.content}</p>		
				<p>{data._id}</p>		
			</div>
		)
	}
}

export default Single