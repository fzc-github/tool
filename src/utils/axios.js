import axios from 'axios'
import {
  notification
} from 'antd';
 
axios.defaults.baseURL = "/"; // 默认路径
axios.defaults.timeout = 10000
 
// 请求拦截
axios.interceptors.request.use(
  config => {
    // const token = store.state.token;
    // config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.error(error)
  }
);
 
// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      notification.error({
        description: '出了一点小问题',
        message: '错误',
      });
      console.log(2)
      return Promise.reject(false);
    }
  },
  error => {
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     case 401:
    //       break
    //   }
    // }
    console.log(3)
 
    notification.error({
      description: '出了一点问题',
      message: '错误',
    });
    return Promise.reject(false);
  }
);
 
export default axios