/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Proptypes from 'prop-types';

import { Table, Tag } from 'antd';

import theme from '../../../../theme';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const CustomTable = ({ data }) => {
  const { ismobile } = useMediaQuery();
  const columns = [
    {
      title: 'Twit',
      dataIndex: 'text',
      key: 'twit',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'date',
      width: 120,
      render: (date) => (
        new Date(date).toLocaleDateString()
      ),
    },
    {
      title: 'Sentiment',
      key: 'sentiment',
      dataIndex: 'sentiment',
      width: 100,
      render: (sn, index) => {
        const sentiment = parseFloat(sn);
        let color = sentiment > 0 ? theme.main.colors.primaryColor : theme.main.colors.red;
        if (sentiment === 0) {
          color = theme.main.colors.green;
        }
        return (
          <Tag color={color} key={sentiment + index}>
            {sentiment}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: ismobile ? 700
          : 1000,
        y: 500,
      }}
    />
  );
};

CustomTable.propTypes = {
  data: Proptypes.instanceOf(Object).isRequired,
};

export default CustomTable;
