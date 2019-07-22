import { GET_USER_SUCCESS, GET_PROFILE_POSTS_SUCCESS } from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.data
      };

    case GET_PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        profilePosts: action.data
      };

    default:
      return state;
  }
}
