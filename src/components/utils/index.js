import React from 'react';
import Typography from '@material-ui/core/Typography';

export function ErrorText({ errorText, ...props }) {
  return (
    <Typography
      align="center"
      color="error"
      variant="body2"
      paragraph
      {...props}
    >
      {errorText}
    </Typography>
  );
}
