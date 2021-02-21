/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form, message } from 'antd';
import { useLogin, useChangePassword } from '../../../hooks/useXmlHttpService';

import Button from '../../../components/Button';

import FinishSignUp from '../FinishSignUp';
import { LoginStyled, Modal } from './styles';

const Login = () => {
  const history = useHistory();
  const [loginLoading, setLoginLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [isSignUpFinished, setIsSignUpFinished] = useState(false);

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

  const changePassword = (userdata) => {
    setChangePasswordLoading(true);
    useChangePassword(userdata)
      .then((res) => {
        console.log(res);
        setIsSignUpFinished(true);
        setIsModalVisible(false);
      })
      .catch((error) => {
        message.error(error.detail[0]);
      })
      .finally(() => {
        setChangePasswordLoading(false);
      });
  };

  const ChangePasswordModal = (
    <Modal title="Change Password" visible={isModalVisible} footer={false} closable onCancel={() => setIsModalVisible(false)}>
      <Form
        name="register"
        className="form"
        initialValues={{ remember: true }}
        onFinish={changePassword}
      >
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
        <div className="buttons-container">
          <Button className="button left" type="primary" htmlType="submit" loading={changePasswordLoading}>
            Submit
          </Button>
          <Button className="button right" type="secondary" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );

  return (
    <LoginStyled>
      {isSignUpFinished ? <FinishSignUp /> : (
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
            <a heref="" onClick={() => setIsModalVisible(true)}>
              Forgot password?
            </a>
          </div>
        </div>
      )}
      {ChangePasswordModal}
    </LoginStyled>
  );
};

export default Login;
