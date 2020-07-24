import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addTag } from './mainSlice';

function AddTagDialog({
  imageId,
  open,
  onClose,
  addTag,
}){
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const resultAction = await addTag({
      imageId,
      text: data.text
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
      aria-labelledby="tag-image"
    >
      <DialogTitleWithCloseIcon id="tag-image" onClose={onClose}>
        添加标签
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate>
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

const mapDispatchToProps = { addTag };

export default connect(
  null,
  mapDispatchToProps
)(AddTagDialog);
