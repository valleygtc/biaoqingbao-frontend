import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { push } from 'connected-react-router';
import { showSuccess, showWarning, showError } from './msgSlice';
import { delay } from './utils';

export const sendPasscode = createAsyncThunk(
  'main/sendPasscode',
  async ({ email }, { dispatch }) => {
    let resp;
    try {
      resp = await axios.post('/api/send-passcode', { email });
    } catch (error) {
      dispatch(showError('发送验证码失败：发生未知错误，请重试'));
      throw error;
    }
    dispatch(showSuccess('验证码已发送至电子邮箱'));
    return resp.data;
  }
)

export const setDisableTimeClock = createAsyncThunk(
  'main/setDisableTimeClock',
  async ({ seconds }, { dispatch }) => {
    dispatch(changeDisableTime(seconds));
    for (; seconds !== 0; seconds--) {
      await delay(1000);
      dispatch(changeDisableTime(seconds));
    }
    dispatch(changeDisableTime(0));
  }
)

export const resetPassword = createAsyncThunk(
  'main/resetPassword',
  async ({ email, passcode, password }, { dispatch }) => {
    let resp;
    try {
      resp = await axios.post('/api/reset-password', { email, passcode, password });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch(showWarning('验证码错误'));
      } else {
        dispatch(showError('提交失败：发生未知错误，请重试'));
      }
      throw error;
    }
    dispatch(showSuccess('重置成功'));
    dispatch(push('/login'));
    return resp.data;
  }
)

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    disableTime: 0, // 秒
  },
  reducers: {
    changeDisableTime: (state, action) => {
      state.disableTime = action.payload;
    },
  },
});

export const {
  changeDisableTime,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
