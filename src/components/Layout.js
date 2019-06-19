import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ThemeProvider from '../components/utils/theme';

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
        <Router>
          <Switch>
            <Route path="/accounts" component={AccountRoutes} />
            <Route component={AccountRoutes} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Layout;
