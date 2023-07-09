// src/actions/dataActions.js

import axios from "axios";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  updateData,
} from "../reducers/dataReducer";

export const fetchData = (endpoint) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const response = await axios.get(endpoint);
      const data = response.data;

      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const deleteData = (endpoint) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const response = await axios.put(endpoint);
      const data = response.data;
      console.log(data);
      dispatch(updateData(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
      console.log(error);
    }
  };
};
