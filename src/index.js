import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./styles/styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Spinner from "./components/spinner/Spinner";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Hotjar from "@hotjar/browser";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

if (process.env.REACT_APP_ENV !== "LOCAL") {
  Sentry.init({
    dsn: "https://385bae5d0bff4530be6336b4c10abd22@o395280.ingest.sentry.io/6702757",
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

const siteId = 3638082;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

// Initializing with `debug` option:
Hotjar.init(siteId, hotjarVersion, {
  debug: true,
});
// return <button onClick={methodDoesNotExist}>Break the world</button>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />

      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
