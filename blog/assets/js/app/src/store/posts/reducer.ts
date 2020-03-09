import { EReduxActionTypes } from 'store';
import { IReduxGetPostAction, IReduxSetPostContentHeadline } from './actions';


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

type TPostsReducerActions = IReduxGetPostAction | IReduxSetPostContentHeadline;

export default function(state: IReduxPostsState = initialState, action: TPostsReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.GET_POST:
      return { ...state, post: action.data, postLoaded: true };
    case EReduxActionTypes.SET_POST_CONTENT_HEADLINE:
      let [index, content] = getContentById(action.id, state.post.contents);
      content.headline = action.data;
      let post = state.post;
      post.contents[index] = content;
      return { ...state, post: post }
    default:
      return state;
  }
}

function getContentById(id: number, contents: IPostContent[]): [number, IPostContent] {
  for (let [key, content] of contents.entries()) {
    if (content.id === id) {
      return [key, content]
    }
  }
}