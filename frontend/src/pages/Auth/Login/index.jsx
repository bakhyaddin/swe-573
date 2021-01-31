import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form, message } from 'antd';
import { useLogin } from '../../../hooks/useXmlHttpService';

import Button from '../../../components/Button';

import LoginStyled from './styles';

const Login = () => {
  const history = useHistory();
  const [loginLoading, setLoginLoading] = useState(false);

  const onFinish = (userdata) => {
    setLoginLoading(true);
    useLogin(userdata)
      .then((res) => {
        window.localStorage.setItem('userSWE573', JSON.stringify(res.user));
        window.localStorage.setItem('tokenSWE573', res.token);
        window.location.replace('/');
      })
      .catch((error) => {
        message.error(error.detail[0]);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <LoginStyled>
      <div className="card">
        <h1 className="card-header">LOGIN</h1>
        <Form
          name="login"
          className="form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email' },
            ]}
          >
            <Input placeholder="E-mail address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className="buttons-container">
            <Button className="button left" loading={loginLoading} type="primary" htmlType="submit">
              Login
            </Button>
            <Button className="button right" type="secondary" onClick={() => history.push('/signup')}>
              Register
            </Button>
          </div>
        </Form>
        <div className="forgot-password">
          <p href="">
            Forgot password?
          </p>
        </div>
      </div>
    </LoginStyled>
  );
};

export default Login;
