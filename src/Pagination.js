import React from 'react';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MuiPagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';

import { changePage, getImageList } from './mainSlice';

function Pagination({
  pages,
  page,
  changePage,
  getImageList,
}) {
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChangePage = (event, value) => {
    changePage(value);
    getImageList();
  };

  return (
    <Box display="flex" justifyContent="center" my={2}>
      <MuiPagination
        size={bigScreen ? 'large' : 'medium'}
        count={pages}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
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
