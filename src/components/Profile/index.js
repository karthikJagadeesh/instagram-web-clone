import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';

function ProfileRoutes(props) {
  const withProps = Component => routeProps => (
    <Component {...routeProps} {...props} />
  );

  const {
    user: { userName }
  } = props;

  return (
    <Switch>
      <Route
        exact
        path={`/${userName}/edit`}
        component={withProps(EditProfilePage)}
      />
      <Route
        exact
        path={`/${userName}/change-password`}
        component={withProps(EditProfilePage)}
      />
      <Route
        component={routeProps => <ProfilePage {...routeProps} {...props} />}
      />
    </Switch>
  );
}

export default ProfileRoutes;
