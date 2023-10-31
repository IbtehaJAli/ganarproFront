// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import {
  isEmpty,
  toastError,
  toastSuccess,
} from "../../../utils/helpers/helper";
import {
  allProjects,
  allProjectsTable,
  singleProject,
  projectBylocations,
  archiveProjectAPI,
  unArchiveProjectAPI,
  favouriteProjectAPI,
  unFavouriteProjectAPI,
  saveSearchProjectAPI,
  getEmailTemplateAPI,
} from "../../../utils/requests/projects";
import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_TABLE_SUCCESS,
  FETCH_PROJECTS_FAIL,
  FETCH_SINGLE_PROJECT_SUCCESS,
  ARCHIVE_PROJECT_SUCCESS,
  UNARCHIVE_PROJECT_SUCCESS,
  FAVOURITE_PROJECT_SUCCESS,
  UNFAVOURITE_PROJECT_SUCCESS,
  UPDATE_FAVOURITE_PROJECT_SUCCESS,
  PROJECT_ACTION_FAILED,
  PROJECT_SAVE_SEARCH_SUCCESS,
  PROJECT_SAVE_SEARCH_START,
  PROJECT_SAVE_SEARCH_FAILED,
  GET_EMAIL_TEMPLATE_START,
  GET_EMAIL_TEMPLATE_SUCCESS,
  GET_EMAIL_TEMPLATE_FAILED,
} from "../../actionTypes";

export const fetchProjectsStart = () => {
  return {
    type: FETCH_PROJECTS_START,
  };
};

export const fetchProjectsSuccess = (data) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    data,
  };
};

export const fetchProjectsTableSuccess = (data) => {
  return {
    type: FETCH_PROJECTS_TABLE_SUCCESS,
    data,
  };
};


export const fetchProjectsFailed = (error) => {
  return {
    type: FETCH_PROJECTS_FAIL,
    error,
  };
};

export const fetchSingleProjectSuccess = (data) => {
  return {
    type: FETCH_SINGLE_PROJECT_SUCCESS,
    data,
  };
};

export const archiveProjectSuccess = (projectId) => {
  return {
    type: ARCHIVE_PROJECT_SUCCESS,
    projectId,
  };
};

export const unArchiveProjectSuccess = (projectId) => {
  return {
    type: UNARCHIVE_PROJECT_SUCCESS,
    projectId,
  };
};

export const favouriteProjectSuccess = (projectId) => {
  return {
    type: FAVOURITE_PROJECT_SUCCESS,
    projectId,
  };
};

export const unFavouriteProjectSuccess = (projectId) => {
  return {
    type: UNFAVOURITE_PROJECT_SUCCESS,
    projectId,
  };
};

export const updateFavouriteProjectSuccess = (projects) => {
  return {
    type: UPDATE_FAVOURITE_PROJECT_SUCCESS,
    projects,
  };
};

export const projectSaveSearchStart = () => {
  return {
    type: PROJECT_SAVE_SEARCH_START,
  };
};

export const projectSaveSearchSuccess = (data) => {
  return {
    type: PROJECT_SAVE_SEARCH_SUCCESS,
    data,
  };
};

export const projectSaveSearchFailed = (error) => {
  return {
    type: PROJECT_SAVE_SEARCH_FAILED,
    error,
  };
};

export const projectActionFailed = (error) => {
  return {
    type: PROJECT_ACTION_FAILED,
    error,
  };
};

export const getEmailTemplateStart = () => {
  return {
    type: GET_EMAIL_TEMPLATE_START,
  };
};

export const getEmailTemplateSuccess = (data) => {
  return {
    type: GET_EMAIL_TEMPLATE_SUCCESS,
    data,
  };
};

export const getEmailTemplateFailed = (error) => {
  return {
    type: GET_EMAIL_TEMPLATE_FAILED,
    error,
  };
};

export const fetchProjects = (queryString = null) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());

    return allProjects(queryString)
      .then(async (response) => {
        dispatch(fetchProjectsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(error.data));
      });
  };
};

export const fetchProjectsTables = (queryString = null) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());

    return allProjectsTable(queryString)
      .then(async (response) => {
        dispatch(fetchProjectsTableSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(error.data));
      });
  };
};

export const fetchProjectsByLocation = (locations) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());

    return projectBylocations(locations)
      .then(async (response) => {
        dispatch(fetchProjectsSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(error.data));
      });
  };
};

export const fetchSingleProject = (projectId) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());

    return singleProject(projectId)
      .then(async (response) => {
        dispatch(fetchSingleProjectSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(""));
      });
  };
};
const CustomToastWithLink = (message, link, linkName = "view list") => (
  <div>
    <h4 className="fw-bolder">
      {message} <a href={link}>{linkName}</a>
    </h4>
  </div>
);

const CustomToastWithLinkNewTab = (message, link, linkName = "view list") => (
  <div>
    <h4 className="fw-bolder">
      {message}{" "}
      <a href={link} target="_blank" rel="noreferrer">
        {linkName}
      </a>
    </h4>
  </div>
);
export const archiveProject = (projectId) => {
  return async (dispatch) => {
    // dispatch(fetchProjectsStart());
    return archiveProjectAPI(projectId)
      .then((response) => {
        let message = "Added to hidden Project list";
        let link = "/myganarpro/hiddenProjects";
        dispatch(archiveProjectSuccess(projectId));
        toastSuccess(() => CustomToastWithLink(message, link));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(""));
      });
  };
};

export const unArchiveProject = (projectId) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());
    return unArchiveProjectAPI(projectId)
      .then((response) => {
        let message = "Project removed from hidden list";
        let link = "/myganarpro/hiddenProjects";
        dispatch(unArchiveProjectSuccess(projectId));
        toastSuccess(() => CustomToastWithLink(message, link));
      })
      .catch((error) => {
        dispatch(fetchProjectsFailed(""));
      });
  };
};

export const favouriteProject = (projectId, projectsLiked) => {
  return async (dispatch) => {
    if (projectId) {
      return favouriteProjectAPI(projectId)
        .then((response) => {
          let message = "Project added to favorite";
          let link = "/myganarpro/favorites";
          toastSuccess(() => CustomToastWithLink(message, link));
          dispatch(favouriteProjectSuccess(projectId));
        })
        .catch((error) => {
          dispatch(fetchProjectsFailed(""));
        });
    }
  };
};

export const unFavouriteProject = (projectId) => {
  return async (dispatch) => {
    dispatch(fetchProjectsStart());
    let message = " Project removed from favourite";
    let link = "/myganarpro/favorites";
    toastSuccess(() => CustomToastWithLink(message, link));
    const response = await unFavouriteProjectAPI(projectId);
    if (response.status) {
      dispatch(unFavouriteProjectSuccess(projectId));
      return;
    }
    return dispatch(fetchProjectsFailed(""));
  };
};

export const updateLikedProjects = (projectsLiked) => {
  return async (dispatch) => {
    dispatch(updateFavouriteProjectSuccess(projectsLiked));
  };
};

export const saveSearch = (data) => {
  return async (dispatch) => {
    dispatch(projectSaveSearchStart());
    saveSearchProjectAPI(data)
      .then(() => {
        toastSuccess("Search saved successfully");
        dispatch(projectSaveSearchSuccess(data));
      })
      .catch(() => {
        dispatch(projectSaveSearchFailed(""));
      });
  };
};

export const getEmailTemplate = (templateId, query) => {
  return async (dispatch) => {
    dispatch(getEmailTemplateStart());
    getEmailTemplateAPI(templateId, query)
      .then((response) => {
        dispatch(getEmailTemplateSuccess(response));
      })
      .catch((error) => {
        let message = "Please update your account to send Emails";
        let link = "/prequel-masterkey";
        let linkName = "view Company basic info";
        toastError(() => CustomToastWithLinkNewTab(message, link, linkName));
        dispatch(getEmailTemplateFailed(error?.data?.error));
      });
  };
};
