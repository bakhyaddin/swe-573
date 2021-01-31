import React, { useEffect } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Main from './pages/Main';
import Logout from './pages/Auth/Logout';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { useCheckToken } from './hooks/useXmlHttpService';
// import useMediaQuery from './hooks/useMediaQuery';

import MainContest from './components/MainContent';

const Routes = () => {
  let user = window.localStorage.getItem('userSWE573') ? JSON.parse(window.localStorage.getItem('userSWE573')) : null;
  // const history = useHistory();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    useCheckToken()
      .then(() => {})
      .catch(() => {
        window.location.replace('/logout');
      });
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
      <Route path="/logout" exact component={Logout} />
      <Redirect to="/logout" />
    </Switch>
  );

  // TODO
  // when going to the address /logout it redirect the user to the main page

  if (user) {
    route = (
      <>
        <PrivateRoute exact path="/login">
          <Login />
        </PrivateRoute>
        <MainContest>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/profile" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </MainContest>
      </>
    );
  }
  return (
    route
  );
};

export default Routes;
