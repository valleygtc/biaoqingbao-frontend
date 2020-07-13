import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';

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

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  }

  return (
    <div className={classes.root}>
      <div className={classes.item} onClick={onSelect}>
        {editing ?
          checked
            ? (
              <IconButton size="small" aria-label="checkbox" onClick={handleUncheck}>
                <CheckBoxIcon />
              </IconButton>
            )
            : (
              <IconButton size="small" aria-label="checkedbox" onClick={handleCheck}>
                <CheckBoxOutlineBlankIcon />
              </IconButton>
            )
          : (
            <IconButton disabled size="small" aria-label="checkbox" onClick={handleUncheck}>
              <FolderOutlinedIcon />
            </IconButton>
          )
        }
        <Typography className={classes.text} key={value}>{value}</Typography>
        {selected && !editing
          ? <CheckIcon color="primary" />
          : null
        }
        {editing
          ? (
            <IconButton size="small" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )
          : null
        }
      </div>
      <Divider />
    </div>
  )
}
