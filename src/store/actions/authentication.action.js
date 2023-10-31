import {
  signinUser,
  registerUser,
  fetchUser,
  passwordResetAPI,
  passwordResetConfirmAPI,
} from "../../utils/requests/index";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
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
  PASSWORD_RESET_START,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_START,
} from "../actionTypes";
import { isEmpty, toastError, toastSuccess } from "../../utils/helpers/helper";
import { fetchProjects, updateLikedProjects } from "./projects/projects.action";
import { getNotificationsAPI } from "../../utils/requests/notification";
import axios from "axios";
// import { setCurrentUser } from "../Auth/auth.action";

import mixpanel from "mixpanel-browser";

// Replace YOUR_TOKEN with your Project Token
mixpanel.init("5a6f3f7a9ac548f6d88b0b870c044581", { debug: true });

export const userLoginStart = () => {
  return {
    type: USER_LOGIN_START,
  };
};

export const userLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    data,
  };
};

export const userLoginFailed = (authError) => {
  return {
    type: USER_LOGIN_FAIL,
    authError,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const userSignupStart = () => {
  return {
    type: USER_SIGNUP_START,
  };
};

export const userSignupSuccess = () => {
  return {
    type: USER_SIGNUP_SUCCESS,
  };
};

export const reloadSessionSuccess = (data) => {
  return {
    type: USER_RELOAD_SUCCESS,
    data,
  };
};

export const userSignupFailed = (authError) => {
  return {
    type: USER_SIGNUP_FAIL,
    authError,
  };
};

export const getNotificationSuccess = (notifications) => {
  return {
    type: GET_USER_NOTIFICATIONS_SUCCESS,
    notifications,
  };
};

export const authLogin = (userDetail, navigate) => {
  // const userDetails = {
  //   email: "mikegreat",
  //   password: "M1ss10n1",
  // };
  return async (dispatch) => {
    dispatch(userLoginStart());

    return signinUser(userDetail)
      .then(async (response) => {
        const { access, refresh, data } = response;
        localStorage.setItem("token", JSON.stringify(access));
        localStorage.setItem("refresh", JSON.stringify(refresh));
        localStorage.setItem("user", JSON.stringify(data));
        if (process.env.REACT_APP_ENV === "PROD") {
          window.heap.identify(data.email);
          window.heap.addUserProperties({
            name: `${data.first_name} ${data.last_name}`,
            phone: data.phone,
            userId: data.id,
            email: data.email,
          });
        }

        await dispatch(userLoginSuccess(response));
        toastSuccess("Login Successful");
      })
      .catch((error) => {
        dispatch(userLoginFailed("email/password incorrect"));
      });
  };
};

export const authSignup = (userDetails, navigate) => {
  return (dispatch) => {
    dispatch(userSignupStart());
    return registerUser(userDetails)
      .then(async (response) => {
        // dispatch(userSignupSuccess());
        const { access, refresh, data } = response;
        // mixpanel.identify({'user_profile': "test@gmail.com"});

        // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
        // Include a property about the signup, like the Signup Type

        localStorage.setItem("token", JSON.stringify(access));
        localStorage.setItem("refresh", JSON.stringify(refresh));
        localStorage.setItem("user", JSON.stringify(data));

        if (process.env.REACT_APP_ENV === "PROD") {
          window.heap.addEventProperties({
            "Signed Up": "true",
            name: `${data.first_name} ${data.last_name}`,
          });
          window.heap.identify(data.email);
          window.heap.addUserProperties({
            name: `${data.first_name} ${data.last_name}`,
            phone: data.phone,
            userId: data.id,
            email: data.email,
          });
        }

        dispatch(userLoginSuccess(response));
        // toastSuccess("Login Successful");
        // document.location.href = "/";

        // document.location.href = "/login";
      })
      .catch((error) => {
        Promise.resolve(error.data).then((err) => {
          dispatch(userSignupFailed(err));
        });
      });
  };
};

export const reloadSession = (userId) => {
  return (dispatch) => {
    return fetchUser(userId)
      .then(async (response) => {
        dispatch(reloadSessionSuccess(response));
        dispatch(updateLikedProjects(response?.account?.project_favorites));
        dispatch(fetchProjects());
      })
      .catch((error) => {});
  };
};

export const getUserNotifications = (userId) => {
  return (dispatch) => {
    return getNotificationsAPI()
      .then(async (response) => {
        dispatch(getNotificationSuccess(response));
      })
      .catch((error) => {});
  };
};

export const logout = () => {
  // remove token
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("proposal");
  return (dispatch) => {
    dispatch(userLogout());
  };
};

export const passwordReset = (data) => {
  return async (dispatch) => {
    dispatch({
      type: PASSWORD_RESET_START,
    });
    return passwordResetAPI(data)
      .then(async (response) => {
        toastSuccess("Password Reset Successfully");
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: data,
        });
        // document.location.href = "/";
      })
      .catch((error) => {
        toastError("Password Reset Failed");
        dispatch({
          type: PASSWORD_RESET_FAIL,
          payload: error.data,
        });
      });
  };
};

// export const passwordResetConfirm = (data) => {
//   return async (dispatch) => {
//     dispatch({
//       type: PASSWORD_RESET_CONFIRM_START,
//     });
//     return passwordResetConfirmAPI(data)
//       .then(async (response) => {
//         toastSuccess("Password Reset Successfully");
//         dispatch({
//           type: PASSWORD_RESET_CONFIRM_SUCCESS,
//           payload: data,
//         });
//         // document.location.href = "/";
//       })
//       .catch((error) => {
//         toastError("Password Reset Failed");
//         dispatch({
//           type: PASSWORD_RESET_CONFIRM_FAIL,
//           payload: error.data,
//         });
//       });
//   };
// };

export const passwordResetConfirm =
  (resetData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_START,
      });
      let { access } = getState();
      if (isEmpty(access)) {
        access = JSON.parse(localStorage.getItem("token"));
      }
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/password_reset/confirm/?token=${resetData.token}`,
        resetData,
        config
      );
      toastSuccess("Password Reset Successfully");
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        payload: data,
      });
      document.location.href = "/login";
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      toastError("Password Confirm Failed");
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        payload: error.response.data,
      });
    }
  };
