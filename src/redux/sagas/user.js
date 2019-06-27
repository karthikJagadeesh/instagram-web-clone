import { apply, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import client from '../singletons/client';
import {
  SET_AUTH_TOKEN,
  FORM_ERROR,
  CLEAR_FORM_ERROR,
  SIGN_UP,
  LOG_IN,
  SHOW_MESSAGE,
  LOCATION_CHANGE
} from '../constants';

function* setAuthToken({ token }) {
  yield localStorage.setItem('secret', token);
  return;
}

function* logIn({ data, path }) {
  try {
    const response = yield apply(client, client.post, [path, data]);
    yield put({ type: CLEAR_FORM_ERROR });
    yield put({ type: SHOW_MESSAGE, message: response.message });
    yield put({ type: SET_AUTH_TOKEN, token: response.token });
    return response;
  } catch ({ error }) {
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

function* signUp({ data, path }) {
  try {
    const response = yield apply(client, client.post, [path, data]);
    yield put({ type: CLEAR_FORM_ERROR });
    yield put({ type: SHOW_MESSAGE, message: response.message });
    yield put(push('/login'));
    return response;
  } catch ({ error }) {
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

export function* userSaga() {
  yield takeEvery(SIGN_UP, signUp);
  yield takeEvery(SET_AUTH_TOKEN, setAuthToken);
  yield takeEvery(LOG_IN, logIn);

  yield takeEvery(LOCATION_CHANGE, function*() {
    yield put({ type: CLEAR_FORM_ERROR });
  });
}
