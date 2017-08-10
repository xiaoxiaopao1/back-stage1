import { get } from '../get';
import { post } from '../post';

export function getUserData(){
	const result = get('/api/login');
	return result;
}
