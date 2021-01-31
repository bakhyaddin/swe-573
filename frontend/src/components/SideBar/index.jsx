import React from 'react';
import { useLocation } from 'react-router-dom';

import { Search, Profile } from '../../assets/icons';
import MenuItem from '../MenuItem';
import Sider from './styles';
// import WOPS from '../../assets/wops.png';

const menuItemsData = [
  {
    Icon: Search,
    name: 'Search',
    path: '/',
  },
  {
    Icon: Profile,
    name: 'Profile',
    path: '/profile',
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Sider>
      <div className="logo-container">
        <img className="logo" alt="logo" src={null} />
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
