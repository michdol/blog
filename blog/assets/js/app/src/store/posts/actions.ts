import { IPost, IPostContent } from './reducer';
import { EReduxActionTypes, IReduxBaseAction } from 'store';

export interface IReduxGetPostAction extends IReduxBaseAction {
	type: EReduxActionTypes.GET_POST;
	data: IPost;
}

export function getPost(): IReduxGetPostAction {
	const post: IPost = JSON.parse(document.getElementById('post_data').textContent);
	return {
		type: EReduxActionTypes.GET_POST,
		data: post
	}
}

export interface IReduxSetPostContentHeadline extends IReduxBaseAction {
	type: EReduxActionTypes.SET_POST_CONTENT_HEADLINE;
	data: IPostContent;
}

export function setPostContentHeadline(content: IPostContent): IReduxSetPostContentHeadline {
	return {
		type: EReduxActionTypes.SET_POST_CONTENT_HEADLINE,
		data: content
	}
}

export interface IReduxReorderPostContents extends IReduxBaseAction {
	type: EReduxActionTypes.REORDER_POST_CONTENTS;
	id: number;
	moveUp: boolean;
}

export function reorderPostContents(id: number, moveUp: boolean): IReduxReorderPostContents {
	return {
		type: EReduxActionTypes.REORDER_POST_CONTENTS,
		id: id,
		moveUp: moveUp
	}
}