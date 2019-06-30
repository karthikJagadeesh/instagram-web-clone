import { GET_USER } from '../constants';

export const userActions = {
  get: query => ({ type: GET_USER, path: '/users', data: query })
};
