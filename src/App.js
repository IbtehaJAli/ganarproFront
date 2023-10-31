import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/helpers/ScrollToTop";
import AuthRoutes from "./routes/AuthRoutes";
import Login from "./views/login/Login";
import "./App.css";
import Signup from "./views/signup/Signup";
import {
  getUserNotifications,
  reloadSession,
  userLoginSuccess,
} from "./store/actions/authentication.action";
import { checkAuth, getUser } from "./utils/helpers/helper";
import store from "./store/store";
import PassWordReset from "./views/resetPassword/PassWordReset";
import PassWordChangeForm from "./views/resetPassword/PassWordChangeForm";

export const NavbarContext = React.createContext();

if (localStorage.token) {
  const isAuthenticated = checkAuth();
  if (isAuthenticated) {
    //dispatch user details
    const data = getUser();
    window.heap.addUserProperties({
      Name: `${data.first_name} ${data.last_name} `,
      Phone: data.phone,
    });

    store.dispatch(userLoginSuccess(data));
    store.dispatch(reloadSession(data?.user?.id));
    store.dispatch(getUserNotifications());
  } else {
    // store.dispatch(logout());
  }
} else {
  // store.dispatch(logout());
}

function App() {
  const [showLargeScreenNav, setLargeScreenNav] = useState(false);
  const handleOpenLargeScreenNav = () => {
    setLargeScreenNav(!showLargeScreenNav);
  };

  return (
    <NavbarContext.Provider
      value={{ handleOpenLargeScreenNav, showLargeScreenNav }}
    >
      <div className="App">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/password_reset" element={<PassWordReset />} />
            <Route
              path="/password_reset/confirm/"
              element={<PassWordChangeForm />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<AuthRoutes />} />
          </Routes>
        </Router>
      </div>
    </NavbarContext.Provider>
  );
}

export default App;
