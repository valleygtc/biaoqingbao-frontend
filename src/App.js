import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';

import Header from './Header';
import SearchBar from './SearchBar';
import ImageWall from './ImageWall';
import Footer from './Footer';
import { imageList } from './mock';

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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
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
          <ImageWall imageList={imageList} />
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
