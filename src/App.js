import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './Header';
import ImportForm from './ImportForm';
import ImageWall from './ImageWall';
import Footer from './Footer';
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
    height: '10vh',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  }
});

function App({
  getImageList,
  getGroups,
}) {
  useEffect(() => {
    getImageList();
    getGroups();
  }, []);

  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Grid container direction="column" className={classes.root}>
          <Grid item>
            <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
          </Grid>
          <Grid item container alignItems="stretch" className={classes.contentGrid}>
            <Container disableGutters className={classes.contentContainer}  maxWidth="lg" >
              <Switch>
                <Route path="/import">
                  <ImportForm />
                </Route>
                <Route path="/">
                  <ImageWall />
                </Route>
              </Switch>
            </Container>
          </Grid>
          <Divider />
          <Grid item container className={classes.footer}>
            <Footer />
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

const mapDispatchToProps = { getImageList, getGroups };

export default connect(
  null,
  mapDispatchToProps,
)(App);
