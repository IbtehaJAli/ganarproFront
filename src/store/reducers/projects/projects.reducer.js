import { updateObject } from "../../../utils/helpers/helper";
import {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_TABLE_SUCCESS,
  FETCH_PROJECTS_FAIL,
  FETCH_SINGLE_PROJECT_SUCCESS,
  ARCHIVE_PROJECT_SUCCESS,
  UNARCHIVE_PROJECT_SUCCESS,
  PROJECT_ACTION_FAILED,
  FAVOURITE_PROJECT_SUCCESS,
  UNFAVOURITE_PROJECT_SUCCESS,
  UPDATE_FAVOURITE_PROJECT_SUCCESS,
  PROJECT_SAVE_SEARCH_SUCCESS,
  PROJECT_SAVE_SEARCH_START,
  PROJECT_SAVE_SEARCH_FAILED,
  GET_EMAIL_TEMPLATE_START,
  GET_EMAIL_TEMPLATE_SUCCESS,
  GET_EMAIL_TEMPLATE_FAILED,
} from "../../actionTypes/index";

const initialState = {
  projects: null,
  count: 0,
  loading: false,
  next: null,
  previous: null,
  error: null,
  singleProject: null,
  favouriteProjects: [],
  actionError: "",
  buildingTypes: [],
  phases: [],
  sizes: [],
  saveSearchSuccess: false,
  emailTemplate: null,
  emailTemplateError: null,
};

const fetchProjectStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const fetchProjectSuccess = (state, action) => {
  const { count, next, previous, results, building_types, phases, sizes } =
    action.data;
  return updateObject(state, {
    count,
    next,
    previous,
    loading: false,
    projects: results,
    error: null,
    buildingTypes: building_types,
    sizes,
    phases,
  });
};

const fetchProjectTableSuccess = (state, action) => {
  const { count, next, previous, results } =
    action.data;
  return updateObject(state, {
    count,
    next,
    previous,
    loading: false,
    projects: results,
    error: null,
  });
};

const fetchProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const fetchSingleProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    singleProject: action.data,
    error: null,
  });
};

const archiveProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
  });
};

const unArchiveProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
  });
};

const favouriteProjectSuccess = (state, action) => {
  const project = state.projects.find(
    (project) => project?.id === action.projectId
  );
  return updateObject(state, {
    loading: false,
    error: null,
    favouriteProjects: [...state.favouriteProjects, project],
  });
};

const unfavouriteProjectSuccess = (state, action) => {
  const newProjects = state.favouriteProjects.filter(
    (project) => project?.id !== action.projectId
  );
  return updateObject(state, {
    loading: false,
    error: null,
    favouriteProjects: newProjects,
  });
};
const updateFavouriteProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    favouriteProjects: action.projects,
  });
};

const projectActionFailed = (error) => {
  return {
    type: PROJECT_ACTION_FAILED,
    error,
  };
};

const projectSaveSearchStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const projectSaveSearch = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const getEmailTemplateStart = (state) => {
  return updateObject(state, {
    emailTemplate: null,
    emailTemplateError: null,
  });
};

const getEmailTemplateSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    emailTemplate: action.data,
    emailTemplateError: "",
  });
};

const getEmailTemplateFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    emailTemplateError: action.error,
  });
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_START:
      return fetchProjectStart(state, action);
    case FETCH_PROJECTS_SUCCESS:
      return fetchProjectSuccess(state, action);
    case FETCH_PROJECTS_TABLE_SUCCESS:
      return fetchProjectTableSuccess(state, action);
    case FETCH_PROJECTS_FAIL:
      return fetchProjectFail(state, action);
    case FETCH_SINGLE_PROJECT_SUCCESS:
      return fetchSingleProjectSuccess(state, action);
    case ARCHIVE_PROJECT_SUCCESS:
      return archiveProjectSuccess(state, action);
    case UNARCHIVE_PROJECT_SUCCESS:
      return unArchiveProjectSuccess(state, action);
    case FAVOURITE_PROJECT_SUCCESS:
      return favouriteProjectSuccess(state, action);
    case UNFAVOURITE_PROJECT_SUCCESS:
      return unfavouriteProjectSuccess(state, action);
    case UPDATE_FAVOURITE_PROJECT_SUCCESS:
      return updateFavouriteProjectSuccess(state, action);
    case PROJECT_ACTION_FAILED:
      return projectActionFailed(state, action);
    case PROJECT_SAVE_SEARCH_START:
      return projectSaveSearchStart(state, action);
    case PROJECT_SAVE_SEARCH_SUCCESS:
      return projectSaveSearch(state, action);
    case PROJECT_SAVE_SEARCH_FAILED:
      return projectSaveSearch(state, action);
    case GET_EMAIL_TEMPLATE_START:
      return getEmailTemplateStart(state, action);
    case GET_EMAIL_TEMPLATE_SUCCESS:
      return getEmailTemplateSuccess(state, action);
    case GET_EMAIL_TEMPLATE_FAILED:
      return getEmailTemplateFailed(state, action);
    default:
      return state;
  }
};

export default projects;
