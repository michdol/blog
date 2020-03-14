import axios, { AxiosRequestConfig } from 'axios';

/*
const config: AxiosRequestConfig = {
	baseUrl: 'api.localhost:8000/',
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json'
	}	
};*/

export const apiClient = axios.create();

const handleResponse = (response: any) => {
	console.log(response);
}

//apiClient.post('http://api.localhost:8000/posts/1/contents/detail/', {}).then(handleResponse);