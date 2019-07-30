import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import Settings from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';

import { logOutAction } from '../../redux/actions/user';
import { followAction } from '../../redux/actions/api';

import ProfilePostsTab from './ProfilePosts';

import { ChangeProfilePicDialog, ProfilePicture } from './utils';
import { useLoader, generateKey, Loader, UnfollowDialog } from '../utils';

const useOptionsItemStyles = makeStyles({
  button: {
    padding: '12px 8px'
  }
});

function OptionsItem({ onClick, text }) {
  const classes = useOptionsItemStyles();

  return (
    <>
      <Button className={classes.button} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

const useOptionsMenuStyles = makeStyles({
  dialogScrollPaper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 480px)'
  },
  dialogPaper: {
    borderRadius: 12
  },
  dialogTitle: {
    textAlign: 'center'
  }
});
function OptionsMenu({ onClose, history }) {
  const classes = useOptionsMenuStyles();
  const [showLogOutMessage, toggleLogOutMessage] = useState(false);
  const dispatch = useDispatch();

  const dialogProps = {
    open: true,
    classes: {
      scrollPaper: classes.dialogScrollPaper,
      paper: classes.dialogPaper
    },
    onClose: showLogOutMessage ? undefined : onClose,
    TransitionComponent: Zoom
  };

  const handleLogOutClick = () => {
    toggleLogOutMessage(true);
    dispatch(logOutAction());
  };
  const handleChangePasswordClick = () => {
    history.push('accounts/change-password');
  };

  const logOutMessage = (
    <DialogTitle className={classes.dialogTitle}>
      Logging Out
      <Typography color="textSecondary">
        You need to log back in to continue using.
      </Typography>
    </DialogTitle>
  );

  return (
    <Dialog {...dialogProps}>
      {showLogOutMessage && logOutMessage}
      {!showLogOutMessage && (
        <>
          <OptionsItem
            text="Change Password"
            onClick={handleChangePasswordClick}
          />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={onClose} />
        </>
      )}
    </Dialog>
  );
}

const userNameSection = {
  display: 'grid',
  gridGap: 20,
  gridAutoFlow: 'column',
  gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, 112px) 30px',
  alignItems: 'center'
};
const useProfileNameSectionStyles = makeStyles({
  userNameSection,
  userName: {
    fontSize: 28,
    fontWeight: 300
  },

  button: {
    lineHeight: 'unset',
    height: 30
  },

  settings: {
    height: 30,
    width: 30
  },
  settingsWrapper: {
    '&:hover': {
      cursor: 'pointer'
    }
  },

  userNameDivSmall: {
    ...userNameSection,
    gridTemplateColumns: 'minmax(auto, max-content) 30px',
    gridGap: 10
  }
});

function ProfileNameSection({
  isOwner,
  user: { userName, isFollowingOwner, ownerIsFollowing, id, profileImageUrl },
  handleOptionsMenuClick
}) {
  const classes = useProfileNameSectionStyles();
  const dispatch = useDispatch();
  const { current: key } = useRef(generateKey());
  const [loading, setLoading] = useState(false);
  const [loadingUnfollow, setLoadingUnfollow] = useState(false);
  const [dialog, setDialog] = useState(false);
  const userProfile = useSelector(({ api }) => api.userProfile);

  // TODO: A better abstraction to track loader states -> progress | succeed
  useEffect(() => {
    if (userProfile.key === key) {
      setLoading(false);
      setLoadingUnfollow(false);
    }
  }, [key, userProfile]);

  const handleDialogClick = bool => () => setDialog(bool);
  const handleUnfollowButtonClick = () => {
    setDialog(false);
    setLoadingUnfollow(true);
    dispatch(
      followAction({
        namespace: 'profile',
        key,
        params: id,
        payload: { follow: false }
      })
    );
  };
  const handleFollowButtonClick = () => {
    setLoading(true);
    dispatch(
      followAction({
        namespace: 'profile',
        key,
        params: id,
        payload: { follow: true }
      })
    );
  };

  const editProfile = (
    <Link to="accounts/edit">
      <Button variant="outlined" className={classes.button}>
        Edit Profile
      </Button>
    </Link>
  );
  const settings = (
    <div
      className={classes.settingsWrapper}
      onClick={handleOptionsMenuClick(true)}
    >
      <Settings className={classes.settings} />
    </div>
  );

  let followButton;
  if (ownerIsFollowing) {
    followButton = (
      <Button
        disabled={loadingUnfollow}
        onClick={handleDialogClick(true)}
        variant="outlined"
        className={classes.button}
      >
        {loadingUnfollow && <Loader />}Following
      </Button>
    );
  } else if (isFollowingOwner) {
    followButton = (
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleFollowButtonClick}
      >
        {loading && <Loader color="blue" />}Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleFollowButtonClick}
      >
        {loading && <Loader color="blue" />}
        Follow
      </Button>
    );
  }

  const unfollowDialogProps = {
    userName,
    onClose: handleDialogClick(false),
    profileImageUrl,
    handleUnfollowButtonClick
  };

  return (
    <>
      <Hidden xsDown>
        <section className={classes.userNameSection}>
          <Typography className={classes.userName}>{userName}</Typography>
          {isOwner ? (
            <>
              {editProfile}
              {settings}
            </>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.userNameDivSmall}>
            <Typography className={classes.userName}>{userName}</Typography>
            {isOwner && settings}
          </div>
          {isOwner ? editProfile : followButton}
        </section>
      </Hidden>
      {dialog && <UnfollowDialog {...unfollowDialogProps} />}
    </>
  );
}

const usePostCountSectionStyles = makeStyles(theme => {
  const followingSectionLarge = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 40,
    gridTemplateColumns:
      'minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content)'
  };
  const followingTextLarge = {
    display: 'grid',
    gridGap: 5,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)'
  };

  return {
    followingSection: {
      [theme.breakpoints.up('sm')]: {
        ...followingSectionLarge
      },
      [theme.breakpoints.down('xs')]: {
        display: 'grid',
        gridAutoFlow: 'column',
        padding: '10px 0'
      }
    },
    followingText: {
      [theme.breakpoints.up('sm')]: {
        ...followingTextLarge
      },
      [theme.breakpoints.down('xs')]: {
        display: 'grid',
        justifyItems: 'center',
        '& p': {
          fontSize: '0.9rem'
        }
      }
    },
    followingCount: {
      fontWeight: 600
    }
  };
});

function PostCountSection({ user }) {
  const classes = usePostCountSectionStyles();
  const meta = ['posts', 'followers', 'following'];
  const metaItems = meta.map(item => (
    <div key={item} className={classes.followingText}>
      <Typography className={classes.followingCount}>{user[item]}</Typography>
      <Hidden xsDown>
        <Typography>{item}</Typography>
      </Hidden>
      <Hidden smUp>
        <Typography color="textSecondary">{item}</Typography>
      </Hidden>
    </div>
  ));

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>{metaItems}</section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

const useNameBioSectionStyles = makeStyles(theme => ({
  typography: {
    fontWeight: 600
  },

  section: {
    '& p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.9rem'
      }
    }
  }
}));

function NameBioSection({ user: { fullName, bio, website } }) {
  const classes = useNameBioSectionStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{fullName}</Typography>
      <Typography>{bio}</Typography>
      <a href={website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {website}
        </Typography>
      </a>
    </section>
  );
}

const useProfilePageStyles = makeStyles({
  cardLarge: {
    background: 'transparent',
    border: 'unset',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, 290px) minmax(auto, 645px)'
  },
  cardContentLarge: {
    display: 'grid',
    gridGap: 20
  },

  cardSmall: {
    background: 'transparent',
    border: 'unset'
  },
  sectionSmall: {
    display: 'grid',
    gridAutoFlow: 'column',
    marginBottom: 16,
    gridTemplateColumns: '77px auto',
    gridGap: 20
  }
});

export default function ProfilePage({
  user,
  isOwner,
  history,
  match: { path }
}) {
  const classes = useProfilePageStyles();
  const [showDialog, toggleDialog] = useState(false);
  const [showOptionsMenu, toggleOptionsMenu] = useState(false);
  const { loading, setLoading } = useLoader();
  const inputRef = useRef();

  const handleOptionsMenuClick = bool => () => toggleOptionsMenu(bool);

  const profilePictureLargeProps = {
    user,
    onImageClick: isOwner ? () => toggleDialog(true) : undefined,
    loading,
    setLoading,
    inputRef,
    isOwner
  };
  const profilePictureSmallProps = {
    size: 77,
    ...profilePictureLargeProps
  };
  const changeProfilePicDialogProps = {
    id: user.id,
    onClose: () => toggleDialog(false),
    loading,
    setLoading,
    inputRef
  };
  const profileNameSectionProps = {
    isOwner,
    handleOptionsMenuClick,
    user,
    path
  };

  return (
    <>
      <Hidden xsDown>
        <Card className={classes.cardLarge}>
          <ProfilePicture {...profilePictureLargeProps} />
          <CardContent className={classes.cardContentLarge}>
            <ProfileNameSection {...profileNameSectionProps} />
            <PostCountSection user={user} />
            <NameBioSection user={user} />
          </CardContent>
        </Card>
      </Hidden>
      <Hidden smUp>
        <Card className={classes.cardSmall}>
          <CardContent>
            <section className={classes.sectionSmall}>
              <ProfilePicture {...profilePictureSmallProps} />
              <ProfileNameSection {...profileNameSectionProps} />
            </section>
            <NameBioSection user={user} />
          </CardContent>
          <PostCountSection user={user} />
        </Card>
      </Hidden>
      {showDialog && (
        <ChangeProfilePicDialog {...changeProfilePicDialogProps} />
      )}
      {showOptionsMenu && (
        <OptionsMenu
          history={history}
          onClose={handleOptionsMenuClick(false)}
        />
      )}
      <ProfilePostsTab user={user} isOwner={isOwner} />
    </>
  );
}
