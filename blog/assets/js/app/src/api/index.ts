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
