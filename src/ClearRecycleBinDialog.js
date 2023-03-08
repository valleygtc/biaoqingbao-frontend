import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import { clearRecycleBin, changePage, getImageList, getGroups } from './mainSlice';

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

function ClearRecycleBinDialog({
  open,
  page,
  onClose,
  clearRecycleBin,
  changePage,
  getImageList,
  getGroups,
}){
  const classes = useStyles();

  const handleClear = async () => {
    const resultAction = await clearRecycleBin();
    if (!resultAction.error) {
      onClose();
      if (page !== 1) {
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
        确认清空回收站？
      </DialogTitleWithCloseIcon>
      <DialogContent dividers>
        <Button fullWidth variant="contained" color="primary" onClick={handleClear}>
          确认
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  page: state.main.page,
});

const mapDispatchToProps = { clearRecycleBin, changePage, getImageList, getGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClearRecycleBinDialog);
