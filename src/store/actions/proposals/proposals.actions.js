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
  PROPOSAL_DELETE_FAIL,
  PROPOSAL_DELETE_REQUEST,
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
  PROPOSAL_SET_VALUES,
  PROPOSAL_UPDATE_FAIL,
  PROPOSAL_UPDATE_REQUEST,
  PROPOSAL_UPDATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
} from "../../constants/proposalConstants";
import {
  isEmpty,
  toastError,
  toastSuccess,
} from "../../../utils/helpers/helper";
import {
  createSubscriptionAPI,
  deleteProposalAPI,
  getAllProjectTypeAPI,
  getAllProposalAPI,
  getProjectTypesDetailAPI,
  getProposalDetailAPI,
  saveProposalAPI,
  updateProposalAPI,
} from "../../../utils/requests/proposals";
import axios from "axios";

export const saveProposal = (data) => {
  return async (dispatch) => {
    dispatch({
      type: PROPOSAL_CREATE_REQUEST,
    });
    return saveProposalAPI(data)
      .then(async (response) => {
        toastSuccess("Proposal Saved Successfully");

        dispatch({
          type: PROPOSAL_CREATE_SUCCESS,
          payload: data,
        });
        document.location.href = "/my_proposal?show_tab=recent";
      })
      .catch((error) => {
        toastError("Proposal Creation Failed");
        dispatch({
          type: PROPOSAL_CREATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const downloadProposal =
  (proposalId, proposal) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROPOSAL_DOWNLOAD_REQUEST,
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
        responseType: "blob",
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/proposals/download/${proposalId}`,
        proposal,
        config
      );
      dispatch({
        type: PROPOSAL_DOWNLOAD_SUCCESS,
      });
      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${proposal.project_name}_${proposal.company_name}_$${Number(
          proposal.bid_amount
        )}_Proposal.docx`
      ); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      toastError("Proposal Download Failed");
      dispatch({
        type: PROPOSAL_DOWNLOAD_FAIL,
        payload: error.data,
      });
    }
  };

export const getUserProposals = () => {
  return async (dispatch) => {
    dispatch({
      type: PROPOSAL_LIST_REQUEST,
    });
    return getAllProposalAPI()
      .then(async (response) => {
        dispatch({
          type: PROPOSAL_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: PROPOSAL_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const getProposalDetail = (proposalId) => {
  return async (dispatch) => {
    dispatch({
      type: PROPOSAL_DETAIL_REQUEST,
    });
    return getProposalDetailAPI(proposalId)
      .then(async (response) => {
        dispatch({
          type: PROPOSAL_DETAIL_SUCCESS,
          payload: response,
        });
        dispatch({
          type: PROJECT_TYPE_DETAIL_SUCCESS,
          payload: response.project_type,
        });
        const projectDetailResponse = {
          ...response,
          project_type: response.project_type.name,
        };
        dispatch({ type: PROPOSAL_SET_VALUES, payload: projectDetailResponse });
      })
      .catch((error) => {
        dispatch({
          type: PROPOSAL_DETAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const updateProposal = (proposalId, data) => {
  return async (dispatch) => {
    dispatch({
      type: PROPOSAL_UPDATE_REQUEST,
    });
    return updateProposalAPI(proposalId, data)
      .then(async (response) => {
        toastSuccess("Proposal Updated Successfully");
        dispatch({
          type: PROPOSAL_UPDATE_SUCCESS,
          payload: response,
        });
        document.location.href = "/my_proposal?show_tab=recent";
      })
      .catch((error) => {
        toastError("Proposal Update Failed");
        dispatch({
          type: PROPOSAL_UPDATE_FAIL,
          payload: error.data,
        });
      });
  };
};

export const deleteProposal = (proposalId, editId) => {
  return async (dispatch) => {
    dispatch({
      type: PROPOSAL_DELETE_REQUEST,
    });
    return deleteProposalAPI(proposalId)
      .then(async (response) => {
        toastSuccess("Proposal Deleted Successfully");
        dispatch({
          type: PROPOSAL_DELETE_SUCCESS,
          payload: proposalId,
        });
        if (editId !== undefined) {
          document.location.href = "/";
        }
      })
      .catch((error) => {
        toastError("Proposal Deletion Failed");
        dispatch({
          type: PROPOSAL_DELETE_FAIL,
          payload: error,
        });
      });
  };
};

export const createSubscription = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SUBSCRIPTION_CREATE_REQUEST,
    });
    return createSubscriptionAPI(data)
      .then(async (response) => {
        toastSuccess("Payment is Successful");
        dispatch({
          type: SUBSCRIPTION_CREATE_SUCCESS,
          payload: response,
        });
        document.location.href = "/";
      })
      .catch((error) => {
        toastError(`Payment Failed ${error.data?.detail || error.data?.error}`);
        dispatch({
          type: SUBSCRIPTION_CREATE_FAIL,
          payload: error.data.detail,
        });
      });
  };
};

export const getProjectType = () => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT_TYPE_LIST_REQUEST,
    });
    return getAllProjectTypeAPI()
      .then(async (response) => {
        dispatch({
          type: PROJECT_TYPE_LIST_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: PROJECT_TYPE_LIST_FAIL,
          payload: error,
        });
      });
  };
};

export const getProjectTypeDetail = (projectTypeId) => {
  return async (dispatch) => {
    dispatch({
      type: PROJECT_TYPE_DETAIL_REQUEST,
    });
    return getProjectTypesDetailAPI(projectTypeId)
      .then(async (response) => {
        dispatch({
          type: PROJECT_TYPE_DETAIL_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: PROJECT_TYPE_DETAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const fetchProposalFromStorage = () => {
  return async (dispatch) => {
    const proposal = JSON.parse(localStorage.getItem("proposal"));
    dispatch({
      type: PROPOSAL_SET_VALUES,
      payload: proposal,
    });
    if (proposal) {
      dispatch(getProjectTypeDetail(proposal?.project_type));
    }

    // localStorage.removeItem("proposal");
  };
};
