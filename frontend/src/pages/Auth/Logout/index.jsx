import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  window.localStorage.removeItem('userSWE573');
  window.localStorage.removeItem('tokenSWE573');
  return <Redirect to="/login" />;
};

export default Logout;
