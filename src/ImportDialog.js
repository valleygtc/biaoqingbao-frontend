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
import { closeDialog, importImages, stop } from './importSlice';
import { getImageList } from './mainSlice';
import { isEmpty } from 'lodash';
import { GROUP_ALL } from './constants';

const defaultValues = {
  group: GROUP_ALL,
}

function ImportDialog({
  groups,
  open,
  loading,
  imageStatusObj,
  closeDialog,
  importImages,
  stop,
  getImageList,
}) {
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, handleSubmit, control, errors, getValues } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    importImages({
      images: Object.fromEntries(Array.from(data['images']).entries()),
      group_id: data['group'].id
    });
  }

  const handleClose = () => {
    if (Object.values(imageStatusObj).some((status) => status === 'ok')) {
      getImageList();
    }
    closeDialog();
  }

  const handleContinue = () => {
    const allImages = Array.from(getValues('images'));
    const images = {};
    for (const [key, image] of allImages.entries()) {
      if (imageStatusObj[key] !== 'ok') {
        images[key] = image;
      }
    }
    const group = getValues('group');
    importImages({
      images,
      group_id: group.id,
    });
  }

  const buttonItem = (() => {
    if (loading) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => stop()}
        >停止</Button>
      );
    } else if (isEmpty(imageStatusObj)) {
      return (
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >提交</Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >续传</Button>
      );
    }
  })()

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={dialogFullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="import-images"
    >
      <DialogTitleWithCloseIcon id="import-images" onClose={handleClose}>
        批量导入图片
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
          {!isEmpty(imageStatusObj)
            ? <ul>
                <li>总计：{Object.keys(imageStatusObj).length}</li>
                <li>成功：{Object.values(imageStatusObj).filter((status) => status === 'ok').length}</li>
                <li>失败：{Object.values(imageStatusObj).filter((status) => status === 'error').length}</li>
              </ul>
            : null
          }
          <FormControl margin="normal">
            {buttonItem}
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.import.open,
  loading: state.import.loading,
  imageStatusObj: state.import.imageStatusObj,
  groups: state.main.groups,
});

const mapDispatchToProps = { closeDialog, importImages, stop, getImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportDialog);
