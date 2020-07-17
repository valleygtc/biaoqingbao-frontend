import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addImage } from './mainSlice';

function AddImageDialog({
  open,
  onClose,
  addImage,
}) {
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={dialogFullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="add-image"
    >
      <DialogTitleWithCloseIcon id="add-image" onClose={onClose}>
        添加图片
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink htmlFor="image-picker">图片</InputLabel>
            <Input id="image-picker" type="file" onChange={() => console.log('handle file choose')} />
          </FormControl>
          <TextField id="标签" label="标签" fullWidth margin="normal"/>
          <FormControl margin="normal">
            <Button variant="contained" color="primary" onClick={() => addImage('TODO')}>提交</Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = { addImage };

export default connect(
  null,
  mapDispatchToProps
)(AddImageDialog);
