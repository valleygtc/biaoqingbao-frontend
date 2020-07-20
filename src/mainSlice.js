import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { imageList, groups } from 'mock';

export const getImageList = createAsyncThunk(
  'main/getImageList',
  async (_, { getState }) => {
    const { page, currentGroup } = getState();

    console.log('mock getImageList: %o', { page, currentGroup });
    return {
      pages: 10,
      imageList: imageList,
    };

    const params = {
      page,
    }
    if (currentGroup.id) {
      params['groupId'] = currentGroup.id;
    }

    const resp = await axios.get('/api/images/', { params });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        pages: data.pagination.pages,
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
  async ({ imageId, tag }) => {
    // TODO:
    console.log('handle add tag: %o', { imageId, tag });
    return {};
  }
)

export const editTag = createAsyncThunk(
  'main/editTag',
  async ({ id, text }) => {
    // TODO:
    console.log('handle edit tag: %o', { id, text });
    return {};
  }
)

export const deleteTag = createAsyncThunk(
  'main/deleteTag',
  async (id) => {
    // TODO:
    console.log('handle delete tag: %o', { id });
    return {};
  }
)

export const getGroups = createAsyncThunk(
  'main/getGroups',
  async () => {
    console.log('mock getGroups');
    return {
      groups,
    };

    const resp = await axios.get('/api/groups/');
    const data = resp.data;
    if (resp.status === 200) {
      return {
        groups: data.data,
      };
    } else {
      // TODO
    }
  }
)

const GROUP_ALL = {
  id: 0,
  name: '全部',
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    pages: 1,
    page: 1,
    imageList: [],
    groups: [GROUP_ALL],
    currentGroupId: GROUP_ALL.id,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeGroup: (state, action) => {
      state.currentGroupId = action.payload.id;
    },
  },
  extraReducers: {
    [getImageList.fulfilled]: (state, action) => {
      state.pages = action.payload.pages;
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
    [editTag.fulfilled]: (state, action) => {
      // TODO
    },
    [deleteTag.fulfilled]: (state, action) => {
      // TODO
    },
    [getGroups.fulfilled]: (state, action) => {
      state.groups = [
        GROUP_ALL,
        ...action.payload.groups,
      ];
    }
  }
});

export const {
  changePage,
  changeGroup,
} = mainSlice.actions;

export default mainSlice.reducer;
