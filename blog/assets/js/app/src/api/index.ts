import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { IPost, IPostContent } from 'store/posts/reducer';

function getAxiosConfig(): AxiosRequestConfig {
  return {
    baseURL: 'http://api.localhost:8000/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const handleResponse = (response: any) => {
  console.log(response);
}

const handleError = (error: AxiosError) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else {
    console.log(error.message);
  }
};

export interface IPostContentsPayload {
  create: IPostContent[];
  update: IPostContent[];
  delete: number[];
  ordering: any;
}

//apiClient.post('http://api.localhost:8000/posts/1/contents/detail/', {}).then(handleResponse);
export function postContentsToServer(post: IPost) {
  let url: string = `posts/${ post.id }/contents/detail/`;
  let payload: IPostContentsPayload = createPostContentsPayload(post.contents);
  let config: AxiosRequestConfig = getAxiosConfig();
  config['data'] = payload;
  config['method'] = 'post';
  config['url'] = url;
  axios(config).then(handleResponse).catch(handleError);
}

function createPostContentsPayload(contents: IPostContent[]) {
  let tmp = 99999999;
  let newContents: IPostContent[] = [];
  let updatedContents: IPostContent[] = [];
  let ordering = {} as any;
  for (let [key, content] of contents.entries()) {
    if (content.id === undefined) {
      content.ref = tmp;
      tmp += 1;
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
