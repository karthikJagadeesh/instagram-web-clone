import { FORM_ERROR, FORM_SUCCESS } from '../constants';

const initialState = {
  form: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FORM_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          error: action.error
        }
      };

    case FORM_SUCCESS:
      return {
        ...state,
        form: {}
      };

    default:
      return state;
  }
}
