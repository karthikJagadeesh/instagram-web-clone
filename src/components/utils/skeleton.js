import React from 'react';
import cx from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import ImagePlaceHolder from '../../images/image-placeholder.jpg';

const useSkeletonStyles = makeStyles({
  card: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, 600px)',
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
    maxWidth: 120,
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

export function SuggestionsSkeleton({ count, classNames = {} }) {
  const classes = useSkeletonStyles();

  const card = key => (
    <div className={cx(classes.card, classNames.card)} key={key}>
      <div className={classes.wrapper}>
        <div className={cx(classes.avatar, classNames.avatar)} />
        <div>
          <div className={cx(classes.text, classNames.text)} />
          <div className={cx(classes.text, classNames.text)} />
        </div>
      </div>
      <div className={cx(classes.button, classNames.button)} />
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

const useAllPostsSkeletonStyles = makeStyles(theme => ({
  card: {
    background: '#ffffff'
  },
  button: {
    height: 10,
    width: 37
  },
  avatar: {
    width: 32,
    height: 32
  },
  text: {
    margin: '4px 0',
    height: 4,
    width: 120,
    borderRadius: 'none'
  },

  article: {
    border: '1px solid #e6e6e6',
    background: '#EEEEEE',
    marginBottom: 60,
    [theme.breakpoints.down('xs')]: {
      border: 'unset',
      marginBottom: 16
    }
  }
}));

export function AllPostsSkeleton({ count }) {
  const classes = useAllPostsSkeletonStyles();

  const suggestionsSkeletonProps = {
    count: 1,
    classNames: {
      avatar: classes.avatar,
      text: classes.text,
      button: classes.button,
      card: classes.card
    }
  };

  const card = key => (
    <article key={key} className={classes.article}>
      <SuggestionsSkeleton {...suggestionsSkeletonProps} />
      <ProfilePostsSkeleton count={1} />
    </article>
  );

  return times(count, card);
}

function times(count, cb, list = []) {
  return count === 0 ? list : times(--count, cb, [...list, cb(count)]);
}
