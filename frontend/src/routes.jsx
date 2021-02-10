import React, { useEffect } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Main from './pages/Main';
import Logout from './pages/Auth/Logout';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

import { useCheckToken } from './hooks/useXmlHttpService';
// import useMediaQuery from './hooks/useMediaQuery';

import MainContent from './components/MainContent';

const Routes = () => {
  let user = window.localStorage.getItem('userSWE573') ? JSON.parse(window.localStorage.getItem('userSWE573')) : null;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    user = window.localStorage.getItem('userSWE573');
    if (user) {
      useCheckToken()
        .then(() => {})
        .catch(() => {
          window.location.assign('/logout');
        });
    }
  }, [user]);

  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children, ...rest }) => {
    user = window.localStorage.getItem('userSWE573');
    return (
      <Route
          // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={() => (user ? <Redirect to="/" /> : children)}
      />
    );
  };

  let route = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Redirect to="/login" />
    </Switch>
  );

  if (user) {
    route = (
      <>
        <PrivateRoute exact path="/login">
          <Login />
        </PrivateRoute>
        <MainContent>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/results" exact component={Results} />
            <Route component={NotFound} />
          </Switch>
        </MainContent>
      </>
    );
  }
  return (
    route
  );
};

export default Routes;
