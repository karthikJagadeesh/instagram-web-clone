import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';

const useProfilePictureStyles = makeStyles({
  person: {
    color: '#ffffff',
    height: ({ size }) => size || 150,
    width: ({ size }) => size || 150
  },
  personWrapper: {
    background: '#DBDBDB',
    width: ({ size }) => size || 150,
    height: ({ size }) => size || 150,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center'
  },
  personSection: {
    display: 'grid',
    justifyContent: 'center'
  }
});

export function ProfilePicture({ size }) {
  const classes = useProfilePictureStyles({ size });

  return (
    <section className={classes.personSection}>
      <div className={classes.personWrapper}>
        <PersonIcon className={classes.person} />
      </div>
    </section>
  );
}
