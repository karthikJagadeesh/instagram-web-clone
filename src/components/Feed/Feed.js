import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import {
  getSuggestionsAction,
  getAllPostsAction,
  followAction
} from '../../redux/actions/api';

import { SuggestionsSkeleton, AllPostsSkeleton } from '../utils/skeleton';
import { generateKey, Loader, LinearLoader, UnfollowDialog } from '../utils';

import LoadingPage from '../LoadingPage';

export default function Feed() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.api.allPosts);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  if (!allPosts) {
    return <LoadingPage />;
  }

  if (allPosts.length === 0) {
    return <SuggestionsCard />;
  }

  return <AllPosts posts={allPosts} />;
}

const useAllPostsStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, 600px) 300px',
    gridGap: 35,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(auto, 600px)',
      justifyContent: 'center'
    }
  },

  wrapper: {
    display: 'grid',
    margin: '0px 28px 24px',
    justifyContent: 'center',
    gridTemplateColumns: 'minmax(auto, 300px)'
  }
}));

function AllPosts() {
  const classes = useAllPostsStyles();
  const { userName, fullName, profileImageUrl } = useSelector(
    state => state.api.user
  );

  return (
    <div className={classes.container}>
      <div>
        <AllPostsSkeleton count={5} />
      </div>
      <Hidden smDown>
        <div>
          <div className={classes.wrapper}>
            <NameCard
              userName={userName}
              fullName={fullName}
              profileImageUrl={profileImageUrl}
            />
          </div>
          <SuggestionsCard side={true} />
        </div>
      </Hidden>
    </div>
  );
}

const useNameCardStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '44px auto',
    gridGap: 12,
    alignItems: 'center'
  },
  nameWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});

function NameCard({ userName, fullName, profileImageUrl }) {
  const classes = useNameCardStyles();

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

function SuggestionsCard({ side = false }) {
  const classes = useSuggestionsCardStyles();
  const dispatch = useDispatch();
  const suggestions = useSelector(({ api }) => api.suggestions);
  const [showButton, setButton] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const data = suggestions.data;

  useEffect(() => {
    dispatch(getSuggestionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (data && !side) {
      const isFollowingAnyone = data.some(friend => friend.following);
      if (isFollowingAnyone) {
        setButton(true);
      } else {
        setButton(false);
      }
    }
  }, [side, data]);

  const typographyProps = {
    variant: 'h6',
    align: 'left',
    gutterBottom: true,
    className: classes.typographyHeading
  };
  const typographyPropsSide = {
    align: 'center',
    gutterBottom: true,
    color: 'textSecondary',
    variant: 'subtitle2'
  };
  const buttonProps = {
    disabled,
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: () => {
      setDisabled(true);
      dispatch(getAllPostsAction());
    }
  };

  return (
    <article className={classes.article}>
      {!side && (
        <Typography {...typographyProps}>Suggestions For You</Typography>
      )}
      <Paper className={classes.paper}>
        {side && (
          <Typography {...typographyPropsSide}>Suggestions For You</Typography>
        )}
        {data ? (
          data.map(friend => {
            const suggestionsCardItemProps = {
              friend,
              key: friend.id,
              suggestions,
              side
            };
            return <SuggestionsCardItem {...suggestionsCardItemProps} />;
          })
        ) : (
          <SuggestionsSkeleton count={12} />
        )}
        {showButton && (
          <div className={classes.buttonWrapper}>
            <Button {...buttonProps}>Get Started</Button>
          </div>
        )}
        {disabled && <LinearLoader />}
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

  button: {
    height: 30,
    padding: '0px 16px'
  }
});

function SuggestionsCardItem({
  friend: { id, profileImageUrl, userName, fullName, following },
  suggestions,
  side
}) {
  const classes = useSuggestionsCardItemStyles();
  const dispatch = useDispatch();
  const { current: key } = useRef(generateKey());
  const [loading, setLoading] = useState(false);
  const [loadingUnfollow, setLoadingUnfollow] = useState(false);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (suggestions.key === key) {
      setLoading(false);
      setLoadingUnfollow(false);
    }
  }, [key, suggestions]);

  const handleDialogClick = bool => () => setDialog(bool);

  const handleFollowButtonClick = () => {
    setLoading(true);
    dispatch(followAction({ key, params: id, payload: { follow: true } }));
  };
  const handleUnfollowButtonClick = () => {
    setDialog(false);
    setLoadingUnfollow(true);
    dispatch(followAction({ key, params: id, payload: { follow: false } }));
  };

  const followButtonProps = {
    disabled: loading,
    variant: !side ? 'contained' : 'text',
    color: 'primary',
    className: classes.button,
    onClick: handleFollowButtonClick
  };
  const followingButtonProps = {
    disabled: loadingUnfollow,
    variant: !side ? 'outlined' : 'text',
    className: classes.button,
    onClick: handleDialogClick(true)
  };
  const unfollowDialogProps = {
    userName,
    onClose: handleDialogClick(false),
    profileImageUrl,
    handleUnfollowButtonClick
  };
  const followingButton = (
    <Button {...followingButtonProps}>
      {loadingUnfollow && <Loader />}Following
    </Button>
  );
  const followButton = (
    <Button {...followButtonProps}>
      {loading && <Loader color="blue" />}Follow
    </Button>
  );

  return (
    <div className={classes.card}>
      <NameCard
        profileImageUrl={profileImageUrl}
        userName={userName}
        fullName={fullName}
      />
      {following ? followingButton : followButton}
      {dialog && <UnfollowDialog {...unfollowDialogProps} />}
    </div>
  );
}
