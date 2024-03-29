import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import GroupSelect from './GroupSelect';
import IconButton from './IconButton';
import AddImageDialog from './AddImageDialog';
import ImportDialog from './ImportDialog';
import ExportDialog from './ExportDialog';
import ConfigDialog from './ConfigDialog';
import ClearRecycleBinDialog from './ClearRecycleBinDialog';
import { toggleCompactMode } from './configSlice';
import { useDialog } from './hooks';
import { isRecycleBinId } from 'group';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.type === 'light' ? null : '#fff',
    backgroundColor: theme.palette.type === 'light' ? null : '#333',
  },
  groupContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function Header({
  compactMode,
  currentGroupId,
  toggleCompactMode,
}) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const {
    open: addImageDialogOpen,
    handleOpen: openAddImageDialog,
    handleClose: closeAddImageDialog,
  } = useDialog('add-image');

  const {
    open: importDialogOpen,
    handleOpen: openImportDialog,
    handleClose: closeImportDialog,
  } = useDialog('import-dialog');
  const handleImportButtonClick = () => {
    openImportDialog();
    closeMenu();
  }

  const {
    open: exportDialogOpen,
    handleOpen: openExportDialog,
    handleClose: closeExportDialog,
  } = useDialog('export-dialog');
  const handleExportButtonClick = () => {
    openExportDialog();
    closeMenu();
  }

  const {
    open: configDialogOpen,
    handleOpen: openConfigDialog,
    handleClose: closeConfigDialog,
  } = useDialog('config-dialog');
  const handleConfigButtonClick = () => {
    openConfigDialog();
    closeMenu();
  }

  const {
    open: clearDialogOpen,
    handleOpen: openClearDialog,
    handleClose: closeClearDialog,
  } = useDialog('clear-recycle-bin-dialog');

  const handleToggleCompactMode = () => {
    toggleCompactMode();
    closeMenu();
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography noWrap variant="h6">
          表情宝
        </Typography>
        <div className={classes.groupContainer} >
          <GroupSelect />
        </div>
        <Box flexGrow={1} />
        {getActionButton(currentGroupId, openAddImageDialog, openClearDialog)}
        <IconButton aria-label="more-operation" edge="end" color="inherit" onClick={openMenu}>
          <MoreIcon />
        </IconButton>
        <Menu
          id="operation-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={handleImportButtonClick}>导入图片</MenuItem>
          <MenuItem onClick={handleExportButtonClick}>导出图片</MenuItem>
          <MenuItem onClick={handleToggleCompactMode}>
            紧凑模式
            {compactMode
              ? (<CheckIcon fontSize="small" />)
              : null
            }
          </MenuItem>
          <MenuItem onClick={handleConfigButtonClick}>设置</MenuItem>
        </Menu>
      </Toolbar>
      <AddImageDialog open={addImageDialogOpen} onClose={closeAddImageDialog} />
      <ImportDialog open={importDialogOpen} onClose={closeImportDialog} />
      <ExportDialog open={exportDialogOpen} onClose={closeExportDialog} />
      <ConfigDialog open={configDialogOpen} onClose={closeConfigDialog} />
      <ClearRecycleBinDialog
        open={clearDialogOpen}
        onClose={closeClearDialog}
      />
    </AppBar>
  );
}

const getActionButton = (currentGroupId, openAddImageDialog, openClearDialog) => {
  if (isRecycleBinId(currentGroupId)) {
    return (
      <Tooltip title="清空回收站">
        <Button variant="contained" color="secondary" size="small" onClick={openClearDialog}>
          清 空
        </Button>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="添加图片">
        <IconButton aria-label="add image" color="inherit" onClick={openAddImageDialog}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

const mapStateToProps = (state) => ({
  compactMode: state.config.compactMode,
  currentGroupId: state.main.currentGroupId,
});

const mapDispatchToProps = { toggleCompactMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
