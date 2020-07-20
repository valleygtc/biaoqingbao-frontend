import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';

const useStyles = makeStyles((theme) => ({
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

export default function OperateTagDialog({
  open,
  onClose,
  openEditDialog,
  openDeleteDialog,
}) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      classes={{
        paperFullWidth: classes.paperFullWidth,
        scrollPaper: classes.scrollPaper,
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="choose-tag-operation"
    >
      <DialogTitleWithCloseIcon id="choose-tag-operation" onClose={onClose}>
        请选择操作
      </DialogTitleWithCloseIcon>
      <DialogContent dividers className={classes.operateDialog}>
        <Button fullWidth variant="contained" color="primary" onClick={openEditDialog}>
          编辑标签
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={openDeleteDialog}>
          删除标签
        </Button>
      </DialogContent>
    </Dialog>
  );
}
