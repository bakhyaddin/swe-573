import React, { useState } from 'react';

import { Input, Form, message } from 'antd';
import { useRegister } from '../../../hooks/useXmlHttpService';

import Button from '../../../components/Button';

import LoginStyled from './styles';

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);

  const onFinish = (userdata) => {
    setSignupLoading(true);
    useRegister(userdata)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        message.error(error.detail[0]);
      })
      .finally(() => {
        setSignupLoading(false);
      });
  };

  return (
    <LoginStyled>
      <div className="card">
        <h1 className="card-header">REGISTER</h1>
        <Form
          name="register"
          className="form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="surname"
            rules={[{ required: true, message: 'Please input your Surname!' }]}
          >
            <Input
              placeholder="Surname"
            />
          </Form.Item>

          <Form.Item
            name="email"
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
            <Input.Password
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(Error('The two passwords must match!'));
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Button className="button left" loading={signupLoading} type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </div>
    </LoginStyled>
  );
};

export default Signup;
