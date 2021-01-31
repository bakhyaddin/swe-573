import React from 'react';
import { useLocation } from 'react-router-dom';

import { Search, Profile } from '../../../assets/icons';
import MenuItem from '../../MenuItem';
import BottomNavBarStyle from './styles';

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
    <BottomNavBarStyle>
      {menuItemsData.map((item) => (
        <MenuItem
          key={item.name}
          Icon={item.Icon}
          name={item.name}
          active={item.path === `/${location.pathname.split('/')[1]}`}
          path={item.path}
        />
      ))}
    </BottomNavBarStyle>
  );
};

export default SideBar;
