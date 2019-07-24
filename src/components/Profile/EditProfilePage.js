import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useField } from 'react-final-form-hooks';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

import { userActions } from '../../redux/actions/api';

import { ProfilePicture, ChangeProfilePicDialog } from './utils';
import { ErrorText, Loader, useLoader } from '../utils';

const sectionItem = {
  display: 'grid',
  gridAutoFlow: 'column',
  gridGap: 30,
  placeItems: 'start end',
  marginBottom: 16,
  gridTemplateColumns: 'minmax(auto, 150px) minmax(auto, 340px)'
};
const typography = {
  fontWeight: 600
};
const justifySelfStart = {
  justifySelf: 'start'
};
const form = {
  display: 'grid'
};

const useChangePasswordStyles = makeStyles(theme => ({
  form,

  section: {
    background: '#ffffff',
    display: 'grid',
    justifyContent: 'start',
    padding: 30
  },
  sectionItem: {
    ...sectionItem,
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },

  justifySelfStart,

  userNameDiv: {
    ...sectionItem,
    placeItems: 'center end',
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      gridGap: 20,
      gridTemplateColumns: 'minmax(auto, 38px) minmax(auto, 340px)'
    }
  }
}));

function ChangePassword({ user }) {
  const classes = useChangePasswordStyles();
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();

  const onSubmit = values => {
    setLoading(true);
    dispatch(userActions.changePassword(values));
  };
  const validate = ({ newPassword, confirmPassword }) => {
    const errors = {};
    if (newPassword && newPassword.length < 6) {
      errors.newPassword = 'Password should be 6 or more characters.';
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      errors.confirmPassword = 'Please make sure both passwords match.';
    }
    return errors;
  };

  const { form, handleSubmit, submitting, submitFailed, errors } = useForm({
    onSubmit,
    validate
  });

  const oldPassword = useField('oldPassword', form);
  const newPassword = useField('newPassword', form);
  const confirmPassword = useField('confirmPassword', form);

  const disabled =
    oldPassword.meta.pristine ||
    newPassword.meta.pristine ||
    confirmPassword.meta.pristine ||
    !oldPassword.input.value ||
    !newPassword.input.value ||
    !confirmPassword.input.value ||
    submitting ||
    loading;
  const buttonProps = {
    disabled,
    type: 'submit',
    variant: 'contained',
    color: 'primary',
    className: classes.justifySelfStart
  };

  const commonProps = {
    type: 'password',
    autoComplete: 'new-password'
  };
  const currentPasswordProps = {
    ...commonProps,
    text: 'Old Password',
    formItem: oldPassword,
    autoComplete: 'current-password'
  };
  const newPasswordProps = {
    ...commonProps,
    text: 'New Password',
    formItem: newPassword
  };
  const confirmPasswordProps = {
    ...commonProps,
    text: 'Confirm New Password',
    formItem: confirmPassword
  };

  return (
    <section className={classes.section}>
      <div className={classes.userNameDiv}>
        <ProfilePicture user={user} size={38} />
        <Typography variant="h6" className={classes.justifySelfStart}>
          {user.userName}
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input type="text" autoComplete="username" hidden />
        <SectionItem {...currentPasswordProps} />
        <SectionItem {...newPasswordProps} />
        <SectionItem {...confirmPasswordProps} />
        <div className={classes.sectionItem}>
          <div />
          <Button {...buttonProps}>
            {loading && <Loader />}Change Password
          </Button>
        </div>
      </form>
      <div className={classes.sectionItem}>
        <div />
        <div className={classes.justifySelfStart}>
          {submitFailed && (
            <ErrorText
              align="left"
              text={Object.values(errors)[0]}
              className={classes.justifySelfStart}
            />
          )}
          {formError && (
            <ErrorText
              align="left"
              text={formError}
              className={classes.justifySelfStart}
            />
          )}
        </div>
      </div>
    </section>
  );
}

const useSectionItemStyles = makeStyles(theme => ({
  typography,
  sectionItem: {
    ...sectionItem,
    [theme.breakpoints.down('xs')]: {
      display: 'unset'
    }
  },

  textFieldInput: {
    padding: 10
  },
  textField: {
    alignSelf: 'center'
  }
}));

function SectionItem({ text, formItem, type = 'text', autoComplete = '' }) {
  const classes = useSectionItemStyles();

  const textFieldProps = {
    ...formItem.input,
    error: formItem.meta.error && formItem.meta.submitFailed,
    variant: 'outlined',
    fullWidth: true,
    type,
    inputProps: {
      className: classes.textFieldInput
    },
    className: classes.textField,
    autoComplete
  };

  return (
    <div className={classes.sectionItem}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align="right">
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>
      <TextField {...textFieldProps} />
    </div>
  );
}

const usePictureSectionItemStyles = makeStyles(theme => ({
  justifySelfStart,
  typography,

  pictureSectionItem: {
    ...sectionItem,
    placeItems: 'center end',
    [theme.breakpoints.down('xs')]: {
      gridGap: 20,
      gridTemplateColumns: 'minmax(auto, 38px) minmax(auto, 340px)'
    }
  },

  typographyChangePic: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function PictureSectionItem({ user }) {
  const classes = usePictureSectionItemStyles();
  const [showDialog, toggleDialog] = useState(false);
  const { loading, setLoading } = useLoader();
  const inputRef = useRef();

  const onImageClick = () => toggleDialog(true);

  const profilePictureProps = {
    size: 38,
    user,
    loading,
    setLoading,
    onImageClick,
    inputRef
  };
  const typographyProps = {
    color: 'primary',
    variant: 'body2',
    onClick: user.profileImageUrl
      ? onImageClick
      : () => inputRef.current.click(),
    className: classes.typographyChangePic
  };
  const changeProfilePicDialogProps = {
    id: user.id,
    onClose: () => toggleDialog(false),
    loading,
    setLoading,
    inputRef
  };

  return (
    <div className={classes.pictureSectionItem}>
      <ProfilePicture {...profilePictureProps} />
      <div className={classes.justifySelfStart}>
        <Typography className={classes.typography}>{user.userName}</Typography>
        <Typography {...typographyProps}>Change Profile Photo</Typography>
      </div>
      {showDialog && (
        <ChangeProfilePicDialog {...changeProfilePicDialogProps} />
      )}
    </div>
  );
}

const useEditProfileStyles = makeStyles(theme => ({
  section: {
    background: '#ffffff',
    display: 'grid',
    justifyContent: 'start',
    padding: 30
  },
  sectionItem: {
    ...sectionItem,
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },

  form,

  typography,
  justifySelfStart
}));

function EditProfile({ user }) {
  const classes = useEditProfileStyles();
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();

  const onSubmit = payload => {
    dispatch(userActions.update({ payload, params: user.id }));
    setLoading(true);
  };

  const validate = ({ fullName, bio, email, phoneNumber }) => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required.';
    }
    if (!fullName) {
      errors.fullName = 'Name is required.';
    } else if (fullName && fullName.length > 30) {
      errors.fullName = 'Enter a name under 30 characters.';
    }
    if (bio && bio.length > 130) {
      errors.bio = 'Your bio must be 130 characters or fewer';
    }
    if (phoneNumber) {
      const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneNumber.match(regex)) {
        errors.phoneNumber = 'Enter a valid phone number';
      }
    }

    return errors;
  };

  const initialValues = {
    fullName: user.fullName || '',
    website: user.website || '',
    bio: user.bio || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || ''
  };

  const {
    form,
    handleSubmit,
    submitting,
    pristine,
    submitFailed,
    errors
  } = useForm({
    onSubmit,
    validate,
    initialValues
  });

  const fullName = useField('fullName', form);
  const website = useField('website', form);
  const bio = useField('bio', form);
  const email = useField('email', form);
  const phoneNumber = useField('phoneNumber', form);

  const textFieldProps = {
    ...bio.input,
    variant: 'outlined',
    multiline: true,
    rowsMax: 3,
    rows: 3,
    fullWidth: true
  };

  const buttonProps = {
    disabled: pristine || submitting || loading,
    type: 'submit',
    variant: 'contained',
    color: 'primary',
    className: classes.justifySelfStart
  };

  return (
    <section className={classes.section}>
      <PictureSectionItem user={user} />
      <form onSubmit={handleSubmit} className={classes.form}>
        <SectionItem text="Name" formItem={fullName} />
        <SectionItem text="Website" formItem={website} />

        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.typography}>Bio</Typography>
          </aside>
          <TextField {...textFieldProps} />
        </div>

        <div className={classes.sectionItem}>
          <div />
          <Typography
            color="textSecondary"
            className={classes.justifySelfStart}
          >
            Private information
          </Typography>
        </div>

        <SectionItem text="Email" formItem={email} type="email" />
        <SectionItem text="Phone Number" formItem={phoneNumber} />

        <div className={classes.sectionItem}>
          <div />
          <Button {...buttonProps}>{loading && <Loader />}Submit</Button>
        </div>
      </form>
      <div className={classes.sectionItem}>
        <div />
        <div className={classes.justifySelfStart}>
          {submitFailed && (
            <ErrorText
              align="left"
              text={Object.values(errors)[0]}
              className={classes.justifySelfStart}
            />
          )}
          {formError && (
            <ErrorText
              align="left"
              text={formError}
              className={classes.justifySelfStart}
            />
          )}
        </div>
      </div>
    </section>
  );
}

const useEditProfilePageStyles = makeStyles(theme => ({
  section: {
    display: 'grid',
    gridAutoFlow: 'column',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(48px, max-content) 0px auto'
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'minmax(220px, max-content) auto'
    },
    border: '1px solid #dbdbdb'
  },

  permanentDrawerPaper: {
    borderRight: '1px solid #dbdbdb',
    left: 'unset',
    top: 'unset',
    position: 'relative'
  },
  permanentDrawerRoot: {
    height: '100%',
    '& div': {
      zIndex: 888
    }
  },
  temporaryDrawer: {
    '& div': {
      width: 220
    }
  },

  listItemSelected: {
    borderLeft: '2px solid black',
    '& span': {
      fontWeight: 600
    }
  },
  listItemButton: {
    paddingTop: 10,
    paddingBottom: 10
  },

  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    marginLeft: 'unset',
    '&:hover': {
      background: 'none'
    }
  }
}));

function EditProfilePage({ user, location: { pathname }, history }) {
  const classes = useEditProfilePageStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleListClick = index => () => {
    switch (index) {
      case 0:
        history.push('edit');
        break;

      case 1: {
        history.push('change-password');
        break;
      }

      default:
        break;
    }
  };
  const handleSelected = index => {
    switch (index) {
      case 0:
        return pathname.includes('edit');

      case 1:
        return pathname.includes('change-password');

      default:
        break;
    }
  };

  const options = [
    'Edit Profile',
    'Change password',
    'Authorized Applications',
    'Email and SMS',
    'Manage Contacts',
    'Privacy and Security'
  ];

  const drawer = (
    <List>
      {options.map((text, index) => {
        const listItemProps = {
          button: true,
          key: text,
          selected: handleSelected(index),
          onClick: handleListClick(index),
          classes: {
            selected: classes.listItemSelected,
            button: classes.listItemButton
          }
        };
        return (
          <ListItem {...listItemProps}>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );

  const iconButtonprops = {
    edge: 'start',
    onClick: handleDrawerToggle,
    className: classes.menuButton,
    disableRipple: true
  };
  const temporaryDrawerProps = {
    variant: 'temporary',
    anchor: 'left',
    open: mobileOpen,
    onClose: handleDrawerToggle,
    classes: { paperAnchorLeft: classes.temporaryDrawer }
  };
  const permanentDrawerProps = {
    variant: 'permanent',
    open: true,
    classes: {
      paper: classes.permanentDrawerPaper,
      root: classes.permanentDrawerRoot
    }
  };
  const hiddenProps = {
    xsDown: true,
    implementation: 'css',
    className: classes.permanentDrawerRoot
  };

  return (
    <section className={classes.section}>
      <IconButton {...iconButtonprops}>
        <MenuIcon />
      </IconButton>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer {...temporaryDrawerProps}>{drawer}</Drawer>
        </Hidden>
        <Hidden {...hiddenProps}>
          <Drawer {...permanentDrawerProps}>{drawer}</Drawer>
        </Hidden>
      </nav>
      <main>
        {pathname.includes('edit') && <EditProfile user={user} />}
        {pathname.includes('change-password') && <ChangePassword user={user} />}
      </main>
    </section>
  );
}

export default EditProfilePage;
