import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { LayoutStyled, ContentStyled } from './styles';
import SideBar from '../SideBar';
import BottomNavBar from '../Mobile/BottomNavBar';

import useMediaQuery from '../../hooks/useMediaQuery';

const MainContent = ({ children }) => {
  const { ismobile } = useMediaQuery();
  return (
    <Layout hasSider>
      {ismobile ? <BottomNavBar /> : <SideBar />}
      <LayoutStyled>
        <ContentStyled>{children}</ContentStyled>
      </LayoutStyled>
    </Layout>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
