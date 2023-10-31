import {
  CLEANUP_ESTIMATE_UPDATE_FAIL,
  CLEANUP_ESTIMATE_UPDATE_REQUEST,
  CLEANUP_ESTIMATE_UPDATE_SUCCESS,
  PROJECT_TYPE_PRICING_LIST_FAIL,
  PROJECT_TYPE_PRICING_LIST_REQUEST,
  PROJECT_TYPE_PRICING_LIST_SUCCESS,
  STATE_LABOR_PRICING_LIST_FAIL,
  STATE_LABOR_PRICING_LIST_REQUEST,
  STATE_LABOR_PRICING_LIST_SUCCESS,
} from "../../constants/mortgageConstant";
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

export const regionListReducer = (state = { regions: [] }, action) => {
  switch (action.type) {
    case USER_REGION_REQUEST:
      return { loading: true, regions: [] };
    case USER_REGION_LIST_SUCCESS:
      return {
        loading: false,
        regions: action.payload,
      };
    case USER_REGION_LIST_FAIL:
      return { loading: false, regions: [], error: action.payload };
    default:
      return state;
  }
};

export const gcQualifyCompanyListReducer = (
  state = { companies: [] },
  action
) => {
  switch (action.type) {
    case GC_QUALIFY_COMPANIES_REQUEST:
      return { loading: true, companies: [] };
    case GC_QUALIFY_COMPANIES_LIST_SUCCESS:
      return {
        loading: false,
        companies: action.payload,
      };
    case GC_QUALIFY_COMPANIES_FAIL:
      return { loading: false, companies: [], error: action.payload };
    default:
      return state;
  }
};

export const planRoomUpdateReducer = (state = { proposal: null }, action) => {
  switch (action.type) {
    case PLAN_ROOM_REQUEST:
      return { loading: true, ...state };
    case PLAN_ROOM_UPDATE_SUCCESS:
      return {
        loading: false,
        estimate: action.payload,
      };
    case PLAN_ROOM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const preQualifyUpdateReducer = (state = { proposal: null }, action) => {
  switch (action.type) {
    case PRE_QUALIFY_REQUEST:
      return { loading: true, ...state };
    case PRE_QUALIFY_UPDATE_SUCCESS:
      return {
        loading: false,
        estimate: action.payload,
      };
    case PRE_QUALIFY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
