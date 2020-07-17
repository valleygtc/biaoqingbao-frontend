import React from 'react';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiPagination from '@material-ui/lab/Pagination';

import { changePage, getImageList } from './mainSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
  }
}));

function Pagination({
  pages,
  page,
  changePage,
  getImageList,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChangePage = (event, value) => {
    changePage(value);
    getImageList(value);
  };

  return (
    <div className={classes.root}>
      <MuiPagination
        size={bigScreen ? 'large' : 'medium'}
        count={pages}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pages: state.main.pages,
  page: state.main.page,
});

const mapDispatchToProps = { changePage, getImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
