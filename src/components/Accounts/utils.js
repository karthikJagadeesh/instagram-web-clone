import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import FacebookIcon from '../../images/facebook-icon.svg';
import FacebookIconWhite from '../../images/facebook-icon-white.png';

const useORStyles = makeStyles({
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
});

export function OR() {
  const classes = useORStyles();

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

const useLoginWithFacebookStyles = makeStyles({
  img: {
    height: 16,
    width: 16,
    marginRight: 8
  }
});

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginWithFacebookStyles();
  const icon = iconColor === 'blue' ? FacebookIcon : FacebookIconWhite;

  return (
    <Button fullWidth color={color} variant={variant}>
      <img src={icon} alt="facebook icon" className={classes.img} />
      Log in with Facebook
    </Button>
  );
}
