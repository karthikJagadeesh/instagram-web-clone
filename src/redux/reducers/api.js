import {
  GET_USER_SUCCESS,
  GET_PROFILE_POSTS_SUCCESS,
  GET_SUGGESTIONS_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  FOLLOW_SUCESS,
  GET_ALL_POSTS_SUCCESS
} from '../constants';

const initialState = {
  user: undefined,
  profilePosts: undefined,
  suggestions: {
    data: undefined,
    key: undefined
  },
  userProfile: {
    data: undefined,
    status: undefined
  },
  allPosts: undefined
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
        suggestions: {
          data: action.data,
          key: undefined
        }
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

    case FOLLOW_SUCESS: {
      const suggestions = state.suggestions.data.map(friend => {
        if (friend.id === action.data.id) {
          return { ...friend, following: action.data.following };
        }
        return friend;
      });

      return {
        ...state,
        suggestions: {
          data: suggestions,
          key: action.key
        }
      };
    }

    case GET_ALL_POSTS_SUCCESS: {
      return {
        ...state,
        allPosts: action.data
      };
    }

    default:
      return state;
  }
}
