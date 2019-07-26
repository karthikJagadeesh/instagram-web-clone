import { apply, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { userActions } from '../actions/api';

import client from '../singletons/client';

import {
  GET_USER,
  GET_USER_SUCCESS,
  UPDATE_USER,
  SHOW_MESSAGE,
  FORM_ERROR,
  CLEAR_FORM_ERROR,
  CHANGE_PROFILE_PIC,
  CHANGE_PASSWORD,
  UPLOAD_POST,
  CLOSE_UPLOAD_POST,
  GET_PROFILE_POSTS,
  GET_PROFILE_POSTS_SUCCESS,
  GET_SUGGESTIONS,
  GET_SUGGESTIONS_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS
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

function* changeProfilePic({ path, payload, params }) {
  try {
    const { data, message } = yield apply(client, client.post, [
      path,
      params,
      payload
    ]);
    yield put({ type: GET_USER_SUCCESS, data });
    yield put({ type: SHOW_MESSAGE, message });
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* changePassword({ path, payload }) {
  try {
    const { message } = yield apply(client, client.update, [path, '', payload]);
    yield put({ type: SHOW_MESSAGE, message });
    const pathName = yield select(({ router }) => router.location.pathname);
    yield put(push(pathName));
    return;
  } catch ({ error }) {
    console.error(error);
    yield put({ type: FORM_ERROR, error });
    return;
  }
}

function* uploadPost({ path, payload }) {
  try {
    const { message } = yield apply(client, client.post, [path, '', payload]);
    yield put({ type: CLOSE_UPLOAD_POST });
    yield put({ type: SHOW_MESSAGE, message });
    const params = yield select(({ api }) => api.user.id);
    yield put(userActions.get(params));
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* getProfilePosts({ path, params }) {
  try {
    const { data } = yield apply(client, client.get, [path, params]);
    yield put({ type: GET_PROFILE_POSTS_SUCCESS, data });
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* getSuggestions({ path }) {
  try {
    const { data } = yield apply(client, client.get, [path, '']);
    yield put({ type: GET_SUGGESTIONS_SUCCESS, data });
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* getUserProfile({ path, params, key }) {
  try {
    const { data, status } = yield apply(client, client.get, [path, params]);
    yield put({ type: GET_USER_PROFILE_SUCCESS, data, status, key });
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

export function* apiSaga() {
  yield takeEvery(GET_USER, getUser);
  yield takeEvery(UPDATE_USER, updateUser);

  yield takeEvery(CHANGE_PROFILE_PIC, changeProfilePic);
  yield takeEvery(CHANGE_PASSWORD, changePassword);

  yield takeEvery(UPLOAD_POST, uploadPost);
  yield takeEvery(GET_PROFILE_POSTS, getProfilePosts);

  yield takeEvery(GET_SUGGESTIONS, getSuggestions);

  yield takeEvery(GET_USER_PROFILE, getUserProfile);
}
