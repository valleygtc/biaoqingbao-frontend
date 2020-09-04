import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";

import Copyright from './Copyright';
import { sendPasscode, setDisableTimeClock, resetPassword } from './userSlice';
import { emailPattern } from 'utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ResetPassword({
  disableTime,
  sendPasscode,
  setDisableTimeClock,
  resetPassword,
}) {
  const classes = useStyles();

  const [ showPassword, setShowPassword ] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, getValues, errors, trigger } = useForm();

  const handleSendPasscode = async () => {
    // 20 秒内禁止再次点击。
    const email = getValues('email');
    const result = await trigger('email');
    if (result) {
      const resultAction = await sendPasscode({ email });
      if (!resultAction.error) {
        setDisableTimeClock({ seconds: 20 });
      }
    }
  }

  const getEmailErr = () => {
    if (errors.email?.type === 'required') {
      return '请输入电子邮箱';
    } else if (errors.email?.type === 'pattern') {
      return '电子邮箱格式错误';
    } else {
      return '';
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          重置密码
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit(resetPassword)}>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="电子邮箱"
            type="email"
            autoComplete="email"
            autoFocus
            name="email"
            error={Boolean(errors.email)}
            helperText={getEmailErr()}
            inputRef={register({ required: true, pattern: emailPattern })}
          />
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TextField
                required
                variant="outlined"
                margin="normal"
                id="passcode"
                label="验证码"
                name="passcode"
                error={Boolean(errors.passcode)}
                helperText={errors.passcode && '请输入验证码'}
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={Boolean(disableTime)}
                variant="contained"
                color="secondary"
                onClick={handleSendPasscode}
              >获取验证码{disableTime ? `(${disableTime}s)` : null}</Button>
            </Grid>
          </Grid>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            label="新密码"
            type={showPassword ? 'text': 'password'}
            id="password"
            autoComplete="new-password"
            name="password"
            error={Boolean(errors.password)}
            helperText={errors.password && '请输入新密码'}
            inputRef={register({ required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            提交
          </Button>
          <Link href="/register" variant="body2">
            没有账号？点此注册
          </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  disableTime: state.user.disableTime,
});

const mapDispatchToProps = { sendPasscode, setDisableTimeClock, resetPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
