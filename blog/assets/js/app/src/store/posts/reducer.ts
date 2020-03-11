import { EReduxActionTypes } from 'store';
import {
  IReduxGetPostAction,
  IReduxSetPostContentHeadline,
  IReduxReorderPostContents
} from './actions';


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
  post: IPost;
  postLoaded: boolean;
  posts: IPost[];
}

const initialState: IReduxPostsState = {
  post: undefined,
  postLoaded: false,
  posts: [],
};

type TPostsReducerActions = IReduxGetPostAction | IReduxSetPostContentHeadline | IReduxReorderPostContents;

export default function(state: IReduxPostsState = initialState, action: TPostsReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.GET_POST:
      return { ...state, post: action.data, postLoaded: true };
    case EReduxActionTypes.SET_POST_CONTENT_HEADLINE:
      return updatePostContentTextField(state, action);
    case EReduxActionTypes.REORDER_POST_CONTENTS:
      let newContents: IPostContent[] = Array.from(state.post.contents);
      newContents = swapObjectsInArray(newContents, action.id, action.moveUp);
      if (newContents === undefined) {
        // Do nothing
        return { ...state }
      }
      return {
        ...state,
        post: {
          ...state.post,
          contents: newContents
        }
      }
    default:
      return state;
  }
}

function updatePostContentTextField(state: IReduxPostsState, action: IReduxSetPostContentHeadline) {
  // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
  return {
    ...state,
    post: {
      ...state.post,
      contents: state.post.contents.map((content: IPostContent) => {
        if (content.id === action.id) {
          return {
            ...content,
            headline: action.data
          }
        }
        return content;
      })
    }
  }
}

export function swapObjectsInArray(array: any[], id: number, moveUp: boolean): IPostContent[] {
  let currentIdx: number = getObjectIdxById(array, id);
  let lastIdx: number = array.length - 1;
  let newIdx: number = getSwapTargetIndex(currentIdx, lastIdx, moveUp);
  if (newIdx !== undefined) {
    [array[currentIdx], array[newIdx]] = [array[newIdx], array[currentIdx]];
  }
  return array;
}

export function getSwapTargetIndex(initialIdx: number, lastIdx: number, moveUp: boolean): number {
  let targetIdx: number;
  if (moveUp === true) {
    targetIdx = initialIdx === 0 ? undefined : initialIdx - 1;
  } else {
    targetIdx = initialIdx === lastIdx ? undefined : initialIdx + 1;
  }
  return targetIdx
}

// TODO: test this and move unrelated functions to some kind of utils.
export function getObjectIdxById(array: any[], id: number): number {
  let targetIdx: number = -1;
  for (let [key, obj] of array.entries()) {
    if (obj.id === id) {
      targetIdx = key;
      break;
    }
  } 
  return targetIdx;
}