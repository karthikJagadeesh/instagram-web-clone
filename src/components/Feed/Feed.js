import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { getSuggestionsAction } from '../../redux/actions/api';

import { SuggestionsSkeleton } from '../utils/skeleton';

export default function Feed({ user }) {
  if (user.posts === 0 && user.following === 0) {
    return <FriendCard />;
  }

  return <div>List of Posts</div>;
}

const useFriendCardStyles = makeStyles(theme => ({
  article: {
    margin: '0 12px',
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 600px)',
    justifyContent: 'center'
  },
  typographyHeading: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  }
}));

function FriendCard() {
  const classes = useFriendCardStyles();
  const dispatch = useDispatch();
  const suggestions = useSelector(({ api }) => api.suggestions);

  useEffect(() => {
    dispatch(getSuggestionsAction());
  }, [dispatch]);

  const typographyProps = {
    variant: 'h6',
    align: 'left',
    gutterBottom: true,
    className: classes.typographyHeading
  };

  return (
    <article className={classes.article}>
      <Typography {...typographyProps}>Suggestions For You</Typography>
      <Paper>
        {suggestions ? (
          suggestions.map(friend => (
            <FriendCardItem friend={friend} key={friend.id} />
          ))
        ) : (
          <SuggestionsSkeleton count={12} />
        )}
      </Paper>
    </article>
  );
}

const useFriendCardItemStyles = makeStyles({
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
  button: {
    height: 30,
    padding: '0px 16px'
  },
  avatar: {
    width: 44,
    height: 44
  }
});

function FriendCardItem({ friend: { profileImageUrl, userName, fullName } }) {
  const classes = useFriendCardItemStyles();

  const avatarProps = {
    alt: 'user-image',
    src: profileImageUrl,
    className: classes.avatar
  };
  const buttonProps = {
    variant: 'contained',
    color: 'primary',
    className: classes.button
  };

  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>
        <Link to={`${userName}`}>
          <Avatar {...avatarProps} />
        </Link>
        <div>
          <Link to={`${userName}`}>
            <Typography variant="subtitle2">{userName}</Typography>
          </Link>
          <Typography color="textSecondary" variant="body2">
            {fullName}
          </Typography>
        </div>
      </div>
      <Button {...buttonProps}>Follow</Button>
    </div>
  );
}
