import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  useEffect(() => {
    window.localStorage.removeItem('userSWE573');
    window.localStorage.removeItem('tokenSWE573');
    window.location.reload();
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
