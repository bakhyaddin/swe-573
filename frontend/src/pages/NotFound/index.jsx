import React from 'react';

import StyledNotFound from './styles';
import Button from '../../components/Button';

const NotFound = () => (
  <StyledNotFound>
    <h1>
      Oops!
    </h1>
    <h1>
      404 Page Not Found
    </h1>
    <span>
      Sorry, an error has occured, Requested page not found!
    </span>
    <br />
    <br />
    <Button onClick={() => window.location.replace('/')} type="primary">
      Go Home
    </Button>
  </StyledNotFound>
);

export default NotFound;
