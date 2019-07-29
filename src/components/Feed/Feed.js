import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import { makeStyles } from '@material-ui/core/styles';

import {
  getSuggestionsAction,
  getAllPostsAction,
  followAction
} from '../../redux/actions/api';

import { SuggestionsSkeleton, AllPostsSkeleton } from '../utils/skeleton';
import { generateKey, Loader } from '../utils';

export default function Feed() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.api.allPosts);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  if (allPosts && allPosts.length <= 0) {
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
  }
}));

function AllPosts() {
  const classes = useAllPostsStyles();

  return (
    <div className={classes.container}>
      <div>
        <AllPostsSkeleton count={5} />
      </div>
      <Hidden smDown>
        <div>
          <SuggestionsCard side={true} />
        </div>
      </Hidden>
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
  const { data: suggestions, key } = useSelector(({ api }) => api.suggestions);
  const [showButton, setButton] = useState(false);

  useEffect(() => {
    dispatch(getSuggestionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (suggestions && !side) {
      const isFollowingAnyone = suggestions.some(friend => friend.following);
      if (isFollowingAnyone) {
        setButton(true);
      } else {
        setButton(false);
      }
    }
  }, [side, suggestions]);

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
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: () => dispatch(getAllPostsAction())
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
        {suggestions ? (
          suggestions.map(friend => {
            const suggestionsCardItemProps = {
              friend,
              key: friend.id,
              suggestionsKey: key,
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
  },

  typography: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  nameWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
});

function SuggestionsCardItem({
  friend: { id, profileImageUrl, userName, fullName, following },
  suggestionsKey,
  side
}) {
  const classes = useSuggestionsCardItemStyles();
  const dispatch = useDispatch();
  const { current: key } = useRef(generateKey());
  const [loading, setLoading] = useState(false);
  const [loadingUnfollow, setLoadingUnfollow] = useState(false);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (suggestionsKey === key) {
      setLoading(false);
      setLoadingUnfollow(false);
    }
  }, [key, suggestionsKey]);

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

  const avatarProps = {
    alt: 'user-image',
    src: profileImageUrl,
    className: classes.avatar
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
      {following ? followingButton : followButton}
      {dialog && <UnfollowDialog {...unfollowDialogProps} />}
    </div>
  );
}

const padding = '12px 8px';
const useUnfollowDialogStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    justifyContent: 'center',
    padding: '32px 16px 16px'
  },
  avatar: {
    width: 90,
    height: 90
  },

  dialogScrollPaper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 496px)'
  },

  cancelButton: {
    padding
  },
  unfollowButton: {
    color: theme.palette.error.main,
    padding
  },

  typography: {
    padding: '16px 16px 32px'
  }
}));

function UnfollowDialog({
  onClose,
  userName,
  profileImageUrl,
  handleUnfollowButtonClick
}) {
  const classes = useUnfollowDialogStyles();

  const dialogProps = {
    open: true,
    classes: {
      scrollPaper: classes.dialogScrollPaper
    },
    onClose,
    TransitionComponent: Zoom
  };
  const avatarProps = {
    className: classes.avatar,
    alt: 'user image',
    src: profileImageUrl
  };
  const typographyProps = {
    align: 'center',
    className: classes.typography,
    variant: 'body2'
  };

  return (
    <Dialog {...dialogProps}>
      <div className={classes.wrapper}>
        <Avatar {...avatarProps} />
      </div>
      <Typography {...typographyProps}>{`Unfollow @${userName}?`}</Typography>
      <Divider />
      <Button
        className={classes.unfollowButton}
        onClick={handleUnfollowButtonClick}
      >
        Unfollow
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}
