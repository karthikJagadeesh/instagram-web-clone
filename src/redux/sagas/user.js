import { apply, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import client from '../singletons/client';
import {
  SET_AUTH_TOKEN,
  FORM_ERROR,
  FORM_SUCCESS,
  SIGN_UP,
  SHOW_MESSAGE
} from '../constants';

function* setAuthToken({ token }) {
  yield localStorage.setItem('secret', token);
  return;
}

function* signUp({ data, path }) {
  try {
    const response = yield apply(client, client.post, [path, data]);
    yield put({ type: FORM_SUCCESS });
    yield put({ type: SHOW_MESSAGE, message: response.data });
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
}
