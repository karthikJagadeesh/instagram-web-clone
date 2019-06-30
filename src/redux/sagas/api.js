import { apply, put, takeEvery } from 'redux-saga/effects';

import client from '../singletons/client';

import { GET_USER, GET_USER_SUCCESS, FORM_ERROR } from '../constants';

function* getUser({ path, data }) {
  try {
    const response = yield apply(client, client.get, [path, data]);
    yield put({ type: GET_USER_SUCCESS, response });
  } catch (error) {
    console.error(error);
    yield put({ type: FORM_ERROR, error });
  }
}

export function* apiSaga() {
  yield takeEvery(GET_USER, getUser);
}
