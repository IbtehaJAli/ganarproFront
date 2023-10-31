import {
  MANAGE_USER_BILLING_FAIL,
  MANAGE_USER_BILLING_REQUEST,
  MANAGE_USER_BILLING_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_SET_FREE_MODE_FAIL,
  USER_SET_FREE_MODE_REQUEST,
  USER_SET_FREE_MODE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../../constants/userConstants";
import {
  DOMAIN_VERIFICATION_FAIL,
  DOMAIN_VERIFICATION_REQUEST,
  DOMAIN_VERIFICATION_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_START,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
} from "../../actionTypes";
import {
  PLAN_ROOM_REQUEST,
  PLAN_ROOM_UPDATE_FAIL,
  PLAN_ROOM_UPDATE_SUCCESS,
} from "../../constants/gcQualifyConstants";

export const userDetailsReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {}, loading: false };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const passwordResetReducer = (state = { showError: false }, action) => {
  switch (action.type) {
    case PASSWORD_RESET_START:
      return { loading: true, success: null, showError: false };
    case PASSWORD_RESET_SUCCESS:
      return {
        loading: false,
        success: true,
        showError: false,
      };
    case PASSWORD_RESET_FAIL:
      return {
        loading: false,
        success: null,
        error: action.payload,
        showError: true,
      };

    default:
      return state;
  }
};
export const passwordResetConfirmReducer = (
  state = { showError: false },
  action
) => {
  switch (action.type) {
    case PASSWORD_RESET_CONFIRM_START:
      return { loading: true, success: null, showError: false };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        loading: false,
        success: true,
        showError: false,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        loading: false,
        success: null,
        error: action.payload,
        showError: true,
      };

    default:
      return state;
  }
};

export const userSetFreeModeCount = (
  state = { free_mode_count: 0 },
  action
) => {
  switch (action.type) {
    case USER_SET_FREE_MODE_REQUEST:
      return { loading: true, ...state };
    case USER_SET_FREE_MODE_SUCCESS:
      return { loading: false, free_mode_count: action.payload };
    case USER_SET_FREE_MODE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const manageUserBillingReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGE_USER_BILLING_REQUEST:
      return { loading: true, disabled: true };
    case MANAGE_USER_BILLING_SUCCESS:
      return { loading: false, disabled: false };
    case MANAGE_USER_BILLING_FAIL:
      return { loading: false, disabled: false };
    default:
      return state;
  }
};

export const sendDomainVerification = (state = {}, action) => {
  switch (action.type) {
    case DOMAIN_VERIFICATION_REQUEST:
      return { loading: true };
    case DOMAIN_VERIFICATION_SUCCESS:
      return {
        loading: false,
      };
    case DOMAIN_VERIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
