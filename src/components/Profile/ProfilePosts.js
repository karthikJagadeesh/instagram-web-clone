import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet from '../../images/icons-spritesheet.png';

const commonIconProps = {
  backgroundImage: `url(${IconsSpriteSheet})`,
  backgroundRepeat: 'no-repeat',
  height: 12
};

const useSavedPostsStyles = makeStyles({
  section: {
    paddingTop: 60,
    display: 'grid',
    justifyContent: 'center'
  },

  noPicDiv: {
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: 'minmax(auto, 345px)',
    '& *': {
      marginBottom: 16
    }
  },

  savePhotoIcon: {
    ...commonIconProps,
    height: 62,
    width: 62,
    backgroundPosition: '-196px -291px'
  }
});

function SavedPosts() {
  const classes = useSavedPostsStyles();

  return (
    <section className={classes.section}>
      <div className={classes.noPicDiv}>
        <div className={classes.savePhotoIcon} />
        <Typography variant="h4">Save</Typography>
        <Typography align="center">
          Save photos that you want to see again. No one is notified, and only
          you can see what you've saved.
        </Typography>
      </div>
    </section>
  );
}

const useProfilePostsStyles = makeStyles({
  section: {
    paddingTop: 60
  },

  noPicDiv: {
    display: 'grid',
    placeItems: 'center',
    '& div': {
      marginBottom: 16
    }
  },

  uploadPhotoIcon: {
    ...commonIconProps,
    backgroundPosition: '-394px -0px',
    height: 62,
    width: 62
  }
});

function ProfilePosts() {
  const classes = useProfilePostsStyles();

  return (
    <section className={classes.section}>
      <div className={classes.noPicDiv}>
        <div className={classes.uploadPhotoIcon} />
        <Typography variant="h4">Upload a Photo</Typography>
      </div>
    </section>
  );
}

const useProfilePostTabsStyles = makeStyles({
  section: {
    marginTop: 24
  },

  tabsIndicator: {
    top: 0,
    backgroundColor: '#000000'
  },
  tabRoot: {
    margin: '0px 20px',
    opacity: 0.5
  },
  tabLabelIcon: {
    minHeight: 'unset'
  },
  tabWrapper: {
    flexDirection: 'row'
  },

  postsIcon: {
    ...commonIconProps,
    backgroundPosition: '-50px -425px',
    width: 12
  },
  savedIcon: {
    ...commonIconProps,
    backgroundPosition: '-90px -425px',
    width: 10
  }
});

export default function ProfilePostTabs() {
  const classes = useProfilePostTabsStyles();
  const [value, setValue] = useState(0);

  const tabsProps = {
    value,
    onChange: (_, value) => setValue(value),
    centered: true,
    classes: { indicator: classes.tabsIndicator }
  };
  const postsTabProps = {
    icon: <span className={classes.postsIcon} />,
    label: 'POSTS',
    classes: {
      root: classes.tabRoot,
      labelIcon: classes.tabLabelIcon,
      wrapper: classes.tabWrapper
    }
  };
  const savedTabProps = {
    icon: <span className={classes.savedIcon} />,
    label: 'SAVED',
    classes: postsTabProps.classes
  };

  return (
    <>
      <section className={classes.section}>
        <Divider />
        <Tabs {...tabsProps}>
          <Tab {...postsTabProps} />
          <Tab {...savedTabProps} />
        </Tabs>
        {value === 0 && <ProfilePosts />}
        {value === 1 && <SavedPosts />}
      </section>
    </>
  );
}
