import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import Header from './Header';
import ImageWall from './ImageWall';
import Copyright from './Copyright';
import { getImageList, getGroups } from './mainSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  contentGrid: {
    flexGrow: '1',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
  footer: {
    padding: theme.spacing(2),
  }
}));

function Main({
  getImageList,
  getGroups,
}) {
  useEffect(() => {
    getImageList();
    getGroups();
  }, []);

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container alignItems="stretch" className={classes.contentGrid}>
        <Container disableGutters className={classes.contentContainer}  maxWidth="lg" >
          <ImageWall />
        </Container>
      </Grid>
      <Divider />
      <Grid item className={classes.footer}>
        <Copyright />
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = { getImageList, getGroups };

export default connect(
  null,
  mapDispatchToProps,
)(Main);
