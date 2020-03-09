import { EReduxActionTypes } from 'store';
import { IReduxGetPostsAction } from './actions';


export interface IPostContent {
  id: number;
  headline: string;
  text: string;
  is_hidden: boolean;
  order: number;
}

export interface IPost {
  id: number;
  title: string;
  contents: IPostContent[];
}

export interface IReduxPostsState {
  post?: IPost;
  postLoaded: boolean;
  posts: IPost[];
  postsLoaded: boolean;
}

const initialState: IReduxPostsState = {
  post: undefined,
  postLoaded: false,
  posts: [],
  postsLoaded: false
};

type TPostsReducerActions = IReduxGetPostsAction | null;

export default function(state: IReduxPostsState = initialState, action: TPostsReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.GET_POSTS:
      return { ...state, posts: action.data, postsLoaded: true };
    default:
      return state;
  }
}
