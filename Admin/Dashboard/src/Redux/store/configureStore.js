// src/store/configureStore.js

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/dataReducer";
import postsReducer from "../reducers/postsReducer";
import requestReducer from "../reducers/requestReducer";
import commentReducer from "../reducers/commentReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    data: dataReducer,
    posts: postsReducer,
    request: requestReducer,
    comment: commentReducer,
  },
  middleware: [thunk],
});

export default store;
