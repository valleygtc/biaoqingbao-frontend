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

import EditGroupDialog from './EditGroupDialog';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
  },
  imageNumber: {
    marginLeft: '6px',
    color: '#808080',
    fontSize: '0.9em'
  }
}));

export default function GroupItem({
  group,
  selected,
  editing,
  checked,
  onSelect,
  onCheck,
  onUncheck,
}) {
  const classes = useStyles();

  const handleCheck = (e) => {
    e.stopPropagation();
    onCheck();
  }
  const handleUncheck = (e) => {
    e.stopPropagation();
    onUncheck();
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleOpenEditDialog = (e) => {
    e.stopPropagation();
    setEditDialogOpen(true);
  }
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  }

  const handleClick = () => {
    if (editing && checked) {
      onUncheck();
    } else if (editing && !checked) {
      onCheck();
    } else {
      onSelect();
    }
  }

  return (
    <div>
      <div className={classes.item} onClick={handleClick}>
        {getStartIcon(group, editing, checked, handleCheck, handleUncheck)}
        <Typography className={classes.text}>{group.name} <span className={classes.imageNumber}>{group.image_number}</span></Typography>
        {getEndIcon(group, selected, editing, handleOpenEditDialog)}
      </div>
      <Divider />
      <EditGroupDialog
        group={group}
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
      />
    </div>
  )
}

const getStartIcon = (group, editing, checked, handleCheck, handleUncheck) => {
  if (group.name === '全部') {
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

const getEndIcon = (group, selected, editing, handleOpenEditDialog) => {
  if (selected && !editing) {
    return (<CheckIcon color="inherit" />);
  } else if (editing && group.name !== '全部') {
    return (
      <IconButton size="small" aria-label="edit" onClick={handleOpenEditDialog}>
        <EditIcon />
      </IconButton>
    );
  }
}
