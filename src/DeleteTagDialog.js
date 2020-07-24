import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { deleteTag } from './mainSlice';

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
}));

function DeleteTagDialog({
  open,
  tag,
  onClose,
  deleteTag,
}) {
  const classes = useStyles();

  const handleSubmit = async () => {
    const resultAction = await deleteTag(tag.id);
    if (!resultAction.error) {
      onClose();
    }
  }

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
      aria-labelledby="delete-tag-confirm-dialog"
    >
      <DialogTitleWithCloseIcon id="delete-tag-confirm-dialog" onClose={onClose}>
        确认要删除该标签？
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
          删除
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = { deleteTag };

export default connect(
  null,
  mapDispatchToProps
)(DeleteTagDialog);
