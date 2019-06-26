import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';

import ThemeProvider from '../components/utils/theme';
import { history } from '../redux/singletons/store';

import AccountRoutes from './Accounts';

const useStyles = makeStyles(theme => ({
  snackbar: {
    '& div': {
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
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/accounts" component={AccountRoutes} />
            <Route component={AccountRoutes} />
          </Switch>
          <Message />
        </ConnectedRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Layout;
