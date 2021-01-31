import React, { useState } from 'react';
import { message } from 'antd';
import { getReuqestedData } from '../../hooks/useXmlHttpService';

import ContentContainer from '../../components/ContentContainer';
import Header from '../../components/Header';
// import StyledMain from './styles';
import Form from './components/Form';

import useMediaQuery from '../../hooks/useMediaQuery';

const Main = () => {
  const { ismobile } = useMediaQuery();
  const [loading, setLoading] = useState(false);

  const getSearchedData = (values) => {
    setLoading(true);
    getReuqestedData(values)
      .then(() => message.success('Your results are ready!'))
      .catch(() => message.error('Something went wrong!'))
      .finally(setLoading(false));
  };
  return (
    <>
      <Header ismobile={ismobile} title="Search" />
      <ContentContainer>
        <Form
          getSearchedData={(values) => getSearchedData(values)}
          loading={loading}
        />
      </ContentContainer>
    </>

  );
};

export default Main;
