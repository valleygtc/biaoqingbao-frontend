import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialogActions from '@material-ui/core/DialogActions';

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
 *   onTagEdit [callback]
 *   onTagDelete [callback]
 */
export default function Tags({
  tags,
  onTagEdit,
  onTagDelete,
}) {
  const classes = useStyles();

  const [operateDialogOpen, setOperateDialogOpen] = useState(false);
  // chosen tag
  const [tag, setTag] = useState({
    index: -1,
    content: '',
  });

  const handleChooseTag = (index, content) => {
    setTag({
      index,
      content,
    });
    setOperateDialogOpen(true);
  }

  const handleCloseOperateDialog = () => {
    setOperateDialogOpen(false);
    // reset tag
    setTag({
      index: -1,
      content: '',
    });
  }

  const isChosenTag = (index, content) => {
    return tag.index === index && tag.content === content;
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
    setOperateDialogOpen(false);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    // reset tag
    setTag({
      index: -1,
      content: '',
    });
  }

  return (
    <div className={classes.root}>
      {tags.map((t, i) => {
        return (
          <Chip key={i} label={t} color={isChosenTag(i, t) ? 'primary': 'default'} onClick={() => handleChooseTag(i, t)} />
        )})}
      <Dialog
        fullWidth
        maxWidth="sm"
        classes={{
          paperFullWidth: classes.paperFullWidth,
          scrollPaper: classes.scrollPaper,
        }}
        open={operateDialogOpen}
        onClose={handleCloseOperateDialog}
        aria-labelledby="choose-tag-operation"
      >
        <DialogTitleWithCloseIcon id="choose-tag-operation" onClose={handleCloseOperateDialog}>
          请选择操作
        </DialogTitleWithCloseIcon>
        <DialogContent dividers className={classes.operateDialog}>
          <Button fullWidth variant="contained" color="primary" onClick={handleOpenEditDialog}>
            编辑标签
          </Button>
          <Button fullWidth variant="contained" color="primary" onClick={() => console.log(`handle delete tag ${tag.content}`)}>
            删除标签
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        aria-labelledby="edit-tag"
      >
        <DialogTitleWithCloseIcon id="edit-tag" onClose={handleCloseEditDialog}>
          编辑标签
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <TextField fullWidth required defaultValue={tag.content} id="标签" label="标签" margin="normal" />
          </form>
        </DialogContent>
        <MuiDialogActions>
          <Button variant="contained" color="primary" onClick={() => console.log('handle submit edit tag dialog')}>确认</Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
