import { GET_USER_SUCCESS } from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.data
      };

    default:
      return state;
  }
}
