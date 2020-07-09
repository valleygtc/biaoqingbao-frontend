import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import ImageWall from './ImageWall';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
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
      <Divider />
      <Footer />
    </div>
  );
}
