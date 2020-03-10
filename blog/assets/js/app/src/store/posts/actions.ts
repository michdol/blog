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

export interface IReduxSetPostContentHeadline extends IReduxBaseAction {
	type: EReduxActionTypes.SET_POST_CONTENT_HEADLINE;
	data: string;
	id: number;
}

export function setPostContentHeadline(id: number, headline: string): IReduxSetPostContentHeadline {
	return {
		type: EReduxActionTypes.SET_POST_CONTENT_HEADLINE,
		data: headline,
		id: id
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