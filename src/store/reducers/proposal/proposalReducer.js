import {
  PROJECT_TYPE_DETAIL_FAIL,
  PROJECT_TYPE_DETAIL_REQUEST,
  PROJECT_TYPE_DETAIL_SUCCESS,
  PROJECT_TYPE_LIST_FAIL,
  PROJECT_TYPE_LIST_REQUEST,
  PROJECT_TYPE_LIST_SUCCESS,
  PROPOSAL_CREATE_FAIL,
  PROPOSAL_CREATE_REQUEST,
  PROPOSAL_CREATE_SUCCESS,
  PROPOSAL_DELETE_SUCCESS,
  PROPOSAL_DETAIL_FAIL,
  PROPOSAL_DETAIL_REQUEST,
  PROPOSAL_DETAIL_SUCCESS,
  PROPOSAL_DOWNLOAD_FAIL,
  PROPOSAL_DOWNLOAD_REQUEST,
  PROPOSAL_DOWNLOAD_SUCCESS,
  PROPOSAL_LIST_FAIL,
  PROPOSAL_LIST_REQUEST,
  PROPOSAL_LIST_SUCCESS,
  PROPOSAL_RESSET_VALUES,
  PROPOSAL_SET_VALUES,
  PROPOSAL_UPDATE_FAIL,
  PROPOSAL_UPDATE_REQUEST,
  PROPOSAL_UPDATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
} from "../../constants/proposalConstants";
import { State } from "country-state-city";

export const proposalCreateReducer = (
  state = { showError: false, loading: false },
  action
) => {
  switch (action.type) {
    case PROPOSAL_CREATE_REQUEST:
      return { loading: true, showError: false };
    case PROPOSAL_CREATE_SUCCESS:
      return { loading: false, proposal: action.payload, showError: false };
    case PROPOSAL_CREATE_FAIL:
      return { loading: false, error: action.payload, showError: true };

    default:
      return state;
  }
};
const initialValues = {
  project_name: "",
  project_street: "",
  project_city: "",
  project_state: "",
  project_state_short: "",
  project_zip: "",
  bid_amount: "",
  project_contact_1_name: "",
  project_contact_1_email: "",
  project_contact_1_phone: "",
  project_contact_2_name: "",
  project_contact_2_email: "",
  project_contact_2_phone: "",
  customer_company_name: "",
  customer_street: "",
  customer_state: "",
  customer_state_short: "",
  customer_city: "",
  customer_zip: "",
  company_street: "",
  company_city: "",
  company_state: "",
  company_state_short: "",
  company_zip: "",
  company_contact_name: "",
  company_contact_email: "",
  company_contact_phone: "",
  company_name: "",
  project_type: "Any Type General Cleaning",
};
export const proposalValuesReducer = (state = initialValues, action) => {
  switch (action.type) {
    case PROPOSAL_SET_VALUES:
      // if (action.payload.project_state_short !== undefined) {
      //   action.payload.project_state = State.getStateByCodeAndCountry(
      //     action.payload.project_state_short,
      //     "US"
      //   ).name;
      // } else if (action.payload.customer_state_short !== undefined) {
      //   action.payload.customer_state = State.getStateByCodeAndCountry(
      //     action.payload.customer_state_short,
      //     "US"
      //   ).name;
      // } else if (action.payload.company_state_short !== undefined) {
      //   action.payload.company_state = State.getStateByCodeAndCountry(
      //     action.payload.company_state_short,
      //     "US"
      //   ).name;
      // }
      return { ...state, ...action.payload };
    case PROPOSAL_RESSET_VALUES:
      // if (action.payload.project_state_short !== undefined) {
      //   action.payload.project_state = State.getStateByCodeAndCountry(
      //     action.payload.project_state_short,
      //     "US"
      //   ).name;
      // } else if (action.payload.customer_state_short !== undefined) {
      //   action.payload.customer_state = State.getStateByCodeAndCountry(
      //     action.payload.customer_state_short,
      //     "US"
      //   ).name;
      // } else if (action.payload.company_state_short !== undefined) {
      //   action.payload.company_state = State.getStateByCodeAndCountry(
      //     action.payload.company_state_short,
      //     "US"
      //   ).name;
      // }
      return initialValues;

    default:
      return state;
  }
};

export const proposalListReducer = (state = { proposals: [] }, action) => {
  switch (action.type) {
    case PROPOSAL_LIST_REQUEST:
      return { loading: true, proposals: [] };
    case PROPOSAL_LIST_SUCCESS:
      return {
        loading: false,
        proposals: action.payload,
      };
    case PROPOSAL_DELETE_SUCCESS:
      let proposals = state.proposals.filter((proposal) => {
        return proposal.id !== action.payload;
      });
      return { proposals, loading: false };
    case PROPOSAL_LIST_FAIL:
      return { loading: false, proposals: [], error: action.payload };
    default:
      return state;
  }
};

export const proposalDetailReducer = (state = { proposal: null }, action) => {
  switch (action.type) {
    case PROPOSAL_DETAIL_REQUEST:
      return { loading: true };
    case PROPOSAL_DETAIL_SUCCESS:
      return {
        loading: false,
        proposal: action.payload,
      };
    case PROPOSAL_DETAIL_FAIL:
      return { loading: false, proposal: null, error: action.payload };
    default:
      return state;
  }
};

export const proposalUpdateReducer = (state = { proposal: null }, action) => {
  switch (action.type) {
    case PROPOSAL_UPDATE_REQUEST:
      return { loading: true, ...state };
    case PROPOSAL_UPDATE_SUCCESS:
      return {
        loading: false,
        proposal: action.payload,
      };
    case PROPOSAL_UPDATE_FAIL:
      return { loading: false, proposal: null, error: action.payload };
    default:
      return state;
  }
};

export const proposalDownloadReducer = (state = { proposals: {} }, action) => {
  switch (action.type) {
    case PROPOSAL_DOWNLOAD_REQUEST:
      return { loading: true, proposals: {} };
    case PROPOSAL_DOWNLOAD_SUCCESS:
      return {
        loading: false,
      };
    case PROPOSAL_DOWNLOAD_FAIL:
      return { loading: false, proposals: {}, error: action.payload };
    default:
      return state;
  }
};
export const proposalSubscriptionReducer = (
  state = { subscription: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_CREATE_REQUEST:
      return { loading: true, subscription: {} };
    case SUBSCRIPTION_CREATE_SUCCESS:
      return {
        loading: false,
        subscription: action.payload,
      };
    case SUBSCRIPTION_CREATE_FAIL:
      return { loading: false, subscription: {}, error: action.payload };
    default:
      return state;
  }
};

export const projectTypeReducer = (
  state = { projectTypes: [], projectTypeDetail: null },
  action
) => {
  switch (action.type) {
    case PROJECT_TYPE_LIST_REQUEST:
      return { loading: true, projectTypes: [], projectTypeDetail: null };
    case PROJECT_TYPE_LIST_SUCCESS:
      return {
        loading: false,
        projectTypes: action.payload,
        projectTypeDetail: null,
      };
    case PROJECT_TYPE_DETAIL_REQUEST:
      const projectTypes = state.projectTypes.filter((projectType) => {
        return Number(projectType.id) === Number(action.payload);
      });
      return { ...state, projectTypeDetail: projectTypes[0], loading: false };
    case PROJECT_TYPE_LIST_FAIL:
      return {
        loading: false,
        projectTypes: [],
        error: action.payload,
        projectTypeDetail: null,
      };
    default:
      return state;
  }
};

export const projectTypeDetailReducer = (
  state = { projectTypes: [], projectTypeDetail: null },
  action
) => {
  switch (action.type) {
    case PROJECT_TYPE_DETAIL_REQUEST:
      return { loading: true, projectTypeDetail: null };
    case PROJECT_TYPE_DETAIL_SUCCESS:
      return {
        loading: false,
        projectTypeDetail: action.payload,
      };
    case PROJECT_TYPE_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
        projectTypeDetail: null,
      };
    default:
      return state;
  }
};
