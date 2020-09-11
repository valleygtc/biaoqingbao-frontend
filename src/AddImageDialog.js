import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { addImage, getImageList } from './mainSlice';
import { GROUP_ALL } from './constants';

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '50vw',
    maxHeight: '50vh',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const defaultValues = {
  group: GROUP_ALL,
}

function AddImageDialog({
  groups,
  currentGroup,
  open,
  onClose,
  addImage,
  getImageList,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [ imageUrl, setImageUrl ] = useState(null);
  const { register, handleSubmit, control, errors, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    // setValue after open render(register called).
    // https://stackoverflow.com/a/59547360/7499223
    setTimeout(() => setValue('group', currentGroup), 0);
  }, [currentGroup, open]);

  useEffect(() => {
    // clear image after dialog closed
    const clearImage = () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl(null);
    }
    if (!open) {
      setTimeout(clearImage, 100);
    }
  }, [open])

  const handlePickImage = (event) => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const image = event.target.files[0];
    setImageUrl(URL.createObjectURL(image));
  }

  const onSubmit = async (data) => {
    const image = data['image'][0];
    const type = image.type.split('/')[1];
    const tags = data.tag ? [data.tag] : [];
    const resultAction = await addImage({
      image,
      type,
      group_id: data.group.id,
      tags,
    });
    onClose();
    if (!resultAction.error) {
      getImageList();
    }
  }

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
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl required fullWidth margin="normal" error={Boolean(errors.image)}>
            <InputLabel shrink htmlFor="image-picker">图片</InputLabel>
            <Input
              id="image-picker"
              type="file"
              inputProps={{
                accept: 'image/*',
              }}
              name="image"
              inputRef={register({ required: true })}
              onChange={handlePickImage}
            />
            {errors.image && <FormHelperText>必须选择一个图片</FormHelperText>}
          </FormControl>
          {imageUrl
            ? <img className={classes.image} src={imageUrl} />
            : null
          }
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
          <TextField id="标签" label="标签" fullWidth margin="normal" name="tag" inputRef={register} />
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
  currentGroup: state.main.groups.find((g) => g.id === state.main.currentGroupId),
});

const mapDispatchToProps = { addImage, getImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImageDialog);
