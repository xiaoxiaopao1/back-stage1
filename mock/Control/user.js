const User = require('../model/user'); 

const getUser = function(){
	return new Promise((resolve,reject) => {
		User.find().exec((err,data) => {
			resolve(data);
		})
	})
}

const getUserData = async (ctx) => {
	const content = await getUser();
	ctx.body = content;
}

module.exports = getUserData;