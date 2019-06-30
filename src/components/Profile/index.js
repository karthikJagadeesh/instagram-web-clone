import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfilePage from './ProfilePage';

function ProfileRoutes(props) {
  return (
    <Switch>
      <Route
        component={routeProps => <ProfilePage {...routeProps} {...props} />}
      />
    </Switch>
  );
}

export default ProfileRoutes;
