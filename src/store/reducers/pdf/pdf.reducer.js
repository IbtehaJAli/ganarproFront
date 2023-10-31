import { updateObject } from "../../../utils/helpers/helper";
import {
  PDFSAVING_FAILED,
  PDFSAVING_SUCCESS,
  PDFSAVING_START,
  GetTotalStatement_SUCCESS,
  GetTotalStatement_FAILED,
  GetSpecificStatement_SUCCESS,
  GetSpecificStatement_FAILED,
  RESET_STATE,
  DELETESTATEMENT_START,
  DELETESTATEMENT_FAILED,
  GetSpecificStatement_START,
} from "../../actionTypes/index";


let obj = {
  id: "",
  header_name: "CAPABILITIES STATEMENT",
  logo_image: "https://res.cloudinary.com/drtsq1r46/image/upload/v1694707325/ccp-logo.png.png",
  pdf_name: "",
  logo_url: "",
  version: "",
  company_info: "Construction Clean Partners LLC",
  company_address1: "715 Peachtree St, Suite 100.",
  company_address2: "Atlanta, GA 30308",
  owner_name: "Betsy Moates",
  owner_email: "betsy@final‐clean.com",
  owner_phone: "(404) 734-7571",
  url: "https://final-clean.com/",
  about_us_header: "About Us",
  about_us:
    "Construction Clean Partners works with commercial general contractors as a subcontractor completing the post construction final clean scope. We estimate cleaning bids via the plans and physical site visit walk throughs. CCP mobilizes employee labor and equipment to new construction and renovation commercial projects to help clean interior building sites.",
  core_competencies_header: "Core Competencies",
  core_competencies:
    "Interior post construction cleanup=Pressure washing=Window washing=Covid disinfection and sanitation",
  core_competencies_info:
    "Scope – Final clean = NAICS – 561720 = Certifications - M/WBE, SDVOB",
  past_performance_header: "Past Performance",
  past_performance:
    "Canaan Crossing=Woda Cooper Companies=Allora At the Exchange=CORE Construction=Intrada Westside=JM Wilkerson=Harris County Carver Middle School=Freeman & Associates",
  past_performance_image: "https://res.cloudinary.com/dc367rgig/image/upload/v1694361444/a_opjscb.jpg",
  difference_header: "DIFFERENTIATORS",
  difference:
    "We have been awarded contracts in over 41 cities. We have 9 managers and offices located around the USA that can supervise our local labor and equipment. CCP can make a site visit to confirm scope and pricing within 48 hours notice anywhere in the USA. We will always mobilize (team lives) within 1 hour from the job site.",
};


let objB = {
  id: "",
  header_name: "CAPABILITIES STATEMENT",
  logo_image: "https://res.cloudinary.com/drtsq1r46/image/upload/v1694707328/gana_logo.png.png",
  pdf_name: "",
  logo_url: "",
  version: "",
  company_info: "Ganarpro ",
  company_address1: "200 South Wacker Drive",
  company_address2: "Chicago, IL 60606",
  owner_name: "Brandon Inniss",
  owner_email: "brandon@ganarpro.com",
  owner_phone: "(945) 218-5522",
  url: "https://final-clean.com/",
  about_us_header: "About Us",
  about_us:
    "Ganarpro operates as a Software-as-a-Service (SaaS) firm, offering a diversity solution tailored for commercial construction firms in the USA. By joining GC Planify, general contractors can expand their network of certified diverse suppliers and enhance their talent pool for full-time employment.",
  core_competencies_header: "Software Benefits",
  core_competencies:
    "Show ongoing commitment to diversity, equity, and inclusion (dei).=Increase vendor/ subcontractor inflow=Talent/ recruitment=GC Planify card",
  core_competencies_image: "https://res.cloudinary.com/dc367rgig/image/upload/v1694361216/b._ganarpro_2_ocl5e6.jpg",
  core_competencies_info:
    "Scope – Final clean = NAICS – 561720 = Certifications - M/WBE, SDVOB",
  past_performance_header: "Community Economic Development Partners",
  past_performance:
    "Chicago Tribune=Illinois Department of Transportation=Chicago Housing Authority=Housing Authority of the County of Cook=Chicago Business Journal=Associated General Contractors of Illinois=The Chicago Minority Supplier Development Council=	Mid-States Minority Supplier Development Council",
  past_performance_image: "https://res.cloudinary.com/dc367rgig/image/upload/v1694361444/b_aymucf.jpg",
  difference_header: "DIFFERENTIATORS",
  difference:
"We distinguish ourselves from Building Connected, PlanHub, and Procore. Instead, we're developing APIs to integrate GC Planify with their platforms. Our primary focus is to present DEI initiative insights and assist your company in ESG matters. Join our community of construction firms that are demonstrably committed to their DEI strategies.",
 difference_bullets: "Annual subscription for GC Planify: $490=Zero enrollment fee=Recruitment fee: 20% of the new hire's salary"}

const initialState = {
  error: null,
  loading: false,
  pdfs: [],
  values: "",
};

const ResetState = (state, action) => {
  return updateObject(state, {
    values: action.v === "A" ? obj : action.v === "B" ? objB : "",
    loading: false,
  });
};
const DeletePDFStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};
const DeletePDFFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.Error,
  });
};
const StartSavingPDF = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};
const SavingPDFSuccess = (state, action) => {
  return updateObject(state, {
    values: action.data,
    loading: false,
  });
};

const PDFSavingFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};
const GetTotalStatementSuccess = (state, action) => {
  return updateObject(state, action.data);
};
const GetTotalStatementFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};
const GetSpecificStatementStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const GetSpecificStatementFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};

const GetSpecificStatementSuccess = (state, action) => {
  return updateObject(state, {
    values: action.data,
    loading: false,
  });
};

export const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case PDFSAVING_START:
      return StartSavingPDF(state, action);
    case PDFSAVING_SUCCESS:
      return SavingPDFSuccess(state, action);
    case PDFSAVING_FAILED:
      return PDFSavingFail(state, action);
    case GetTotalStatement_SUCCESS:
      return GetTotalStatementSuccess(state, action);
    case GetTotalStatement_FAILED:
      return GetTotalStatementFail(state, action);
    case GetSpecificStatement_START:
      return GetSpecificStatementStart(state, action);
    case GetSpecificStatement_SUCCESS:
      return GetSpecificStatementSuccess(state, action);
    case GetSpecificStatement_FAILED:
      return GetSpecificStatementFail(state, action);
    case RESET_STATE:
      return ResetState(state, action);
    case DELETESTATEMENT_START:
      return DeletePDFStart(state);
    case DELETESTATEMENT_FAILED:
      return DeletePDFFailed(state, action);
    default:
      return state;
  }
};
