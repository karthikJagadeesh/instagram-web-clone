import { apply, put, takeEvery } from 'redux-saga/effects';

import client from '../singletons/client';

import {
  GET_USER,
  GET_USER_SUCCESS,
  UPDATE_USER,
  SHOW_MESSAGE,
  FORM_ERROR,
  CLEAR_FORM_ERROR
} from '../constants';

function* getUser({ path, params }) {
  try {
    const { data } = yield apply(client, client.get, [path, params]);
    yield put({ type: GET_USER_SUCCESS, data });
    return;
  } catch ({ error }) {
    console.error(error);
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

function* updateUser({ path, payload, params }) {
  try {
    const { data, message } = yield apply(client, client.update, [
      path,
      params,
      payload
    ]);
    yield put({ type: GET_USER_SUCCESS, data });
    yield put({ type: CLEAR_FORM_ERROR });
    yield put({ type: SHOW_MESSAGE, message });
    return;
  } catch ({ error }) {
    console.error(error);
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

export function* apiSaga() {
  yield takeEvery(GET_USER, getUser);
  yield takeEvery(UPDATE_USER, updateUser);
}
