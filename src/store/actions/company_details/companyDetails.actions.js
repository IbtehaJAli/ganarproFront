import axios from "axios";
import { isEmpty, toastSuccess } from "../../../utils/helpers/helper";
import {
  COMPANY_DETAILS_CONTINUE_REQUEST,
  COMPANY_DETAILS_CONTINUE_SUCCESS,
  COMPANY_DETAILS_CONTINUE_FAIL,
  COMPANY_DETAILS_CONTINUE_UPDATE_REQUEST,
  COMPANY_DETAILS_CONTINUE_UPDATE_SUCCESS,
  COMPANY_DETAILS_CONTINUE_UPDATE_FAIL,
  COMPANY_DETAILS_BASIC_FAIL,
  COMPANY_DETAILS_BASIC_REQUEST,
  COMPANY_DETAILS_BASIC_SUCCESS,
  COMPANY_DETAILS_BASIC_UPDATE_FAIL,
  COMPANY_DETAILS_BASIC_UPDATE_REQUEST,
  COMPANY_DETAILS_BASIC_UPDATE_SUCCESS,
  COMPANY_DETAILS_SOCIAL_FAIL,
  COMPANY_DETAILS_SOCIAL_REQUEST,
  COMPANY_DETAILS_SOCIAL_SUCCESS,
  COMPANY_DETAILS_SOCIAL_UPDATE_FAIL,
  COMPANY_DETAILS_SOCIAL_UPDATE_REQUEST,
  COMPANY_DETAILS_SOCIAL_UPDATE_SUCCESS,
  COMPANY_DETAILS_PROGRESS_FAIL,
  COMPANY_DETAILS_PROGRESS_REQUEST,
  COMPANY_DETAILS_PROGRESS_SUCCESS,
  COMPANY_ORG_DETAILS_FAIL,
  COMPANY_ORG_DETAILS_REQUEST,
  COMPANY_ORG_DETAILS_SUCCESS,
  COMPANY_ORG_DETAILS_UPDATE_FAIL,
  COMPANY_ORG_DETAILS_UPDATE_REQUEST,
  COMPANY_ORG_DETAILS_UPDATE_SUCCESS,
  COMPANY_HISTORY_FAIL,
  COMPANY_HISTORY_REQUEST,
  COMPANY_HISTORY_SUCCESS,
  COMPANY_HISTORY_UPDATE_FAIL,
  COMPANY_HISTORY_UPDATE_REQUEST,
  COMPANY_HISTORY_UPDATE_SUCCESS,
  COMPANY_CURRENT_WORK_FAIL,
  COMPANY_CURRENT_WORK_REQUEST,
  COMPANY_CURRENT_WORK_SUCCESS,
  COMPANY_CURRENT_WORK_UPDATE_FAIL,
  COMPANY_CURRENT_WORK_UPDATE_REQUEST,
  COMPANY_CURRENT_WORK_UPDATE_SUCCESS,
  COMPANY_WORK_FAIL,
  COMPANY_WORK_REQUEST,
  COMPANY_WORK_SUCCESS,
  COMPANY_WORK_UPDATE_FAIL,
  COMPANY_WORK_UPDATE_REQUEST,
  COMPANY_WORK_UPDATE_SUCCESS,
  COMPANY_FINANCE_FAIL,
  COMPANY_FINANCE_REQUEST,
  COMPANY_FINANCE_SUCCESS,
  COMPANY_FINANCE_UPDATE_FAIL,
  COMPANY_FINANCE_UPDATE_REQUEST,
  COMPANY_FINANCE_UPDATE_SUCCESS,
  COMPANY_INSURANCE_FAIL,
  COMPANY_INSURANCE_REQUEST,
  COMPANY_INSURANCE_SUCCESS,
  COMPANY_INSURANCE_UPDATE_FAIL,
  COMPANY_INSURANCE_UPDATE_REQUEST,
  COMPANY_INSURANCE_UPDATE_SUCCESS,
  COMPANY_LEGAL_FAIL,
  COMPANY_LEGAL_REQUEST,
  COMPANY_LEGAL_SUCCESS,
  COMPANY_LEGAL_UPDATE_FAIL,
  COMPANY_LEGAL_UPDATE_REQUEST,
  COMPANY_LEGAL_UPDATE_SUCCESS,
  COMPANY_SAFETY_FAIL,
  COMPANY_SAFETY_REQUEST,
  COMPANY_SAFETY_SUCCESS,
  COMPANY_SAFETY_UPDATE_FAIL,
  COMPANY_SAFETY_UPDATE_REQUEST,
  COMPANY_SAFETY_UPDATE_SUCCESS,
  COMPANY_SHIPPING_FAIL,
  COMPANY_SHIPPING_REQUEST,
  COMPANY_SHIPPING_SUCCESS,
  COMPANY_SHIPPING_UPDATE_FAIL,
  COMPANY_SHIPPING_UPDATE_REQUEST,
  COMPANY_SHIPPING_UPDATE_SUCCESS,
  COMPANY_SUPPLIER_FAIL,
  COMPANY_SUPPLIER_REQUEST,
  COMPANY_SUPPLIER_SUCCESS,
  COMPANY_SUPPLIER_UPDATE_FAIL,
  COMPANY_SUPPLIER_UPDATE_REQUEST,
  COMPANY_SUPPLIER_UPDATE_SUCCESS,
  COMPANY_DETAILS_PROJECT_TYPES_FAIL,
  COMPANY_DETAILS_PROJECT_TYPES_REQUEST,
  COMPANY_DETAILS_PROJECT_TYPES_SUCCESS,
} from "../../constants/userConstants";

// Get Company Froms Completion Info
export const getCompanyFromsCompletion = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_DETAILS_PROGRESS_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/update_count?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_DETAILS_PROGRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_PROGRESS_FAIL,
      payload: error.message || "Failed to fetch forms progress",
    });
  }
};

// Get Project types
export const getProjectTypes = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_DETAILS_PROJECT_TYPES_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/project_types`
    );

    dispatch({
      type: COMPANY_DETAILS_PROJECT_TYPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_PROJECT_TYPES_FAIL,
      payload: error.message || "Failed to fetch forms PROJECT_TYPES",
    });
  }
};

// Get Basic Company Info
export const getBasicCompanyDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_DETAILS_BASIC_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/basic_company?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_DETAILS_BASIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_BASIC_FAIL,
      payload: error.message || "Failed to fetch basic company details",
    });
  }
};
// Update Basic Company Info
export const updateCompanyDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_DETAILS_BASIC_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/basic_company`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_DETAILS_BASIC_UPDATE_SUCCESS,
        payload: data,
      });

      // You can handle storing the updated company details in your state or local storage if needed.
      // localStorage.setItem('companyDetails', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_DETAILS_BASIC_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Info Continue
export const getCompanyDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_DETAILS_CONTINUE_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/company_info?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_DETAILS_CONTINUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_CONTINUE_FAIL,
      payload: error.message || "Failed to fetch basic company details",
    });
  }
};

// Update Company Info Continue
export const updateCompanyDetails2 =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_DETAILS_CONTINUE_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/company_info`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_DETAILS_CONTINUE_UPDATE_SUCCESS,
        payload: data,
      });

      // You can handle storing the updated company details in your state or local storage if needed.
      // localStorage.setItem('companyDetails', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_DETAILS_CONTINUE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Social Info
export const getCompanySocial = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_DETAILS_SOCIAL_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/socials?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_DETAILS_SOCIAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_SOCIAL_FAIL,
      payload: error.message || "Failed to fetch social company details",
    });
  }
};

// Update Company Social Info
export const updateCompanySocial = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_DETAILS_SOCIAL_UPDATE_REQUEST });

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/socials`,
      formData,
      config
    );

    dispatch({
      type: COMPANY_DETAILS_SOCIAL_UPDATE_SUCCESS,
      payload: data,
    });

    // You can handle storing the updated company details in your state or local storage if needed.
    // localStorage.setItem('companyDetails', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // Handle logout or other actions as needed
    }

    dispatch({
      type: COMPANY_DETAILS_SOCIAL_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get Company org details Info
export const getOrgDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_ORG_DETAILS_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/org_details?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_ORG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_ORG_DETAILS_FAIL,
      payload: error.message || "Failed to fetch social company details",
    });
  }
};

// Update Company org details Info
export const updateOrgDetails = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_ORG_DETAILS_UPDATE_REQUEST });

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/org_details`,
      formData,
      config
    );

    dispatch({
      type: COMPANY_ORG_DETAILS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // Handle logout or other actions as needed
    }

    dispatch({
      type: COMPANY_ORG_DETAILS_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get Company history Info
export const getHistoryDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_HISTORY_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/project_history?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_HISTORY_FAIL,
      payload: error.message || "Failed to fetch social company details",
    });
  }
};

// Update Company history Info
export const updateHistoryDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_HISTORY_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/project_history`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_HISTORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_HISTORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Current Work Info
export const getWorkDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_CURRENT_WORK_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/current_work?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_CURRENT_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_CURRENT_WORK_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Current Work Info
export const updateWorkDetails = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_CURRENT_WORK_UPDATE_REQUEST });

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/current_work`,
      formData,
      config
    );

    dispatch({
      type: COMPANY_CURRENT_WORK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // Handle logout or other actions as needed
    }

    dispatch({
      type: COMPANY_CURRENT_WORK_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get Company Past Work Info
export const getPastWorkDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_WORK_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/completed_work?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_WORK_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Past Work Info
export const updatePastWorkDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_WORK_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/completed_work`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_WORK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_WORK_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Insurance Info
export const getInsuranceDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_INSURANCE_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/insurance?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_INSURANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_INSURANCE_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Insurance Info
export const updateInsuranceDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_INSURANCE_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/insurance`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_INSURANCE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_INSURANCE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Safety Info
export const getSafetyDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_SAFETY_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/safety?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_SAFETY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_SAFETY_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Safety Info
export const updateSafetyDetails = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_SAFETY_UPDATE_REQUEST });

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/safety`,
      formData,
      config
    );

    dispatch({
      type: COMPANY_SAFETY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // Handle logout or other actions as needed
    }

    dispatch({
      type: COMPANY_SAFETY_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get Company Safety Info
export const getFinanceDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_FINANCE_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/finance?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_FINANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_FINANCE_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Safety Info
export const updateFinanceDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_FINANCE_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/finance`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_FINANCE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_FINANCE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company Supplier Info
export const getSupplierDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_SUPPLIER_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/supplier?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_SUPPLIER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_SUPPLIER_FAIL,
      payload: error.message || "Failed to fetch current work details",
    });
  }
};

// Update Company Supplier Info
export const updateSupplierDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_SUPPLIER_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/supplier`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_SUPPLIER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_SUPPLIER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

// Get Company LEGAL Info
export const getLegalDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_LEGAL_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/legal?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_LEGAL_FAIL,
      payload: error.message || "Failed to fetch legal details",
    });
  }
};

// Update Company LEGAL Info
export const updateLegalDetails = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPANY_LEGAL_UPDATE_REQUEST });

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/legal`,
      formData,
      config
    );

    dispatch({
      type: COMPANY_LEGAL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    if (message === "Not authorized, token failed") {
      // Handle logout or other actions as needed
    }

    dispatch({
      type: COMPANY_LEGAL_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get Company LEGAL Info
export const getShippingDetails = () => async (dispatch, getState) => {
  dispatch({ type: COMPANY_SHIPPING_REQUEST });
  try {
    let { access } = getState();
    if (!access) {
      access = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };
    const userId = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/shipping_receivings?userId=${userId["id"]}`,
      config
    );

    dispatch({
      type: COMPANY_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_SHIPPING_FAIL,
      payload: error.message || "Failed to fetch SHIPPING details",
    });
  }
};

// Update Company LEGAL Info
export const updateShippingDetails =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPANY_SHIPPING_UPDATE_REQUEST });

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

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/company_details/shipping_receivings`,
        formData,
        config
      );

      dispatch({
        type: COMPANY_SHIPPING_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }

      dispatch({
        type: COMPANY_SHIPPING_UPDATE_FAIL,
        payload: message,
      });
    }
  };
