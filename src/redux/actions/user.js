import { SIGN_UP, LOG_IN, LOG_OUT } from '../constants';

export function signUpAction(values) {
  return { type: SIGN_UP, path: '/signup', data: values };
}

export function logInAction(values) {
  return { type: LOG_IN, path: '/login', data: values };
}

export function logOutAction() {
  return { type: LOG_OUT, path: '/logout' };
}
