import { get$, patch$, post$, put$ } from "./default";
import { api } from "../constants/api";
export const getAllRegionsAPI = () => {
  return get$(api.gcQualify.regions);
};
export const getGcQualifyCompaniesAPI = (region) => {
  return get$(api.gcQualify.companies.replace(":region", region));
};

export const updatePlanRoomAPI = (data) => {
  let url = api.gcQualify.updatePlanRoom;
  return post$(url, data);
};

export const updatePreQualifyAPI = (data) => {
  let url = api.gcQualify.updatePreQualify;
  return post$(url, data);
};
