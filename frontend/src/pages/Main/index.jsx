import React from 'react';
import { getReuqestedData } from '../../hooks/useXmlHttpService';

import StyledMain from './styles';
import Header from '../../components/Header';
import Form from './components/Form';

const Main = () => {
  const getSearchedData = (values) => {
    getReuqestedData(values);
  };
  return (
    <StyledMain>
      <Header />
      <Form
        getSearchedData={(values) => getSearchedData(values)}
      />
    </StyledMain>

  );
};

export default Main;
