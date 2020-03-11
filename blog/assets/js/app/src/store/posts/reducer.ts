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
      //let newContents: IPostContent[] = Array.from(state.post.contents);
      //let newContents: IPostContent[] = JSON.parse(JSON.stringify(state.post.contents));
      let newContents: IPostContent[] = moveObjectInArrayByOnePosition(JSON.parse(JSON.stringify(state.post.contents)), action.id, action.moveUp);
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

function moveObjectInArrayByOnePosition(array: any[], id: number, moveUp: boolean): IPostContent[] {
  let targetIdx: number = getObjectIdxById(array, id);
  let otherIdx: number;
  if (targetIdx === -1) {
    console.log('Object not found');
    return
  }
  let targetContent: IPostContent;
  let otherContent: IPostContent;
  if (moveUp === true) {
    if (targetIdx === 0) {
      return array;
    }
    otherIdx = targetIdx - 1;
  } else {
    if (targetIdx === array.length - 1) {
      return array;
    }
    otherIdx = targetIdx + 1;
  }
  /*
  targetContent = array[targetIdx];
  otherContent = array[otherIdx];
  array[targetIdx] = otherContent;
  array[otherIdx] = targetContent;
  [elements[0], elements[3]] = [elements[3], elements[0]];*/
  [array[targetIdx], array[otherIdx]] = [array[otherIdx], array[targetIdx]];
  return array;
}

function getObjectIdxById(array: any[], id: number): number {
  let targetIdx: number = -1;
  for (let [key, obj] of array.entries()) {
    if (obj.id === id) {
      targetIdx = key;
      break;
    }
  } 
  return targetIdx;
}