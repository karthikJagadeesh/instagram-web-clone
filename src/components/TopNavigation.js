import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet2 from '../images/icons-spritesheet2.png';
import IconsSpriteSheet1 from '../images/icons-spritesheet.png';

const userStyles = makeStyles(() => {
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
    link: {
      marginLeft: 30,
      display: 'grid'
    }
  };
});

function User({ userName }) {
  const classes = userStyles();

  return (
    <div className={classes.wrapper}>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.explore} />
      </Link>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.notifications} />
      </Link>
      <Link to={`/${userName}`} className={classes.link}>
        <span className={classes.profile} />
      </Link>
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
    backgroundPosition: '-437px -344px',
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
