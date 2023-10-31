import axios from "axios";
import { getUser, isEmpty } from "../helpers/helper";

export async function request2(method, url, data = {}, header = {}) {
  const { access } = await getUser();
  let token = access;
  if (isEmpty(token)) {
    token = JSON.parse(localStorage.getItem("token"));
  }
  return (
    axios
      .request({
        url,
        method,
        data,
        // This is cause GET cannot send data so we have to be sure it is a param
        params: method === "GET" ? {} : data,
        baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   Authorization: `Bearer ${window.localStorage.getItem(API_TOKEN)}`
        // }
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          // 'Access-Control-Allow-Headers':
          //   'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          ...header,
        },
      })
      // Reducing the stress of getting data from response by doing it
      // here at the upper house.
      // .then(({ data }) => data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // Handling Validation Error
        if (error.response && error.response.status === 417) {
          // const errors = error.response.data.error;
          //   Vue.notify({
          //     type: "error",
          //     title: "Form Validation Error",
          //     duration: 10000,
          //     text: Object.keys(errors)
          //       .map(key => ` * <strong>${key}</strong>: ${errors[key]}`)
          //       .join("<br />")
          //   });
        }
        // So not to break the promise, we are throwing the error to
        // still be handled by anything expecting it
        return Promise.reject(error);
      })
  );
}

export async function request(
  method,
  url,
  data = {},
  header = {},
  formData = false
) {
  const { access } = await getUser();
  let token = access;
  if (isEmpty(token)) {
    token = JSON.parse(localStorage.getItem("token"));
  }
  let bodyData = JSON.stringify(data);
  return fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/${url}`, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...{ "Content-Type": "application/json" },
      ...header,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: method === "GET" ? undefined : JSON.stringify(data) // body data type must match "Content-Type" header
    body: method === "GET" ? undefined : bodyData, // body data type must match "Content-Type" header
  })
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        const error = {
          status: response.status,
          statustext: response.statusText,
          data: err,
        };
        return Promise.reject(error);
        // throw error;
      }
      if (response.status === 204) {
        const data = {
          status: true,
          statusCode: response.status,
          statustext: response.statusText,
        };
        return data;
      }
      return response.json();
    })
    .then((res) => res);
}

/**
 * Make a get request to the API server.
 *
 * @param url
 * @param query
 * @returns {Promise<any>}
 */
export function get$(url, query = "") {
  if (query) {
    url = `${url}?${query}`;
  }
  return request("GET", url);
}

/**
 * Make a post request to the API server.
 *
 * @param url
 * @param data
 * @param header
 * @returns {Promise<any>}
 */
export function post$(url, data = {}, header = {}, formData) {
  return request("POST", url, data, header, formData);
}

/**
 * Make a patch request to the API server.
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function patch$(url, data = {}) {
  return request("PATCH", url, data);
}

/**
 * Make a put request to the API server.
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put$(url, data = {}, header = {}, formData) {
  return request("PUT", url, data, (header = {}), formData);
}

/**
 * Make a delete request to the API server.
 *
 * @param url
 * @returns {Promise<any>}
 */
export function delete$(url) {
  return request("DELETE", url);
}
