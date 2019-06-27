import React from 'react';
import Typography from '@material-ui/core/Typography';

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
