import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { OR, LoginWithFacebook } from './utils';

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
      <Link to="/signup">
        <Button color="primary" className={classes.signUpButton}>
          Sign up
        </Button>
      </Link>
    </Card>
  );
}

function ForgotPassword() {
  return (
    <Link to="/password">
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
  }
});

function LoginPage() {
  const classes = useLoginPageStyles();

  const cardHeaderProps = {
    title: 'Instaclone',
    classes: {
      title: classes.cardHeaderTitle
    }
  };
  const nameProps = {
    fullWidth: true,
    variant: 'filled',
    label: 'Username',
    className: classes.textField
  };
  const passwordProps = {
    fullWidth: true,
    variant: 'filled',
    label: 'Password',
    type: 'password',
    className: classes.textField
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
          <TextField {...nameProps} />
          <TextField {...passwordProps} />
          <Button {...buttonProps}>Log In</Button>
          <OR />
          <LoginWithFacebook color="secondary" iconColor="blue" />
          <ForgotPassword />
        </Card>
        <SignUp />
      </article>
    </section>
  );
}

export default LoginPage;
