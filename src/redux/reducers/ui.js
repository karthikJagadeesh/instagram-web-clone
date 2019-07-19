import {
  FORM_ERROR,
  CLEAR_FORM_ERROR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  OPEN_UPLOAD_POST,
  CLOSE_UPLOAD_POST
} from '../constants';

const initialState = {
  form: {},
  snackbar: {
    open: false,
    message: ''
  },
  showUploadDialog: false
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

    case CLEAR_FORM_ERROR:
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

    case OPEN_UPLOAD_POST: {
      return {
        ...state,
        showUploadDialog: true
      };
    }

    case CLOSE_UPLOAD_POST: {
      return {
        ...state,
        showUploadDialog: false
      };
    }

    default:
      return state;
  }
}
