import { isEmpty, toastSuccess } from "../../../utils/helpers/helper";

import {
  MANAGE_USER_BILLING_FAIL,
  MANAGE_USER_BILLING_REQUEST,
  MANAGE_USER_BILLING_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_SET_FREE_MODE_FAIL,
  USER_SET_FREE_MODE_REQUEST,
  USER_SET_FREE_MODE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../../constants/userConstants";
import {
  getUserAPI,
  manageUserBillingAPI,
  setFreeModeAPI,
} from "../../../utils/requests/users";
import axios from "axios";
import {
  DOMAIN_VERIFICATION_FAIL,
  DOMAIN_VERIFICATION_REQUEST,
  DOMAIN_VERIFICATION_SUCCESS,
} from "../../actionTypes";

export const getUserDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    return getUserAPI()
      .then(async (response) => {
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: response,
        });
        dispatch({
          type: USER_SET_FREE_MODE_SUCCESS,
          payload: response.free_mode_action,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_DETAILS_FAIL,
          payload: "Failed to fetch Company information",
        });
      });
  };
};

export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    let { access } = getState();
    if (isEmpty(access)) {
      access = JSON.parse(localStorage.getItem("token"));
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/users/profile`,
      formData,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout())
    }

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const setFreeModeAction = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_SET_FREE_MODE_REQUEST,
    });
    return setFreeModeAPI()
      .then(async (response) => {
        dispatch({
          type: USER_SET_FREE_MODE_SUCCESS,
          payload: response.free_mode_count,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_SET_FREE_MODE_FAIL,
          payload: error,
        });
      });
  };
};

export const getManageUserBilling = (customer_id) => {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_USER_BILLING_REQUEST,
    });
    return manageUserBillingAPI(customer_id)
      .then(async (response) => {
        dispatch({
          type: MANAGE_USER_BILLING_SUCCESS,
          payload: response,
        });

        document.location.href = response.session_url;
      })
      .catch((error) => {
        dispatch({
          type: MANAGE_USER_BILLING_FAIL,
          payload: error,
        });
      });
  };
};

export const sendDomainVerification = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOMAIN_VERIFICATION_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/v1/emails/domain-verification`,
      { email },
      config
    );

    // const result = Object.values(
    //   data.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {})
    // );
    toastSuccess("Email Successfully");
    dispatch({
      type: DOMAIN_VERIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastSuccess("There was a problem sending email");
    dispatch({
      type: DOMAIN_VERIFICATION_FAIL,
      payload: error,
    });
  }
};
