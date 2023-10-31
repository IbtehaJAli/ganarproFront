import { api } from '../constants/api';
import { get$ } from './index';

export const getNotificationsAPI = (userId) => {
  return get$(api.notification.getNotifications);
};
