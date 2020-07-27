import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { close } from './msgSlice';

function Message({
  open,
  severity,
  content,
  close,
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    close();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert elevation={6} variant="filled"  onClose={handleClose} severity={severity}>
        {content}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
  open: state.msg.open,
  severity: state.msg.severity,
  content: state.msg.content,
});

const mapDispatchToProps = { close };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
