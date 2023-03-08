import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';

import GroupItemAll from './GroupItemAll';
import GroupItem from './GroupItem';
import AddGroupDialog from './AddGroupDialog';
import { getGroupAll, getNormalGroups, getRecycleBin } from './group';
import { changeGroup, changePage, getImageList, deleteGroups } from './mainSlice';
import { useHeapedDialog } from './hooks';
import GroupItemRecycleBin from 'GroupItemRecycleBin';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
  },
  popoverPaper: {
    width: '600px',
    maxWidth: `calc(100% - ${theme.spacing(6)}px)`,
  },
}));

function GroupSelect({
  groups,
  currentGroup,
  changeGroup,
  changePage,
  getImageList,
  deleteGroups,
}) {
  const classes = useStyles();

  const {
    open: panelOpen,
    handleOpen: openPanel,
    handleClose: closePanel,
  } = useHeapedDialog('group-panel');
  const anchorRef = useRef(null);
  const panelId = panelOpen ? 'group-panel' : undefined;

  const handleSelect = (group) => {
    changeGroup(group);
    changePage(1);
    closePanel();
    getImageList();
  }

  const [editMode, setEditMode] = useState(false);
  const handleOpenEditMode = () => {
    setEditMode(true);
  }
  const handleCancelEditMode = () => {
    setEditMode(false);
  }

  const [checkedGroupIds, setCheckGroupIds] = useState([]);
  const handleCheck = (group) => {
    setCheckGroupIds([
      ...checkedGroupIds,
      group.id,
    ]);
  }
  const handleUncheck = (group) => {
    setCheckGroupIds(
      checkedGroupIds.filter((id) => id !== group.id)
    );
  }
  const handleDeleteGroups = async () => {
    const resultAction = await deleteGroups(checkedGroupIds);
    if (!resultAction.error) {
      setEditMode(false);
      setCheckGroupIds([]);
    }
  }

  const {
    open: addDialogOpen,
    handleOpen: openAddDialog,
    handleClose: closeAddDialog,
  } = useHeapedDialog('add-group');

  const groupAll = getGroupAll(groups);
  const recycleBin = getRecycleBin(groups);
  const normalGroups = getNormalGroups(groups);
  return (
    <div>
      <Button
        disableElevation
        className={classes.button}
        aria-describedby={panelId}
        color="inherit"
        ref={anchorRef}
        onClick={openPanel}
      >
        <Typography>{currentGroup.name}</Typography>
        <ArrowDropDownIcon/>
      </Button>
      <Popover
        classes={{
          paper: classes.popoverPaper,
        }}
        id={panelId}
        open={panelOpen}
        anchorEl={anchorRef.current}
        onClose={closePanel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <GroupItemAll
          group={groupAll}
          editing={editMode}
          selected={currentGroup.id === groupAll.id}
          onSelect={() => handleSelect(groupAll)}
        />
        <GroupItemRecycleBin
          group={recycleBin}
          editing={editMode}
          selected={currentGroup.id === recycleBin.id}
          onSelect={() => handleSelect(recycleBin)}
        />
        {normalGroups.map((g) => (
          <GroupItem
            key={g.id}
            group={g}
            selected={g.id === currentGroup.id}
            editing={editMode}
            checked={checkedGroupIds.includes(g.id)}
            onSelect={() => handleSelect(g)}
            onCheck={() => handleCheck(g)}
            onUncheck={() => handleUncheck(g)}
            onEdit={() => console.log('edit button click')}
          />
        ))}
        <Box display="flex" padding={1}>
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
          <Box flexGrow={1} />
          {editMode
            ? (<Button
                disableElevation
                disabled={checkedGroupIds.length === 0}
                size="small"
                variant="contained"
                onClick={handleDeleteGroups}
              >删除</Button>
            )
            : (<Button
                disableElevation
                size="small"
                variant="contained"
                onClick={openAddDialog}
              >新建组</Button>
            )
          }
        </Box>
      </Popover>
      <AddGroupDialog open={addDialogOpen} onClose={closeAddDialog} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const displayGroups = [state.main.groupAll, state.main.groupRecycleBin, ...state.main.normalGroups];
  return {
    groups: displayGroups,
    currentGroup: displayGroups.find((g) => g.id === state.main.currentGroupId),
  }
};

const mapDispatchToProps = { changeGroup, changePage, getImageList, deleteGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelect);
