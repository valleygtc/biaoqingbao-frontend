import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import OperateTagDialog from './OperateTagDialog';
import EditTagDialog from './EditTagDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  paperFullWidth: {
    width: '100%',
    margin: 0,
  },
  scrollPaper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
  operateDialog: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  }
}));

/**
 * props:
 *   tags: [array[obj]] { "id": <int>, "text": <text> }
 */
export default function Tags({
  tags,
  editTag,
  deleteTag,
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
      <EditTagDialog
        open={editDialogOpen}
        tag={chosenTag}
        onClose={handleCloseEditDialog}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        classes={{
          paperFullWidth: classes.paperFullWidth,
          scrollPaper: classes.scrollPaper,
        }}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-tag-confirm-dialog"
      >
        <DialogTitleWithCloseIcon id="delete-tag-confirm-dialog" onClose={handleCloseDeleteDialog}>
          确认要删除该标签？
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <Button fullWidth variant="contained" color="primary" onClick={() => console.log('handle delete tag')}>
            删除
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
