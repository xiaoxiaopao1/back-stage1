import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'; //缓存(里面有getItem和setItem方法)
import { USERINFO } from '../config/localStoreKey';//里面有userinfo常量，缓存关键字
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../actions/userinfo'

import { getUserData } from '../fetch/user/user';

import Login from '../components/Login';

// 绑定用户信息行为的一系列action
class App extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		// 先通过缓存设置项目初始化，设置完成后initDone为true
		this.state = {
			initDone: false,
			data: []
		}
	}
	render(){
		return(
			<div>
				{
					this.state.initDone
					? this.props.children
					: this.state.data.length
					  ? <Login data={this.state.data} 
					  		   loginFn={this.loginHandler.bind(this)} />
					  : ''
				}
			</div>
		)
	}
	componentDidMount(){
		const userName = LocalStore.getItem(USERINFO);
		if (userName) {
			this.props.userInfoActions.update({
				name: userName
			});
			this.setState({
				initDone: true
			})
		}else{
			this.resultHandler();
		}
	}
	resultHandler(){
		const result = getUserData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data
			})
		})
	}
	loginHandler(user){
		this.props.userInfoActions.update({
			name: user
		})
		LocalStore.setItem(USERINFO,user);
		this.setState({
			initDone: true
		})
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		userinfo: state.userinfo
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		userInfoActions: bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
