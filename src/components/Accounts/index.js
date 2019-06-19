import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';

function AccountRoutes() {
  return (
    <Switch>
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/password" component={ForgotPasswordPage} />
      <Route component={() => <Redirect to="/login" push />} />
    </Switch>
  );
}

export default AccountRoutes;
