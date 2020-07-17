import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { deleteImage } from './mainSlice';

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

function DeleteImageDialog({
  imageId,
  open,
  onClose,
  deleteImage,
}){
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
      aria-labelledby="delete-image-confirm-dialog"
    >
      <DialogTitleWithCloseIcon id="delete-image-confirm-dialog" onClose={onClose}>
        确认要删除该图片？
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <Button fullWidth variant="contained" color="primary" onClick={() => deleteImage(imageId)}>
          删除
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = { deleteImage };

export default connect(
  null,
  mapDispatchToProps
)(DeleteImageDialog);
