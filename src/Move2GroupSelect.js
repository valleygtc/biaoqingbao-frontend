import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';

import GroupItem from './GroupItem';
import { updateImage } from './mainSlice';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },
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

function Move2GroupSelect({
  groups,
  imageData,
  updateImage,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  if (imageData.is_deleted) {
    return (
      <Button disableElevation className={classes.button}>
        <Typography>回收站</Typography>
        <ArrowDropDownIcon/>
      </Button>
    );
  }

  const handleClickSelector = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSelector = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-popover' : undefined;

  const handleSelect = (group) => {
    updateImage({
      group,
      id: imageData.id,
    });
    handleCloseSelector();
  }

  const currentGroup = groups.find((g) => g.id === imageData.group_id);
  return (
    <span>
      <Button disableElevation className={classes.button} aria-describedby={id} onClick={handleClickSelector}>
        <Typography>{currentGroup.name}</Typography>
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
        {groups.map((g) => (
          <GroupItem
            key={g.id}
            group={g}
            selected={g.id === currentGroup.id}
            onSelect={() => handleSelect(g)}
          />
        ))}
      </Popover>
    </span>
  );
}

const mapStateToProps = (state) => ({
  groups: [state.main.groupAll, ...state.main.normalGroups],
});

const mapDispatchToProps = { updateImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Move2GroupSelect);
