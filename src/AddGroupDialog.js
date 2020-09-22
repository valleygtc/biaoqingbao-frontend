import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addGroup } from './mainSlice';

function AddGroupDialog({
  open,
  onClose,
  addGroup,
}) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await addGroup(data.name);
    if (!resultAction.error) {
      onClose();
    }
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
        <form noValidate id="add-group-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            required
            autoFocus
            error={Boolean(errors.name)}
            id="组名"
            label="组名"
            margin="normal"
            helperText={errors.name ? '组名不能为空' : ''}
            name="name"
            inputRef={register({ required: true })}
          />
        </form>
      </DialogContent>
      <MuiDialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="add-group-form"
        >确认</Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = { addGroup };

export default connect(
  null,
  mapDispatchToProps
)(AddGroupDialog);
