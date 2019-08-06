import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { distanceInWordsStrict } from 'date-fns';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet1 from '../../images/icons-spritesheet.png';
import IconsSpriteSheet2 from '../../images/icons-spritesheet2.png';

import {
  likeAction,
  getLikesAction,
  followAction
} from '../../redux/actions/api';

import { NameCard } from './utils';
import { SuggestionsSkeleton } from '../utils/skeleton';
import { UnfollowDialog } from '../utils';
import { CustomUsersListCardItem } from './Feed';

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
    owner: { userName, id: ownerId, profileImageUrl },
    likes,
    caption,
    postedAt,
    ownerHasLiked,
    id
  }
}) {
  const classes = usePostStyles();
  const [dialog, setDialog] = useState(false);
  const [unfollowDialog, setUnfollowDialog] = useState(false);
  const dispatch = useDispatch();

  const nameCardProps = {
    userName,
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

  const handleOptionsClick = bool => () => setDialog(bool);
  const handleUnfollowButtonClick = () => {
    dispatch(
      followAction({
        params: ownerId,
        payload: { follow: false },
        namespace: 'post'
      })
    );
    setUnfollowDialog(false);
  };
  const onUnfollowButtonClick = () => {
    setDialog(false);
    setUnfollowDialog(true);
  };

  const optionsDialogProps = {
    onClose: handleOptionsClick(false),
    userName,
    profileImageUrl,
    onUnfollowButtonClick
  };
  const unfollowDialogProps = {
    onClose: () => setUnfollowDialog(false),
    userName,
    profileImageUrl,
    handleUnfollowButtonClick
  };

  return (
    <>
      <article className={classes.article}>
        <div className={classes.nameCardWrapper}>
          <NameCard {...nameCardProps} />
          <div className={classes.icon} onClick={handleOptionsClick(true)} />
        </div>
        <div>
          <img src={imageUrl} alt="post" className={classes.image} />
        </div>
        <div className={classes.container}>
          <div className={classes.iconWrapper}>
            <LikeButton id={id} ownerHasLiked={ownerHasLiked} />
            <div className={classes.comments} />
            <div className={classes.share} />
            <div className={classes.save} />
          </div>
          <DisplayLikes likes={likes} id={id} />
          {userNameSection}
          {captionSection}
          {distanceSection}
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
      {dialog && <OptionsDialog {...optionsDialogProps} />}
      {unfollowDialog && <UnfollowDialog {...unfollowDialogProps} />}
    </>
  );
}

const useOptionsDialogStyles = makeStyles(theme => ({
  dialogScrollPaper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 496px)'
  },

  button: {
    padding: '12px 8px'
  },
  buttonRed: {
    color: theme.palette.error.main
  }
}));

function OptionsDialog({ onClose, onUnfollowButtonClick }) {
  const classes = useOptionsDialogStyles();

  const dialogProps = {
    open: true,
    classes: {
      scrollPaper: classes.dialogScrollPaper
    },
    onClose,
    TransitionComponent: Zoom
  };

  return (
    <Dialog {...dialogProps}>
      <Button
        className={classNames(classes.button, classes.buttonRed)}
        onClick={onUnfollowButtonClick}
      >
        Unfollow
      </Button>
      <Divider />
      <Button className={classes.button}>Go to post</Button>
      <Divider />
      <Button className={classes.button}>Share</Button>
      <Divider />
      <Button className={classes.button}>Copy Link</Button>
      <Divider />
      <Button onClick={onClose} className={classes.button}>
        Cancel
      </Button>
    </Dialog>
  );
}

const useDisplayLikesStyles = makeStyles({
  typography: {
    fontWeight: 600
  },
  span: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

function DisplayLikes({ likes, id }) {
  const classes = useDisplayLikesStyles();
  const [dialog, setDialog] = useState(false);

  const handleDialogClick = bool => () => setDialog(bool);

  return (
    <>
      <Typography variant="subtitle2" className={classes.typography}>
        <span
          onClick={likes ? handleDialogClick(true) : undefined}
          className={classes.span}
        >
          {likes === 1 ? '1 like' : `${likes} likes`}
        </span>
      </Typography>
      {dialog && (
        <LikesDialog likes={likes} id={id} onClose={handleDialogClick(false)} />
      )}
    </>
  );
}

const useLikeDialogStyles = makeStyles({
  cancelButton: {
    ...commonProps,
    backgroundPosition: '-224px -319px'
  },

  titleContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    padding: '6px 0px',
    alignItems: 'center'
  },

  dialogPaperWidth: {
    maxWidth: 360
  }
});

function LikesDialog({ likes, onClose, id }) {
  const classes = useLikeDialogStyles();
  const dispatch = useDispatch();
  const list = useSelector(state => state.api.customUsersList);
  const friends = list.data && list.data[id];

  useEffect(() => {
    dispatch(getLikesAction({ params: { id } }));
  }, [dispatch, id]);

  const dialogProps = {
    open: true,
    onClose,
    classes: { paperWidthFalse: classes.dialogPaperWidth },
    maxWidth: false,
    TransitionComponent: Zoom
  };
  const count = likes > 4 ? 4 : likes;

  return (
    <Dialog {...dialogProps}>
      <div className={classes.titleContainer}>
        <div />
        <Typography variant="h6" align="center">
          Likes
        </Typography>
        <div className={classes.cancelButton} onClick={onClose} />
      </div>
      <Divider />
      {friends ? (
        friends.map(friend => (
          <CustomUsersListCardItem
            key={friend.id}
            friend={friend}
            namespace="generic"
            list={list}
            postId={id}
          />
        ))
      ) : (
        <SuggestionsSkeleton count={count} />
      )}
    </Dialog>
  );
}

const commonKeyFramesProps = {
  '0%': { transform: 'scale(1)' },
  '25%': { transform: 'scale(1.2)' },
  '50%': { transform: 'scale(0.95)' },
  '100%': { transform: 'scale(1)' }
};
const commonAnimationProps = {
  animationTimingFunction: 'ease-in-out',
  transform: 'scale(1)'
};
const useLikeButtonStyles = makeStyles({
  like: {
    ...commonProps,
    backgroundPosition: '-275px -269px',
    animation: '$like-button-animation 0.45s',
    ...commonAnimationProps
  },
  liked: {
    ...commonProps,
    backgroundPosition: '-250px -269px',
    animation: '$liked-button-animation 0.45s',
    ...commonAnimationProps
  },
  '@keyframes like-button-animation': commonKeyFramesProps,
  '@keyframes liked-button-animation': commonKeyFramesProps
});

function LikeButton({ id, ownerHasLiked }) {
  const classes = useLikeButtonStyles();
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
