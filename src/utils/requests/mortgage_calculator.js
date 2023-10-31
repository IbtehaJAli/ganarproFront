import { delete$, get$, post$, put$ } from "./default";
import { api } from "../constants/api";

export const bidAmountPricingDetailAPI = (projectType, phase) => {
  return get$(
    api.mortgageCalculator.getBidAmountPricing
      .replace(":projectType", projectType)
      .replace(":phase", phase)
  );
};
export const StateLaborPricingDetailAPI = (state) => {
  return get$(
    api.mortgageCalculator.getStateLaborPricing.replace(":state", state)
  );
};

export const StateLaborPricingListAPI = () => {
  return get$(api.mortgageCalculator.getStateLaborPricingList);
};
export const ProjectTypePricingListAPI = () => {
  return get$(api.mortgageCalculator.getProjectTypePricingList);
};

export const saveCleanUpEstimateAPI = (data) => {
  return post$(api.mortgageCalculator.saveEstimates, data, {}, true);
};

export const getAllCleanUpEstimates = () => {
  return get$(api.mortgageCalculator.getAllEstimates);
};

export const getCleanUpEstimatesDetailAPI = (id) => {
  return get$(api.mortgageCalculator.getEstimates.replace(":id", id));
};

export const deleteCleanUpEstimatesAPI = (id) => {
  let url = api.mortgageCalculator.deleteEstimates.replace(":id", id);
  return delete$(url);
};

export const updateCleanUpEstimatesAPI = (id, data) => {
  let url = api.mortgageCalculator.updateEstimates.replace(":id", id);
  return put$(url, data, {}, true);
};

export const getCalculationInfoAPI = () => {
  return get$(api.mortgageCalculator.calculationInfo);
}
