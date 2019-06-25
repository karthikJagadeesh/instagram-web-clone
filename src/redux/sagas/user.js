import { apply, call, take } from 'redux-saga/effects';

import client from '../singletons/client';

function* signUp({ data, path }) {
  try {
    const response = yield apply(client, client.post, [path, data]);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function* signUpSaga() {
  const action = yield take('SIGN_UP');
  yield call(signUp, action);
}
