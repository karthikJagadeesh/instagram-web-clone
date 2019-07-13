import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, useField } from 'react-final-form-hooks';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { logInAction } from '../../redux/actions/user';

import { ErrorText } from '../utils';
import { LoginWithFacebook, OR } from './utils';
import { Loader, useLoader } from '../utils';

const card = {
  maxWidth: 348,
  padding: '16px 40px',
  marginBottom: 10
};

const useSignUpStyles = makeStyles({
  card: {
    ...card,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '2fr 1fr'
  },

  signUpButton: {
    justifySelf: 'start'
  }
});

function SignUp() {
  const classes = useSignUpStyles();

  return (
    <Card className={classes.card}>
      <Typography align="right" variant="body2">
        {"Don't have an account?"}
      </Typography>
      <Link to="/account/signup">
        <Button color="primary" className={classes.signUpButton}>
          Sign up
        </Button>
      </Link>
    </Card>
  );
}

function ForgotPassword() {
  return (
    <Link to="/account/password/reset">
      <Button fullWidth color="secondary">
        <Typography variant="caption">Forgot password?</Typography>
      </Button>
    </Link>
  );
}

const useLoginPageStyles = makeStyles({
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

  textField: {
    marginBottom: 6
  },

  button: {
    margin: '8px 0px'
  },

  typography: {
    margin: '10px 0px'
  }
});

function LoginPage() {
  const classes = useLoginPageStyles();
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();

  const validate = ({ userName, password }) => {
    const errors = {};
    if (!userName) {
      errors.userName = 'Username is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };
  const onSubmit = values => {
    dispatch(logInAction(values));
    setLoading(true);
  };

  const { form, handleSubmit, submitting, submitFailed, errors } = useForm({
    onSubmit,
    validate
  });

  const userName = useField('userName', form);
  const password = useField('password', form);

  const cardHeaderProps = {
    title: 'Instaclone',
    classes: {
      title: classes.cardHeaderTitle
    }
  };
  const nameProps = {
    ...userName.input,
    error: userName.meta.error && userName.meta.submitFailed,
    fullWidth: true,
    variant: 'filled',
    label: 'Username',
    className: classes.textField,
    autoComplete: 'username'
  };
  const passwordProps = {
    ...password.input,
    error: password.meta.error && password.meta.submitFailed,
    fullWidth: true,
    variant: 'filled',
    label: 'Password',
    type: 'password',
    className: classes.textField,
    autoComplete: 'current-password'
  };
  const buttonProps = {
    disabled:
      userName.meta.pristine || password.meta.pristine || submitting || loading,
    variant: 'contained',
    fullWidth: true,
    color: 'primary',
    className: classes.button,
    type: 'submit'
  };

  return (
    <section className={classes.section}>
      <article>
        <Card className={classes.card}>
          <CardHeader {...cardHeaderProps} />
          <form onSubmit={handleSubmit}>
            <TextField {...nameProps} />
            <TextField {...passwordProps} />
            <Button {...buttonProps}>
              {loading && <Loader />}
              Log In
            </Button>
          </form>
          <OR />
          <LoginWithFacebook color="secondary" iconColor="blue" />
          {submitFailed && (
            <ErrorText
              text={Object.values(errors)[0]}
              className={classes.typography}
            />
          )}
          {formError && (
            <ErrorText text={formError} className={classes.typography} />
          )}
          <ForgotPassword />
        </Card>
        <SignUp />
      </article>
    </section>
  );
}

export default LoginPage;
