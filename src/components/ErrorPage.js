import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

export default function ErrorPage() {
  return (
    <div>
      <Typography variant="h4" align="center" paragraph>
        Sorry, this page isn't available.
      </Typography>
      <Typography align="center">
        The link you followed may be broken, or the page may have been removed.
        <Link to="/">
          <Typography color="primary" component="span">
            {' Go back to Instaclone.'}
          </Typography>
        </Link>
      </Typography>
    </div>
  );
}
