import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';

import ThemeProvider from '../components/utils/theme';
import { history } from '../redux/singletons/store';

import AccountRoutes from './Accounts';
import Feed from './Feed';

const useStyles = makeStyles(theme => ({
  snackbar: {
    '& div': {
      justifyContent: 'center',
      borderRadius: 25,
      color: theme.palette.secondary.main,
      background: '#ffffff'
    }
  }
}));

function Message() {
  const classes = useStyles();

  const [open, message] = useSelector(state => [
    state.ui.snackbar.open,
    state.ui.snackbar.message
  ]);

  return (
    <Snackbar
      open={open}
      TransitionComponent={Slide}
      message={<span>{message}</span>}
      className={classes.snackbar}
    />
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          <span role="img" aria-label="dragon-emoji">
            🐲
          </span>
          Something went wrong
          <span role="img" aria-label="dragon-emoji">
            🐲
          </span>
        </h1>
      );
    }

    return this.props.children;
  }
}

function Layout() {
  const signedIn = useSelector(state => state.user.signedIn);
  const secret =
    localStorage.getItem('instaInfo') &&
    JSON.parse(localStorage.getItem('instaInfo')).secret;

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/account" component={AccountRoutes} />
            <Route
              component={
                signedIn || secret
                  ? Feed
                  : () => <Redirect to="/account" push />
              }
            />
          </Switch>
          <Message />
        </ConnectedRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Layout;
