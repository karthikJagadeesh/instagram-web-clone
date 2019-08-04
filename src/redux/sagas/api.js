import {
  actionChannel,
  apply,
  put,
  select,
  take,
  call,
  takeEvery
} from 'redux-saga/effects';
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
  GET_USER_PROFILE_SUCCESS,
  FOLLOW,
  FOLLOW_SUCESS,
  FOLLOW_SUCESS_SUGGESTIONS,
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS,
  LIKE,
  LIKE_POST_PROGRESS,
  UNLIKE_POST_PROGRESS,
  GET_LIKES,
  GET_LIKES_SUCCESS,
  FOLLOW_SUCESS_GENERIC
} from '../constants';

export function* apiSaga() {
  yield takeEvery(GET_USER, getUser);
  yield takeEvery(UPDATE_USER, updateUser);

  yield takeEvery(CHANGE_PROFILE_PIC, changeProfilePic);
  yield takeEvery(CHANGE_PASSWORD, changePassword);

  yield takeEvery(UPLOAD_POST, uploadPost);
  yield takeEvery(GET_PROFILE_POSTS, getProfilePosts);

  yield takeEvery(GET_SUGGESTIONS, getSuggestions);

  yield takeEvery(GET_USER_PROFILE, getUserProfile);

  yield takeEvery(FOLLOW, follow);

  yield takeEvery(GET_ALL_POSTS, getAllPosts);

  yield takeEvery(GET_LIKES, getLikes);

  yield takeEvery(LIKE, updateLikeOnlyOnRedux);
  const likePostChannel = yield actionChannel(LIKE);
  while (true) {
    const action = yield take(likePostChannel);
    yield call(likePost, action);
  }
}

function* getLikes({ path, key, params }) {
  try {
    const { data } = yield apply(client, client.get, [path, '']);
    yield put({ type: GET_LIKES_SUCCESS, data, key, params });
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

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
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* follow({ path, params, payload, key, namespace, postId }) {
  try {
    const { ownerIsFollowing, status } = yield apply(client, client.post, [
      path,
      params,
      payload
    ]);

    if (namespace === 'profile') {
      yield put({
        type: FOLLOW_SUCESS,
        data: { status, ownerIsFollowing },
        key,
        namespace
      });
    } else if (namespace === 'generic') {
      yield put({
        type: FOLLOW_SUCESS_GENERIC,
        data: { status, ownerIsFollowing, id: params },
        key,
        namespace,
        postId
      });
    } else {
      yield put({
        type: FOLLOW_SUCESS_SUGGESTIONS,
        data: { status, ownerIsFollowing, id: params },
        key
      });
    }
    const id = yield select(({ api }) => api.user.id);
    yield put(userActions.get(id));
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* getAllPosts({ path }) {
  try {
    const { data } = yield apply(client, client.get, [path, '']);
    yield put({ type: GET_ALL_POSTS_SUCCESS, data });
    return;
  } catch ({ error }) {
    console.error(error);
    return;
  }
}

function* likePost({ path, params }) {
  try {
    if (params.type === 'like') {
      yield apply(client, client.post, [path, '']);
    } else if (params.type === 'unlike') {
      yield apply(client, client.post, [path, '']);
    }
    return;
  } catch ({ error }) {
    console.error(error);
    yield put({
      type: SHOW_MESSAGE,
      message: 'Failed to complete this action.'
    });
    return;
  }
}

function* updateLikeOnlyOnRedux({ params }) {
  if (params.type === 'like') {
    yield put({ type: LIKE_POST_PROGRESS, id: params.id });
  } else if (params.type === 'unlike') {
    yield put({ type: UNLIKE_POST_PROGRESS, id: params.id });
  }
  return;
}
