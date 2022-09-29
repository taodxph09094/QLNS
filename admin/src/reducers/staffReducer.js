import {
  ADMIN_STAFF_FAIL,
  ADMIN_STAFF_REQUEST,
  ADMIN_STAFF_SUCCESS,
  ALL_STAFF_FAIL,
  ALL_STAFF_REQUEST,
  ALL_STAFF_SUCCESS,
  CLEAR_ERRORS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_RESET,
  DELETE_STAFF_SUCCESS,
  NEW_STAFF_FAIL,
  NEW_STAFF_REQUEST,
  NEW_STAFF_RESET,
  NEW_STAFF_SUCCESS,
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_RESET,
  UPDATE_STAFF_SUCCESS,
} from "../constants/staffConstants";

export const staffsReducer = (state = { staffs: [] }, action) => {
  switch (action.type) {
    case ALL_STAFF_REQUEST:
    case ADMIN_STAFF_REQUEST:
      return {
        loading: true,
        staffs: [],
      };
    case ALL_STAFF_SUCCESS:
      return {
        loading: false,
        staffs: action.payload.staffs,
        staffsCount: action.payload.staffsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredStaffsCount: action.payload.filteredStaffsCount,
      };

    case ADMIN_STAFF_SUCCESS:
      return {
        loading: false,
        staffs: action.payload,
      };
    case ALL_STAFF_FAIL:
    case ADMIN_STAFF_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newStaffReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case NEW_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_STAFF_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        staff: action.payload.staff,
      };
    case NEW_STAFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_STAFF_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const staffReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STAFF_REQUEST:
    case UPDATE_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_STAFF_FAIL:
    case UPDATE_STAFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STAFF_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_STAFF_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const staffDetailsReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case STAFF_DETAILS_SUCCESS:
      return {
        loading: false,
        staff: action.payload,
      };
    case STAFF_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
