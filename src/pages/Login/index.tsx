import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import SHA256 from 'crypto-js/sha256';
import http from '../../http';
import API from '../../http/api';
import { setAccessToken, setRefreshToken, setUsername } from '../../auth';

import './index.scss';

type userData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (user: userData) => {
    login(user);
  };

  const login = (user: userData) => {
    http
      .post(API.notRequireAuth.login, {
        username: user.username,
        password: SHA256(user.password).toString(),
      })
      .then((response) => {
        if (response.data.access_token && response.data.refresh_token && response.data.username) {
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          setUsername(response.data.username);
        }
        navigate('/list', { replace: true });
      })
      .catch(() => {});
  };

  return (
    <div className="login">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSubmit}
        className="login-wrapper"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" className="login-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
