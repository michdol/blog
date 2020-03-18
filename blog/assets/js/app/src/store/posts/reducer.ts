import { v4 } from 'uuid';

import { EPostContentTypes } from 'src/constants';
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
  headline?: string;
  text?: string;
  image_url?: string;
  type: number;
  is_hidden: boolean;
  order: number;
  extra: any;
  created?: Date;
  updated?: Date;
  changed: boolean;
}

export interface INewPostContentData {
  headline?: string;
  text?: string;
  order: number;
  type: number;
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
  isContentSaved: boolean;
}

const initialState: IReduxPostsState = {
  post: {} as any,
  postLoaded: false,
  deletedContents: [],
  isContentSaved: false
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
      return { ...state, post: action.data, postLoaded: true, deletedContents: [], isContentSaved: true };
    case EReduxActionTypes.SET_POST_CONTENT_HEADLINE:
      contentsCopy = Array.from(state.post.contents);
      let updatedContents: IPostContent[] = updatePostContent(contentsCopy, action.data);
      return { ...state, isContentSaved: false, post: {...state.post, contents: updatedContents } }
    case EReduxActionTypes.REORDER_POST_CONTENTS:
      let newContents: IPostContent[] = Array.from(state.post.contents);
      newContents = swapObjectsInArray(newContents, action.id, action.moveUp);
      if (newContents === undefined) {
        // Do nothing
        return { ...state }
      }
      return {...state, isContentSaved: false, post: {...state.post, contents: newContents } }
    case EReduxActionTypes.ADD_POST_CONTENT:
      contentsCopy = Array.from(state.post.contents);
      contentsCopy = insertNewContent(contentsCopy, action.data);
      return {...state, isContentSaved: false, post: {...state.post, contents: contentsCopy } }
    case EReduxActionTypes.DELETE_POST_CONTENT:
      contentsCopy = Array.from(state.post.contents);
      contentsCopy = deletePostContent(contentsCopy, action.content);
      let deletedContentsCopy = Array.from(state.deletedContents);
      if (action.content.id !== undefined) {
        deletedContentsCopy.push(action.content);
      }
      return {...state,
        isContentSaved: false,
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

function insertNewContent(contents: IPostContent[], data: INewPostContentData): IPostContent[] {
  let newContent = createNewPostContent(data);
  if (data.order < 0) {
    return [
      ...contents,
      newContent
    ]
  }
  return [
    ...contents.slice(0, data.order),
    newContent,
    ...contents.slice(data.order)
  ]
}

function createEmptyContent(): IPostContent {
  return {
    ref: v4(),
    headline: "Temporary headline",
    text: "",
    type: 0,
    extra: {},
    order: undefined,
    is_hidden: false,
    changed: false
  }
}

function createNewPostContent(data: INewPostContentData): IPostContent {
  return Object.assign({
      ref: v4(),
      extra: {},
      is_hidden: false,
      changed: false
    },
    data
  )
}