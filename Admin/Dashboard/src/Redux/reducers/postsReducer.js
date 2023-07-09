// src/reducers/dataReducer.js

import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateData: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  updateData,
} = postsSlice.actions;

export default postsSlice.reducer;
