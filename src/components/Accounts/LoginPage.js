import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import FacebookIcon from '../../images/facebook-icon.svg';

const card = {
  maxWidth: 348,
  padding: '16px 40px',
  boxShadow: 'none',
  border: '1px solid #e6e6e6',
  marginBottom: 10
};

const signUpStyles = {
  card,

  wrapper: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '2fr 1fr'
  },
  typography: {
    justifySelf: 'end'
  },
  signUpButton: {
    justifySelf: 'start'
  }
};

function _SignUp({ classes }) {
  return (
    <Card className={classes.card}>
      <div className={classes.wrapper}>
        <Typography variant="body2" className={classes.typography}>
          {"Don't have an account?"}
        </Typography>
        <Button color="primary" className={classes.signUpButton}>
          Sign Up
        </Button>
      </div>
    </Card>
  );
}

const SignUp = withStyles(signUpStyles)(_SignUp);

const ORStyles = {
  container: {
    margin: '10px 0px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridGap: 18,
    placeItems: 'center'
  },
  line: {
    justifySelf: 'stretch',
    height: 1,
    background: '#e6e6e6'
  }
};

function _OR({ classes }) {
  return (
    <div className={classes.container}>
      <div className={classes.line} />
      <div>
        <Typography variant="body2" color="textSecondary">
          OR
        </Typography>
      </div>
      <div className={classes.line} />
    </div>
  );
}

const OR = withStyles(ORStyles)(_OR);

const loginWithFacebookStyles = {
  img: {
    height: 16,
    width: 16,
    marginRight: 8
  }
};

function _LoginWithFacebook({ classes }) {
  return (
    <Button fullWidth color="secondary">
      <img src={FacebookIcon} alt="facebook icon" className={classes.img} />
      Log in with Facebook
    </Button>
  );
}

const LoginWithFacebook = withStyles(loginWithFacebookStyles)(
  _LoginWithFacebook
);

function ForgotPassword() {
  return (
    <Button fullWidth color="secondary">
      <Typography variant="caption">Forgot password?</Typography>
    </Button>
  );
}

const loginPageStyles = {
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
};

function _LoginPage({ classes }) {
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
          <LoginWithFacebook />
          <ForgotPassword />
        </Card>
        <SignUp />
      </article>
    </section>
  );
}

const LoginPage = withStyles(loginPageStyles)(_LoginPage);

export default LoginPage;
