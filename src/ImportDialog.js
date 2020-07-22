import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addImage, getImageList } from './mainSlice';
import { GROUP_ALL } from './constants';

const defaultValues = {
  group: GROUP_ALL,
}

function ImportDialog({
  groups,
  open,
  onClose,
  addImage,
  getImageList,
}) {
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, handleSubmit, control, errors } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    const images = data['images'];
    for (const image of images) {
      const type = image.type.split('/')[1];
      await addImage({
        image,
        type,
        group_id: data.group.id,
        tags: [],
      });
    }
    onClose();
    getImageList();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={dialogFullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="import-images"
    >
      <DialogTitleWithCloseIcon id="import-images" onClose={onClose}>
        添加图片
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl required fullWidth margin="normal" error={Boolean(errors.images)}>
            <InputLabel shrink htmlFor="images-picker">图片</InputLabel>
            <Input
              id="images-picker"
              type="file"
              inputProps={{
                accept: 'image/*',
                multiple: true,
              }}
              name="images"
              inputRef={register({ required: true })}
            />
            {errors.images && <FormHelperText>必须选择一个图片</FormHelperText>}
          </FormControl>
          <FormControl required fullWidth margin="normal" error={Boolean(errors.group)}>
            <InputLabel id="group">组</InputLabel>
            <Controller
              as={
                <Select
                  labelId="group"
                  id="group"
                >
                  {groups.map((g) => (
                    <MenuItem key={g.id} value={g}>{g.name}</MenuItem>
                  ))}
                </Select>
              }
              name="group"
              control={control}
              rules={{require: true}}
            />
            {errors.group && <FormHelperText>必须选择组</FormHelperText>}
          </FormControl>
          <FormControl margin="normal">
            <Button variant="contained" color="primary" type="submit">提交</Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  groups: state.main.groups,
});

const mapDispatchToProps = { addImage, getImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportDialog);
