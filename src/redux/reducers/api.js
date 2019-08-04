import {
  GET_USER_SUCCESS,
  GET_PROFILE_POSTS_SUCCESS,
  GET_SUGGESTIONS_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  FOLLOW_SUCESS_SUGGESTIONS,
  FOLLOW_SUCESS,
  GET_ALL_POSTS_SUCCESS,
  LIKE_POST_PROGRESS,
  UNLIKE_POST_PROGRESS,
  GET_LIKES_SUCCESS,
  FOLLOW_SUCESS_GENERIC
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
    status: undefined,
    namespace: undefined
  },
  allPosts: undefined,
  customUsersList: {
    data: undefined,
    key: undefined
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

    case FOLLOW_SUCESS_SUGGESTIONS: {
      const suggestions = suggestionsUpdater({
        id: action.data.id,
        state,
        ownerIsFollowing: action.data.ownerIsFollowing
      });

      return {
        ...state,
        suggestions: {
          data: suggestions,
          key: action.key
        }
      };
    }

    case FOLLOW_SUCESS_GENERIC: {
      const list = state.customUsersList.data[action.postId].map(friend => {
        if (friend.id === action.data.id) {
          return { ...friend, ownerIsFollowing: action.data.ownerIsFollowing };
        }
        return friend;
      });
      const suggestions = suggestionsUpdater({
        id: action.data.id,
        state,
        ownerIsFollowing: action.data.ownerIsFollowing
      });

      return {
        ...state,
        customUsersList: {
          data: {
            ...state.customUsersList.data,
            [action.postId]: list
          },
          key: action.key
        },
        suggestions: {
          ...state.suggestions,
          data: suggestions
        }
      };
    }

    case FOLLOW_SUCESS: {
      let updater;
      if (action.data.ownerIsFollowing) {
        updater = {
          followers: state.userProfile.data.followers + 1,
          ownerIsFollowing: true
        };
      } else if (!action.data.ownerIsFollowing) {
        updater = {
          followers: state.userProfile.data.followers - 1,
          ownerIsFollowing: false
        };
      }

      return {
        ...state,
        userProfile: {
          data: {
            ...state.userProfile.data,
            ...updater
          },
          key: action.key,
          status: action.data.status,
          namespace: action.namespace
        }
      };
    }

    case GET_ALL_POSTS_SUCCESS: {
      return {
        ...state,
        allPosts: action.data
      };
    }

    case LIKE_POST_PROGRESS: {
      const id = action.id;
      const allPosts = state.allPosts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1,
            ownerHasLiked: true
          };
        }
        return post;
      });

      return {
        ...state,
        allPosts
      };
    }

    case UNLIKE_POST_PROGRESS: {
      const id = action.id;
      const allPosts = state.allPosts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes - 1,
            ownerHasLiked: false
          };
        }
        return post;
      });

      return {
        ...state,
        allPosts
      };
    }

    case GET_LIKES_SUCCESS: {
      return {
        ...state,
        customUsersList: {
          data: {
            ...state.customUsersList.data,
            [action.params.id]: action.data
          },
          key: action.key
        }
      };
    }

    default:
      return state;
  }
}

function suggestionsUpdater({ state, id, ownerIsFollowing }) {
  return state.suggestions.data.map(friend => {
    if (friend.id === id) {
      return { ...friend, ownerIsFollowing };
    }
    return friend;
  });
}
