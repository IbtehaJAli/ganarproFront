import { api } from '../constants/api';
import { get$ } from './index';

export const getRegionsAPI = () => {
  return get$(api.regions.getRegions);
};
