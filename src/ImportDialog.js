import React, { useEffect } from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { importImages, stop, reset } from './importSlice';
import { getImageList } from './mainSlice';
import { showWarning } from './msgSlice';
import { isEmpty } from 'lodash';
import { GROUP_ALL } from './constants';

const defaultValues = {
  group: GROUP_ALL,
  useFilename: false,
}

function ImportDialog({
  groups,
  currentGroup,
  open,
  loading,
  imageStatusObj,
  onClose,
  importImages,
  stop,
  reset,
  getImageList,
  showWarning,
}) {
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, handleSubmit, control, errors, getValues, setValue } = useForm({ defaultValues });

  useEffect(() => {
    // setValue after open render(register called).
    // https://stackoverflow.com/a/59547360/7499223
    setTimeout(() => setValue('group', currentGroup), 0);
  }, [currentGroup, open]);

  const onSubmit = async (data) => {
    importImages({
      images: Object.fromEntries(Array.from(data['images']).entries()),
      group_id: data['group'].id,
      useFilename: data['useFilename'],
    });
  }

  const handleClose = (event) => {
    // fix: 如果不加 event.preventDefault 那么点击导入完成后点击“完成”按钮，会调用 onSubmit。
    // 不知道为什么，猜测原因可能是 reset imageStatusObj 后重新渲染出“提交”按钮了，然后按点击“提交”按钮处理了？
    event.preventDefault();
    if (loading) {
      showWarning('上传过程中禁止关闭对话框');
      return;
    }
    if (Object.values(imageStatusObj).some((status) => status === 'ok')) {
      getImageList();
    }
    reset();
    onClose();
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
          color="secondary"
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
    } else if (Object.values(imageStatusObj).some((status) => status === 'error')) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >续传</Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
        >完成</Button>
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
          <FormControl fullWidth margin="normal">
            <FormControlLabel
              control={<Checkbox name="useFilename" inputRef={register} />}
              label="使用文件名作为标签"
            />
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
  groups: state.main.groups,
  currentGroup: state.main.groups.find((g) => g.id === state.main.currentGroupId),
  loading: state.import.loading,
  imageStatusObj: state.import.imageStatusObj,
});

const mapDispatchToProps = { importImages, stop, reset, getImageList, showWarning };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportDialog);
