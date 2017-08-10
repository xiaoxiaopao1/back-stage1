import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			showLoginForm: false
		}
	}
	render(){
		return(
			<div>
				denglu			</div>
		)
	}
}

export default Login;
