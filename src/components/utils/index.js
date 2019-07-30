import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CirclularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import { makeStyles } from '@material-ui/core/styles';

const COLORS = {
  blue: '#3897f0',
  white: '#ffffff',
  grey: '#464646'
};

export function ErrorText({ text, ...props }) {
  return (
    <Typography
      align="center"
      color="error"
      variant="body2"
      paragraph
      {...props}
    >
      {text}
    </Typography>
  );
}

const useLoaderStyles = makeStyles({
  circlularProgress: {
    position: 'absolute',
    color: ({ color = 'grey' }) => COLORS[color]
  }
});

export function Loader({ color }) {
  const classes = useLoaderStyles({ color });
  return <CirclularProgress className={classes.circlularProgress} size={24} />;
}

const useLinearLoaderStyles = makeStyles({
  progressRoot: {
    backgroundColor: '#de9bff',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999
  },
  progressBar: {
    backgroundColor: '#ef60d5'
  }
});

export function LinearLoader() {
  const classes = useLinearLoaderStyles();

  return (
    <LinearProgress
      classes={{ root: classes.progressRoot, bar: classes.progressBar }}
    />
  );
}

export function useLoader() {
  const [formError, formState] = useSelector(state => [
    state.ui.form.error,
    state.ui.form
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formState && setLoading(false);
  }, [formState]);

  return { loading, setLoading, formError };
}

export function generateKey() {
  return Math.random()
    .toString(36)
    .substr(2);
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

export function UnfollowDialog({
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
