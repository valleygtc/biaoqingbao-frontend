import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import ImageWall from './ImageWall';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: '1',
  }
}));

export default function App({}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <ImageWall />
      </div>
      <div>
        Footer
      </div>
    </div>
  );
}
