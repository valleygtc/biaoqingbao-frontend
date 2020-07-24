import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useForm } from "react-hook-form";

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { updateTag } from './mainSlice';

function EditTagDialog({
  open,
  tag,
  onClose,
  updateTag,
}) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      text: tag.text,
    }
  });

  const onSubmit = async (data) => {
    const resultAction = await updateTag({
      id: tag.id,
      text: data.text,
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
      aria-labelledby="edit-tag"
    >
      <DialogTitleWithCloseIcon id="edit-tag" onClose={onClose}>
        编辑标签
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            required
            error={Boolean(errors.text)}
            id="tag"
            label="标签"
            margin="normal"
            helperText={errors.text ? '标签内容不能为空' : ''}
            name="text"
            inputRef={register({ required: true })}
          />
        </form>
      </DialogContent>
      <MuiDialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>确认</Button>
      </MuiDialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = { updateTag };

export default connect(
  null,
  mapDispatchToProps
)(EditTagDialog);
