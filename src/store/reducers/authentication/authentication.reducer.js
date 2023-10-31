import { updateObject } from "../../../utils/helpers/helper";
import {
  USER_LOGIN_START,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_START,
  USER_RELOAD_SUCCESS,
  GET_USER_NOTIFICATIONS_SUCCESS,
} from "../../actionTypes/index";

const initialState = {
  error: null,
  token: null,
  loading: false,
  user: null,
  refreshToken: null,
  isAuthenticated: false,
  message: null,
  notifications: [],
};

const loginStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const loginSuccess = (state, action) => {
  const { data, refresh, access } = action.data;
  return updateObject(state, {
    token: access,
    loading: false,
    user: data,
    refreshToken: refresh,
    isAuthenticated: true,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.authError,
    loading: false,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: null,
    refreshToken: null,
    isAuthenticated: false,
    token: null,
  });
};

const userSignupStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const userSignupSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: null,
    refreshToken: null,
    isAuthenticated: false,
    token: null,
    message: "Registration Successful, login to continue",
  });
};

const reloadSessionSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    user: action.data,
  });
};

const userSignupFail = (state, action) => {
  return updateObject(state, {
    error: action.authError,
    loading: false,
  });
};

const userNotificationSuccess = (state, action) => {
  return updateObject(state, {
    notifications: action.notifications,
  });
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return loginStart(state, action);
    case USER_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case USER_LOGIN_FAIL:
      return loginFail(state, action);
    case USER_LOGOUT:
      return logout(state);
    case USER_SIGNUP_START:
      return userSignupStart(state, action);
    case USER_SIGNUP_SUCCESS:
      return userSignupSuccess(state, action);
    case USER_RELOAD_SUCCESS:
      return reloadSessionSuccess(state, action);
    case USER_SIGNUP_FAIL:
      return userSignupFail(state, action);
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return userNotificationSuccess(state, action);

    default:
      return state;
  }
};

export default authentication;
