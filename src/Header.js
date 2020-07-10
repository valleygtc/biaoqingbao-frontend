import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2),
    [theme.breakpoints.up('lg')]: {
      width: '50vw',
      height: '80vh',
    },
  },
  modalCloseIcon: {
    alignSelf: 'flex-end',
  },
}));

export default function Header({}) {
  const classes = useStyles();
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton aria-label="add image" color="inherit" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Toolbar>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Grid
          container
          className={classes.modalContent}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className={classes.modalCloseIcon}>
            <IconButton aria-label="close modal" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Modal>
    </AppBar>
  );
}
