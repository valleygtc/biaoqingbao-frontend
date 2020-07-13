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

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import DialogContent from './DialogContent';
import GroupSelect from './GroupSelect';

const useStyles = makeStyles((theme) => ({
  groupContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Header({}) {
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          表情宝
        </Typography>
        <div className={classes.groupContainer} >
          <GroupSelect groups={['全部', '中老年表情包', 'xxxxxx']} />
        </div>
        <IconButton aria-label="add image" color="inherit" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
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
