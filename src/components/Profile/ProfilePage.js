import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';

const useProfilePictureStyles = makeStyles({
  person: {
    color: '#ffffff',
    height: 150,
    width: 150
  },
  personWrapper: {
    background: '#DBDBDB',
    width: 150,
    height: 150,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center'
  },
  personSection: {
    display: 'grid',
    justifyContent: 'center'
  }
});

function ProfilePicture() {
  const classes = useProfilePictureStyles();

  return (
    <section className={classes.personSection}>
      <div className={classes.personWrapper}>
        <PersonIcon className={classes.person} />
      </div>
    </section>
  );
}

const useProfileNameSectionStyles = makeStyles({
  userNameSection: {
    display: 'grid',
    gridGap: 20,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, max-content) 106px 30px',
    alignItems: 'center'
  },
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
  }
});

function ProfileNameSection({ user: { userName } }) {
  const classes = useProfileNameSectionStyles();

  return (
    <section className={classes.userNameSection}>
      <Typography className={classes.userName}>{userName}</Typography>
      <Button variant="outlined" className={classes.button}>
        Edit Profile
      </Button>
      <div className={classes.settingsWrapper}>
        <Settings className={classes.settings} />
      </div>
    </section>
  );
}

const usePostCountSectionStyles = makeStyles({
  followingSection: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 40,
    gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)'
  },
  followingText: {
    display: 'grid',
    gridGap: 5,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, max-content) minmax(auto, max-content)'
  },
  followingCount: {
    fontWeight: 600
  }
});

function PostCountSection({ user }) {
  const classes = usePostCountSectionStyles();
  const meta = ['posts', 'followers', 'following'];

  return (
    <section className={classes.followingSection}>
      {meta.map(item => (
        <div key={item} className={classes.followingText}>
          <Typography className={classes.followingCount}>
            {user[item]}
          </Typography>
          <Typography>{item}</Typography>
        </div>
      ))}
    </section>
  );
}

const useNameBioSectionStyles = makeStyles({
  typography: {
    fontWeight: 600
  }
});

function NameBioSection({ user: { fullName, bio, website } }) {
  const classes = useNameBioSectionStyles();

  return (
    <section>
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

const useStyles = makeStyles({
  card: {
    background: 'transparent',
    border: 'unset',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'minmax(auto, 290px) minmax(auto, 645px)'
  },

  cardContent: {
    display: 'grid',
    gridGap: 20
  }
});

function ProfilePage({ user }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <ProfilePicture />
      <CardContent className={classes.cardContent}>
        <ProfileNameSection user={user} />
        <PostCountSection user={user} />
        <NameBioSection user={user} />
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
