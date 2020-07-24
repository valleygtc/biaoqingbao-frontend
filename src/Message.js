import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { changeMessage } from './mainSlice';

function Message({
  message,
  changeMessage,
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    changeMessage({
      open: false,
    })
  };

  return (
    <Snackbar open={message.open} autoHideDuration={5000} onClose={handleClose}>
      <Alert elevation={6} variant="filled"  onClose={handleClose} severity={message.severity}>
        {message.content}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
  message: state.main.message,
});

const mapDispatchToProps = { changeMessage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
