import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';

import GroupSelect from './GroupSelect';
import AddImageDialog from './AddImageDialog';
import ImportDialog from './ImportDialog';
import ExportDialog from './ExportDialog';
import ConfigDialog from './ConfigDialog';
import { toggleCompactMode } from './configSlice';
import { useDialog } from './hooks';

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
  grow: {
    flexGrow: 1,
  },
}));

function Header({
  compactMode,
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
          <GroupSelect groups={['全部', '中老年表情包', 'xxxxxx']} />
        </div>
        <div className={classes.grow}></div>
        <Tooltip title="添加图片">
          <IconButton aria-label="add image" color="inherit" onClick={openAddImageDialog}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
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
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  compactMode: state.config.compactMode,
});

const mapDispatchToProps = { toggleCompactMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
