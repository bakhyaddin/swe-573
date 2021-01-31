import React from 'react';
import PropTypes from 'prop-types';

import StyledHeader from './styles';

const Header = ({ ismobile, title }) => (
  <StyledHeader ismobile={ismobile} align="middle" justify="center">
    {ismobile && (
    <p className="text">
      {title}
    </p>
    )}
  </StyledHeader>
);

Header.propTypes = {
  ismobile: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
};

export default Header;
