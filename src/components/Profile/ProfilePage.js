import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import Settings from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';

import { ProfilePicture } from './utils';

const userNameSection = {
  display: 'grid',
  gridGap: 20,
  gridAutoFlow: 'column',
  gridTemplateColumns: 'minmax(auto, max-content) 106px 30px',
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

function ProfileNameSection({ user: { userName }, path }) {
  const classes = useProfileNameSectionStyles();

  return (
    <>
      <Hidden xsDown>
        <section className={classes.userNameSection}>
          <Typography className={classes.userName}>{userName}</Typography>
          <Link to={`${path}/edit`}>
            <Button variant="outlined" className={classes.button}>
              Edit Profile
            </Button>
          </Link>
          <div className={classes.settingsWrapper}>
            <Settings className={classes.settings} />
          </div>
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.userNameDivSmall}>
            <Typography className={classes.userName}>{userName}</Typography>
            <div className={classes.settingsWrapper}>
              <Settings className={classes.settings} />
            </div>
          </div>
          <Link to={`${path}/edit`}>
            <Button variant="outlined" className={classes.button} fullWidth>
              Edit Profile
            </Button>
          </Link>
        </section>
      </Hidden>
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

function ProfilePage({ user, match: { path } }) {
  const classes = useProfilePageStyles();

  return (
    <>
      <Hidden xsDown>
        <Card className={classes.cardLarge}>
          <ProfilePicture />
          <CardContent className={classes.cardContentLarge}>
            <ProfileNameSection path={path} user={user} />
            <PostCountSection user={user} />
            <NameBioSection user={user} />
          </CardContent>
        </Card>
      </Hidden>
      <Hidden smUp>
        <Card className={classes.cardSmall}>
          <CardContent>
            <section className={classes.sectionSmall}>
              <ProfilePicture size={77} />
              <ProfileNameSection user={user} path={path} />
            </section>
            <NameBioSection user={user} />
          </CardContent>
          <PostCountSection user={user} />
        </Card>
      </Hidden>
    </>
  );
}

export default ProfilePage;
