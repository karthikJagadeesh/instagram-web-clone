import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useNameCardStyles = makeStyles({
  avatar: {
    width: ({ imageSize = 44 }) => imageSize,
    height: ({ imageSize = 44 }) => imageSize
  },
  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'min-content auto',
    gridGap: 12,
    alignItems: 'center'
  },
  nameWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});

export function NameCard({ userName, fullName, profileImageUrl, imageSize }) {
  const classes = useNameCardStyles({ imageSize });

  const avatarProps = {
    alt: 'user-image',
    src: profileImageUrl,
    className: classes.avatar
  };

  return (
    <div className={classes.wrapper}>
      <Link to={`${userName}`}>
        <Avatar {...avatarProps} />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`${userName}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {userName}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {fullName}
        </Typography>
      </div>
    </div>
  );
}
