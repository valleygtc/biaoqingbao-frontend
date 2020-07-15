import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderSpecialOutlinedIcon from '@material-ui/icons/FolderSpecialOutlined';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
  }
}));

export default function GroupItem({
  id,
  value,
  selected,
  editing,
  checked,
  onSelect,
  onToggleCheck,
  onEdit,
}) {
  const classes = useStyles();

  const handleCheck = (e) => {
    e.stopPropagation();
    onToggleCheck(true);
  }
  const handleUncheck = (e) => {
    e.stopPropagation();
    onToggleCheck(false);
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleOpenEditDialog = (e) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  }
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  }
  const handleEditSubmit = () => {
    console.log('handle submit edit group dialog');
    onEdit();
  }

  const handleClick = () => {
    if (editing && checked) {
      onToggleCheck(false);
    } else if (editing && !checked) {
      onToggleCheck(true);
    } else {
      onSelect();
    }
  }

  const getStartIcon = () => {
    if (value === '全部') {
      return (
        <IconButton disabled size="small" aria-label="icon">
          <FolderSpecialOutlinedIcon />
        </IconButton>
      );
    } else if (editing) {
      if (checked) {
        return (
          <IconButton size="small" aria-label="checkbox" onClick={handleUncheck}>
            <CheckBoxIcon />
          </IconButton>
        );
      } else {
        return (
          <IconButton size="small" aria-label="checkedbox" onClick={handleCheck}>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        );
      }
    } else {
      return (
        <IconButton disabled size="small" aria-label="icon">
          <FolderOutlinedIcon />
        </IconButton>
      );
    }
  }

  const getEndIcon = () => {
    if (selected && !editing) {
      return (<CheckIcon color="inherit" />);
    } else if (editing && value !== '全部') {
      return (
        <IconButton size="small" aria-label="edit" onClick={handleOpenEditDialog}>
          <EditIcon />
        </IconButton>
      );
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.item} onClick={handleClick}>
        {getStartIcon()}
        <Typography className={classes.text} key={value}>{value}</Typography>
        {getEndIcon()}
      </div>
      <Divider />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        aria-labelledby="edit-group"
      >
        <DialogTitleWithCloseIcon id="edit-group" onClose={handleCloseEditDialog}>
          编辑组名
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <TextField fullWidth required defaultValue={value} id="组名" label="组名" margin="normal" />
          </form>
        </DialogContent>
        <MuiDialogActions>
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>确认</Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  )
}
