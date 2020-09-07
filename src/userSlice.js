import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { replace, push } from 'connected-react-router';

import requests from './requests';
import { showSuccess, showWarning, showError } from './msgSlice';
import { delay } from './utils';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password }, { dispatch }) => {
    let resp;
    try {
      resp = await requests.post('/api/register', { email, password });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络异常'));
      } else if (error.response && error.response.status === 409) {
        dispatch(showWarning('此邮箱已被使用'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('注册成功，请登录'));
    dispatch(replace('/login'));
    return resp.data;
  }
)

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { dispatch }) => {
    let resp;
    try {
      resp = await requests.post('/api/login', { email, password });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络异常'));
      } else if (error.response && error.response.status === 401) {
        dispatch(showWarning('账号或密码错误'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('登陆成功'));
    dispatch(replace('/'));
    return resp.data;
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    let resp;
    try {
      resp = await requests.get('/api/logout');
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络异常'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('已退出登录'));
    dispatch(replace('/login'));
    return resp.data;
  }
)

export const sendPasscode = createAsyncThunk(
  'user/sendPasscode',
  async ({ email }, { dispatch }) => {
    let resp;
    try {
      resp = await requests.post('/api/send-passcode', { email });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络异常'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('验证码已发送至电子邮箱'));
    return resp.data;
  }
)

export const setDisableTimeClock = createAsyncThunk(
  'user/setDisableTimeClock',
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
  'user/resetPassword',
  async ({ email, passcode, password }, { dispatch }) => {
    let resp;
    try {
      resp = await requests.post('/api/reset-password', { email, passcode, password });
    } catch (error) {
      const errMsg = error.response?.data?.error || '发生未知错误，请重试';
      dispatch(showError(errMsg));
      throw error;
    }
    dispatch(showSuccess('密码重置成功，请登录'));
    dispatch(push('/login'));
    return resp.data;
  }
)

const userSlice = createSlice({
  name: 'user',
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
} = userSlice.actions;

export default userSlice.reducer;
