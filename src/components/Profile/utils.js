import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';

import PersonIcon from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';

import { changeProfilePicAction } from '../../redux/actions/api';

import { Loader } from '../utils';

const padding = '12px 8px';
const useChangeProfilePicDialogStyles = makeStyles(theme => ({
  errorButton: {
    color: theme.palette.error.main,
    padding
  },
  button: {
    padding
  },

  dialogScrollPaper: {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto, 480px)',
    borderRadius: '10%'
  },
  dialogPaper: {
    borderRadius: 12
  },
  dialogTitle: {
    textAlign: 'center'
  }
}));

export function ChangeProfilePicDialog({ id, onClose, setLoading, inputRef }) {
  const classes = useChangeProfilePicDialogStyles();
  const dispatch = useDispatch();

  const handleRemovePicClick = () => {
    dispatch(changeProfilePicAction({ params: id }));
    setLoading(true);
    onClose();
  };

  const dialogProps = {
    open: true,
    classes: {
      scrollPaper: classes.dialogScrollPaper,
      paper: classes.dialogPaper
    },
    onClose,
    TransitionComponent: Zoom
  };
  const buttonProps = {
    color: 'primary',
    className: classes.button,
    onClick: () => {
      inputRef.current.click();
      onClose();
    }
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle className={classes.dialogTitle}>
        Change Profile Photo
      </DialogTitle>
      <Divider />
      <Button {...buttonProps}>Upload Photo</Button>
      <Divider />
      <Button className={classes.errorButton} onClick={handleRemovePicClick}>
        Remove Current Photo
      </Button>
      <Divider />
      <Button className={classes.button} onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}

const useProfilePictureStyles = makeStyles({
  person: {
    color: '#ffffff',
    height: ({ size }) => size || 150,
    width: ({ size }) => size || 150
  },
  personWrapper: {
    background: '#DBDBDB',
    width: ({ size }) => size || 150,
    height: ({ size }) => size || 150,
    borderRadius: '50%',
    display: 'grid',
    position: 'relative',
    placeItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  personSection: {
    display: 'grid',
    justifyContent: 'center'
  },

  img: {
    height: ({ size }) => size || 150,
    width: ({ size }) => size || 150,
    borderRadius: '50%'
  }
});

export function ProfilePicture({
  size,
  user: { id, profileImageUrl: image },
  onImageClick,
  loading,
  setLoading,
  inputRef
}) {
  const classes = useProfilePictureStyles({ size });
  const dispatch = useDispatch();
  const buttonRef = useRef();

  const onSubmit = event => {
    event.preventDefault();
    const payload = new FormData(event.target);
    dispatch(changeProfilePicAction({ params: id, payload }));
    setLoading(true);
  };

  const inputProps = {
    ref: inputRef,
    onChange: () => buttonRef.current.click(),
    type: 'file',
    accept: 'image/jpeg, image/png',
    hidden: true,
    name: 'profilePic'
  };
  const imgProps = {
    src: image,
    className: classes.img,
    onClick: !loading ? onImageClick : undefined
  };

  return (
    <section className={classes.personSection}>
      {image ? (
        <div className={classes.personWrapper}>
          {loading && <Loader />}
          <img {...imgProps} alt="profilePic" />
        </div>
      ) : (
        <div
          className={classes.personWrapper}
          onClick={!loading ? () => inputRef.current.click() : undefined}
        >
          {loading && <Loader />}
          <PersonIcon className={classes.person} />
        </div>
      )}
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <input {...inputProps} />
        <button ref={buttonRef} type="submit" hidden />
      </form>
    </section>
  );
}
