import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';

import GroupItem from './GroupItem';
import AddGroupDialog from './AddGroupDialog';
import { changeGroup, getImageList, deleteGroups } from './mainSlice';
import { useHeapedDialog } from './hooks';

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

function GroupSelect({
  groups,
  currentGroup,
  changeGroup,
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
        {groups.map((g) => (
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
        </div>
      </Popover>
      <AddGroupDialog open={addDialogOpen} onClose={closeAddDialog} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  groups: state.main.groups,
  currentGroup: state.main.groups.find(
    (g) => g.id === state.main.currentGroupId
  ),
});

const mapDispatchToProps = { changeGroup, getImageList, deleteGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelect);
