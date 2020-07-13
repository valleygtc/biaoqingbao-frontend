import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
  }
}));

export default function App({}) {
  const classes = useStyles();
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(`change to page: ${value}`)
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <ImageWall />
        <div className={classes.pagination}>
          <Pagination count={10} size={bigScreen ? 'large' : 'medium'} page={page} onChange={handleChange} />
        </div>
      </div>
      <Divider />
      <Footer />
    </div>
  );
}
