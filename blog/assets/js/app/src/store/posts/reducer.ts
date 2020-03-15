import { v4 } from 'uuid';

import { EReduxActionTypes } from 'store';
import {
  IReduxGetPostAction,
  IReduxSetPostContentHeadline,
  IReduxReorderPostContents,
  IReduxDeletePostContent,
  IReduxAddPostContent
} from './actions';


export interface IPostContent {
  id?: number;
  ref?: string;
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

export interface IReduxPostsState {
  post: IPost;
  postLoaded: boolean;
  deletedContents: IPostContent[];
}

const initialState: IReduxPostsState = {
  post: {} as any,
  postLoaded: false,
  deletedContents: []
};

type TPostsReducerActions =
  IReduxGetPostAction |
  IReduxSetPostContentHeadline |
  IReduxReorderPostContents |
  IReduxDeletePostContent |
  IReduxAddPostContent;

export default function(state: IReduxPostsState = initialState, action: TPostsReducerActions) {
  let contentsCopy: IPostContent[];
  switch (action.type) {
    case EReduxActionTypes.GET_POST:
      return { ...state, post: action.data, postLoaded: true };
    case EReduxActionTypes.SET_POST_CONTENT_HEADLINE:
      contentsCopy = Array.from(state.post.contents);
      let updatedContents: IPostContent[] = updatePostContent(contentsCopy, action.data);
      return { ...state, post: {...state.post, contents: updatedContents } }
    case EReduxActionTypes.REORDER_POST_CONTENTS:
      let newContents: IPostContent[] = Array.from(state.post.contents);
      newContents = swapObjectsInArray(newContents, action.id, action.moveUp);
      if (newContents === undefined) {
        // Do nothing
        return { ...state }
      }
      return {...state, post: {...state.post, contents: newContents } }
    case EReduxActionTypes.ADD_POST_CONTENT:
      contentsCopy = Array.from(state.post.contents);
      contentsCopy = insertNewContent(contentsCopy, action.index);
      return {...state, post: {...state.post, contents: contentsCopy } }
    case EReduxActionTypes.DELETE_POST_CONTENT:
      contentsCopy = Array.from(state.post.contents);
      contentsCopy = deletePostContent(contentsCopy, action.content);
      let deletedContentsCopy = Array.from(state.deletedContents);
      deletedContentsCopy.push(action.content);
      return {...state,
        deletedContents: deletedContentsCopy,
        post: {
          ...state.post,
          contents: contentsCopy
        }
      }
    default:
      return state;
  }
}

function updatePostContent(contents: IPostContent[], targetContent: IPostContent): IPostContent[] {
  // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
  return contents.map((content) => {
    if (content.id !== targetContent.id) {
      return content
    }
    // This is mutating the state
    return {
      ...content,
      ...targetContent,
      changed: true
    }
  }) 
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

function deletePostContent(contents: IPostContent[], target: IPostContent): IPostContent[] {
  if (target.id === undefined) {
    return contents.filter((content: IPostContent) => content.ref !== target.ref)
  }
  return contents.filter((content: IPostContent) => content.id !== target.id)
}

function insertNewContent(contents: IPostContent[], index: number): IPostContent[] {
  let newContent = createEmptyContent();
  return [
    ...contents.slice(0, index),
    newContent,
    ...contents.slice(index)
  ]
}

function createEmptyContent(): IPostContent {
  return {
    ref: v4(),
    headline: "Temporary headline",
    text: "",
    order: undefined,
    is_hidden: false,
    changed: false
  }
}