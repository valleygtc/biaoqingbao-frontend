import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';

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
 *   tags: [array[str]]
 */
export default function Tags({
  tags,
}) {
  const classes = useStyles();

  const [operateDialogOpen, setOperateDialogOpen] = useState(false);

  const handleOperateDialogOpen = () => {
    setOperateDialogOpen(true);
  }

  const handleOperateDialogClose = () => {
    setOperateDialogOpen(false);
  }

  return (
    <div className={classes.root}>
      {tags.map((t, i) => {
        return (
          <Chip key={i} label={t} onClick={handleOperateDialogOpen} />
        )})}
      <Dialog
        fullWidth
        maxWidth="sm"
        classes={{
          paperFullWidth: classes.paperFullWidth,
          scrollPaper: classes.scrollPaper,
        }}
        open={operateDialogOpen}
        onClose={handleOperateDialogClose}
        aria-labelledby="delete-tag-confirm-dialog"
      >
        <DialogTitleWithCloseIcon id="delete-tag-confirm-dialog" onClose={handleOperateDialogClose}>
          请选择操作
        </DialogTitleWithCloseIcon>
        <DialogContent dividers className={classes.operateDialog}>
          <Button fullWidth variant="contained" color="primary" onClick={() => console.log('handle edit tag')}>
            编辑标签
          </Button>
          <Button fullWidth variant="contained" color="primary" onClick={() => console.log('handle delete tag')}>
            删除标签
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
