import { combineReducers } from 'redux';
import posts from 'store/posts/reducer';

export enum EReduxActionTypes {
  GET_POST = "GET_POST",
  SET_POST_CONTENT_HEADLINE = "React.FormEvent<HTMLInputElement>"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  posts
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
