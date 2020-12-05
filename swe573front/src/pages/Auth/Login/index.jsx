import React from 'react';

import { Input, Form } from 'antd';
import { useLogin } from '../../../hooks/useAuth';

import Button from '../../../components/Button';

import LoginStyled from './styles';

const Login = () => {
  const onFinish = (userdata) => {
    useLogin(userdata)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
            name="username"
            rules={[
              { type: 'email', message: 'Please input a valid e-mail!' },
              { required: true, message: 'Please input your e-mail!' }]}
          >
            <Input placeholder="E-mail address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className="buttons-container">
            <Button className="button left" loading={false} type="primary" htmlType="submit">
              Login
            </Button>
            <Button className="button right" loading={false} type="secondary">
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
