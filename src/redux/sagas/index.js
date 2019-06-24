import { fork } from 'redux-saga/effects';

import { signUpSaga } from './user';

export default function*() {
  yield fork(signUpSaga);
}
