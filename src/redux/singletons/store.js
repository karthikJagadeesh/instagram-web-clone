import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootReducer from '../reducers/';
import rootSaga from '../sagas';

export const history = createBrowserHistory();

const configureStore = intialState => {
  const logger = createLogger({
    predicate: () => process.env.NODE_ENV !== 'production',
    collapsed: true,
    duration: true,
    diff: true
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    intialState,
    applyMiddleware(logger, sagaMiddleware, routerMiddleware(history))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const intialState = {};

const store = configureStore(intialState);

export default store;
