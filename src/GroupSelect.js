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

export default function GroupSelect({
  groups,
}) {
  const classes = useStyles();
  const [group, setGroup] = useState('全部');

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
    setGroup(value);
    console.log(`handleSelect: ${value}`);
    handleCloseSelector();
  }

  const [editMode, setEditMode] = useState(false);
  const handleOpenEditMode = () => {
    setEditMode(true);
  }
  const handleCancelEditMode = () => {
    setEditMode(false);
  }

  const [checkedGroups, setCheckGroups] = useState([]);

  return (
    <div>
      <Button disableElevation aria-describedby={id} variant="contained" color="primary" onClick={handleClickSelector}>
        <Typography>{group}</Typography>
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
            selected={value === group}
            editing={editMode}
            checked={checkedGroups.includes(value)}
            onSelect={() => handleSelect(value)}
            onToggleCheck={(check) => {
              console.log('handle check toggle: %o', {check, value});
              if (check) {
                setCheckGroups([
                  ...checkedGroups,
                  value,
                ]);
              } else {
                setCheckGroups(checkedGroups.filter((v) => v !== value));
              }
            }}
            onEdit={() => console.log('edit button click')}
          />
        ))}
        <div className={classes.actionArea}>
          {editMode
            ? (<Button
                disableElevation
                size="small"
                variant="contained"
                onClick={handleCancelEditMode}
              >取消</Button>
            )
            : (<Button
                disableElevation
                size="small"
                variant="contained"
                onClick={handleOpenEditMode}
              >编辑</Button>
            )
          }
          <div className={classes.actionAreaGrow}></div>
          {editMode
            ? (<Button
                disableElevation
                disabled={checkedGroups.length === 0}
                size="small"
                variant="contained"
                onClick={() => console.log('handle click delete button')}
              >删除</Button>
            )
            : (<Button
                disableElevation
                size="small"
                variant="contained"
                onClick={() => console.log('handle click create group button')}
              >新建组</Button>
            )
          }
        </div>
      </Popover>
    </div>
  );
}
