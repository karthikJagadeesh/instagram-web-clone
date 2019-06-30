import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import uiReducer from './ui';
import apiReducer from './api';

export default history =>
  combineReducers({
    api: apiReducer,
    user: userReducer,
    ui: uiReducer,
    router: connectRouter(history)
  });
