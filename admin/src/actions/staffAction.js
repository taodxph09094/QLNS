import axios from "axios";

import {
  ALL_STAFF_FAIL,
  ALL_STAFF_REQUEST,
  ALL_STAFF_SUCCESS,
  ADMIN_STAFF_REQUEST,
  ADMIN_STAFF_SUCCESS,
  ADMIN_STAFF_FAIL,
  NEW_STAFF_REQUEST,
  NEW_STAFF_SUCCESS,
  NEW_STAFF_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/staffConstants";

// Get All Staffs
export const getStaff =
  (keyword = "", currentPage = 1, staffCode = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_STAFF_REQUEST });

      let link = `/api/v1/staffs?keyword=${keyword}&page=${currentPage}&staffCode=${staffCode}`;

      // if (staffCode) {
      //   link = `/api/v1/staffs?&staffCode=${staffCode}&page=${currentPage}`;
      // }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_STAFF_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_STAFF_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Staffs For Admin
export const getAdminStaff =
  (keyword = "", currentPage = 1, staffCode = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_STAFF_REQUEST });
      let link = `/api/v1/admin/staffs?keyword=${keyword}&page=${currentPage}`;

      if (staffCode) {
        link = `/api/v1/admin/staffs?keyword=${keyword}&staffCode=${staffCode}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ADMIN_STAFF_SUCCESS,
        payload: data.staffs,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_STAFF_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Create Staff
export const createStaff = (staffData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_STAFF_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/staff/new`,
      staffData,
      config
    );

    dispatch({
      type: NEW_STAFF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_STAFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Staff
export const updateStaff = (id, staffData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STAFF_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/staff/${id}`,
      staffData,
      config
    );

    dispatch({
      type: UPDATE_STAFF_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STAFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Staff
export const deleteStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STAFF_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/staff/${id}`);

    dispatch({
      type: DELETE_STAFF_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STAFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Staffs Details
export const getStaffDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/staff/${id}`);

    dispatch({
      type: STAFF_DETAILS_SUCCESS,
      payload: data.staff,
    });
  } catch (error) {
    dispatch({
      type: STAFF_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
