import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const user = createAction("USER");

const initialState =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const userReducer = createReducer(initialState, {
  [user]: (state, action) => (state = action.payload),
});

export default userReducer;
