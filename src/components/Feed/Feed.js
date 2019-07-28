import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import {
  getSuggestionsAction,
  getAllPostsAction,
  followAction
} from '../../redux/actions/api';

import { SuggestionsSkeleton } from '../utils/skeleton';
import { generateKey, Loader } from '../utils';

import LoadingPage from '../LoadingPage';

export default function Feed() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.api.allPosts);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  if (allPosts) {
    if (allPosts.length > 0) {
      return <div>List of Posts</div>;
    }
    return <SuggestionsCard />;
  }

  return <LoadingPage />;
}

const useSuggestionsCardStyles = makeStyles(theme => ({
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
  },

  paper: {
    padding: '8px 0px'
  },

  buttonWrapper: {
    padding: 16
  }
}));

function SuggestionsCard() {
  const classes = useSuggestionsCardStyles();
  const dispatch = useDispatch();
  const suggestions = useSelector(({ api }) => api.suggestions.data);
  const [showButton, setButton] = useState(false);

  useEffect(() => {
    dispatch(getSuggestionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (suggestions) {
      const isFollowingAnyone = suggestions.some(friend => friend.following);
      if (isFollowingAnyone) {
        setButton(true);
      }
    }
  }, [suggestions]);

  const typographyProps = {
    variant: 'h6',
    align: 'left',
    gutterBottom: true,
    className: classes.typographyHeading
  };
  const buttonProps = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: () => dispatch(getAllPostsAction())
  };

  return (
    <article className={classes.article}>
      <Typography {...typographyProps}>Suggestions For You</Typography>
      <Paper className={classes.paper}>
        {suggestions ? (
          suggestions.map(friend => (
            <SuggestionsCardItem
              friend={friend}
              key={friend.id}
              suggestionsKey={suggestions.key}
            />
          ))
        ) : (
          <SuggestionsSkeleton count={12} />
        )}
        {showButton && (
          <div className={classes.buttonWrapper}>
            <Button {...buttonProps}>Get Started</Button>
          </div>
        )}
      </Paper>
    </article>
  );
}

const useSuggestionsCardItemStyles = makeStyles({
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

function SuggestionsCardItem({
  friend: { id, profileImageUrl, userName, fullName, following },
  suggestionsKey
}) {
  const classes = useSuggestionsCardItemStyles();
  const dispatch = useDispatch();
  const { current: key } = useRef(generateKey());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    suggestionsKey === key && setLoading(false);
  }, [key, suggestionsKey]);

  const handleFollowButtonClick = () => {
    setLoading(true);
    dispatch(followAction({ key, params: id, payload: { follow: true } }));
  };

  const avatarProps = {
    alt: 'user-image',
    src: profileImageUrl,
    className: classes.avatar
  };
  const followButtonProps = {
    disabled: loading,
    variant: 'contained',
    color: 'primary',
    className: classes.button,
    onClick: handleFollowButtonClick
  };
  const followingButtonProps = {
    variant: 'outlined',
    className: classes.button,
    onClick: undefined
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
      {following && <Button {...followingButtonProps}>Following</Button>}
      {!following && (
        <Button {...followButtonProps}>
          {loading && <Loader color="blue" />}Follow
        </Button>
      )}
    </div>
  );
}
