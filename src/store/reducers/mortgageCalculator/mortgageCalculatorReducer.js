import {
  BID_AMOUNT_PRICING_DETAIL_FAIL,
  BID_AMOUNT_PRICING_DETAIL_REQUEST,
  BID_AMOUNT_PRICING_DETAIL_SUCCESS,
  BID_AMOUNT_RESET_VALUES,
  BID_AMOUNT_SET_VALUES,
  CLEANUP_ESTIMATE_CREATE_FAIL,
  CLEANUP_ESTIMATE_CREATE_REQUEST,
  CLEANUP_ESTIMATE_CREATE_SUCCESS,
  CLEANUP_ESTIMATE_DELETE_SUCCESS,
  CLEANUP_ESTIMATE_DETAIL_FAIL,
  CLEANUP_ESTIMATE_DETAIL_REQUEST,
  CLEANUP_ESTIMATE_DETAIL_SUCCESS,
  CLEANUP_ESTIMATE_LIST_FAIL,
  CLEANUP_ESTIMATE_LIST_REQUEST,
  CLEANUP_ESTIMATE_LIST_SUCCESS,
  CLEANUP_ESTIMATE_UPDATE_FAIL,
  CLEANUP_ESTIMATE_UPDATE_REQUEST,
  CLEANUP_ESTIMATE_UPDATE_SUCCESS,
  COST_PROFIT_RESET_VALUES,
  COST_PROFIT_SET_VALUES,
  PROJECT_TYPE_PRICING_LIST_FAIL,
  PROJECT_TYPE_PRICING_LIST_REQUEST,
  PROJECT_TYPE_PRICING_LIST_SUCCESS,
  STATE_LABOR_PRICING_DETAIL_FAIL,
  STATE_LABOR_PRICING_DETAIL_REQUEST,
  STATE_LABOR_PRICING_DETAIL_SUCCESS,
  STATE_LABOR_PRICING_LIST_FAIL,
  STATE_LABOR_PRICING_LIST_REQUEST,
  STATE_LABOR_PRICING_LIST_SUCCESS,
  CALCULATION_INFO_FAIL,
  CALCULATION_INFO_REQUEST,
  CALCULATION_INFO_SUCCESS,
  CALCULATION_INFO_SAVED,
} from "../../constants/mortgageConstant";
const initialValues = {
  square_foot: 13000,
  state: "National Average",
  project_type: "Any Type General Cleaning",
  living_unit: 0,
  emergency_pricing: false,
  project_name: "",
  phase: "final",
  not_sure: 0,
  no_stories: 1,
  price_per1_bed: 250,
  price_per2_bed: 300,
  price_per3_bed: 350,
  no_stories_check: false,
  no_of_unit1_bed: 1,
  no_of_unit2_bed: 1,
  no_of_unit3_bed: 1,
  use_unit_pricing: false,
  scrubbing_pricing: false,
  use_living_unit_pricing: false,
  phases: [{ value: "final", label: "Final", cost: 175 }],
  notes: "",
  window_panes: 0,
  price_per_window: 5,
  pressure_wash: 0,
  pressure_wash_price: 0.1,
  totalSumOfPhases: 0,
  price_per_sqft: true,
};
const calculator_initials = {
  state: "National Average",
  projectType: "",
  hourlyPrice: 46,
  pricePerSqft: 0,
  pricePerDay: 1472,
  appartment: 350,
  window: 5,
};
const phaseData = [
  { value: "rough", label: "Rough", cost: 105 },
  { value: "final", label: "Final", cost: 175 },
  { value: "fluff", label: "Fluff", cost: 70 },
];

export const bidAmountValuesReducer = (state = initialValues, action) => {
  switch (action.type) {
    case BID_AMOUNT_SET_VALUES:
      let phase = action.payload?.phase;
      let phases = state.phases;
      if (phase) {
        let phases_list = phase.split("_");
        phases = phaseData.filter((phase) => {
          return phases_list.includes(phase.value);
        });
      }

      return { ...state, phases, ...action.payload, loading: false };
    case BID_AMOUNT_RESET_VALUES:
      return initialValues;

    default:
      return state;
  }
};

export const bidAmountPricingReducer = (
  state = { amount: 0, phase: "", data: null },
  action
) => {
  switch (action.type) {
    case BID_AMOUNT_PRICING_DETAIL_REQUEST:
      return { loading: true, amount: 0, phase: "" };
    case BID_AMOUNT_PRICING_DETAIL_SUCCESS:
      const { amount, phase, data } = action.payload;
      return {
        loading: false,
        amount: amount,
        phase: phase,
        data,
      };
    case BID_AMOUNT_PRICING_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
        amount: 0,
        phase: "",
        data: null,
      };
    default:
      return state;
  }
};

export const stateLaborPricingReducer = (
  state = { amount: 0, percentage: 1 },
  action
) => {
  switch (action.type) {
    case STATE_LABOR_PRICING_DETAIL_REQUEST:
      return { loading: true, percentage: 1 };
    case STATE_LABOR_PRICING_DETAIL_SUCCESS:
      const { percentage, one_day_work, average_labor_rate } = action.payload;
      return {
        loading: false,
        percentage,
        one_day_work,
        average_labor_rate,
      };
    case STATE_LABOR_PRICING_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
        percentage: 1,
      };
    default:
      return state;
  }
};

export const calculationInfoReducer = (
  state = { pricing_data: [], state_data: [], error: null },
  action
) => {
  switch (action.type) {
    case CALCULATION_INFO_REQUEST:
      return { loading: true, pricing_data: [], state_data: [], error: null };
    case CALCULATION_INFO_SUCCESS:
      return {
        loading: false,
        pricing_data: action.payload.pricing_data,
        state_data: action.payload.state_data,
        error: false,
      };
    case CALCULATION_INFO_FAIL:
      return {
        loading: false,
        pricing_data: [],
        state_data: [],
        error: "Failed to load Data",
      };
    default:
      return state;
  }
};

export const calculationInfoSavedReducer = (
  state = calculator_initials,
  action
) => {
  switch (action.type) {
    case CALCULATION_INFO_SAVED:
      return {
        saved_data: action.payload,
      };
    default:
      return state;
  }
};

export const stateLaborPricingListReducer = (
  state = { stateLabors: [] },
  action
) => {
  switch (action.type) {
    case STATE_LABOR_PRICING_LIST_REQUEST:
      return { loading: true, stateLabors: [] };
    case STATE_LABOR_PRICING_LIST_SUCCESS:
      return {
        loading: false,
        stateLabors: action.payload,
      };
    case STATE_LABOR_PRICING_LIST_FAIL:
      return { loading: false, stateLabors: [], error: action.payload };
    default:
      return state;
  }
};
export const projectTypePricingListReducer = (
  state = { projectTypePricing: [] },
  action
) => {
  switch (action.type) {
    case PROJECT_TYPE_PRICING_LIST_REQUEST:
      return { loading: true, projectTypePricing: [] };
    case PROJECT_TYPE_PRICING_LIST_SUCCESS:
      return {
        loading: false,
        projectTypePricing: action.payload,
      };
    case PROJECT_TYPE_PRICING_LIST_FAIL:
      return { loading: false, projectTypePricing: [], error: action.payload };
    default:
      return state;
  }
};

const initialCostValues = {
  laborers_on_site: 4,
  hours_crew_works_daily: 8,
  hourly_labor_rate: 0,
  job_over_head: "",
  profit_margin: 0,
  job_costs_over_head: 0.14,
  use_number_of_days: false,
  noOfDaysExpected: "",
  unknown_sqft_size: false,
  use_accurate_days_on_site: false,
  accurate_days_on_site: 0,
};
export const costProfitValuesReducer = (state = initialCostValues, action) => {
  switch (action.type) {
    case COST_PROFIT_SET_VALUES:
      return { ...state, ...action.payload };
    case COST_PROFIT_RESET_VALUES:
      return initialValues;

    default:
      return state;
  }
};

export const cleanupEstimatesCreateReducer = (
  state = { showError: false },
  action
) => {
  switch (action.type) {
    case CLEANUP_ESTIMATE_CREATE_REQUEST:
      return { loading: true, showError: false };
    case CLEANUP_ESTIMATE_CREATE_SUCCESS:
      return { loading: false, estimates: action.payload, showError: false };
    case CLEANUP_ESTIMATE_CREATE_FAIL:
      return { loading: false, error: action.payload, showError: true };

    default:
      return state;
  }
};

export const cleanupEstimatesListReducer = (
  state = { estimates: [] },
  action
) => {
  switch (action.type) {
    case CLEANUP_ESTIMATE_LIST_REQUEST:
      return { loading: true, estimates: [] };
    case CLEANUP_ESTIMATE_LIST_SUCCESS:
      return {
        loading: false,
        estimates: action.payload,
      };
    case CLEANUP_ESTIMATE_DELETE_SUCCESS:
      let estimates = state.estimates.filter((estimate) => {
        return estimate.id !== action.payload;
      });
      return { estimates, loading: false };
    case CLEANUP_ESTIMATE_LIST_FAIL:
      return { loading: false, estimates: [], error: action.payload };
    default:
      return state;
  }
};

export const cleanupEstimatesDetailReducer = (
  state = { estimate: null },
  action
) => {
  switch (action.type) {
    case CLEANUP_ESTIMATE_DETAIL_REQUEST:
      return { loading: true };
    case CLEANUP_ESTIMATE_DETAIL_SUCCESS:
      return {
        loading: false,
        estimate: action.payload,
      };
    case CLEANUP_ESTIMATE_DETAIL_FAIL:
      return { loading: false, estimate: null, error: action.payload };
    default:
      return state;
  }
};

export const cleanupEstimatesUpdateReducer = (
  state = { proposal: null },
  action
) => {
  switch (action.type) {
    case CLEANUP_ESTIMATE_UPDATE_REQUEST:
      return { loading: true, ...state };
    case CLEANUP_ESTIMATE_UPDATE_SUCCESS:
      return {
        loading: false,
        estimate: action.payload,
      };
    case CLEANUP_ESTIMATE_UPDATE_FAIL:
      return { loading: false, estimate: null, error: action.payload };
    default:
      return state;
  }
};
