import { EReduxActionTypes } from 'store';
import {
  IReduxGetPostAction,
  IReduxSetPostContentHeadline,
  IReduxReorderPostContents
} from './actions';


export interface IPostContent {
  id?: number;
  ref?: number;
  headline: string;
  text: string;
  is_hidden: boolean;
  order: number;
  changed: boolean;
}

export interface IPost {
  id: number;
  title: string;
  contents: IPostContent[];
}

export interface IPayload {
  create: IPostContent[];
  update: IPostContent[];
  delete: number[];
  ordering: any;
}

export interface IReduxPostsState {
  post: IPost;
  postLoaded: boolean;
  posts: IPost[];
  payload: IPayload;
}

const initialState: IReduxPostsState = {
  post: undefined,
  postLoaded: false,
  posts: [],
  payload: {
    create: [],
    update: [],
    delete: [],
    ordering: {}
  }
};

type TPostsReducerActions = IReduxGetPostAction | IReduxSetPostContentHeadline | IReduxReorderPostContents;

export default function(state: IReduxPostsState = initialState, action: TPostsReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.GET_POST:
      return { ...state, post: action.data, postLoaded: true };
    case EReduxActionTypes.SET_POST_CONTENT_HEADLINE:
      return updatePostContent(state, action);
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

function updatePostContent(state: IReduxPostsState, action: IReduxSetPostContentHeadline) {
  // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
  return {
    ...state,
    post: {
      ...state.post,
      contents: state.post.contents.map((content: IPostContent) => {
        if (content.id === action.data.id) {
          return createUpdatedContentState(content, action.data);
        }
        return content;
      })
    }
  }
}

function createUpdatedContentState(content: IPostContent, data: IPostContent) {
  let state: any = {...content};
  state = Object.assign(state, data);
  state['changed'] = true;
  return state
}


export function swapObjectsInArray(array: any[], id: number, moveUp: boolean): IPostContent[] {
  // TODO: this is buggy
  let currentIdx: number = getObjectIdxById(array, id);
  let lastIdx: number = array.length - 1;
  let newIdx: number = getSwapTargetIndex(currentIdx, lastIdx, moveUp);
  if (newIdx !== undefined) {
    [array[currentIdx], array[newIdx]] = [array[newIdx], array[currentIdx]];
  }
  return array;
  /* I don't fucking know, it's working now
  let topContent = moveUp ? array[currentIdx] : array[newIdx];
  let bottomContent = moveUp ? array[newIdx] : array[currentIdx];
  console.log(topContent, bottomContent);
  let sliceIdx = currentIdx < newIdx ? currentIdx : newIdx;
  return [
    ...array.slice(0, sliceIdx),
    topContent,
    bottomContent,
    ...array.slice(sliceIdx + 2)
  ]*/
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