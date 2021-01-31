import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

import theme from '../../theme';
import MenuItemContainer from './styles';

const MenuItem = ({
  Icon, name, path, active,
}) => {
  const history = useHistory();
  const { ismobile } = useMediaQuery();
  return (
    <MenuItemContainer
      className={active && 'active'}
      onClick={() => history.push(path)}
      ismobile={ismobile}
    >
      <div style={{ padding: '10px' }}><Icon color={active ? theme.main.colors.green : theme.main.colors.cyan} /></div>
      <span className="name">{name}</span>

    </MenuItemContainer>
  );
};

MenuItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default MenuItem;
