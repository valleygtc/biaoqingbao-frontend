import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addGroup } from './mainSlice';

function AddGroupDialog({
  open,
  onClose,
  addGroup,
}) {
  const handleSubmit = () => {
    addGroup('group name TODO');
    onClose();
  }
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="create-group"
    >
      <DialogTitleWithCloseIcon id="create-group" onClose={onClose}>
        新建组
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField fullWidth required id="组名" label="组名" margin="normal"/>
        </form>
      </DialogContent>
      <MuiDialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>确认</Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  groups: state.main.groups,
  currentGroup: state.main.groups.find(
    (g) => g.id === state.main.currentGroupId
  ),
});

const mapDispatchToProps = { addGroup };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGroupDialog);
