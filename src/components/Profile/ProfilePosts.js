import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import IconsSpriteSheet from '../../images/icons-spritesheet.png';
import IconsSpriteSheet2 from '../../images/icons-spritesheet2.png';

import { getProfilePostsAction } from '../../redux/actions/api';

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

const useImageWithMetaStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    userSelect: 'none'
  },
  imageWrapper: {
    position: 'relative'
  },
  postMeta: {
    [theme.breakpoints.down('xs')]: {
      gridAutoFlow: 'row',
      alignContent: 'space-evenly'
    },
    position: 'absolute',
    display: 'grid',
    placeItems: 'center',
    gridAutoFlow: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    '&:hover': {
      background: 'rgba(0,0,0,0.6)',
      cursor: 'pointer',
      '& > div': {
        opacity: 1
      }
    }
  },
  postMetaItems: {
    color: '#ffffff',
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 5,
    placeItems: 'center',
    opacity: 0
  },
  likes: {
    ...commonIconProps,
    backgroundPosition: '-328px -239px',
    backgroundSize: '355px 344px',
    height: 16,
    width: 16
  },
  comments: {
    ...commonIconProps,
    backgroundPosition: '-327px -203px',
    backgroundSize: '355px 344px',
    height: 16,
    width: 18
  }
}));

function ImageWithMeta({ post }) {
  const classes = useImageWithMetaStyles();

  return (
    <div className={classes.imageWrapper}>
      <div className={classes.postMeta}>
        <div className={classes.postMetaItems}>
          <span className={classes.likes} />
          <Typography>{post.likes}</Typography>
        </div>
        <div className={classes.postMetaItems}>
          <span className={classes.comments} />
          <Typography>{post.comments}</Typography>
        </div>
      </div>
      <img src={post.imageUrl} alt="profile-post" className={classes.image} />
    </div>
  );
}

const useProfilePostsStyles = makeStyles(theme => ({
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
  },

  article: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 935px)'
  },
  postContainer: {
    [theme.breakpoints.down('sm')]: {
      gridGap: 2
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20
  }
}));

function ProfilePosts() {
  const classes = useProfilePostsStyles();
  const { user, profilePosts } = useSelector(state => ({
    user: state.api.user,
    profilePosts: state.api.profilePosts
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfilePostsAction());
  }, [dispatch]);

  if (user.posts === 0) {
    return (
      <section className={classes.section}>
        <div className={classes.noPicDiv}>
          <div className={classes.uploadPhotoIcon} />
          <Typography variant="h4">Upload a Photo</Typography>
        </div>
      </section>
    );
  }

  if (profilePosts) {
    return (
      <article className={classes.article}>
        <div className={classes.postContainer}>
          {profilePosts.map(post => (
            <ImageWithMeta key={post.id} post={post} />
          ))}
        </div>
      </article>
    );
  }

  return null;
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
