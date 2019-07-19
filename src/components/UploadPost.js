import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useField } from 'react-final-form-hooks';
import ReactCrop from 'react-image-crop';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Textfield from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import { uploadPostAction } from '../redux/actions/api';
import { uploadPostDialogActions } from '../redux/actions/ui';

import { ErrorText, useLoader, Loader } from './utils';

import 'react-image-crop/dist/ReactCrop.css';

const useUploadPostButtonStyles = makeStyles({
  textField: {
    '& fieldset': {
      border: 'none'
    }
  },

  reactCrop: {
    '& > div': {
      gridTemplateColumns: 'minmax(auto, 600px)',
      display: 'grid',
      placeItems: 'center'
    }
  },

  dialogTitle: {
    textAlign: 'center'
  },
  dialogPaper: {
    maxWidth: 'unset'
  },

  form: {
    display: 'grid'
  },

  button: {
    padding: 8
  }
});

export function UploadPostDialog({ inputRef, src }) {
  const classes = useUploadPostButtonStyles();
  const [crop, setCrop] = useState({ aspect: 1, width: 600 });
  const [realImageDimensions, setRealImageDimensions] = useState({});
  const dispatch = useDispatch();
  const { loading, setLoading, formError } = useLoader();

  const validate = ({ caption }) => {
    const errors = {};
    if (caption && caption.length > 150) {
      errors.caption = 'Please enter caption fewer than 150 characters.';
    }
    return errors;
  };
  const onSubmit = ({ caption }) => {
    const payload = new FormData();
    payload.append('image', inputRef.current.files[0]);
    payload.append('caption', caption);
    payload.append(
      'imageCropOptions',
      JSON.stringify({ ...realImageDimensions, ...crop })
    );
    dispatch(uploadPostAction({ payload }));
    setLoading(true);
  };

  const handleDialogClose = () => dispatch(uploadPostDialogActions.close());

  const {
    form,
    pristine,
    handleSubmit,
    submitting,
    submitFailed,
    errors
  } = useForm({
    onSubmit,
    validate
  });
  const caption = useField('caption', form);

  const textFieldProps = {
    ...caption.input,
    error: caption.meta.error && caption.meta.submitFailed,
    multiline: true,
    rowsMax: 2,
    rows: 2,
    fullWidth: true,
    variant: 'outlined',
    placeholder: 'Write a caption...',
    className: classes.textField
  };
  const reactCropProps = {
    src,
    crop,
    minWidth: 600,
    locked: true,
    className: classes.reactCrop,
    onChange: crop => setCrop(crop),
    onImageError: handleDialogClose,
    onImageLoaded: image =>
      setRealImageDimensions({
        realImageWidth: image.width,
        realImageHeight: image.height
      })
  };
  const dialogProps = {
    open: true,
    onClose: handleDialogClose,
    classes: { paper: classes.dialogPaper }
  };
  const formProps = {
    onSubmit: handleSubmit,
    className: classes.form,
    encType: 'multipart/form-data'
  };
  const buttonProps = {
    className: classes.button,
    disabled: pristine || submitting || loading,
    color: 'primary',
    type: 'submit'
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle className={classes.dialogTitle}>New Post</DialogTitle>
      <ReactCrop {...reactCropProps} />
      <form {...formProps}>
        <Textfield {...textFieldProps} />
        <Button {...buttonProps}>{loading && <Loader />}Share post</Button>
      </form>
      {submitFailed && <ErrorText text={Object.values(errors)[0]} />}
      {formError && <ErrorText text={formError} />}
    </Dialog>
  );
}
