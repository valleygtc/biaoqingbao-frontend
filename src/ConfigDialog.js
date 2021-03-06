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
import ButtonBase from '@material-ui/core/ButtonBase';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';

import DialogTitleWithCloseIcon from './DialogTitleWithCloseIcon';
import { toggleDarkMode, changeOrder } from './configSlice';
import { logout } from './userSlice';
import { ORDER } from './constants';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

function ConfigDialog({
  darkMode,
  order,
  toggleDarkMode,
  changeOrder,
  logout,
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
        <ButtonBase onClick={() => changeOrder(ORDER.asc)}>
          <Box display="flex" alignItems="center" width="100%" py={1}>
            <Typography variant="body1">
              正序
            </Typography>
            <Box flexGrow={1} />
            <Radio
              checked={order === ORDER.asc}
              value={ORDER.asc}
              name="asc-order"
              inputProps={{ 'aria-label': 'asc order' }}
            />
          </Box>
        </ButtonBase>
        <Divider />
        <ButtonBase onClick={() => changeOrder(ORDER.desc)}>
          <Box display="flex" alignItems="center" width="100%" py={1}>
            <Typography variant="body1">
              倒序
            </Typography>
            <Box flexGrow={1} />
            <Radio
              checked={order === ORDER.desc}
              value={ORDER.desc}
              name="desc-order"
              inputProps={{ 'aria-label': 'desc order' }}
            />
          </Box>
        </ButtonBase>
        <Divider />
        <Box my={2} />
        <Box display="flex" alignItems="center" py={1}>
          <Accordion style={{ width: '100%' }} elevation={0}>
            <AccordionSummary
              style={{ padding: '0' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="about"
              id="about"
            >
              <Typography variant="body1">关于</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: 'flex',
                padding: '0',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body2" style={{ marginBottom: '16px' }}>
                作者邮箱：gutianci@qq.com
              </Typography>
              <Typography variant="body2" style={{ marginBottom: '16px' }}>
                代码仓库：
                <Link
                  href="https://github.com/valleygtc/biaoqingbao"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  color="inherit"
                >
                  https://github.com/valleygtc/biaoqingbao
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} py={1}>
          <Button fullWidth variant="contained" color="secondary" onClick={() => logout()}>
            退出登录
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.config.darkMode,
  order: state.config.order,
});

const mapDispatchToProps = { toggleDarkMode, changeOrder, logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDialog);
