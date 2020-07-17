import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import SearchBar from './SearchBar';
import ImageWall from './ImageWall';
import Pagination from './Pagination';
import Footer from './Footer';
import { getImageList } from './mainSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: '1',
  },
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
}) {
  useEffect(() => {
    getImageList(1);
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
      <div className={classes.root}>
        <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <SearchBar onSearch={(text) => console.log(`handle search: ${text}`)} />
        <div className={classes.content}>
          <ImageWall />
        </div>
        <Pagination />
        <Divider />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

const mapDispatchToProps = { getImageList };

export default connect(
  null,
  mapDispatchToProps,
)(App);
