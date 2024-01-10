import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'
import rootReducer from "./slices";

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
  // reducer: {
  //   counter: counterReducer
  // }
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
