import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { isEmpty } from 'lodash';

export const importImages = createAsyncThunk(
  'main/importImages',
  /**
   * images [Object]: { "<key>": [File], ...... }
   * group_id: [Number]
   */
  async ({ images, group_id }, { dispatch, getState }) => {
    for (const [key, image] of Object.entries(images)) {
      const type = image.type.split('/')[1];
      const formData = new FormData();
      formData.set('image', image);
      formData.set('metadata', JSON.stringify({
        type,
        group_id,
      }));
      try {
        await axios.post('/api/images/add', formData);
        dispatch(importOk(key));
      } catch (error) {
        dispatch(importError(key));
      }
      const loading = getState().import.loading;
      if (!loading) {
        break;
      }
    }
  }
)

const importSlice = createSlice({
  name: 'import',
  initialState: {
    open: false,
    loading: false,
    imageStatusObj: {}, // { key: "wait" | "ok" | "error" }
  },
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
    },
    closeDialog: (state, action) => {
      state.open = false;
      state.loading = false;
      state.imageStatusObj = {};
    },
    importOk: (state, action) => {
      const key = action.payload;
      state.imageStatusObj[key] = 'ok';
    },
    importError: (state, action) => {
      const key = action.payload;
      state.imageStatusObj[key] = 'error';
    },
    stop: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: {
    [importImages.pending]: (state, action) => {
      state.loading = true;
      if (isEmpty(state.imageStatusObj)) {
        const images = action.meta.arg.images;
        for (const [key, image] of Object.entries(images)) {
          state.imageStatusObj[key] = "wait";
        }
      }
    },
    [importImages.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [importImages.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export const {
  openDialog,
  closeDialog,
  importOk,
  importError,
  stop,
} = importSlice.actions;

export default importSlice.reducer;