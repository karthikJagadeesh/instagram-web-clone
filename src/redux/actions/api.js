import {
  CHANGE_PROFILE_PIC,
  GET_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  UPLOAD_POST,
  GET_PROFILE_POSTS
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

export const getProfilePostsAction = () => ({
  type: GET_PROFILE_POSTS,
  path: '/profile-posts'
});
