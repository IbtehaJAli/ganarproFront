import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../../utils/constants/api";
import { isEmpty, toastSuccess } from "../../../utils/helpers/helper";
import {
  CapabilityStatement,
  DeleteUserStatement,
  GetSpecificStatement,
  TotalStatement,
} from "../../../utils/requests/pdf";
import {
  PDFSAVING_SUCCESS,
  DELETESTATEMENT_START,
  DELETESTATEMENT_FAILED,
  RESET_STATE,
  PDFSAVING_START,
  PDFSAVING_FAILED,
  GetTotalStatement_FAILED,
  GetTotalStatement_SUCCESS,
  GetSpecificStatement_SUCCESS,
  GetSpecificStatement_FAILED,
  GetSpecificStatement_START,
} from "../../actionTypes";

export const SavingPDFStart = () => {
  return {
    type: PDFSAVING_START,
  };
};

export const SavingPDFSuccess = (data) => {
  return {
    type: PDFSAVING_SUCCESS,
    data,
  };
};

export const SavingPDFFailed = (Error) => {
  return {
    type: PDFSAVING_FAILED,
    Error,
  };
};
export const GetTotalStatementSuccess = (data) => {
  return {
    type: GetTotalStatement_SUCCESS,
    data,
  };
};
export const GetTotalStatementFailed = (Error) => {
  return {
    type: GetTotalStatement_FAILED,
    Error,
  };
};
export const GetSpecificStatementStart = () => {
  return {
    type: GetSpecificStatement_START,
  };
};

export const GetSpecificStatementSuccess = (data) => {
  return {
    type: GetSpecificStatement_SUCCESS,
    data,
  };
};
export const GetSpecificStatementFailed = (Error) => {
  return {
    type: GetSpecificStatement_FAILED,
    Error,
  };
};

export const DeleteStatementSTART = () => {
  return {
    type: DELETESTATEMENT_START,
  };
};

export const DeleteStatementFAILED = (Error) => {
  return {
    type: DELETESTATEMENT_FAILED,
    Error,
  };
};
export const ResetState = (v) => {
  return {
    type: RESET_STATE,
    v,
  };
};

export const SaveCapabilityStatement =
  (formData, setIsEditMode, setShowPopup) => async (dispatch, getState) => {
    try {
      dispatch(SavingPDFStart());

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
        `${process.env.REACT_APP_BASE_URL}/api/v1/` +
          api.PDF.capabilityStatementCreate,
        formData,
        config
      );
      if (data.error) {
        toast.error(data.error);
        setIsEditMode(false);
        setShowPopup(false);
      } else {
        toast.success("PDF Saved");
        setIsEditMode(false);
        setShowPopup(false);
        dispatch(SavingPDFSuccess(data));
      }
      dispatch(GetTotalStatement());
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }
      toast.error("PDF Saving failed");
      dispatch(SavingPDFFailed("PDF Saving Failed"));
    }
  };

export const EditCapabilityStatement =
  (formData, setIsEditMode, setShowPopup) => async (dispatch, getState) => {
    try {
      dispatch(SavingPDFStart());

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
        `${process.env.REACT_APP_BASE_URL}/api/v1/` +
          api.PDF.capabilityStatement,
        formData,
        config
      );
      if (data.error) {
        toast.error(data.error);
        setIsEditMode(false);
        setShowPopup(false);
      } else {
        toast.success("PDF Saved");
        setIsEditMode(false);
        setShowPopup(false);
        dispatch(SavingPDFSuccess(data));
      }
      dispatch(GetTotalStatement());
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      if (message === "Not authorized, token failed") {
        // Handle logout or other actions as needed
      }
      toast.error("PDF Saving failed");
      dispatch(SavingPDFFailed("PDF Saving Failed"));
    }
  };


export const GetTotalStatement = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return async (dispatch) => {
    return TotalStatement(user.id)
      .then(async (response) => {
        await dispatch(GetTotalStatementSuccess(response));
      })
      .catch((error) => {
        toast.error("Get Total Statement  Failed Failed");
        dispatch(GetTotalStatementFailed("Get Total Statement  Failed"));
      });
  };
};
export const DeleteStatement = (name, setShowPopup, setOk, setVersion) => {
  let user = JSON.parse(localStorage.getItem("user"));

  return async (dispatch) => {
    dispatch(DeleteStatementSTART());
    return DeleteUserStatement(user.id, name)
      .then(async (response) => {
        await dispatch(GetTotalStatement());
        dispatch(ResetState());
        setOk(false);
        setVersion("");
        toast.success("Statement Deleted");
        setShowPopup(false);
      })
      .catch((error) => {
        toast.error("Statement Deleted Failed");
        dispatch(DeleteStatementFAILED("Statement Failed"));
      });
  };
};
export const GetUserSpeicificStatement = (name, navigate, setVersion) => {
  let user = JSON.parse(localStorage.getItem("user"));
  return async (dispatch) => {
    dispatch(GetSpecificStatementStart());
    return GetSpecificStatement(user.id, name)
      .then(async (response) => {
        const { version, pdf_name, error } = response;
        if (error) {
          // toast.error(error)
          dispatch(GetSpecificStatementFailed("Get Statement Failed"));
        }
        await dispatch(GetSpecificStatementSuccess(response));
        if (version === "A") {
          setVersion("A");
          navigate(`/capability_statement?${pdf_name}`);
        } else {
          setVersion("B");
          navigate(`/capability_statement?${pdf_name}`);
        }
      })
      .catch((error) => {
        toast.error("Get Statement Failed");
        dispatch(GetSpecificStatementFailed("Get Statement Failed"));
      });
  };
};
