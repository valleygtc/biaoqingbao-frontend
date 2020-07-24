import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { deleteImage, changePage, getImageList } from './mainSlice';

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
  imageList,
  page,
  onClose,
  closeDetailDialog,
  deleteImage,
  changePage,
  getImageList,
}){
  const classes = useStyles();

  const handleDelete = async () => {
    const resultAction = await deleteImage(imageId);
    if (!resultAction.error) {
      onClose();
      closeDetailDialog();
      if (imageList.length === 1 && page !== 1) {
        changePage(page - 1);
      }
      getImageList();
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
      aria-labelledby="delete-image-confirm-dialog"
    >
      <DialogTitleWithCloseIcon id="delete-image-confirm-dialog" onClose={onClose}>
        确认要删除该图片？
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <Button fullWidth variant="contained" color="primary" onClick={handleDelete}>
          删除
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  imageList: state.main.imageList,
  page: state.main.page,
});

const mapDispatchToProps = { deleteImage, changePage, getImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteImageDialog);
