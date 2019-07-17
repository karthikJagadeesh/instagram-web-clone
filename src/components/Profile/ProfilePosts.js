import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet from '../../images/icons-spritesheet.png';
import IconsSpriteSheet2 from '../../images/icons-spritesheet2.png';

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
    backgroundSize: '410px 396px',
    backgroundPosition: '-189px -273px'
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
    backgroundSize: '410px 396px',
    backgroundPosition: '0px -273px',
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

const useProfilePostTabsStyles = makeStyles(theme => {
  const postsIconSmallGrey = {
    ...commonIconProps,
    backgroundImage: `url(${IconsSpriteSheet2})`,
    backgroundPosition: '-331px -199px',
    backgroundSize: '355px 344px',
    height: 24,
    width: 24
  };
  const savedIconSmallGrey = {
    ...commonIconProps,
    backgroundImage: `url(${IconsSpriteSheet2})`,
    backgroundPosition: '-50px -320px',
    backgroundSize: '355px 344px',
    height: 24,
    width: 24
  };

  return {
    section: {
      [theme.breakpoints.up('sm')]: {
        marginTop: 24
      }
    },

    tabsIndicator: {
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      },
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

    postsIconLarge: {
      ...commonIconProps,
      backgroundPosition: '-189px -366px',
      backgroundSize: '410px 396px',
      width: 12
    },
    savedIconLarge: {
      ...commonIconProps,
      backgroundSize: '410px 396px',
      backgroundPosition: '-401px 0',
      width: 10
    },

    postsIconSmall: postsIconSmallGrey,
    postsIconSmallBlue: {
      ...postsIconSmallGrey,
      backgroundPosition: '-331px -174px'
    },

    savedIconSmall: savedIconSmallGrey,
    savedIconSmallBlue: {
      ...savedIconSmallGrey,
      backgroundPosition: '0px -320px'
    }
  };
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
  const postsTabLargeProps = {
    icon: <span className={classes.postsIconLarge} />,
    label: 'POSTS',
    classes: {
      root: classes.tabRoot,
      labelIcon: classes.tabLabelIcon,
      wrapper: classes.tabWrapper
    }
  };
  const savedTabLargeProps = {
    icon: <span className={classes.savedIconLarge} />,
    label: 'SAVED',
    classes: postsTabLargeProps.classes
  };

  const postsTabSmallProps = {
    icon: (
      <span
        className={
          value === 0 ? classes.postsIconSmallBlue : classes.postsIconSmall
        }
      />
    ),
    classes: {
      root: classes.tabRoot
    }
  };
  const savedTabSmallProps = {
    icon: (
      <span
        className={
          value === 1 ? classes.savedIconSmallBlue : classes.savedIconSmall
        }
      />
    ),
    classes: {
      root: classes.tabRoot
    }
  };

  return (
    <>
      <section className={classes.section}>
        <Hidden xsDown>
          <Divider />
        </Hidden>
        <Hidden xsDown>
          <Tabs {...tabsProps}>
            <Tab {...postsTabLargeProps} />
            <Tab {...savedTabLargeProps} />
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs {...tabsProps}>
            <Tab {...postsTabSmallProps} />
            <Tab {...savedTabSmallProps} />
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Divider />
        </Hidden>
        {value === 0 && <ProfilePosts />}
        {value === 1 && <SavedPosts />}
      </section>
    </>
  );
}