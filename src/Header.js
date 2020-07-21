import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useHistory } from "react-router-dom";

import GroupSelect from './GroupSelect';
import AddImageDialog from './AddImageDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.type === 'light' ? null : '#fff',
    backgroundColor: theme.palette.type === 'light' ? null : '#333',
  },
  logo: {
    cursor: 'pointer',
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
  drawer: {
    width: 250,
  }
}));

export default function Header({
  darkMode,
  onToggleDarkMode,
}) {
  const classes = useStyles();
  const history = useHistory();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);

  const gotoImport = () => {
    history.push('/import');
    setDrawerOpen(false);
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography noWrap variant="h6" className={classes.logo} onClick={() => history.push('/')}>
          表情宝
        </Typography>
        <div className={classes.groupContainer} >
          <GroupSelect groups={['全部', '中老年表情包', 'xxxxxx']} />
        </div>
        <div className={classes.grow}></div>
        {darkMode
          ? (
            <Tooltip title="切换至亮模式">
              <IconButton aria-label="switch-to-lightmode" color="inherit" onClick={onToggleDarkMode}>
                <Brightness7Icon />
              </IconButton>
            </Tooltip>
          )
          : (
            <Tooltip title="切换至暗模式">
              <IconButton aria-label="switch-to-darkmode" color="inherit" onClick={onToggleDarkMode}>
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
          )
        }
        <Tooltip title="添加图片">
          <IconButton aria-label="add image" color="inherit" onClick={() => setAddImageDialogOpen(true)}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <AddImageDialog open={addImageDialogOpen} onClose={() => setAddImageDialogOpen(false)} />
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List className={classes.drawer} aria-label="drawer">
          <ListItem button onClick={gotoImport}>
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary="导入图片" />
          </ListItem>
          <ListItem button onClick={() => console.log('click download button')}>
            <ListItemIcon>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText primary="导出图片" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
