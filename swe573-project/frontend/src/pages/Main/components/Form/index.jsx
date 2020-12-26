import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import Form from './styles';
import Button from '../../../../components/Button';

const DataForm = ({ getSearchedData }) => {
  const onFinish = (values) => {
    getSearchedData(values);
  };

  return (
    <Form
      name="data_form"
      onFinish={onFinish}
    >
      <Form.Item
        name="search"

      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Search
      </Button>
    </Form>
  );
};

DataForm.propTypes = {
  getSearchedData: PropTypes.func.isRequired,
};

export default DataForm;
