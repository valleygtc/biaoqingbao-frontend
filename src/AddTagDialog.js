import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addTag } from './mainSlice';

function AddTagDialog({
  imageId,
  open,
  onClose,
  addTag,
}){
  const handleSubmit = () => {
    addTag({
      imageId,
      'tag': 'TODO',
    });
    onClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="tag-image"
    >
      <DialogTitleWithCloseIcon id="tag-image" onClose={onClose}>
        添加标签
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField fullWidth required id="标签" label="标签" margin="normal"/>
        </form>
      </DialogContent>
      <MuiDialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>确认</Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = { addTag };

export default connect(
  null,
  mapDispatchToProps
)(AddTagDialog);
