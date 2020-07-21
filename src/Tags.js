import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import OperateTagDialog from './OperateTagDialog';
import EditTagDialog from './EditTagDialog';
import DeleteTagDialog from './DeleteTagDialog';

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
  tags,
}) {
  const classes = useStyles();

  const [operateDialogOpen, setOperateDialogOpen] = useState(false);
  // chosen tag
  const [chosenTag, setChosenTag] = useState({});
  const handleChooseTag = (tag) => {
    setChosenTag(tag);
    setOperateDialogOpen(true);
  }
  const handleCloseOperateDialog = () => {
    setOperateDialogOpen(false);
    setChosenTag({});
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
    setOperateDialogOpen(false);
  }
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setChosenTag({});
  }

  const [deleteDialogOpen, setDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => {
    setDeleteDialog(true);
    setOperateDialogOpen(false);
  }
  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
    setChosenTag({});
  }

  return (
    <div className={classes.root}>
      {tags.map((t, i) => {
        return (
          <Chip
            key={t.id}
            label={t.text}
            color={t.id === chosenTag.id ? 'primary': 'default'}
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
