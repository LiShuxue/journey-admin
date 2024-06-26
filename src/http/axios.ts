import axios from 'axios';
import { message, Modal } from 'antd';
import { setAccessToken, setRefreshToken, setUsername, getAuthData } from '../context/auth';

const instance = axios.create({
  baseURL: '/blog-api',
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAuthData().accessToken}`;
    config.headers['refresh-token'] = getAuthData().refreshToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (
      response.status === 200 &&
      response.headers['new-access-token'] &&
      response.headers['new-refresh-token']
    ) {
      setAccessToken(response.headers['new-access-token']);
      setRefreshToken(response.headers['new-refresh-token']);
    }
    message.success(response.data.message);
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Modal.error({
        content: 'Token无效，请重新登录',
        title: '401',
        okText: '确定',
        closable: false,
        onOk: () => {
          setUsername('');
          setAccessToken('');
          setRefreshToken('');
          // 使用原生的js做重定向
          const origin = window.location.origin;
          window.location.href = `${origin}/adminlsx/loginlsx`;
        },
      });
    } else {
      message.error(error.response?.data?.message || 'something wrong');
    }
    return Promise.reject(error.response);
  }
);

export default instance;
