import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet from '../../images/icons-spritesheet.png';

import { OR } from './utils';

const useStyles = makeStyles({
  section: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh'
  },

  card: {
    maxWidth: 388
  },
  divider: {
    marginTop: 20
  },
  cardContent: {
    padding: '16px 40px'
  },

  textField: {
    marginBotton: 6
  },

  wrapper: {
    display: 'grid',
    justifyContent: 'center',
    marginBottom: 16
  },
  span: {
    backgroundImage: `url(${IconsSpriteSheet})`,
    backgroundPosition: '0 0',
    backgroundSize: '410px 396px',
    backgroundRepeat: 'no-repeat',
    height: 96,
    width: 96
  },

  button: {
    background: '#fafafa'
  }
});

export default function ResetPage() {
  const classes = useStyles();

  const userNameProps = {
    variant: 'filled',
    fullWidth: true,
    className: classes.textField,
    label: 'Email or Username',
    margin: 'normal'
  };
  const buttonProps = {
    variant: 'contained',
    fullWidth: true,
    color: 'primary'
  };
  const typographyProps = {
    align: 'center',
    color: 'textSecondary',
    gutterBottom: true,
    variant: 'body2'
  };

  return (
    <section className={classes.section}>
      <article>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.wrapper}>
              <span className={classes.span} />
            </div>
            <Typography align="center" gutterBottom variant="h6">
              Trouble Logging In?
            </Typography>
            <Typography {...typographyProps}>
              {
                "Enter your username or email and we'll send you a link to get back into your account."
              }
            </Typography>
            <TextField {...userNameProps} />
            <Button {...buttonProps}>Send Login Link</Button>
            <OR />
            <Link to="/signup">
              <Button fullWidth>Create New Account</Button>
            </Link>
          </CardContent>
          <Divider className={classes.divider} />
          <Link to="/account/login">
            <Button fullWidth className={classes.button}>
              Back To Login
            </Button>
          </Link>
        </Card>
      </article>
    </section>
  );
}
