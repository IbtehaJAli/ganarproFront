import { delete$, get$, post$, put$ } from "./default";
import { api } from "../constants/api";

export const saveProposalAPI = (data) => {
  return post$(api.proposals.saveProposal, data, {}, true);
};

export const getAllProposalAPI = () => {
  return get$(api.proposals.getAllProposal);
};

export const getProposalDetailAPI = (proposalId) => {
  return get$(api.proposals.getProposal.replace(":proposalId", proposalId));
};

export const deleteProposalAPI = (proposalId) => {
  let url = api.proposals.deleteProposal.replace(":proposalId", proposalId);
  return delete$(url);
};

export const updateProposalAPI = (proposalId, data) => {
  let url = api.proposals.updateProposal.replace(":proposalId", proposalId);
  return put$(url, data, {}, true);
};

export const createSubscriptionAPI = (data) => {
  let url = api.proposals.createSubscription;
  return post$(url, data, {}, true);
};

export const getAllProjectTypeAPI = () => {
  return get$(api.projectTypes.getAllProjectTypes);
};

export const getProjectTypesDetailAPI = (projectTypeId) => {
  return get$(
    api.projectTypes.getProjectTypes.replace(":projectTypeId", projectTypeId)
  );
};
