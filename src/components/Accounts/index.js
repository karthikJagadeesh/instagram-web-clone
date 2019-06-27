import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';

function AccountRoutes({ match: { path } }) {
  return (
    <Switch>
      <Route exact path={`${path}/signup`} component={SignUpPage} />
      <Route exact path={`${path}/login`} component={LoginPage} />
      <Route
        exact
        path={`${path}/password/reset`}
        component={ForgotPasswordPage}
      />
      <Route component={() => <Redirect to={`${path}/login`} push />} />
    </Switch>
  );
}

export default AccountRoutes;
