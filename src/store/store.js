// import {
//   legacy_createStore as createStore,
//   applyMiddleware,
//   compose,
// } from "redux";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import rootReducer from "./reducers";
import auth from "./reducers/authentication/authentication.reducer";

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  auth: { user: userInfoFromStorage },
};
const composeMiddleware = composeEnhancers(applyMiddleware(...middleware));
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
