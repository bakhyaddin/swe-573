import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import Form from './styles';
import Button from '../../../../components/Button';

const DataForm = ({ getSearchedData }) => {
  const { Option } = Select;
  // const { RangePicker } = DatePicker;

  const options = [
    { name: 'Bigram Network', value: 'bigram' },
    { name: 'Wordcloud', value: 'wordcloud' },
    { name: 'Sentiment', value: 'sentiment' },
  ];

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
        labelCol={{ span: 24 }}
        label="Search Term"
        rules={[{ required: true, message: 'Please input a search term!', type: 'string' }]}
      >
        <Input placeholder="Input a search term" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 24 }}
        name="result-type"
        label="Result Type"
        rules={[{ required: true, message: 'Please select at least one results types!', type: 'array' }]}
      >
        <Select mode="multiple" placeholder="Please select results types">
          {options.map((item) => (<Option value={item.value}>{item.name}</Option>))}
        </Select>
      </Form.Item>
      {/* <Form.Item
        name="range"
        label="Range"
        labelCol={{ span: 24 }}
      >
        <RangePicker />
      </Form.Item> */}
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
