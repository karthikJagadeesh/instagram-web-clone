export function signUpAction(values) {
  return { type: 'SIGN_UP', path: '/signup', data: values };
}
