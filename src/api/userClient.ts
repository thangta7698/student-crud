import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { STATIC_HOST } from '../constants';

const userClient = axios.create({
    baseURL: `${STATIC_HOST}`,
    headers: {
        'Content-Type': 'application/json'
    },
});
userClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
userClient.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.data);
    return response.data;

}, function (error) {
    console.log("ERROR", error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default userClient;