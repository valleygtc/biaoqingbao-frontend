import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { GROUP_ALL } from './constants';
// import { imageList, groups } from 'mock';

export const registerUser = createAsyncThunk(
  'main/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await axios.post('/api/register', { email, password });
      return resp.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const data = error.response.data;
        return rejectWithValue({
          severity: 'warning',
          content: data.error,
        });
      } else {
        return rejectWithValue({
          severity: 'error',
          content: '发生未知错误，请重试',
        });
      }
    }
  }
)

export const login = createAsyncThunk(
  'main/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await axios.post('/api/login', { email, password });
      return resp.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const data = error.response.data;
        return rejectWithValue({
          severity: 'warning',
          content: data.error,
        });
      } else {
        return rejectWithValue({
          severity: 'error',
          content: '发生未知错误，请重试',
        });
      }
    }
  }
)

export const getImageList = createAsyncThunk(
  'main/getImageList',
  async (_, { getState }) => {
    // console.log('mock getImageList: %o', { page, currentGroupId });
    // return {
    //   pages: 10,
    //   imageList: imageList,
    // };

    const { page, currentGroupId, searchTag } = getState().main;
    const params = {
      page,
    }
    if (currentGroupId) {
      params['groupId'] = currentGroupId;
    }
    if (searchTag) {
      params['tag'] = searchTag;
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
  async ({ image, type, group_id, tags }) => {
    const formData = new FormData();
    formData.set('image', image);
    formData.set('metadata', JSON.stringify({
      type,
      group_id,
      tags,
    }));
    const resp = await axios.post('/api/images/add', formData);
    const data = resp.data;
    if (resp.status === 200) {
      return {};
    } else {
      // TODO
    }
  }
)

export const deleteImage = createAsyncThunk(
  'main/deleteImage',
  async (id) => {
    const resp = await axios.post('/api/images/delete', { id });
    const data = resp.data;
    if (resp.status === 200) {
      return {};
    } else {
      // TODO
    }
  }
)

export const updateImage = createAsyncThunk(
  'main/updateImage',
  async ({ id, group }) => {
    const resp = await axios.post('/api/images/update', {
      id,
      group_id: group.id,
    });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        id,
        group,
      };
    } else {
      // TODO
    }
  }
)

export const addTag = createAsyncThunk(
  'main/addTag',
  async ({ imageId, text }) => {
    const resp = await axios.post('/api/tags/add', {
      text,
      image_id: imageId,
    });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        text,
        imageId,
        id: data.id,
      };
    } else {
      // TODO
    }
  }
)

export const updateTag = createAsyncThunk(
  'main/updateTag',
  async ({ id, text }) => {
    const resp = await axios.post('/api/tags/update', {
      id,
      text,
    });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        id,
        text,
      };
    } else {
      // TODO
    }
  }
)

export const deleteTag = createAsyncThunk(
  'main/deleteTag',
  async (id) => {
    const resp = await axios.post('/api/tags/delete', { id });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        id,
      };
    } else {
      // TODO
    }
  }
)

export const getGroups = createAsyncThunk(
  'main/getGroups',
  async () => {
    // console.log('mock getGroups');
    // return {
    //   groups,
    // };

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

export const addGroup = createAsyncThunk(
  'main/addGroup',
  async (name) => {
    const resp = await axios.post('/api/groups/add', { name });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        name,
        id: data.id
      };
    } else {
      // TODO
    }
  }
)

export const deleteGroups = createAsyncThunk(
  'main/deleteGroups',
  async (ids, { getState, dispatch }) => {
    const resp = await axios.post('/api/groups/delete', { ids });
    if (resp.status === 200) {
      const { currentGroupId } = getState().main;
      if (ids.includes(currentGroupId)) {
        dispatch(changeGroup(GROUP_ALL));
        dispatch(getImageList());
      }
      return {
        ids,
      };
    } else {
      // TODO
    }
  }
)

export const updateGroup = createAsyncThunk(
  'main/updateGroup',
  async ({ id, name }) => {
    const resp = await axios.post('/api/groups/update', { id, name });
    const data = resp.data;
    if (resp.status === 200) {
      return {
        id,
        name,
      };
    } else {
      // TODO
    }

  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    pages: 1,
    page: 1,
    imageList: [],
    groups: [GROUP_ALL],
    currentGroupId: GROUP_ALL.id,
    searchTag: '',
    message: {
      open: false,
      content: '',
      severity: '',
    }
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeGroup: (state, action) => {
      state.currentGroupId = action.payload.id;
    },
    changeSearchTag: (state, action) => {
      state.searchTag = action.payload;
    },
    changeMessage: (state, action) => {
      state.message = action.payload;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.message.open = true;
      state.message.content = action.payload.msg;
      state.message.severity = 'success';
    },
    [login.rejected]: (state, action) => {
      state.message.open = true;
      state.message.content = action.payload.content;
      state.message.severity = action.payload.severity;
    },
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
    [updateImage.fulfilled]: (state, action) => {
      const image = state.imageList.find((image) => image.id === action.payload.id);
      image.group_id = action.payload.group.id;
    },
    [addTag.fulfilled]: (state, action) => {
      const tag = {
        id: action.payload.id,
        text: action.payload.text,
      }
      state.imageList.find((image) => image.id === action.payload.imageId).tags.push(tag)
    },
    [updateTag.fulfilled]: (state, action) => {
      let tag;
      for (const image of state.imageList) {
        for (const t of image.tags) {
          if (t.id === action.payload.id) {
            tag = t;
            tag.text = action.payload.text;
            break;
          }
        }
        if (tag) {
          break;
        }
      }
    },
    [deleteTag.fulfilled]: (state, action) => {
      for (const image of state.imageList) {
        const i = image.tags.findIndex((t) => t.id === action.payload.id);
        if (i !== -1) {
          image.tags.splice(i, 1);
          break;
        }
      }
    },
    [getGroups.fulfilled]: (state, action) => {
      state.groups = [
        GROUP_ALL,
        ...action.payload.groups,
      ];
    },
    [addGroup.fulfilled]: (state, action) => {
      state.groups.push(action.payload);
    },
    [deleteGroups.fulfilled]: (state, action) => {
      state.groups = state.groups.filter((g) => !action.payload.ids.includes(g.id));
    },
    [updateGroup.fulfilled]: (state, action) => {
      const group = state.groups.find((g) => g.id === action.payload.id);
      group.name = action.payload.name;
    }
  }
});

export const {
  changePage,
  changeGroup,
  changeSearchTag,
  changeMessage,
} = mainSlice.actions;

export default mainSlice.reducer;
