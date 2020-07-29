import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import Hidden from '@material-ui/core/Hidden';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Move2GroupSelect from './Move2GroupSelect';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import Tags from './Tags';
import DeleteImageDialog from 'DeleteImageDialog';
import AddTagDialog from 'AddTagDialog';
import { useHeapedDialog } from './hooks';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative',
    margin: 0,
    padding: theme.spacing(2),
  },
  groupContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  img: {
    maxWidth: '100vw',
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px',
    }
  }
}));

export default function DetailDialog({
  imageData,
  open,
  onClose,
}){
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    open: addTagDialogOpen,
    handleOpen: openAddTagDialog,
    handleClose: closeAddTagDialog,
  } = useHeapedDialog(`add-tag-${imageData.id}`);

  const {
    open: deleteImageDialogOpen,
    handleOpen: openDeleteImageDialog,
    handleClose: closeDeleteImageDialog,
  } = useHeapedDialog(`delete-image-${imageData.id}`);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="image-detail"
    >
      <MuiDialogTitle id="image-detail" disableTypography className={classes.header}>
        <Typography variant="h6">查看图片</Typography>
        <div className={classes.groupContainer}>
          <Move2GroupSelect imageData={imageData} />
        </div>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent dividers>
        <img className={classes.img} src={imageData.url} alt={`img-${imageData.id}`} />
        <Tags imageId={imageData.id} tags={imageData.tags} />
      </DialogContent>
      <DialogActions>
        <IconButton aria-label="tag" color="inherit" onClick={openAddTagDialog}>
          <CreateIcon fontSize="large" />
          {/* sm and smdown hidden */}
          <Hidden smDown>打标签</Hidden>
        </IconButton>
        <IconButton aria-label="delete" color="inherit" onClick={openDeleteImageDialog}>
          <DeleteIcon fontSize="large" />
          <Hidden smDown>删除</Hidden>
        </IconButton>
        <IconButton aria-label="share" color="inherit" onClick={() => console.log('click share')}>
          <ShareIcon fontSize="large" />
          <Hidden smDown>分享</Hidden>
        </IconButton>
      </DialogActions>
      <AddTagDialog
        imageId={imageData.id}
        open={addTagDialogOpen}
        onClose={closeAddTagDialog}
      />
      <DeleteImageDialog
        imageId={imageData.id}
        open={deleteImageDialogOpen}
        onClose={closeDeleteImageDialog}
        closeDetailDialog={onClose}
      />
    </Dialog>
  );
}
