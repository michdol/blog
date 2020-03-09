import { IPost } from './reducer';
import { EReduxActionTypes, IReduxBaseAction } from 'store';

export interface IReduxGetPostsAction extends IReduxBaseAction {
	type: EReduxActionTypes.GET_POSTS;
	data: IPost[];
}

export function getPosts(): IReduxGetPostsAction {
	const mydata = JSON.parse(document.getElementById('contents').textContent);
	const post: IPost = {
		id: 1,
		title: "Jestem chujem",
		contents: mydata
	}
	return {
		type: EReduxActionTypes.GET_POSTS,
		data: [post]
	}
}
