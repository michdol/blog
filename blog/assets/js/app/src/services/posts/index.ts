import { v4 } from 'uuid';

import BaseApi from 'src/services/api';
import { IPost, IPostContent } from 'store/posts/reducer';


export interface IPostContentsPayload {
  create: IPostContent[];
  update: IPostContent[];
  delete: number[];
  ordering: any;
}

export default class PostsService extends BaseApi {
  contents_detail(id: number): string {
    return `posts/${ id }/contents/detail/`
  }

  updatePostContents(post: IPost) {
    let url: string = this.contents_detail(post.id);
    let payload: IPostContentsPayload = this.createPostContentsPayload(post.contents);
    this.post(url, payload, this.responseCallback)
  }

  createPostContentsPayload(contents: IPostContent[]) {
    // TODO: add deleting contents
    let newContents: IPostContent[] = [];
    let updatedContents: IPostContent[] = [];
    let ordering = {} as any;
    for (let [key, content] of contents.entries()) {
      if (content.id === undefined) {
        content.ref = v4();
        newContents.push(content);
      } else if (content.id && content.changed === true) {
        updatedContents.push(content);
      }
      let ref = content.id ? content.id : content.ref;
      ordering[ref] = key;
    }
    return {
      "create": newContents,
      "update": updatedContents,
      "delete": [] as any,
      "ordering": ordering,
    }
  }

  responseCallback(response: any) {
    console.log(response);
  }
};