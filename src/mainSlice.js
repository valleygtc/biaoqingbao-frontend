import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { push, replace } from 'connected-react-router';
import { showSuccess, showWarning, showError } from './msgSlice';
import { GROUP_ALL } from './constants';
// import { imageList, groups } from 'mock';

export const registerUser = createAsyncThunk(
  'main/registerUser',
  async ({ email, password }, { dispatch }) => {
    let resp;
    try {
      resp = await axios.post('/api/register', { email, password });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        dispatch(showWarning('此邮箱已被使用'));
      } else {
        dispatch(showError('注册失败：发生未知错误，请重试'));
      }
      throw error;
    }
    dispatch(showSuccess('注册成功，请登录'));
    dispatch(replace('/login'));
    return resp.data;
  }
)

export const login = createAsyncThunk(
  'main/login',
  async ({ email, password }, { dispatch }) => {
    let resp;
    try {
      resp = await axios.post('/api/login', { email, password });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(showWarning('账号或密码错误'));
      } else {
        dispatch(showError('登录失败：发生未知错误，请重试'));
      }
      throw error;
    }
    dispatch(showSuccess('登陆成功'));
    dispatch(replace('/'));
    return resp.data;
  }
)

export const getImageList = createAsyncThunk(
  'main/getImageList',
  async (_, { getState, dispatch }) => {
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

    try {
      const resp = await axios.get('/api/images/', { params });
      return resp.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        dispatch(showError('获取图片列表失败，请刷新页面重试'));
      }
      throw error;
    }
  }
)

export const addImage = createAsyncThunk(
  'main/addImage',
  async ({ image, type, group_id, tags }, { dispatch }) => {
    const formData = new FormData();
    formData.set('image', image);
    formData.set('metadata', JSON.stringify({
      type,
      group_id,
      tags,
    }));
    try {
      const resp = await axios.post('/api/images/add', formData);
      return resp.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        dispatch(showError('添加图片失败，请重试'));
      }
      throw error;
    }
  }
)

export const deleteImage = createAsyncThunk(
  'main/deleteImage',
  async (id, { dispatch }) => {
    let resp
    try {
      resp = await axios.post('/api/images/delete', { id });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`删除图片失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
    dispatch(showSuccess('成功删除图片'));
    return resp.data;
  }
)

export const updateImage = createAsyncThunk(
  'main/updateImage',
  async ({ id, group }, { dispatch }) => {
    try {
      await axios.post('/api/images/update', {
        id,
        group_id: group.id,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`更新图片失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
    return {
      id,
      group,
    };
  }
)

export const addTag = createAsyncThunk(
  'main/addTag',
  async ({ imageId, text }, { dispatch }) => {
    try {
      const resp = await axios.post('/api/tags/add', {
        text,
        image_id: imageId,
      });
      return {
        text,
        imageId,
        id: resp.data.id,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`添加标签失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
  }
)

export const updateTag = createAsyncThunk(
  'main/updateTag',
  async ({ id, text }, { dispatch }) => {
    try {
      const resp = await axios.post('/api/tags/update', {
        id,
        text,
      });
      return {
        id,
        text,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`编辑标签失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
  }
)

export const deleteTag = createAsyncThunk(
  'main/deleteTag',
  async (id, { dispatch }) => {
    try {
      await axios.post('/api/tags/delete', { id });
      return { id };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`删除标签失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
  }
)

export const getGroups = createAsyncThunk(
  'main/getGroups',
  async (_, { dispatch }) => {
    // console.log('mock getGroups');
    // return {
    //   groups,
    // };

    try {
      const resp = await axios.get('/api/groups/');
      return resp.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`获取组列表失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
  }
)

export const addGroup = createAsyncThunk(
  'main/addGroup',
  async (name, { dispatch }) => {
    try {
      const resp = await axios.post('/api/groups/add', { name });
      return {
        name,
        id: resp.data.id
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`添加组失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
  }
)

export const deleteGroups = createAsyncThunk(
  'main/deleteGroups',
  async (ids, { getState, dispatch }) => {
    try {
      await axios.post('/api/groups/delete', { ids });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`删除组失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
    const { currentGroupId } = getState().main;
    if (ids.includes(currentGroupId)) {
      dispatch(changeGroup(GROUP_ALL));
      dispatch(getImageList());
    }
    return { ids };
  }
)

export const updateGroup = createAsyncThunk(
  'main/updateGroup',
  async ({ id, name }, { dispatch }) => {
    try {
      await axios.post('/api/groups/update', { id, name });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const data = error.response.data;
        dispatch(showError(`重命名组失败：${data.error || '未知错误'}`));
      }
      throw error;
    }
    return {
      id,
      name,
    };
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
  },
  extraReducers: {
    [getImageList.fulfilled]: (state, action) => {
      const data = action.payload;
      state.pages = data.pagination.pages;
      state.imageList = data.data;
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
      const data = action.payload;
      state.groups = [
        GROUP_ALL,
        ...data.data,
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
} = mainSlice.actions;

export default mainSlice.reducer;
