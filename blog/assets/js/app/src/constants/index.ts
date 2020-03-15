function readJSON(elementId: string) {
  return JSON.parse(document.getElementById(elementId).textContent)
}

export const API_URL = readJSON('API_URL');

export const POST_CONTENT_TYPE_UNDEFINED = 0;
export const POST_CONTENT_TYPE_HEADLINE = 1;
export const POST_CONTENT_TYPE_TEXT = 2;
export const POST_CONTENT_TYPE_IMAGE = 3;
export const POST_CONTENT_TYPE_VIDEO = 4;
export const POST_CONTENT_TYPE_CODE = 5;

export enum EPostContentTypes {
  POST_CONTENT_TYPE_UNDEFINED = 0,
  POST_CONTENT_TYPE_HEADLINE = 1,
  POST_CONTENT_TYPE_TEXT = 2,
  POST_CONTENT_TYPE_IMAGE = 3,
  POST_CONTENT_TYPE_VIDEO = 4,
  POST_CONTENT_TYPE_CODE = 5,
}

export const POST_CONTENT_TYPE_CHOICES: { [key: number]: string } = {
  [EPostContentTypes.POST_CONTENT_TYPE_UNDEFINED]: 'undefined',
  [EPostContentTypes.POST_CONTENT_TYPE_HEADLINE]: 'headline',
  [EPostContentTypes.POST_CONTENT_TYPE_TEXT]: 'text',
  [EPostContentTypes.POST_CONTENT_TYPE_IMAGE]: 'image',
  [EPostContentTypes.POST_CONTENT_TYPE_VIDEO]: 'video',
  [EPostContentTypes.POST_CONTENT_TYPE_CODE]: 'code',
};
