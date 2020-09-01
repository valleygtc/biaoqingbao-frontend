import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  set as idbSet,
  get as idbGet,
} from 'idb-keyval';

import { ORDER } from './constants';

export const loadConfig = createAsyncThunk(
  'main/loadConfig',
  async ({ prefersDarkMode }) => {
    const config = {};
    let darkMode;
    try {
      darkMode = await idbGet('darkMode');
    } catch (error) {
      console.error('loadConfig "darkMode" error: ', error);
    }
    config.darkMode = darkMode !== undefined ? darkMode : prefersDarkMode;

    let compactMode;
    try {
      compactMode = await idbGet('compactMode');
    } catch (error) {
      console.error('loadConfig "compactMode" error: ', error);
    }
    if (compactMode !== undefined) {
      config.compactMode = compactMode;
    }

    let order;
    try {
      order = await idbGet('order');
    } catch (error) {
      console.error('loadConfig "order" error: ', error);
    }
    if (order !== undefined) {
      config.order = order;
    }

    return config;
  }
)

const configSlice = createSlice({
  name: 'config',
  initialState: {
    darkMode: false,
    compactMode: false,
    order: ORDER.desc,
  },
  reducers: {
    changeDarkMode: (state, action) => {
      state.darkMode = action.payload;
      idbSet('darkMode', action.payload)
        .then(() => console.log('Store "darkMode" success.'))
        .catch((err) => console.error('Store "darkMode" faile!', err));
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
      idbSet('darkMode', state.darkMode)
        .then(() => console.log('Store "darkMode" success.'))
        .catch((err) => console.error('Store "darkMode" faile!', err));
    },
    toggleCompactMode: (state, action) => {
      state.compactMode = !state.compactMode;
      idbSet('compactMode', state.compactMode)
        .then(() => console.log('Store "compactMode" success.'))
        .catch((err) => console.error('Store "compactMode" faile!', err));
    },
    changeOrder: (state, action) => {
      state.order = action.payload;
      idbSet('order', action.payload)
        .then(() => console.log('Store "order" success.'))
        .catch((err) => console.error('Store "order" faile!', err));
    },
  },
  extraReducers: {
    [loadConfig.fulfilled]: (state, action) => {
      const { darkMode, compactMode, order } = action.payload;
      if (darkMode !== undefined) {
        state.darkMode = darkMode;
      }
      if (compactMode !== undefined) {
        state.compactMode = compactMode;
      }
      if (order !== undefined) {
        state.order = order;
      }
    },
  }
});

export const {
  changeDarkMode,
  toggleDarkMode,
  toggleCompactMode,
  changeOrder,
} = configSlice.actions;

export default configSlice.reducer;
