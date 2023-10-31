import {
  BID_AMOUNT_PRICING_DETAIL_FAIL,
  BID_AMOUNT_PRICING_DETAIL_REQUEST,
  BID_AMOUNT_PRICING_DETAIL_SUCCESS,
  COST_PROFIT_SET_VALUES,
  CLEANUP_ESTIMATE_DELETE_FAIL,
  CLEANUP_ESTIMATE_DELETE_REQUEST,
  CLEANUP_ESTIMATE_DELETE_SUCCESS,
  CLEANUP_ESTIMATE_UPDATE_FAIL,
  CLEANUP_ESTIMATE_UPDATE_REQUEST,
  CLEANUP_ESTIMATE_UPDATE_SUCCESS,
  PROJECT_TYPE_PRICING_LIST_FAIL,
  PROJECT_TYPE_PRICING_LIST_REQUEST,
  PROJECT_TYPE_PRICING_LIST_SUCCESS,
  STATE_LABOR_PRICING_DETAIL_FAIL,
  STATE_LABOR_PRICING_DETAIL_REQUEST,
  STATE_LABOR_PRICING_DETAIL_SUCCESS,
  STATE_LABOR_PRICING_LIST_FAIL,
  STATE_LABOR_PRICING_LIST_REQUEST,
  STATE_LABOR_PRICING_LIST_SUCCESS,
  CLEANUP_ESTIMATE_CREATE_REQUEST,
  CLEANUP_ESTIMATE_CREATE_SUCCESS,
  CLEANUP_ESTIMATE_CREATE_FAIL,
  CLEANUP_ESTIMATE_LIST_REQUEST,
  CLEANUP_ESTIMATE_LIST_SUCCESS,
  CLEANUP_ESTIMATE_LIST_FAIL,
  CLEANUP_ESTIMATE_DETAIL_REQUEST,
  CLEANUP_ESTIMATE_DETAIL_SUCCESS,
  CLEANUP_ESTIMATE_DETAIL_FAIL,
  BID_AMOUNT_SET_VALUES,
  CALCULATION_INFO_FAIL,
  CALCULATION_INFO_REQUEST,
  CALCULATION_INFO_SUCCESS,
  CALCULATION_INFO_SAVED,
} from "../../constants/mortgageConstant";
import {
  bidAmountPricingDetailAPI,
  deleteCleanUpEstimatesAPI,
  getAllCleanUpEstimates,
  getCleanUpEstimatesDetailAPI,
  ProjectTypePricingListAPI,
  saveCleanUpEstimateAPI,
  StateLaborPricingDetailAPI,
  StateLaborPricingListAPI,
  updateCleanUpEstimatesAPI,
  getCalculationInfoAPI,
} from "../../../utils/requests/mortgage_calculator";
import {
  PROJECT_TYPE_DETAIL_SUCCESS,
  PROPOSAL_SET_VALUES,
} from "../../constants/proposalConstants";
import {
  deleteProposalAPI,
  getAllProjectTypeAPI,
  getAllProposalAPI,
  getProposalDetailAPI,
  saveProposalAPI,
  updateProposalAPI,
} from "../../../utils/requests/proposals";
import {
  isEmpty,
  toastError,
  toastSuccess,
} from "../../../utils/helpers/helper";
import axios from "axios";
import { getProjectTypeDetail } from "../proposals/proposals.actions";

export const getBidAmountPricingDetail = (projectType, phase) => {
  return async (dispatch) => {
    dispatch({
      type: BID_AMOUNT_PRICING_DETAIL_REQUEST,
    });
    return bidAmountPricingDetailAPI(projectType, phase)
      .then(async (response) => {
        dispatch({
          type: BID_AMOUNT_PRICING_DETAIL_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: BID_AMOUNT_PRICING_DETAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const getStateLaborPricingDetail = (state) => {
  return async (dispatch) => {
    dispatch({
      type: STATE_LABOR_PRICING_DETAIL_REQUEST,
    });
    return StateLaborPricingDetailAPI(state)
      .then(async (response) => {
        dispatch({
          type: STATE_LABOR_PRICING_DETAIL_SUCCESS,
          payload: response,
        });
        dispatch({
          type: COST_PROFIT_SET_VALUES,
          payload: { hourlyLaborRate: response.average_labor_rate },
        });
      })
      .catch((error) => {
        dispatch({
          type: STATE_LABOR_PRICING_DETAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const getStateLaborPricingList = () => {
  return async (dispatch) => {
    dispatch({
      type: STATE_LABOR_PRICING_LIST_REQUEST,
    });
    return StateLaborPricingListAPI()
      .then(async (response) => {
        dispatch({
          type: STATE_LABOR_PRICING_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: STATE_LABOR_PRICING_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const getProjectTypePricingList = () => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT_TYPE_PRICING_LIST_REQUEST,
    });
    return ProjectTypePricingListAPI()
      .then(async (response) => {
        dispatch({
          type: PROJECT_TYPE_PRICING_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: PROJECT_TYPE_PRICING_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const saveCleanUpEstimate = (data) => {
  return async (dispatch) => {
    dispatch({
      type: CLEANUP_ESTIMATE_CREATE_REQUEST,
    });
    return saveCleanUpEstimateAPI(data)
      .then(async (response) => {
        toastSuccess("Estimates Saved Successfully");
        dispatch({
          type: CLEANUP_ESTIMATE_CREATE_SUCCESS,
          payload: data,
        });
        document.location.href = "/cleanup_calculator/?show_tab=recent";
      })
      .catch((error) => {
        toastError("Estimates Creation Failed");
        dispatch({
          type: CLEANUP_ESTIMATE_CREATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const getUserCleanUpEstimates = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEANUP_ESTIMATE_LIST_REQUEST,
    });
    return getAllCleanUpEstimates()
      .then(async (response) => {
        dispatch({
          type: CLEANUP_ESTIMATE_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: CLEANUP_ESTIMATE_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const getCleanUpEstimatesDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: CLEANUP_ESTIMATE_DETAIL_REQUEST,
    });
    return getCleanUpEstimatesDetailAPI(id)
      .then(async (response) => {
        dispatch({
          type: CLEANUP_ESTIMATE_DETAIL_SUCCESS,
          payload: response,
        });
        // dispatch({
        //   type: PROJECT_TYPE_DETAIL_SUCCESS,
        //   payload: response.project_type,
        // });
        // const projectDetailResponse = {
        //   ...response,
        //   project_type: response.project_
        //   type.name,
        // };
        dispatch({ type: BID_AMOUNT_SET_VALUES, payload: response });
        dispatch({
          type: COST_PROFIT_SET_VALUES,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: CLEANUP_ESTIMATE_DETAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const updateCleanUpEstimate = (id, data) => {
  return async (dispatch) => {
    dispatch({
      type: CLEANUP_ESTIMATE_UPDATE_REQUEST,
    });
    return updateCleanUpEstimatesAPI(id, data)
      .then(async (response) => {
        toastSuccess("Estimates Updated Successfully");
        dispatch({
          type: CLEANUP_ESTIMATE_UPDATE_SUCCESS,
          payload: response,
        });
        document.location.href = "/cleanup_calculator?show_tab=recent";
      })
      .catch((error) => {
        toastError("Estimates Update Failed");
        dispatch({
          type: CLEANUP_ESTIMATE_UPDATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const deleteCleanUpEstimate = (id, editId) => {
  return async (dispatch) => {
    dispatch({
      type: CLEANUP_ESTIMATE_DELETE_REQUEST,
    });
    return deleteCleanUpEstimatesAPI(id)
      .then(async (response) => {
        toastSuccess("Estimates Deleted Successfully");
        dispatch({
          type: CLEANUP_ESTIMATE_DELETE_SUCCESS,
          payload: id,
        });
        if (editId !== undefined) {
          document.location.href = "/cleanup_calculator";
        }
      })
      .catch((error) => {
        toastError("Estimates Deletion Failed");
        dispatch({
          type: CLEANUP_ESTIMATE_DELETE_FAIL,
          payload: error,
        });
      });
  };
};

export const getCalculationInfo = () => {
  return async (dispatch) => {
    dispatch({ type: CALCULATION_INFO_REQUEST });
    // const saved_state_data = JSON.parse(localStorage.getItem('state_data'));
    // const saved_pricing_data = JSON.parse(localStorage.getItem('pricing_data'));
    // if (saved_state_data && saved_pricing_data) {
    //   dispatch({ type: CALCULATION_INFO_SUCCESS , payload: { "pricing_data": saved_pricing_data, "state_data": saved_state_data } });
    // } else {
    return getCalculationInfoAPI()
      .then(async (response) => {
        dispatch({ type: CALCULATION_INFO_SUCCESS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: CALCULATION_INFO_FAIL, payload: error.data });
      });
    //}
  };
};

export const resetCalculationInfo = () => {
  return async (dispatch) => {
    return getCalculationInfoAPI()
      .then(async (response) => {
        dispatch({ type: CALCULATION_INFO_SUCCESS, payload: response });
      })
      .catch((error) => {
        dispatch({ type: CALCULATION_INFO_FAIL, payload: error.data });
      });
  };
};

export const fetchEstimateFromStorage = () => {
  return async (dispatch) => {
    const estimate = JSON.parse(localStorage.getItem("estimate"));
    dispatch({
      type: BID_AMOUNT_SET_VALUES,
      payload: estimate,
    });
    // if (estimate) {
    //   dispatch(getProjectTypeDetail(proposal?.project_type));
    // }

    // localStorage.removeItem("proposal");
  };
};

export const getCalculationFormStorage = () => {
  return async (dispatch) => {
    const estimate = JSON.parse(localStorage.getItem("rates_info"));
    dispatch({
      type: CALCULATION_INFO_SAVED,
      payload: estimate,
    });
  };
};

export const fetchStateFromStorage = () => {
  return async (dispatch) => {
    const value = localStorage.getItem("state");
    if (value) {
      dispatch({
        type: BID_AMOUNT_SET_VALUES,
        payload: { state: value },
      });
    }
  };
};
