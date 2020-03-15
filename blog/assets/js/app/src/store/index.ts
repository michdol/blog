import { combineReducers } from 'redux';
import posts from 'store/posts/reducer';
import ui from 'store/ui/reducer';

export enum EReduxActionTypes {
  GET_POST = "GET_POST",
  SET_POST_CONTENT_HEADLINE = "SET_POST_CONTENT_HEADLINE",
  REORDER_POST_CONTENTS = "REORDER_POST_CONTENTS",
  DELETE_POST_CONTENT = "DELETE_POST_CONTENT",
  ADD_POST_CONTENT = "ADD_POST_CONTENT",
  TOGGLE_EDIT_ACTIVE = "TOGGLE_EDIT_ACTIVE"
}

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

const rootReducer = combineReducers({
  posts,
  ui
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
