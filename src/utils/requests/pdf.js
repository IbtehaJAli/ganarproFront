import { api } from "../constants/api";
import { get$, post$,delete$, patch$ } from "./index";

export const CapabilityStatement = (data) => {
  return post$(api.PDF.capabilityStatement, data);
};

export const TotalStatement = (userId) => {
  return get$(api.PDF.TotalStatements +`?userId=${userId}`);
};
export const DeleteUserStatement = (userId,name) => {
  return get$ (api.PDF.DeleteStatement +`?userId=${userId}&pdf_name=${name}`);
};
export const GetSpecificStatement = (userId,name) => {
  return get$(api.PDF.capabilityStatement +`?userId=${userId}&pdf_name=${name}`);
};

