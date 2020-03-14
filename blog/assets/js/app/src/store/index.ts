import { combineReducers } from 'redux';
import posts from 'store/posts/reducer';

export enum EReduxActionTypes {
  GET_POST = "GET_POST",
  SET_POST_CONTENT_HEADLINE = "SET_POST_CONTENT_HEADLINE",
  REORDER_POST_CONTENTS = "REORDER_POST_CONTENTS",
  DELETE_POST_CONTENT = "DELETE_POST_CONTENT",
  ADD_POST_CONTENT = "ADD_POST_CONTENT"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  posts
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
