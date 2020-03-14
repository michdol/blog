import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios';

import { API_URL } from 'src/config';


export default class BaseApi {
  post(url: string, data: any, responseCallback?: any) {
    let config: AxiosRequestConfig = this.createConfig('post', url, data);
    return axios(config).then(responseCallback).catch(this.handleError)
  }

  createConfig(method: Method, url: string, data: any): AxiosRequestConfig {
    return {
      url: url,
      method: method,
      baseURL: API_URL,
      data: data,
      withCredentials: true,
      responseType: 'json',
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      onUploadProgress: (progressEvent: any) => {},
      onDownloadProgress: (progressEvent: any) => {},
      validateStatus: (status: number) => status >= 200 && status < 300,
      proxy: {
        host: '127.0.0.1',
        port: 8000
      }
    }
  }

  handleError = (error: AxiosError) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(error.message);
    }
  };
}
