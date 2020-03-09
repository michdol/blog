import { combineReducers } from 'redux';
import posts from 'store/posts/reducer';

export enum EReduxActionTypes {
  GET_POSTS = "GET_POSTS"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  posts
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;