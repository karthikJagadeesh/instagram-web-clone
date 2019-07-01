import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet2 from '../images/icons-spritesheet2.png';

const useStyles = makeStyles({
  section: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 9999,
    background: '#fafafa',
    display: 'grid',
    placeItems: 'center'
  },
  span: {
    height: 24,
    width: 24,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${IconsSpriteSheet2})`,
    backgroundSize: '355px 344px',
    backgroundPosition: '-227px -197px'
  }
});

function LoadingPage() {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <span className={classes.span} />
    </section>
  );
}

export default LoadingPage;
