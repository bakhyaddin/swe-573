import React from 'react';
import PropTypes from 'prop-types';

import NavBarStyle from './styles';

const NavBar = ({ children }) => (
  <NavBarStyle>
    {children}
  </NavBarStyle>
);

NavBar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NavBar;
