import React from 'react';
import { useLocation } from 'react-router-dom';

import { Search, Results } from '../../assets/icons';
import MenuItem from '../MenuItem';
import Sider from './styles';
import nerdwits from '../../assets/nerdwits_white.png';

const menuItemsData = [
  {
    Icon: Search,
    name: 'Search',
    path: '/',
  },
  {
    Icon: Results,
    name: 'Results',
    path: '/results',
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Sider>
      <div className="logo-container">
        <img className="logo" alt="logo" style={{ height: '100%' }} src={nerdwits} />
      </div>
      <div className="menu-items-container">
        {menuItemsData.map((item) => (
          <MenuItem
            key={item.name}
            Icon={item.Icon}
            name={item.name}
            active={item.path === `/${location.pathname.split('/')[1]}`}
            path={item.path}
          />
        ))}
      </div>
    </Sider>
  );
};

export default SideBar;
