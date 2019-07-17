import { apply, delay, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import client from '../singletons/client';
import {
  SET_AUTH_TOKEN,
  FORM_ERROR,
  CLEAR_FORM_ERROR,
  SIGN_UP,
  LOG_IN,
  SHOW_MESSAGE,
  LOCATION_CHANGE,
  LOG_IN_SUCCESS,
  LOG_OUT
} from '../constants';

function* setAuthToken({ token, userInfo: { id, userName } }) {
  const instaInfo = {
    secret: token,
    userId: id,
    userName
  };
  yield localStorage.setItem('instaInfo', JSON.stringify(instaInfo));

  return;
}

function* logIn({ data, path }) {
  try {
    const { message, token, userInfo } = yield apply(client, client.post, [
      path,
      '',
      data
    ]);
    yield put({ type: SHOW_MESSAGE, message });
    yield put({ type: SET_AUTH_TOKEN, token, userInfo });
    yield put({ type: LOG_IN_SUCCESS });
    yield put(push('/'));
    return;
  } catch ({ error }) {
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

function* signUp({ data, path }) {
  try {
    const response = yield apply(client, client.post, [path, '', data]);
    yield put({ type: SHOW_MESSAGE, message: response.message });
    yield put(push('/account/login'));
    return response;
  } catch ({ error }) {
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

function* logOut() {
  yield localStorage.removeItem('instaInfo');
  yield delay(1000);
  yield put(push('/account/login'));
  return;
}

export function* userSaga() {
  yield takeEvery(SIGN_UP, signUp);
  yield takeEvery(SET_AUTH_TOKEN, setAuthToken);
  yield takeEvery(LOG_IN, logIn);
  yield takeEvery(LOG_OUT, logOut);

  yield takeEvery(LOCATION_CHANGE, function*() {
    yield put({ type: CLEAR_FORM_ERROR });
  });
}
