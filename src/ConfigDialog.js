import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ButtonBase from '@material-ui/core/ButtonBase';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import { toggleDarkMode } from './configSlice';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

function ConfigDialog({
  darkMode,
  toggleDarkMode,
  open,
  onClose,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={dialogFullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="config"
    >
      <DialogTitleWithCloseIcon id="config" onClose={onClose}>
        设置
      </DialogTitleWithCloseIcon>
      <DialogContent className={classes.content} dividers>
        <Box display="flex" alignItems="center" py={1}>
          <Typography variant="body1">
            暗色模式
          </Typography>
          <Box flexGrow={1} />
          <Switch
            checked={darkMode}
            onChange={() => toggleDarkMode()}
            color="primary"
            name="darkMode"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
        </Box>
        <Divider />
        <Box my={2} />
        <Box display="flex" alignItems="center" py={1}>
          <Typography variant="body1">
            图片排序
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" py={1}>
          <Typography variant="body1">
            正序
          </Typography>
          <Box flexGrow={1} />
          <Radio
            checked={false}
            onChange={(event) => console.log('change asc order: ', event.target.value)}
            value="asc"
            name="asc-order"
            inputProps={{ 'aria-label': 'asc order' }}
          />
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" py={1}>
          <Typography variant="body1">
            倒序
          </Typography>
          <Box flexGrow={1} />
          <Radio
            checked={true}
            onChange={(event) => console.log('change asc order: ', event.target.value)}
            value="desc"
            name="desc-order"
            inputProps={{ 'aria-label': 'desc order' }}
          />
        </Box>
        <Divider />
        <Box my={2} />
        <ButtonBase onClick={() => console.log('click about.')}>
          <Box display="flex" alignItems="center" width="100%" py={2}>
            <Typography variant="body1">
              关于
            </Typography>
            <Box flexGrow={1} />
            <KeyboardArrowRightIcon />
          </Box>
        </ButtonBase>
        <Divider />
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} py={1}>
          <Button fullWidth variant="contained" color="secondary" onClick={() => console.log('logout')}>
            退出登录
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.config.darkMode,
});

const mapDispatchToProps = { toggleDarkMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDialog);
