import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import requests from './requests';
import { showSuccess, showWarning, showError } from './msgSlice';
import { getGroupAll, getNormalGroups, getRecycleBin } from './group';
import { GROUP_ALL, GROUP_RECYCLE_BIN, ORDER } from './constants';
// import { imageList, groups } from 'mock';

export const getImageList = createAsyncThunk(
  'main/getImageList',
  async (_, { getState, dispatch }) => {
    // console.log('mock getImageList: %o', { page, currentGroupId });
    // return {
    //   pages: 10,
    //   imageList: imageList,
    // };

    const { page, currentGroupId, searchTag } = getState().main;
    const { order } = getState().config;
    const params = {
      page,
    }
    if (currentGroupId) {
      params['groupId'] = currentGroupId;
    }
    if (searchTag) {
      params['tag'] = searchTag;
    }
    if (order === ORDER.asc) {
      params['asc_order'] = 1;
    }

    try {
      const resp = await requests.get('/api/images/', { params });
      return resp.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
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
      const resp = await requests.post('/api/images/add', formData, { timeout: 10000 }); // timeout 10s
      return resp.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
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
      resp = await requests.post('/api/images/delete', { id });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('成功删除图片'));
    return resp.data;
  }
)

export const permanentDeleteImage = createAsyncThunk(
  'main/permanentDeleteImage',
  async (id, { dispatch }) => {
    let resp
    try {
      resp = await requests.post('/api/images/permanentDelete', { id });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('成功删除图片'));
    return resp.data;
  }
)

export const restoreImage = createAsyncThunk(
  'main/restoreImage',
  async (id, { dispatch }) => {
    let resp
    try {
      resp = await requests.post('/api/images/restore', { id });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('成功恢复图片'));
    return resp.data;
  }
)

export const clearRecycleBin = createAsyncThunk(
  'main/clearRecycleBin',
  async (_, { dispatch }) => {
    let resp
    try {
      resp = await requests.post('/api/clearRecycleBin');
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    dispatch(showSuccess('成功清空回收站'));
    return resp.data;
  }
)

export const updateImage = createAsyncThunk(
  'main/updateImage',
  async ({ id, group }, { dispatch }) => {
    try {
      await requests.post('/api/images/update', {
        id,
        group_id: group.id,
      });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
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
      const resp = await requests.post('/api/tags/add', {
        text,
        image_id: imageId,
      });
      return {
        text,
        imageId,
        id: resp.data.id,
      };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
  }
)

export const updateTag = createAsyncThunk(
  'main/updateTag',
  async ({ id, text }, { dispatch }) => {
    try {
      await requests.post('/api/tags/update', {
        id,
        text,
      });
      return {
        id,
        text,
      };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
  }
)

export const deleteTag = createAsyncThunk(
  'main/deleteTag',
  async (id, { dispatch }) => {
    try {
      await requests.post('/api/tags/delete', { id });
      return { id };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
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
      const resp = await requests.get('/api/groups/');
      return resp.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        dispatch(showError('获取组列表失败，请刷新页面重试'));
      }
      throw error;
    }
  }
)

export const addGroup = createAsyncThunk(
  'main/addGroup',
  async (name, { dispatch }) => {
    try {
      const resp = await requests.post('/api/groups/add', { name });
      return {
        name,
        id: resp.data.id
      };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
  }
)

export const deleteGroups = createAsyncThunk(
  'main/deleteGroups',
  async (ids, { getState, dispatch }) => {
    try {
      await requests.post('/api/groups/delete', { ids });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    const { currentGroupId } = getState().main;
    if (ids.includes(currentGroupId)) {
      dispatch(changeGroup(GROUP_ALL));
      dispatch(getImageList());
      dispatch(getGroups());
    }
    return { ids };
  }
)

export const updateGroup = createAsyncThunk(
  'main/updateGroup',
  async ({ id, name }, { dispatch }) => {
    try {
      await requests.post('/api/groups/update', { id, name });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        dispatch(showError('网络请求超时'));
      } else if (error.response && error.response.status === 401) {
        dispatch(push('/login'));
        dispatch(showWarning('请先登录'));
      } else {
        const errMsg = error.response?.data?.error || '发生未知错误，请重试';
        dispatch(showError(errMsg));
      }
      throw error;
    }
    return {
      id,
      name,
    };
  }
)

export const shareImage = createAsyncThunk(
  'main/shareImage',
  async (imageData, { dispatch }) => {
    let image;
    if (window.caches) {
      const cache = await caches.open('images');
      const resp = await cache.match(`/api/images/${imageData.id}`, { ignoreSearch: true, ignoreVary: true });
      if (resp) {
        image = await resp.blob();
        console.debug('cache found: ', image);
      }
    }

    if (!image) {
      console.debug('no cache found, retrive through network');
      try {
        const resp = await requests.get(`/api/images/${imageData.id}`, { responseType: 'blob' });
        image = resp.data;
        console.debug('get image: ', image);
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          dispatch(showError('网络请求超时'));
        } else {
          const errMsg = error.response?.data?.error || '发生未知错误，请重试';
          dispatch(showError(errMsg));
        }
        throw error;
      }
    }
    console.assert(image);

    if (!navigator.canShare) {
      dispatch(showWarning('您的浏览器不支持分享功能'));
      return;
    }

    const imageName = imageData.tags[0]?.text || `image-${imageData.id}`;
    const imageType = image.type.split('/')[1] || '';
    const fileName = imageName + '.' + imageType;
    const file = new File([image], fileName, { type: image.type });
    const images = [file];
    if (navigator.canShare({ files: images })) {
      try {
        await navigator.share({
          files: images,
          title: fileName,
          text: fileName,
        });
      } catch (error) {
        console.debug('Sharing failed: ', error);
        throw error;
      }
      console.debug('Share was successful: ', images);
    } else {
      dispatch(showWarning('文件分享受限'));
      throw Error('文件分享受限');
    }
  }
)

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    pages: 1,
    page: 1,
    imageList: [],
    groupAll: GROUP_ALL,
    groupRecycleBin: GROUP_RECYCLE_BIN,
    normalGroups: [],
    currentGroupId: GROUP_ALL.id,
    searchTag: '',
    loading: {
      addImage: false,
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
  },
  extraReducers: {
    [getImageList.fulfilled]: (state, action) => {
      const data = action.payload;
      state.pages = data.pagination.pages;
      state.imageList = data.data;
    },
    [addImage.pending]: (state, action) => {
      state.loading.addImage = true;
    },
    [addImage.fulfilled]: (state, action) => {
      state.loading.addImage = false;
    },
    [addImage.rejected]: (state, action) => {
      state.loading.addImage = false;
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
      state.groupAll = getGroupAll(data.data);
      state.groupRecycleBin = getRecycleBin(data.data);
      state.normalGroups = getNormalGroups(data.data);
    },
    [addGroup.fulfilled]: (state, action) => {
      state.normalGroups.push(action.payload);
    },
    [updateGroup.fulfilled]: (state, action) => {
      const group = state.normalGroups.find((g) => g.id === action.payload.id);
      group.name = action.payload.name;
    },
  }
});

export const {
  changePage,
  changeGroup,
  changeSearchTag,
} = mainSlice.actions;

export default mainSlice.reducer;
