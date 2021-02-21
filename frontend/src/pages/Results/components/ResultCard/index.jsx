import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  Col, Row, Modal, Tag,
} from 'antd';

import Table from '../Table';
import {
  Container, Overview, WordCloudContainer, GraphContainer,
} from './styles';
import { Plus, Minus, Delete } from '../../../../assets/icons';
import theme from '../../../../theme';

const ResultCard = ({ rs, deleteResult }) => {
  const [result, setResult] = useState(rs);
  const { confirm } = Modal;

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this result?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteResult(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const getTag = (sn) => {
    const sentiment = parseFloat(sn);
    let color = sentiment > 0 ? theme.main.colors.primaryColor : theme.main.colors.red;
    if (sentiment === 0) {
      color = theme.main.colors.green;
    }
    return (
      <Tag color={color} key={sentiment}>
        {sentiment}
      </Tag>
    );
  };

  const handleResultOpen = () => {
    setResult({ ...result, open: !result.open });
  };

  return (
    <Container>
      <Overview>
        <Col span={8}>
          {result.entity}
        </Col>

        <Col span={8}>
          {new Date(result.created_at).toLocaleString()}
        </Col>

        <Col span={8}>
          <Row>
            {result.open ? <Minus color={theme.main.colors.orange} onClick={handleResultOpen} />
              : <Plus color={theme.main.colors.primaryColor} onClick={handleResultOpen} />}
            <Delete color={theme.main.colors.red} width="15px" marginLeft onClick={() => showDeleteConfirm(result.id)} />
          </Row>
        </Col>
      </Overview>
      {result.open && (
      <>
        <Row style={{ width: '100%', height: '40px' }} justify="space-around" align="middle">
          { result.sentiment_result && (
          <Row align="middle">
            <h1>
              Overall Sentiment:
              {' '}
              {getTag(result.sentiment_result)}
            </h1>
          </Row>
          )}

          <h1>{`Number of Twits: ${result.number_of_twits}`}</h1>
        </Row>
        <Table data={result.twits} />
      </>

      )}
      {result.open
      && result.wordcloud_img
        && (
        <WordCloudContainer>
          <h1>
            Wordcloud
          </h1>
          <img
            src={`data:image/jpeg;base64,${result.wordcloud_img}`}
            alt="wordcloud"
          />
        </WordCloudContainer>
        )}
      {result.open
      && result.graph_img
        && (
        <GraphContainer>
          <h1>
            Bigram
          </h1>
          <img
            src={`data:image/jpeg;base64,${result.graph_img}`}
            alt="graph_img"
          />
        </GraphContainer>
        )}
    </Container>
  );
};

ResultCard.propTypes = {
  rs: Proptypes.instanceOf(Object).isRequired,
  deleteResult: Proptypes.func.isRequired,
};

export default ResultCard;
