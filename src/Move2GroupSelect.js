import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';

import GroupItem from './GroupItem';

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    width: '600px',
    maxWidth: `calc(100% - ${theme.spacing(6)}px)`,
  },
  actionArea: {
    padding: theme.spacing(1),
    display: 'flex',
  },
  actionAreaGrow: {
    flexGrow: 1,
  }
}));

export default function Move2GroupSelect({
  groups,
  currentGroup,
  onSelectGroup,
}) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickSelector = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSelector = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-popover' : undefined;

  const handleSelect = (value) => {
    console.log(`handleSelect: ${value}`);
    onSelectGroup(value);
    handleCloseSelector();
  }

  return (
    <span>
      <Button disableElevation aria-describedby={id} onClick={handleClickSelector}>
        <Typography>{currentGroup}</Typography>
        <ArrowDropDownIcon/>
      </Button>
      <Popover
        classes={{
          paper: classes.popoverPaper,
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseSelector}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {groups.map((value) => (
          <GroupItem
            key={value}
            value={value}
            selected={value === currentGroup}
            onSelect={handleSelect}
          />
        ))}
      </Popover>
    </span>
  );
}
