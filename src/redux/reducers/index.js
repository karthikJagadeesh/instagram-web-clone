import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import uiReducer from './ui';

export default history =>
  combineReducers({
    user: userReducer,
    ui: uiReducer,
    router: connectRouter(history)
  });
