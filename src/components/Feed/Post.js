import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { distanceInWordsStrict } from 'date-fns';

import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet1 from '../../images/icons-spritesheet.png';
import IconsSpriteSheet2 from '../../images/icons-spritesheet2.png';

import { likeAction } from '../../redux/actions/api';

import { NameCard } from './utils';
import { Typography, Button } from '@material-ui/core';

const commonProps = {
  backgroundImage: `url(${IconsSpriteSheet2})`,
  backgroundSize: '355px 344px',
  backgroundRepeat: 'no-repeat',
  height: 24,
  width: 24,
  justifySelf: 'center',
  '&:hover': {
    cursor: 'pointer'
  }
};
const usePostStyles = makeStyles(theme => ({
  article: {
    border: '1px solid #e6e6e6',
    background: '#ffffff',
    marginBottom: 60,
    [theme.breakpoints.down('xs')]: {
      border: 'unset',
      marginBottom: 0
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
  },

  iconWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '24px 24px 24px minmax(24px, auto)',
    gridGap: 16,
    padding: '6px 0px'
  },

  comments: {
    ...commonProps,
    backgroundPosition: '-117px -97px'
  },
  share: {
    ...commonProps,
    backgroundPosition: '-175px -320px'
  },
  save: {
    ...commonProps,
    backgroundPosition: '-48px -320px',
    justifySelf: 'right'
  },
  container: {
    padding: '0px 16px 8px'
  },
  typography: {
    fontWeight: 600
  },
  distance: {
    fontSize: 10
  }
}));

export default function Post({
  post: {
    imageUrl,
    owner: { userName, fullName, profileImageUrl },
    likes,
    caption,
    postedAt,
    ownerHasLiked,
    id
  }
}) {
  const classes = usePostStyles();

  const nameCardProps = {
    userName,
    fullName,
    profileImageUrl,
    imageSize: 32
  };

  const distanceSection = (
    <Typography color="textSecondary" className={classes.distance}>
      {`${distanceInWordsStrict(new Date(), postedAt)} ago`.toUpperCase()}
    </Typography>
  );
  const captionSection = (
    <Typography variant="body2" component="span">
      {` ${caption}`}
    </Typography>
  );
  const userNameSection = (
    <Link to={`${userName}`}>
      <Typography
        variant="subtitle2"
        component="span"
        className={classes.typography}
      >
        {userName}
      </Typography>
    </Link>
  );
  const likesSection = (
    <Typography variant="subtitle2" className={classes.typography}>
      {likes === 1 ? '1 like' : `${likes} likes`}
    </Typography>
  );

  return (
    <article className={classes.article}>
      <div className={classes.nameCardWrapper}>
        <NameCard {...nameCardProps} />
        <div className={classes.icon} />
      </div>
      <div>
        <img src={imageUrl} alt="post" className={classes.image} />
      </div>
      <div className={classes.container}>
        <div className={classes.iconWrapper}>
          <Like id={id} ownerHasLiked={ownerHasLiked} />
          <div className={classes.comments} />
          <div className={classes.share} />
          <div className={classes.save} />
        </div>
        {likesSection}
        {userNameSection}
        {captionSection}
        {distanceSection}
      </div>
      <Hidden xsDown>
        <Divider />
        <Comment />
      </Hidden>
    </article>
  );
}

const useLikeStyles = makeStyles({
  like: {
    ...commonProps,
    backgroundPosition: '-275px -269px'
  },
  liked: {
    ...commonProps,
    backgroundPosition: '-250px -269px'
  }
});

function Like({ id, ownerHasLiked }) {
  const classes = useLikeStyles();
  const dispatch = useDispatch();
  const className = ownerHasLiked ? classes.liked : classes.like;

  const handleLikeClick = () =>
    dispatch(likeAction({ params: { id, type: 'like' } }));
  const handleUnlikeClick = () =>
    dispatch(likeAction({ params: { id, type: 'unlike' } }));

  const onClick = ownerHasLiked ? handleUnlikeClick : handleLikeClick;

  return <div className={className} onClick={onClick} />;
}

const useCommentStyles = makeStyles({
  textField: {
    padding: '10px 0px'
  },

  root: {
    fontSize: 14
  },
  underline: {
    '&::before': {
      border: 'none'
    },
    '&::after': {
      border: 'none'
    },
    '&:hover&:before': {
      border: 'none'
    }
  },

  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto minmax(auto, 56px)',
    padding: '0px 0px 0px 16px'
  },

  button: {
    width: 48,
    padding: 'unset'
  }
});

function Comment() {
  const classes = useCommentStyles();

  const textFieldProps = {
    fullWidth: true,
    placeholder: 'Add a comment...',
    multiline: true,
    rowsMax: 2,
    rows: 1,
    className: classes.textField,
    InputProps: {
      classes: {
        root: classes.root,
        underline: classes.underline
      }
    }
  };

  return (
    <div className={classes.container}>
      <TextField {...textFieldProps} />
      <Button color="primary" className={classes.button}>
        Post
      </Button>
    </div>
  );
}
