import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import mainReducer from './mainSlice';
import importReducer from './importSlice';
import msgReducer from './msgSlice';
import userReducer from './userSlice';
import configReducer from './configSlice';

export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  import: importReducer,
  msg: msgReducer,
  user: userReducer,
  config: configReducer,
})

export default configureStore({
  reducer: createRootReducer(history),
  middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});
