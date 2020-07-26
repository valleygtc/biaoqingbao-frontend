import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import mainReducer from './mainSlice';
import importReducer from './importSlice';

export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  import: importReducer,
})

export default configureStore({
  reducer: createRootReducer(history),
  middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
});
