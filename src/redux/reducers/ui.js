import {
  FORM_ERROR,
  FORM_SUCCESS,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from '../constants';

const initialState = {
  form: {},
  snackbar: {
    open: false,
    message: ''
  }
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

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message
        }
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: false,
          message: ''
        }
      };

    default:
      return state;
  }
}
