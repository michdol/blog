import { IPost } from './reducer';
import { EReduxActionTypes, IReduxBaseAction } from 'store';

export interface IReduxGetPostAction extends IReduxBaseAction {
	type: EReduxActionTypes.GET_POST;
	data: IPost;
}

export function getPost(): IReduxGetPostAction {
	const post = JSON.parse(document.getElementById('post_data').textContent);
	return {
		type: EReduxActionTypes.GET_POST,
		data: post
	}
}
