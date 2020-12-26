import React from 'react';

import StyledHeader from './styles';
import Button from '../Button';

const Header = () => (
  <StyledHeader align="middle" justify="center">
    <Button type="link">
      Button 1
    </Button>
    <Button type="link">
      Button 1
    </Button>
    <Button type="link">
      Button 1
    </Button>
  </StyledHeader>
);

export default Header;
