import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Button, Menu } from 'antd';
import { Profile, Logout } from '../../assets/icons';

import theme from '../../theme';

import StyledHeader from './styles';

const Header = ({ ismobile, title }) => {
  const user = JSON.parse(window.localStorage.getItem('userSWE573'));
  const menu = (
    <Menu>
      <Menu.Item>
        {user.name}
        {' '}
        {user.surname}
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={() => window.location.replace('/logout')}>
          <Logout style={{ marginRight: '5px' }} color={theme.main.colors.primaryColor} />
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader ismobile={ismobile} align="middle" justify="center">
      {ismobile && (
      <p className="text">
        {title}
      </p>
      )}
      <div style={{ flex: '1' }} />
      <Dropdown className="dropdown" overlay={menu} placement="bottomRight" arrow>
        <Button shape="circle" icon={<Profile color={theme.main.colors.primaryColor} />} />
      </Dropdown>
    </StyledHeader>
  );
};

Header.propTypes = {
  ismobile: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
};

export default Header;
