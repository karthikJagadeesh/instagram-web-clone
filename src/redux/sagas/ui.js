import { delay, put, takeEvery } from 'redux-saga/effects';

import { SHOW_MESSAGE, OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../constants';

function* showSnackBar({ message }) {
  yield put({ type: OPEN_SNACKBAR, message });
  yield delay(2500);
  yield put({ type: CLOSE_SNACKBAR });
}

export function* uiSaga() {
  yield takeEvery(SHOW_MESSAGE, showSnackBar);
}
