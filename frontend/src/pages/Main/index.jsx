import React from 'react';
import { getReuqestedData } from '../../hooks/useXmlHttpService';

import ContentContainer from '../../components/ContentContainer';
import Header from '../../components/Header';
// import StyledMain from './styles';
import Form from './components/Form';

import useMediaQuery from '../../hooks/useMediaQuery';

const Main = () => {
  const { ismobile } = useMediaQuery();

  const getSearchedData = (values) => {
    getReuqestedData(values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header ismobile={ismobile} title="Search" />
      <ContentContainer>
        <Form
          getSearchedData={(values) => getSearchedData(values)}
        />
      </ContentContainer>
    </>

  );
};

export default Main;
