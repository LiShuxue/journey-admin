import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import SHA256 from 'crypto-js/sha256';
import { loginRequest } from '../../http/api';
import { setAccessToken, setRefreshToken, setUsername } from '../../context/auth';

import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (user: UserType) => {
    login(user);
  };

  const login = (user: UserType) => {
    loginRequest({
      username: user.username,
      password: SHA256(user.password).toString(),
    })
      .then((response) => {
        const at = response.data.access_token || '';
        const rt = response.data.refresh_token || '';
        const un = response.data.username || '';
        if (at && rt && un) {
          setAccessToken(at);
          setRefreshToken(rt);
          setUsername(un);
        }
        navigate('/list', { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
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
