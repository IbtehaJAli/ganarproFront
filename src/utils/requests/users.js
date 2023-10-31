import { delete$, get$, post$, put$ } from "./default";
import { api } from "../constants/api";

export const updateUserAPI = (id, data) => {
  let url = api.users.updateUser.replace(":userId", id);
  return put$(url, "", {}, data);
};

export const getUserAPI = () => {
  return get$(api.users.editUser);
};

export const setFreeModeAPI = () => {
  return put$(api.users.freeMode);
};

export const manageUserBillingAPI = (customer_id) => {
  return post$(api.users.manageUserBilling, customer_id);
};
