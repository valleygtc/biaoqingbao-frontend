import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { imageList } from 'mock';

export const getImageList = createAsyncThunk(
  'main/getImageList',
  async (page) => {
    console.log('mock getImageList: %o', { page });
    return {
      pages: 10,
      page: page,
      imageList: imageList,
    };

    const resp = await axios.get('/api/images/');
    const data = resp.data;
    if (resp.status === 200) {
      return {
        pages: data.pagination.pages,
        page: data.pagination.page,
        imageList: data.data,
      };
    } else {
      // TODO
    }
  }
)

export const addImage = createAsyncThunk(
  'main/addImage',
  async (body) => {
    // TODO:
    console.log('handle add image: %o', { body });
    return {};
  }
)

export const deleteImage = createAsyncThunk(
  'main/deleteImage',
  async (id) => {
    // TODO:
    console.log('handle delete image: %o', { id });
    return {};
  }
)

export const addTag = createAsyncThunk(
  'main/addTag',
  async (imageId, tag) => {
    // TODO:
    console.log('handle add tag: %o', { imageId, tag });
    return {};
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    pages: 0,
    page: 0,
    imageList: [],
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [getImageList.fulfilled]: (state, action) => {
      state.pages = action.payload.pages;
      state.page = action.payload.page;
      state.imageList = action.payload.imageList;
    },
    [addImage.fulfilled]: (state, action) => {
      // TODO
    },
    [deleteImage.fulfilled]: (state, action) => {
      // TODO
    },
    [addTag.fulfilled]: (state, action) => {
      // TODO
    },
  }
});

export const {
  changePage,
} = mainSlice.actions;

export default mainSlice.reducer;
