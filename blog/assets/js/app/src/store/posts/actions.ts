import { IPost } from './reducer';
import { EReduxActionTypes, IReduxBaseAction } from 'store';

export interface IReduxGetPostsAction extends IReduxBaseAction {
	type: EReduxActionTypes.GET_POSTS;
	data: IPost[];
}

export function getPosts(): IReduxGetPostsAction {
	const post: IPost = {
		id: 1,
		title: "Jestem chujem",
		contents: []
	}
	return {
		type: EReduxActionTypes.GET_POSTS,
		data: [post]
	}
}
