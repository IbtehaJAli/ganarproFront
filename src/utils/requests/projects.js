import { api } from '../constants/api';
import { get$, post$, delete$, put$ } from './index';

export const allProjects = (queryString = '') => {
  return get$(api.projects.all, queryString);
};

export const allProjectsTable = (queryString = '') => {
  return get$(api.projects.list, queryString);
};

export const projectBylocations = (locations) => {
  return get$(api.projects.byLocations.replace(':locations', locations));
};

export const singleProject = (projectId) => {
  return get$(api.projects.singleProject.replace(':projectId', projectId));
};

export const archiveProjectAPI = (projectId) => {
  return post$(api.projects.archiveProject.replace(':projectId', projectId));
};

export const unArchiveProjectAPI = (projectId) => {
  return delete$(
    api.projects.unArchiveProject.replace(':projectId', projectId)
  );
};

export const favouriteProjectAPI = (projectId) => {
  return post$(api.projects.likeProject.replace(':projectId', projectId));
};

export const unFavouriteProjectAPI = (projectId) => {
  return delete$(api.projects.unLikeProject.replace(':projectId', projectId));
};

export const saveSearchProjectAPI = (data) => {
  return post$(api.projects.saveSearchProject, data);
};

export const saveCommentAPI = (projectId, data) => {
  return post$(
    api.projects.saveComment.replace(':projectId', projectId),
    data,
    {},
    true
  );
};

export const getCommentAPI = (projectId) => {
  return get$(api.projects.getComment.replace(':projectId', projectId));
};

export const editCommentAPI = (projectId, commentId, data) => {
  let url = api.projects.editComment.replace(':projectId', projectId);
  return put$(url.replace(':commentId', commentId), data, {}, true);
};

export const deleteCommentAPI = (projectId, commentId) => {
  let url = api.projects.deleteComment.replace(':projectId', projectId);
  return delete$(url.replace(':commentId', commentId));
};

export const getEmailTemplateAPI = (templateId, query) => {
  const url = api.contact.getEmailTemplate.replace(':templateId', templateId);
  const apiURL = `${url}${query}`;
  return get$(decodeURI(apiURL));
};

export const sendEmailToContactAPI = (projectId, data) => {
  return post$(
    api.contact.sendEmailToContactAPI.replace(':projectId', projectId),
    data
  );
};

export const getEmailLogsAPI = (projectId) => {
  return get$(api.contact.getEmailLogs.replace(':projectId', projectId));
};

export const saveProjectStatusAPI = (data) => {
  return post$(api.projects.saveStatus, data);
};

export const getHotScopesAPI = (data) => {
  return get$(api.hotScopes.getHotScopes);
};
