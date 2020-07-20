import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialogActions from '@material-ui/core/DialogActions';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { editTag } from './mainSlice';

function EditTagDialog({
  open,
  tag,
  onClose,
  editTag,
}) {
  const handleSubmit = () => {
    editTag(tag.id, 'TODO');
    onClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="edit-tag"
    >
      <DialogTitleWithCloseIcon id="edit-tag" onClose={onClose}>
        编辑标签
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField fullWidth required defaultValue={tag.text} id="标签" label="标签" margin="normal" />
        </form>
      </DialogContent>
      <MuiDialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>确认</Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = { editTag };

export default connect(
  null,
  mapDispatchToProps
)(EditTagDialog);
