import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { updateGroup } from './mainSlice';

function EditGroupDialog({
  group,
  open,
  onClose,
  updateGroup,
}) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: group.name,
    }
  });

  const onSubmit = async (data) => {
    const resultAction = await updateGroup({
      id: group.id,
      name: data.name,
    });
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
      aria-labelledby="edit-group"
    >
      <DialogTitleWithCloseIcon id="edit-group" onClose={onClose}>
        编辑组名
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            required
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
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>确认</Button>
      </MuiDialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = { updateGroup };

export default connect(
  null,
  mapDispatchToProps
)(EditGroupDialog);
