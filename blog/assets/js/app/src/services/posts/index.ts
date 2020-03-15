
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

  updatePostContents(post: IPost, deletedContents: IPostContent[]) {
    let url: string = this.contents_detail(post.id);
    let payload: IPostContentsPayload = this.createPostContentsPayload(post.contents, deletedContents);
    this.post(url, payload, this.responseCallback)
  }

  createPostContentsPayload(contents: IPostContent[], deletedContents: IPostContent[]) {
    let newContents: IPostContent[] = [];
    let updatedContents: IPostContent[] = [];
    let ordering = {} as any;
    let deletedContentIds = deletedContents.map((content) => content.id);
    for (let [key, content] of contents.entries()) {
      if (content.id === undefined) {
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
      "delete": deletedContentIds,
      "ordering": ordering,
    }
  }

  responseCallback(response: any) {
    console.log(response);
  }
};