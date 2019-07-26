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
    height: 48,
    width: 48,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${IconsSpriteSheet2})`,
    backgroundSize: '710px 688px',
    backgroundPosition: '-454px -394px'
  }
});

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <span className={classes.span} />
    </section>
  );
}
