import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ImagePlaceHolder from '../../images/image-placeholder.jpg';

const useSkeletonStyles = makeStyles({
  card: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, 500px)',
    gridGap: 10,
    alignItems: 'center',
    padding: '8px 16px'
  },
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '44px auto',
    gridGap: 12,
    alignItems: 'center'
  },
  avatar: {
    width: 44,
    height: 44,
    background: '#e8e8e8',
    borderRadius: '50%'
  },
  text: {
    margin: '4px 0',
    height: 8,
    width: 120,
    background: '#e8e8e8',
    borderRadius: 6
  },
  button: {
    height: 30,
    width: 74,
    background: '#e8e8e8',
    borderRadius: 2
  }
});

export function SuggestionsSkeleton({ count }) {
  const classes = useSkeletonStyles();

  const card = key => (
    <div className={classes.card} key={key}>
      <div className={classes.wrapper}>
        <div className={classes.avatar} />
        <div>
          <div className={classes.text} />
          <div className={classes.text} />
        </div>
      </div>
      <div className={classes.button} />
    </div>
  );

  return times(count, card);
}

const useProfilePostsSkeletonStyles = makeStyles({
  img: {
    width: '100%'
  }
});

export function ProfilePostsSkeleton({ count }) {
  const classes = useProfilePostsSkeletonStyles();
  const image = key => (
    <img
      key={key}
      src={ImagePlaceHolder}
      alt="profile pic placeholder"
      className={classes.img}
    />
  );
  return times(count, image);
}

function times(count, cb, list = []) {
  return count === 0 ? list : times(--count, cb, [...list, cb(count)]);
}
