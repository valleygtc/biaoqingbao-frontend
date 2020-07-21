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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addImage } from './mainSlice';

function AddImageDialog({
  groups,
  open,
  onClose,
  addImage,
}) {
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [group, setGroup] = React.useState(String(groups[0].id));
  const handleChange = (event) => {
    setGroup(event.target.value);
  };

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
        <form noValidate>
          <FormControl required fullWidth margin="normal">
            <InputLabel shrink htmlFor="image-picker">图片</InputLabel>
            <Input id="image-picker" type="file" onChange={() => console.log('handle file choose')} />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel id="group">组</InputLabel>
            <Select
              labelId="group"
              id="group"
              value={group}
              onChange={handleChange}
            >
              {groups.map((g) => (
                <MenuItem key={g.id} value={String(g.id)}>{g.name}</MenuItem>
              ))}
            </Select>
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

const mapStateToProps = (state) => ({
  groups: state.main.groups,
});

const mapDispatchToProps = { addImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImageDialog);
