import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { OR, LoginWithFacebook } from './utils';

const card = {
  maxWidth: 348,
  padding: '16px 40px',
  marginBottom: 10
};

const loginStyles = {
  card: {
    ...card,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '3fr 2fr'
  },

  typography: {
    justifySelf: 'end'
  },
  signUpButton: {
    justifySelf: 'start'
  }
};

function _Login({ classes }) {
  return (
    <Card className={classes.card}>
      <Typography variant="body2" className={classes.typography}>
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

const Login = withStyles(loginStyles)(_Login);

const signUpPageStyles = {
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
    margin: '8px 0px'
  }
};

function _SignUpPage({ classes }) {
  const cardHeaderProps = {
    title: 'Instaclone',
    subheader: 'Sign up to see photos from your friends.',
    classes: {
      title: classes.cardHeaderTitle,
      subheader: classes.cardHeaderSubHeader
    }
  };

  const textFieldProps = {
    variant: 'filled',
    fullWidth: true,
    className: classes.textField
  };
  const emailProps = {
    ...textFieldProps,
    label: 'Email'
  };
  const fullNameProps = {
    ...textFieldProps,
    label: 'Full Name'
  };
  const userNameProps = {
    ...textFieldProps,
    label: 'Username'
  };
  const passwordProps = {
    ...textFieldProps,
    label: 'Password',
    type: 'password'
  };
  const buttonProps = {
    variant: 'contained',
    fullWidth: true,
    color: 'primary',
    className: classes.button
  };

  return (
    <section className={classes.section}>
      <article>
        <Card className={classes.card}>
          <CardHeader {...cardHeaderProps} />
          <LoginWithFacebook
            variant="contained"
            color="primary"
            iconColor="white"
          />
          <OR />
          <TextField {...emailProps} />
          <TextField {...fullNameProps} />
          <TextField {...userNameProps} />
          <TextField {...passwordProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </Card>
        <Login />
      </article>
    </section>
  );
}

const SignUpPage = withStyles(signUpPageStyles)(_SignUpPage);

export default SignUpPage;
