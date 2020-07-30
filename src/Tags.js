import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import OperateTagDialog from './OperateTagDialog';
import EditTagDialog from './EditTagDialog';
import DeleteTagDialog from './DeleteTagDialog';
import { useHeapedDialog } from './hooks';
import { delay } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

/**
 * props:
 *   tags: [array[obj]] { "id": <int>, "text": <text> }
 */
export default function Tags({
  imageId,
  tags,
}) {
  const classes = useStyles();

  const {
    open: operateDialogOpen,
    handleOpen: openOperateDialog,
    handleClose: closeOperateDialog,
  } = useHeapedDialog(`operate-tag-${imageId}`);

  // chosen tag
  const [chosenTag, setChosenTag] = useState({});
  const handleChooseTag = (tag) => {
    setChosenTag(tag);
    openOperateDialog();
  }
  const handleCloseOperateDialog = () => {
    closeOperateDialog();
    setChosenTag({});
  }

  const {
    open: editDialogOpen,
    handleOpen: openEditDialog,
    handleClose: closeEditDialog,
  } = useHeapedDialog(`edit-tag-${imageId}`);

  const handleOpenEditDialog = async () => {
    closeOperateDialog();
    // fix: windows.history.back is not sync.
    // it queue a task.
    // we should await a 0, to assure openEditDialog after closeOperateDialog.
    // ref: https://stackoverflow.com/a/25543725/7499223
    await delay(0);
    openEditDialog();
  }
  const handleCloseEditDialog = () => {
    closeEditDialog();
    setChosenTag({});
  }

  const {
    open: deleteDialogOpen,
    handleOpen: openDeleteDialog,
    handleClose: closeDeleteDialog,
  } = useHeapedDialog(`delete-tag-${imageId}`);

  const handleOpenDeleteDialog = async () => {
    closeOperateDialog();
    await delay(0);
    openDeleteDialog();
  }
  const handleCloseDeleteDialog = () => {
    closeDeleteDialog();
    setChosenTag({});
  }

  return (
    <div className={classes.root}>
      {tags.map((t, i) => {
        return (
          <Chip
            key={t.id}
            label={t.text}
            color={(t.id === chosenTag.id) && (operateDialogOpen || editDialogOpen || deleteDialogOpen) ? 'primary': 'default'}
            onClick={() => handleChooseTag(t)}
          />
        )})}
      <OperateTagDialog
        open={operateDialogOpen}
        onClose={handleCloseOperateDialog}
        openEditDialog={handleOpenEditDialog}
        openDeleteDialog={handleOpenDeleteDialog}
      />
      {/* total controlled component: re-create when chosenTag change */}
      <EditTagDialog
        key={chosenTag.id}
        open={editDialogOpen}
        tag={chosenTag}
        onClose={handleCloseEditDialog}
      />
      <DeleteTagDialog
        open={deleteDialogOpen}
        tag={chosenTag}
        onClose={handleCloseDeleteDialog}
      />
    </div>
  );
}
