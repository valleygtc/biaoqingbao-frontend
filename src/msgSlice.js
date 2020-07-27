import { createSlice } from '@reduxjs/toolkit';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    open: false,
    severity: '',
    content: '',
  },
  reducers: {
    showSuccess: (state, action) => {
      state.open = true;
      state.severity = 'success';
      state.content = action.payload;
    },
    showInfo: (state, action) => {
      state.open = true;
      state.severity = 'info';
      state.content = action.payload;
    },
    showWarning: (state, action) => {
      state.open = true;
      state.severity = 'warning';
      state.content = action.payload;
    },
    showError: (state, action) => {
      state.open = true;
      state.severity = 'error';
      state.content = action.payload;
    },
    close: (state, action) => {
      state.open = false;
    }
  },
});

export const {
  showSuccess,
  showInfo,
  showWarning,
  showError,
  close,
} = msgSlice.actions;

export default msgSlice.reducer;
