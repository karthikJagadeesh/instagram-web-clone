import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet2 from '../images/icons-spritesheet2.png';
import IconsSpriteSheet1 from '../images/icons-spritesheet.png';

import { uploadPostDialogActions } from '../redux/actions/ui';

import { UploadPostDialog } from './UploadPost';

const userStyles = makeStyles(theme => {
  const common = {
    height: 24,
    width: 24,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${IconsSpriteSheet2})`
  };
  return {
    wrapper: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'end'
    },

    explore: {
      ...common,
      backgroundSize: '355px 344px',
      backgroundPosition: '-202px -197px'
    },
    notifications: {
      ...common,
      backgroundSize: '355px 344px',
      backgroundPosition: '-275px -270px'
    },
    profile: {
      ...common,
      backgroundSize: '355px 344px',
      backgroundPosition: '-125px -270px'
    },
    uploadPost: {
      ...common,
      backgroundSize: '355px 344px',
      backgroundPosition: '-214px -97px',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    link: {
      [theme.breakpoints.down('xs')]: {
        marginLeft: 20
      },
      marginLeft: 30,
      display: 'grid'
    }
  };
});

function User({ userName }) {
  const classes = userStyles();
  const inputRef = useRef();
  const [src, setSrc] = useState('');
  const dispatch = useDispatch();
  const showUploadDialog = useSelector(state => state.ui.showUploadDialog);

  const handleFileUpload = ({ target }) => {
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
        dispatch(uploadPostDialogActions.open());
      });
      reader.readAsDataURL(target.files[0]);
    }
  };

  const inputProps = {
    ref: inputRef,
    type: 'file',
    onChange: handleFileUpload,
    accept: 'image/jpeg, image/png',
    hidden: true
  };

  return (
    <div className={classes.wrapper}>
      <div onClick={() => inputRef.current.click()} className={classes.link}>
        <input {...inputProps} />
        <span className={classes.uploadPost} />
      </div>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.explore} />
      </Link>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.notifications} />
      </Link>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.profile} />
      </Link>
      {showUploadDialog && <UploadPostDialog inputRef={inputRef} src={src} />}
    </div>
  );
}

const commonBreakpoints = theme => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'block'
  }
});
const useSearchStyles = makeStyles(theme => ({
  textFieldRoot: {
    width: 200,
    justifySelf: 'center',
    ...commonBreakpoints(theme)
  },
  textFieldInputProps: {
    padding: 5,
    fontSize: '0.9rem'
  },
  searchIcon: {
    backgroundImage: `url(${IconsSpriteSheet1})`,
    backgroundPosition: '-239px -366px',
    backgroundSize: '410px 396px',
    backgroundRepeat: 'no-repeat',
    height: 10,
    width: 10
  }
}));

function Search() {
  const classes = useSearchStyles();

  return (
    <TextField
      variant="filled"
      placeholder="Search"
      inputProps={{ className: classes.textFieldInputProps }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <div className={classes.searchIcon} />
          </InputAdornment>
        )
      }}
      classes={{ root: classes.textFieldRoot }}
    />
  );
}

const useTitleStyles = makeStyles(theme => ({
  div: {
    display: 'grid',
    justifyContent: 'center'
  },
  span: {
    backgroundImage: `url(${IconsSpriteSheet2})`,
    backgroundSize: '355px 344px',
    backgroundPosition: '-227px -197px',
    backgroundRepeat: 'no-repeat',
    height: 24,
    width: 24
  },

  separator: {
    background: '#262626',
    height: 28,
    margin: '0 16px',
    width: 1,
    ...commonBreakpoints(theme)
  },

  typography: {
    fontFamily: 'insta-font',
    fontSize: 34,
    lineHeight: 'unset',
    letterSpacing: 1,
    position: 'absolute',
    top: 17,
    ...commonBreakpoints(theme)
  },
  link: {
    width: 111
  },

  wrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'start'
  }
}));

function Title() {
  const classes = useTitleStyles();

  return (
    <div className={classes.wrapper}>
      <Link to="/">
        <div className={classes.div}>
          <span className={classes.span} />
        </div>
      </Link>
      <div className={classes.separator} />
      <Link to="/" className={classes.link}>
        <Typography className={classes.typography}>Instaclone</Typography>
      </Link>
    </div>
  );
}

const useTopNavigationStyles = makeStyles({
  appBar: {
    height: 70,
    background: '#ffffff',
    color: '#000000',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: 'minmax(auto, 1010px)',
    padding: 12
  },
  section: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center'
  }
});

function TopNavigation({ userName }) {
  const classes = useTopNavigationStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <section className={classes.section}>
        <Title />
        <Search />
        <User userName={userName} />
      </section>
    </AppBar>
  );
}

export default TopNavigation;
