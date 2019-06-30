import { fork } from 'redux-saga/effects';

import { userSaga } from './user';
import { uiSaga } from './ui';
import { apiSaga } from './api';

export default function*() {
  yield fork(userSaga);
  yield fork(uiSaga);
  yield fork(apiSaga);
}
