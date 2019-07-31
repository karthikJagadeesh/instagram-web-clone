import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet1 from '../../images/icons-spritesheet.png';

import { NameCard } from './utils';

const usePostStyles = makeStyles(theme => ({
  article: {
    border: '1px solid #e6e6e6',
    marginBottom: 60,
    [theme.breakpoints.down('xs')]: {
      border: 'unset',
      marginBottom: 16
    }
  },

  nameCardWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 20px)',
    gridGap: 10,
    alignItems: 'center',
    padding: 16
  },
  icon: {
    backgroundImage: `url(${IconsSpriteSheet1})`,
    backgroundPosition: '-217px -170px',
    backgroundSize: '503px 516px',
    backgroundRepeat: 'no-repeat',
    height: 24,
    width: 18,
    justifySelf: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  image: {
    width: '100%'
  }
}));

export default function Post({
  post: {
    imageUrl,
    owner: { userName, fullName, profileImageUrl }
  }
}) {
  const classes = usePostStyles();

  const nameCardProps = {
    userName,
    fullName,
    profileImageUrl,
    imageSize: 32
  };

  return (
    <article className={classes.article}>
      <div className={classes.nameCardWrapper}>
        <NameCard {...nameCardProps} />
        <div className={classes.icon} />
      </div>
      <div>
        <img src={imageUrl} alt="post" className={classes.image} />
      </div>
    </article>
  );
}
