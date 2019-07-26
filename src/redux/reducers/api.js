import {
  GET_USER_SUCCESS,
  GET_PROFILE_POSTS_SUCCESS,
  GET_SUGGESTIONS_SUCCESS,
  GET_USER_PROFILE_SUCCESS
} from '../constants';

const initialState = {
  user: undefined,
  profilePosts: undefined,
  suggestions: undefined,
  userProfile: {
    data: undefined,
    status: undefined
  }
};

export default function(state = initialState, action) {
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

    case GET_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.data
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: {
          data: action.data,
          status: action.status,
          key: action.key
        },
        profilePosts: undefined
      };

    default:
      return state;
  }
}
