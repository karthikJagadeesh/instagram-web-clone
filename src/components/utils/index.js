import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CirclularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const COLORS = {
  blue: '#3897f0',
  white: '#ffffff',
  grey: '#464646'
};

export function ErrorText({ text, ...props }) {
  return (
    <Typography
      align="center"
      color="error"
      variant="body2"
      paragraph
      {...props}
    >
      {text}
    </Typography>
  );
}

const useLoaderStyles = makeStyles({
  circlularProgress: {
    position: 'absolute',
    color: ({ color = 'grey' }) => COLORS[color]
  }
});

export function Loader({ color }) {
  const classes = useLoaderStyles({ color });
  return <CirclularProgress className={classes.circlularProgress} size={24} />;
}

export function useLoader() {
  const [formError, formState] = useSelector(state => [
    state.ui.form.error,
    state.ui.form
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formState && setLoading(false);
  }, [formState]);

  return { loading, setLoading, formError };
}

export function generateKey() {
  return Math.random()
    .toString(36)
    .substr(2);
}
