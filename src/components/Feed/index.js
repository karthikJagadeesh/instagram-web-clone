import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feed from './Feed';
import TopNavigation from './TopNavigation';

function AuthenticatedRoutes() {
  return (
    <>
      <TopNavigation />
      <Switch>
        <Route component={Feed} />
      </Switch>
    </>
  );
}

export default AuthenticatedRoutes;
