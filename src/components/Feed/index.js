import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { userActions } from '../../redux/actions/api';

import ProfileRoutes from '../Profile';

import Feed from './Feed';
import TopNavigation from '../TopNavigation';

const useStyles = makeStyles({
  container: {
    marginTop: 130
  }
});

function AuthenticatedRoutes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.api.user);
  const { userId, userName } = JSON.parse(localStorage.getItem('instaInfo'));

  useEffect(() => {
    dispatch(userActions.get(userId));
  }, [dispatch, userId]);

  const withProps = Component => props => <Component user={user} {...props} />;

  return (
    <>
      <TopNavigation userName={userName} />
      <section className={classes.container}>
        <Switch>
          <Route
            exact
            path={`/${userName}`}
            component={withProps(ProfileRoutes)}
          />
          <Route exact path="/" component={withProps(Feed)} />
          <Route component={() => <div>Loading...</div>} />
        </Switch>
      </section>
    </>
  );
}

export default AuthenticatedRoutes;
