import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { permanentDeleteImage, changePage, getImageList, getGroups } from './mainSlice';

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

function PermanentDeleteImageDialog({
  imageId,
  open,
  imageList,
  page,
  onClose,
  closeDetailDialog,
  permanentDeleteImage,
  changePage,
  getImageList,
  getGroups,
}){
  const classes = useStyles();

  const handleDelete = async () => {
    const resultAction = await permanentDeleteImage(imageId);
    if (!resultAction.error) {
      onClose();
      closeDetailDialog();
      if (imageList.length === 1 && page !== 1) {
        changePage(page - 1);
      }
      getImageList();
      getGroups();
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
        确认执行删除？删除后图片将无法恢复
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

const mapDispatchToProps = { permanentDeleteImage, changePage, getImageList, getGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermanentDeleteImageDialog);
