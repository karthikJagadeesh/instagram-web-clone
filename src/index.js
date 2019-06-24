import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import store from './redux/singletons/store';

const root = document.querySelector('#root');
render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  root
);
