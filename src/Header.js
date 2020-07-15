import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import GroupSelect from './GroupSelect';

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
  }
}));

export default function Header({
  darkMode,
  onToggleDarkMode,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
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
          <IconButton aria-label="add image" color="inherit" onClick={handleOpen}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={dialogFullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-image"
      >
        <DialogTitleWithCloseIcon id="add-image" onClose={handleClose}>
          添加图片
        </DialogTitleWithCloseIcon>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <FormControl required fullWidth margin="normal">
              <InputLabel shrink htmlFor="image-picker">图片</InputLabel>
              <Input id="image-picker" type="file" onChange={() => console.log('handle file choose')} />
            </FormControl>
            <TextField id="标签" label="标签" fullWidth margin="normal"/>
            <FormControl margin="normal">
              <Button variant="contained" color="primary" onClick={() => console.log('handle submit')}>提交</Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
