import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Main from './pages/Main';
import Logout from './pages/Auth/Logout';
import NotFound from './pages/NotFound';
// import useMediaQuery from './hooks/useMediaQuery';

const Routes = () => {
  let user = window.localStorage.getItem('userSWE573') && JSON.parse(window.localStorage.getItem('userSWE573'));

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
      <Route path="/logout" exact component={Logout} />
      <Redirect to="/logout" />
    </Switch>
  );

  if (user) {
    route = (
      <Switch>
        <PrivateRoute exact path="/login">
          <Login />
        </PrivateRoute>

        <Route path="/" exact component={Main} />
        <Route path="/logout" exact component={Logout} />
        <Route component={NotFound} />
      </Switch>
    );
  }
  return (
    route
  );
};

export default Routes;
