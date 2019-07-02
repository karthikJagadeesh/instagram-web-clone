import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { userActions } from '../../redux/actions/api';

import ProfileRoutes from '../Profile';

import Feed from './Feed';
import TopNavigation from '../TopNavigation';
import LoadingPage from '../LoadingPage';

const useStyles = makeStyles({
  container: {
    marginTop: 130,
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 935px)',
    justifyContent: 'center'
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

  const withProps = Component => props =>
    user ? <Component user={user} {...props} /> : <LoadingPage />;

  return (
    <>
      <TopNavigation userName={userName} />
      <section className={classes.container}>
        <Switch>
          <Route path={`/${userName}`} component={withProps(ProfileRoutes)} />
          <Route exact path="/" component={withProps(Feed)} />
        </Switch>
      </section>
    </>
  );
}

export default AuthenticatedRoutes;
