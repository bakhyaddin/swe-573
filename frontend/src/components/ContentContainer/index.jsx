import React from 'react';
import PropTypes from 'prop-types';
import Content from './styles';
import useMediaQuery from '../../hooks/useMediaQuery';

const ContentContainer = ({ children }) => (
  <Content ismobile={useMediaQuery().ismobile}>
    {children}
  </Content>
);

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentContainer;
