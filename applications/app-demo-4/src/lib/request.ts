import axios from 'axios';

const BASR_URL = '';

const request = axios.create({
  baseURL: BASR_URL,
  timeout: 10000,
});

// 请求拦截
request.interceptors.request.use((config) => {
  // config.headers['Authorization']  = `Bearer ${getToken()}`
  return config;
});

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      // notification.error({  message: '请求异常' });
      return Promise.reject(new Error(res.message));
    }
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      // Token过期处理
    }
    return Promise.reject(error);
  }
);

export default request;
