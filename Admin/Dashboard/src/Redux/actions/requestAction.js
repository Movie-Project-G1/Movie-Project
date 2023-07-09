import axios from "axios";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  updateData,
} from "../reducers/requestReducer";

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

export const approvedData = (endpoint) => {
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
