import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, useField } from 'react-final-form-hooks';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { signUpAction } from '../../redux/actions/user';

import { ErrorText } from '../utils';
import { Loader, LoginWithFacebook, OR, useLoader } from './utils';

const card = {
  maxWidth: 348,
  padding: '16px 40px',
  marginBottom: 10
};

const useLoginStyles = makeStyles({
  card: {
    ...card,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '3fr 2fr'
  },

  signUpButton: {
    justifySelf: 'start'
  }
});

function Login() {
  const classes = useLoginStyles();

  return (
    <Card className={classes.card}>
      <Typography align="right" variant="body2">
        Have an account?
      </Typography>
      <Link to="/login">
        <Button color="primary" className={classes.signUpButton}>
          Log in
        </Button>
      </Link>
    </Card>
  );
}

const useSignUpPageStyles = makeStyles({
  card,

  section: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh'
  },

  cardHeaderTitle: {
    textAlign: 'center',
    fontFamily: 'insta-font',
    fontSize: 56,
    letterSpacing: 1
  },
  cardHeaderSubHeader: {
    textAlign: 'center',
    fontWeight: 600
  },

  textField: {
    marginBottom: 6
  },

  button: {
    margin: '10px 0px 16px 0px'
  }
});

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();

  const onSubmit = values => {
    dispatch(signUpAction(values));
    setLoading(true);
  };
  const validate = ({ email, fullName, userName, password }) => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required.';
    }
    if (!fullName) {
      errors.fullName = 'Fullname is required.';
    }
    if (!userName) {
      errors.userName = 'Username is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password should be 6 or more characters.';
    }
    return errors;
  };

  const { form, handleSubmit, submitting, submitFailed, errors } = useForm({
    onSubmit,
    validate
  });

  const email = useField('email', form);
  const fullName = useField('fullName', form);
  const userName = useField('userName', form);
  const password = useField('password', form);

  const textFieldProps = {
    variant: 'filled',
    fullWidth: true,
    className: classes.textField
  };
  const emailProps = {
    ...email.input,
    ...textFieldProps,
    error: email.meta.error && email.meta.submitFailed,
    label: 'Email',
    type: 'email'
  };
  const fullNameProps = {
    ...fullName.input,
    ...textFieldProps,
    error: fullName.meta.error && fullName.meta.submitFailed,
    label: 'Full Name'
  };
  const userNameProps = {
    ...userName.input,
    ...textFieldProps,
    error: userName.meta.error && userName.meta.submitFailed,
    label: 'Username',
    autoComplete: 'username'
  };
  const passwordProps = {
    ...password.input,
    ...textFieldProps,
    error: password.meta.error && password.meta.submitFailed,
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password'
  };
  const disableButton =
    email.meta.pristine ||
    fullName.meta.pristine ||
    password.meta.pristine ||
    userName.meta.pristine ||
    submitting ||
    loading;
  const buttonProps = {
    type: 'submit',
    disabled: disableButton,
    variant: 'contained',
    fullWidth: true,
    color: 'primary',
    className: classes.button
  };
  const cardHeaderProps = {
    title: 'Instaclone',
    subheader: 'Sign up to see photos from your friends.',
    classes: {
      title: classes.cardHeaderTitle,
      subheader: classes.cardHeaderSubHeader
    }
  };
  const loginWithFacebookProps = {
    variant: 'contained',
    color: 'primary',
    iconColor: 'white'
  };

  return (
    <section className={classes.section}>
      <article>
        <Card className={classes.card}>
          <CardHeader {...cardHeaderProps} />
          <LoginWithFacebook {...loginWithFacebookProps} />
          <OR />
          <form onSubmit={handleSubmit}>
            <TextField {...emailProps} />
            <TextField {...fullNameProps} />
            <TextField {...userNameProps} />
            <TextField {...passwordProps} />
            <Button {...buttonProps}>
              {loading && <Loader />}
              Sign Up
            </Button>
          </form>
          {submitFailed && <ErrorText text={Object.values(errors)[0]} />}
          {formError && <ErrorText text={formError} />}
        </Card>
        <Login />
      </article>
    </section>
  );
}

export default SignUpPage;
