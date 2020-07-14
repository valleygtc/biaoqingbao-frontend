import React, { useState } from 'react';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Header from './Header';
import SearchBar from './SearchBar';
import ImageWall from './ImageWall';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: '1',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
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

export default function App({}) {
  const classes = useStyles();
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const [darkMode, setDarkMode] = useState(false);
  const handleToggleDarkMode = (darkMode) => {
    setDarkMode(darkMode);
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(`change to page: ${value}`)
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
        <SearchBar onSearch={(text) => console.log(`handle search: ${text}`)} />
        <div className={classes.content}>
          <ImageWall />
          <div className={classes.pagination}>
            <Pagination count={10} size={bigScreen ? 'large' : 'medium'} page={page} onChange={handleChange} />
          </div>
        </div>
        <Divider />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
