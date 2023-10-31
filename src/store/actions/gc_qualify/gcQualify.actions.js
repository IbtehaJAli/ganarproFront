import {
  GC_QUALIFY_COMPANIES_FAIL,
  GC_QUALIFY_COMPANIES_LIST_SUCCESS,
  GC_QUALIFY_COMPANIES_REQUEST,
  PLAN_ROOM_REQUEST,
  PLAN_ROOM_UPDATE_FAIL,
  PLAN_ROOM_UPDATE_SUCCESS,
  PRE_QUALIFY_REQUEST,
  PRE_QUALIFY_UPDATE_SUCCESS,
  PRE_QUALIFY_UPDATE_FAIL,
  USER_REGION_LIST_FAIL,
  USER_REGION_LIST_SUCCESS,
  USER_REGION_REQUEST,
} from "../../constants/gcQualifyConstants";
import {
  getAllRegionsAPI,
  getGcQualifyCompaniesAPI,
  updatePlanRoomAPI,
  updatePreQualifyAPI
} from "../../../utils/requests/gcQualify";
import axios from "axios";
import {
  PROPOSAL_UPDATE_FAIL,
  PROPOSAL_UPDATE_REQUEST,
  PROPOSAL_UPDATE_SUCCESS,
} from "../../constants/proposalConstants";
import { updateProposalAPI } from "../../../utils/requests/proposals";
import {
  isEmpty,
  toastError,
  toastSuccess,
} from "../../../utils/helpers/helper";

export const getRegions = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGION_REQUEST,
    });
    return getAllRegionsAPI()
      .then(async (response) => {
        dispatch({
          type: USER_REGION_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_REGION_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const fetchRegions = () => {
  return getAllRegionsAPI().then(async (response) => {
    return response;
  });
};

export const getAllGcQualifyCompanies =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GC_QUALIFY_COMPANIES_REQUEST,
      });
      let { access } = getState();
      let headers = {
        "content-type": "application/json",
      };
      if (isEmpty(access)) {
        access = JSON.parse(localStorage.getItem("token"));
      }
      if (access) {
        headers = {
          "content-type": "application/json",
          Authorization: `Bearer ${access}`,
        };
      }
      const config = {
        params,
        paramsSerializer: function paramsSerializer(params) {
          // "Hide" the `answer` param
          return Object.entries(Object.assign({}, params))
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        },
        headers,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/projects/companies`,
        config
      );

      // const result = Object.values(
      //   data.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {})
      // );

      dispatch({
        type: GC_QUALIFY_COMPANIES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GC_QUALIFY_COMPANIES_FAIL,
        payload: error,
      });
    }
  };

export const updatePlanRoom = (data) => {
  return async (dispatch) => {
    dispatch({
      type: PLAN_ROOM_REQUEST,
    });
    return updatePlanRoomAPI(data)
      .then(async (response) => {
        toastSuccess("PlanRoom Updated Successfully");
        dispatch({
          type: PLAN_ROOM_UPDATE_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        toastError("PlanRoom Update Failed");
        dispatch({
          type: PLAN_ROOM_UPDATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const updatePreQualify = (data) => {
  return async (dispatch) => {
    dispatch({
      type: PRE_QUALIFY_REQUEST,
    });
    return updatePreQualifyAPI(data)
      .then(async (response) => {
        toastSuccess("PreQualify Updated Successfully");
        dispatch({
          type: PRE_QUALIFY_UPDATE_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        toastError("PreQualify Update Failed");
        dispatch({
          type: PRE_QUALIFY_UPDATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const updatePreQualifyFile = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRE_QUALIFY_REQUEST });

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
        `${process.env.REACT_APP_BASE_URL}/api/v1/gc_qualify/pre_qualify_create`,
        formData,
        config
      );

      toastSuccess("PreQualify Updated Successfully");
      dispatch({
        type: PRE_QUALIFY_UPDATE_SUCCESS,
        payload: data,
      });

      // You can handle storing the updated company details in your state or local storage if needed.
      // localStorage.setItem('companyDetails', JSON.stringify(data));
    } catch (error) {
      toastError("PreQualify Update Failed");
      dispatch({
        type: PRE_QUALIFY_UPDATE_FAIL,
        payload: error.data,
      });
    }
  };
