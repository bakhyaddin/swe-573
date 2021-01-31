/* eslint-disable consistent-return */
import styled from 'styled-components';
import { Button } from 'antd';

// TYPES: primary - secondary - default-seconadry - deafult - link

export default styled(Button)`
  border-radius: ${({ theme }) => (theme.button.borderRadius)};
  box-shadow: ${({ type, theme }) => type !== 'link' && theme.button.shadow};

  background: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return theme.main.colors.primaryColorDark;
      case 'secondary':
        return theme.main.colors.green;
      case 'link':
        return 'transparent';
      default:
        break;
    }
  }};
  color: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return '#ffff';
      case 'secondary':
        return '#ffff';
      case 'link':
        return theme.main.colors.primaryColor;
      default:
        break;
    }
  }};
  border-color: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return theme.main.colors.primaryColor;
      case 'secondary':
        return theme.main.colors.green;
      case 'link':
        return 'transparent';
      default:
        break;
    }
  }};

  &.ant-btn:hover,
  &.ant-btn:focus {
    background: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return theme.main.colors.primaryColor;
      case 'secondary':
        return theme.main.colors.green;
      case 'link':
        return 'transparent';
      default:
        break;
    }
  }};
    color: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return '#ffff';
      case 'secondary':
        return '#ffff';
      case 'link':
        return theme.main.colors.green;
      default:
        break;
    }
  }};
    border-color: ${({ type, theme }) => {
    switch (type) {
      case 'primary':
        return theme.main.colors.primaryColor;
      case 'secondary':
        return theme.main.colors.green;
      case 'link':
        return 'transparent';
      default:
        break;
    }
  }};
  }
`;
