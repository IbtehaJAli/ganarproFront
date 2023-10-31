import { toast } from "react-toastify";
import { TOTAL_FREE_MODE_COUNT } from "../constants/api";
export const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject,
  };
};

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const getUser = () => {
  const access = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("data"));
  const refresh = JSON.parse(localStorage.getItem("refresh"));
  const result = {
    access,
    user,
    refresh,
  };

  return result;
};

export const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem("data"));
  const token = JSON.parse(localStorage.getItem("token"));
  if (!user) return false;
  if (!token) return false;
  // try {
  //   const { exp } = jwt.decode(token);
  //   if (exp < new Date().getTime() / 1000) {
  //     return false;
  //   }
  // } catch (error) {
  //   return false;
  // }
  return true;
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastError = (message, options) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  });
};

export let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return str;
};

export const userSubscribedPlans = (profile, app_price_id) => {
  const allAppsPriceId = process.env.REACT_APP_ALL_APPS;
  const user_subs_price_ids = profile?.subscriptions.filter((sub) => {
    return (
      (sub.metadata.price_id === app_price_id && sub.status === "active") ||
      ((sub.metadata.price_id === allAppsPriceId ||
        sub.metadata.price_id === "price_1MrVOXFoZLegDZsXAkoP1B4W") &&
        sub.status === "active")
    );
  });
  return user_subs_price_ids.length > 0;
};

export const isSubscriptionActive = (
  profile,
  app_price_id,
  user,
  free_mode_count
) => {
  return (
    (user && free_mode_count < TOTAL_FREE_MODE_COUNT) ||
    (user && userSubscribedPlans(profile, app_price_id))
  );
};
