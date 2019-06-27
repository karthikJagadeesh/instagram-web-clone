import { LOG_IN_SUCCESS } from '../constants';

const initialState = {
  signedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        signedIn: true
      };

    default:
      return state;
  }
}
