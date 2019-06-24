import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/';
import rootSaga from '../sagas';

const configureStore = intialState => {
  const logger = createLogger({
    predicate: () => process.env.NODE_ENV !== 'production',
    collapsed: true,
    duration: true,
    diff: true
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    intialState,
    applyMiddleware(logger, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const intialState = {};

const store = configureStore(intialState);

export default store;
