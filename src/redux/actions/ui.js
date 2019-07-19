import { OPEN_UPLOAD_POST, CLOSE_UPLOAD_POST } from '../constants';

export const uploadPostDialogActions = {
  open: () => ({ type: OPEN_UPLOAD_POST }),
  close: () => ({ type: CLOSE_UPLOAD_POST })
};
