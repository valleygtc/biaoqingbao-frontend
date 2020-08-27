import React from 'react';
import { connect } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { GROUP_ALL } from './constants';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  }
}));

const defaultValues = {
  group: GROUP_ALL,
}

function ExportDialog({
  groups,
  open,
  onClose,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { handleSubmit, control, errors } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    let url = '/api/images/export';
    const groupId = data.group.id
    if (groupId !== GROUP_ALL.id) {
      url += `?group_id=${groupId}`
    }
    window.open(url);
    onClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={dialogFullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="export-images"
    >
      <DialogTitleWithCloseIcon id="export-images" onClose={onClose}>
        导出图片
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant="contained" color="primary" type="submit">确认导出</Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  groups: state.main.groups,
});

export default connect(
  mapStateToProps,
  null,
)(ExportDialog);
