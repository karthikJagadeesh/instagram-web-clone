import {
  CHANGE_PROFILE_PIC,
  GET_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  UPLOAD_POST,
  GET_PROFILE_POSTS,
  GET_SUGGESTIONS,
  GET_USER_PROFILE,
  FOLLOW,
  GET_ALL_POSTS
} from '../constants';

export const userActions = {
  get: params => ({ type: GET_USER, path: '/users', params }),
  update: ({ payload, params }) => ({
    type: UPDATE_USER,
    path: '/users',
    payload,
    params
  }),
  changePassword: payload => ({
    type: CHANGE_PASSWORD,
    path: '/users/change/password',
    payload
  })
};

export const changeProfilePicAction = ({ params, payload = {} }) => {
  return {
    type: CHANGE_PROFILE_PIC,
    path: '/change-profile-pic',
    params,
    payload
  };
};

export const uploadPostAction = ({ payload }) => ({
  type: UPLOAD_POST,
  path: '/post',
  payload
});

export const getProfilePostsAction = ({ params }) => ({
  type: GET_PROFILE_POSTS,
  path: '/profile-posts',
  params
});

export const getSuggestionsAction = () => ({
  type: GET_SUGGESTIONS,
  path: '/feed/suggestions'
});

export const getAllPostsAction = () => ({
  type: GET_ALL_POSTS,
  path: '/feed'
});

export const getUserProfileAction = ({ params, key }) => ({
  type: GET_USER_PROFILE,
  path: '',
  params,
  key
});

export const followAction = ({ params, payload, key }) => ({
  type: FOLLOW,
  path: '/friendship',
  params,
  payload,
  key
});
