import { fork } from 'redux-saga/effects';

import { userSaga } from './user';
import { uiSaga } from './ui';

export default function*() {
  yield fork(userSaga);
  yield fork(uiSaga);
}
