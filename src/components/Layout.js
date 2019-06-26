import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import ThemeProvider from '../components/utils/theme';
import { history } from '../redux/singletons/store';

import AccountRoutes from './Accounts';

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
        </ConnectedRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Layout;
