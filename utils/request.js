import axios from "axios";

const instance = axios.create({
  baseURL: "https://conduit.productionready.io"
});

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.authorization =
    `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTA4MzMxLCJ1c2VybmFtZSI6Imxvbmd4aWFvYmFpIiwiZXhwIjoxNjAxOTUxODA5fQ.ids88lZZ_BCgEjfL4iNVzOou-xPhi2NvHrXVBc1_ZSU`;

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error.response.data);
});


export default instance;