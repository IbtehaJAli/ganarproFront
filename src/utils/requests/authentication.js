import { api } from "../constants/api";
import { get$, post$ } from "./index";

export const registerUser = (data) => {
  return post$(api.authentication.register, data);
};

export const signinUser = (data) => {
  return post$(api.authentication.login, data);
};

export const fetchUser = (userId) => {
  return get$(api.authentication.fetchUser.replace(":userId", userId));
};

export const passwordResetAPI = (data) => {
  return post$(api.authentication.passwordReset, data, {}, true);
};
export const passwordResetConfirmAPI = (data) => {
  return post$(api.authentication.passwordResetConfirm, data, {}, true);
};
