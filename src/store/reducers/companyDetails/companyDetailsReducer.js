import { COMPANY_DETAILS_CONTINUE_REQUEST, COMPANY_DETAILS_CONTINUE_SUCCESS,
  COMPANY_DETAILS_CONTINUE_FAIL, COMPANY_DETAILS_CONTINUE_UPDATE_REQUEST,
  COMPANY_DETAILS_CONTINUE_UPDATE_SUCCESS, COMPANY_DETAILS_CONTINUE_UPDATE_FAIL,
  COMPANY_DETAILS_BASIC_FAIL, COMPANY_DETAILS_BASIC_REQUEST,
  COMPANY_DETAILS_BASIC_SUCCESS, COMPANY_DETAILS_BASIC_UPDATE_FAIL, COMPANY_DETAILS_BASIC_UPDATE_REQUEST,
  COMPANY_DETAILS_BASIC_UPDATE_SUCCESS, COMPANY_DETAILS_SOCIAL_FAIL, COMPANY_DETAILS_SOCIAL_REQUEST,
  COMPANY_DETAILS_SOCIAL_SUCCESS, COMPANY_DETAILS_SOCIAL_UPDATE_FAIL, COMPANY_DETAILS_SOCIAL_UPDATE_REQUEST,
  COMPANY_DETAILS_SOCIAL_UPDATE_SUCCESS, COMPANY_DETAILS_PROGRESS_FAIL, COMPANY_DETAILS_PROGRESS_REQUEST, COMPANY_DETAILS_PROGRESS_SUCCESS,
  COMPANY_ORG_DETAILS_FAIL, COMPANY_ORG_DETAILS_REQUEST, COMPANY_ORG_DETAILS_SUCCESS, COMPANY_ORG_DETAILS_UPDATE_FAIL, COMPANY_ORG_DETAILS_UPDATE_REQUEST,
  COMPANY_ORG_DETAILS_UPDATE_SUCCESS, COMPANY_HISTORY_FAIL, COMPANY_HISTORY_REQUEST, COMPANY_HISTORY_SUCCESS, COMPANY_HISTORY_UPDATE_FAIL,
  COMPANY_HISTORY_UPDATE_REQUEST, COMPANY_HISTORY_UPDATE_SUCCESS, COMPANY_CURRENT_WORK_FAIL, COMPANY_CURRENT_WORK_REQUEST, COMPANY_CURRENT_WORK_SUCCESS,
  COMPANY_CURRENT_WORK_UPDATE_FAIL, COMPANY_CURRENT_WORK_UPDATE_REQUEST, COMPANY_CURRENT_WORK_UPDATE_SUCCESS, COMPANY_WORK_FAIL, COMPANY_WORK_REQUEST, COMPANY_WORK_SUCCESS,
  COMPANY_WORK_UPDATE_FAIL, COMPANY_WORK_UPDATE_REQUEST, COMPANY_WORK_UPDATE_SUCCESS, COMPANY_FINANCE_FAIL, COMPANY_FINANCE_REQUEST, COMPANY_FINANCE_SUCCESS, COMPANY_FINANCE_UPDATE_FAIL,
  COMPANY_FINANCE_UPDATE_REQUEST, COMPANY_FINANCE_UPDATE_SUCCESS, COMPANY_INSURANCE_FAIL, COMPANY_INSURANCE_REQUEST, COMPANY_INSURANCE_SUCCESS, COMPANY_INSURANCE_UPDATE_FAIL,
  COMPANY_INSURANCE_UPDATE_REQUEST, COMPANY_INSURANCE_UPDATE_SUCCESS, COMPANY_LEGAL_FAIL, COMPANY_LEGAL_REQUEST, COMPANY_LEGAL_SUCCESS, COMPANY_LEGAL_UPDATE_FAIL,
  COMPANY_LEGAL_UPDATE_REQUEST, COMPANY_LEGAL_UPDATE_SUCCESS, COMPANY_SAFETY_FAIL, COMPANY_SAFETY_REQUEST, COMPANY_SAFETY_SUCCESS, COMPANY_SAFETY_UPDATE_FAIL,
  COMPANY_SAFETY_UPDATE_REQUEST, COMPANY_SAFETY_UPDATE_SUCCESS, COMPANY_SHIPPING_FAIL, COMPANY_SHIPPING_REQUEST, COMPANY_SHIPPING_SUCCESS, COMPANY_SHIPPING_UPDATE_FAIL,
  COMPANY_SHIPPING_UPDATE_REQUEST, COMPANY_SHIPPING_UPDATE_SUCCESS, COMPANY_SUPPLIER_FAIL, COMPANY_SUPPLIER_REQUEST, COMPANY_SUPPLIER_SUCCESS, COMPANY_SUPPLIER_UPDATE_FAIL,
  COMPANY_SUPPLIER_UPDATE_REQUEST, COMPANY_SUPPLIER_UPDATE_SUCCESS, COMPANY_DETAILS_PROJECT_TYPES_FAIL, COMPANY_DETAILS_PROJECT_TYPES_REQUEST, COMPANY_DETAILS_PROJECT_TYPES_SUCCESS  } from '../../constants/userConstants';

export const companyFormsProgressReducer = (state = { loading: false, progress_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_PROGRESS_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_PROGRESS_SUCCESS:
      return { loading: false, progress_info: action.payload };
    case COMPANY_DETAILS_PROGRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectTypesReducer = (state = { loading: false, project_types: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_PROJECT_TYPES_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_PROJECT_TYPES_SUCCESS:
      return { loading: false, project_types: action.payload };
    case COMPANY_DETAILS_PROJECT_TYPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const companyBasicInfoReducer = (state = { loading: false, basic_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_BASIC_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_BASIC_SUCCESS:
      return { loading: false, basic_info: action.payload };
    case COMPANY_DETAILS_BASIC_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyBasicInfoUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_BASIC_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_DETAILS_BASIC_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_DETAILS_BASIC_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyContinueInfoReducer = (state = { loading: false, continue_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_CONTINUE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_CONTINUE_SUCCESS:
      return { loading: false, continue_info: action.payload };
    case COMPANY_DETAILS_CONTINUE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyContinueInfoUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_CONTINUE_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_DETAILS_CONTINUE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_DETAILS_CONTINUE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companySocialInfoReducer = (state = { loading: false, social_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_SOCIAL_REQUEST:
      return { ...state, loading: true };
    case COMPANY_DETAILS_SOCIAL_SUCCESS:
      return { loading: false, social_info: action.payload };
    case COMPANY_DETAILS_SOCIAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companySocialInfoUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_SOCIAL_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_DETAILS_SOCIAL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_DETAILS_SOCIAL_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyOrgDetailsReducer = (state = { loading: false, org_details: {} }, action) => {
  switch (action.type) {
    case COMPANY_ORG_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COMPANY_ORG_DETAILS_SUCCESS:
      return { loading: false, org_details: action.payload };
    case COMPANY_ORG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyOrgDetailsUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_ORG_DETAILS_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_ORG_DETAILS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_ORG_DETAILS_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyHistoryReducer = (state = { loading: false, history_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_HISTORY_REQUEST:
      return { ...state, loading: true };
    case COMPANY_HISTORY_SUCCESS:
      return { loading: false, history_info: action.payload };
    case COMPANY_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyHistoryUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_HISTORY_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_HISTORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_HISTORY_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyCurrentWorkReducer = (state = { loading: false, work_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_CURRENT_WORK_REQUEST:
      return { ...state, loading: true };
    case COMPANY_CURRENT_WORK_SUCCESS:
      return { loading: false, work_info: action.payload };
    case COMPANY_CURRENT_WORK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyCurrentWorkUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_CURRENT_WORK_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_CURRENT_WORK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_CURRENT_WORK_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyWorkReducer = (state = { loading: false, past_work_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_WORK_REQUEST:
      return { ...state, loading: true };
    case COMPANY_WORK_SUCCESS:
      return { loading: false, past_work_info: action.payload };
    case COMPANY_WORK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyWorkUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_WORK_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_WORK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_WORK_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyInsuranceReducer = (state = { loading: false, insurance_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_INSURANCE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_INSURANCE_SUCCESS:
      return { loading: false, insurance_info: action.payload };
    case COMPANY_INSURANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyInsuranceUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_INSURANCE_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_INSURANCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_INSURANCE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companySafetyReducer = (state = { loading: false, safety_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_SAFETY_REQUEST:
      return { ...state, loading: true };
    case COMPANY_SAFETY_SUCCESS:
      return { loading: false, safety_info: action.payload };
    case COMPANY_SAFETY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companySafetyUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_SAFETY_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_SAFETY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_SAFETY_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyFinanceReducer = (state = { loading: false, finance_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_FINANCE_REQUEST:
      return { ...state, loading: true };
    case COMPANY_FINANCE_SUCCESS:
      return { loading: false, finance_info: action.payload };
    case COMPANY_FINANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyFinanceUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_FINANCE_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_FINANCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_FINANCE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companySupplierReducer = (state = { loading: false, supplier_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case COMPANY_SUPPLIER_SUCCESS:
      return { loading: false, supplier_info: action.payload };
    case COMPANY_SUPPLIER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companySupplierUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_SUPPLIER_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_SUPPLIER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_SUPPLIER_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyLegalReducer = (state = { loading: false, legal_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_LEGAL_REQUEST:
      return { ...state, loading: true };
    case COMPANY_LEGAL_SUCCESS:
      return { loading: false, legal_info: action.payload };
    case COMPANY_LEGAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyLegalUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_LEGAL_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_LEGAL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_LEGAL_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const companyShippingReducer = (state = { loading: false, shipping_info: {} }, action) => {
  switch (action.type) {
    case COMPANY_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case COMPANY_SHIPPING_SUCCESS:
      return { loading: false, shipping_info: action.payload };
    case COMPANY_SHIPPING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyShippingUpdateReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case COMPANY_SHIPPING_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case COMPANY_SHIPPING_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COMPANY_SHIPPING_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
