import { api } from '../constants/api';
import { post$, get$ } from './index';

export const saveCallLog = (projectId, data) => {
  return post$(api.callLogs.saveCallLog.replace(':projectId', projectId), data);
};

export const getCallLogs = (projectId, data) => {
  return get$(api.callLogs.allCallLogs.replace(':projectId', projectId), data);
};

export const getContactRolesAPI = (projectId) => {
  return get$(api.contact.getContactRoles.replace(':projectId', projectId));
};
