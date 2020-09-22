import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import requests from './requests';
import { getFilenameWithoutExt } from './utils';

export const importImages = createAsyncThunk(
  'main/importImages',
  /**
   * images [Object]: { "<key>": [File], ...... }
   * group_id: [Number]
   */
  async ({ images, group_id, useFilename }, { dispatch, getState }) => {
    for (const [key, image] of Object.entries(images)) {
      const type = image.type.split('/')[1];
      const formData = new FormData();
      formData.set('image', image);
      const metadata = {
        type,
        group_id,
      };
      if (useFilename) {
        const filename = getFilenameWithoutExt(image.name);
        metadata.tags = [filename];
      }
      formData.set('metadata', JSON.stringify(metadata));
      try {
        await requests.post('/api/images/add', formData, { timeout: 10000 }); // timeout 10s
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
    loading: false,
    imageStatusObj: {}, // { key: "wait" | "ok" | "error" }
  },
  reducers: {
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
    reset: (state, action) => {
      state.loading = false;
      state.imageStatusObj = {};
    },
  },
  extraReducers: {
    [importImages.pending]: (state, action) => {
      state.loading = true;
      if (isEmpty(state.imageStatusObj)) {
        const images = action.meta.arg.images;
        for (const key of Object.keys(images)) {
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
  importOk,
  importError,
  stop,
  reset,
} = importSlice.actions;

export default importSlice.reducer;
