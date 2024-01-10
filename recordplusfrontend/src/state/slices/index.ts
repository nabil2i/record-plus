import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import counterReducer from "./counterSlice";

export default combineReducers({
  counter: counterReducer,
  auth: authReducer
});
