import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { userActions, getUserProfileAction } from '../../redux/actions/api';

import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';

const TopNavigation = lazy(() => import('../TopNavigation'));
const EditProfilePage = lazy(() => import('../Profile/EditProfilePage'));
const Feed = lazy(() => import('./Feed'));
const ProfilePage = lazy(() => import('../Profile/ProfilePage'));

const useStyles = makeStyles(theme => {
  const containerLarge = {
    margin: '130px 0px 50px',
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 935px)',
    justifyContent: 'center'
  };

  return {
    container: {
      [theme.breakpoints.up('sm')]: {
        ...containerLarge
      },
      [theme.breakpoints.down('xs')]: {
        ...containerLarge,
        marginTop: 100
      }
    }
  };
});

export default function AuthenticatedRoutes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.api.user);
  const { userId, userName } = JSON.parse(localStorage.getItem('instaInfo'));

  useEffect(() => {
    dispatch(userActions.get(userId));
  }, [dispatch, userId]);

  const withProps = Component => props =>
    user ? (
      <Component user={user} isOwner={true} {...props} />
    ) : (
      <LoadingPage />
    );

  return (
    <Suspense fallback={<LoadingPage />}>
      <TopNavigation userName={userName} />
      <section className={classes.container}>
        <Switch>
          <Route exact path="/" component={withProps(Feed)} />
          <Route
            exact
            path="/accounts/edit"
            component={withProps(EditProfilePage)}
          />
          <Route
            exact
            path="/accounts/change-password"
            component={withProps(EditProfilePage)}
          />
          <Route
            exact
            path={`/${userName}`}
            component={withProps(ProfilePage)}
          />
          <Route exact path="/:userName" component={CheckForInstaUser} />
          <Route component={ErrorPage} />
        </Switch>
      </section>
    </Suspense>
  );
}

function CheckForInstaUser(props) {
  const dispatch = useDispatch();
  const userProfile = useSelector(({ api }) => api.userProfile);
  const {
    match: {
      params: { userName }
    }
  } = props;

  useEffect(() => {
    dispatch(getUserProfileAction({ params: userName }));
  }, [dispatch, userName]);

  switch (userProfile && userProfile.status) {
    case 'failed':
      return <ErrorPage />;

    case 'ok':
      const profilePageProps = {
        ...props,
        user: userProfile.data,
        isOwner: false
      };
      return <ProfilePage {...profilePageProps} />;

    default:
      return <LoadingPage />;
  }
}
