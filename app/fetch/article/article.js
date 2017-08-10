import { get } from '../get';
import { post } from '../post';

export function addArticle(title,content){
	const result = post('/api/addArticle',{
		title,
		content
	});
	return result;
}

export function delArticle(_id){
	const result = post('/api/delArticle',{
		_id
	});
	return result;
}

export function updateArticle(_id,title,content){
	const result = post('/api/updateArticle',{
		_id,
		title,
		content
	});
	return result;
}

export function findArticle(_id){
	const result = post('/api/findArticle',{
		_id
	});
	return result;
}

export function articleList(){
	const result = get('/api/articleList');
	return result;
}