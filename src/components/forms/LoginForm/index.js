import React, { useEffect, useState } from "react";
import AuthInput from "../../input/AuthInput";
import user from "../../../assets/icons/user.svg";
import ShowIcon from "../../../assets/icons/ShowIcon";
import HideIcon from "../../../assets/icons/HideIcon";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/img/ganarpro-logo-1.png";
import loginImage from "../../../assets/img/login/login-ill.svg";

import "../../../views/login/Login.css";
import { checkNull } from "../../../utils/helpers/validation";
import { authLogin } from "../../../store/actions/authentication.action";
import { useNavigate } from "react-router";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, token, message, user } = useSelector(
    (state) => state.auth
  );

  let pathName = window.location.pathname;

  const validate = {
    email: checkNull,
    password: checkNull,
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (evt) => {
    const { name, value: newValue, type } = evt.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value,
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (evt) => {
    const { name, value } = evt.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](name, value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // validate the form
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](key, values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      dispatch(authLogin(values, navigate));

      // navigate("/cleanup_calculator");

      // alert(JSON.stringify(values, null, 2));
    }
  };

  // Redirect if authenticated
  if (user) {
    document.location.href = pathName;
  }

  return (
    <div className="my-4 mx-auto mx-md-unset text-center">
      <div className="bg-white py-3 mx-auto md:ml-auto login-form-container">
        <div className="text-white mb-lg-4">
          <img src={logo} alt="logo" className="mt-5 mb-5 auth-logo" />
          <div className="d-md-none">
            <img src={loginImage} alt="logo" className="mb-5" />
          </div>
          <h3 className="text-28 black-100 fw-bold">Welcome!</h3>
          {message ? (
            <h5 className="text-15 text-white py-3 mb-5 mx-5 bg-success">
              {message}
            </h5>
          ) : (
            <h5 className="text-15 black-200 mb-5">
              Login using your Ganarpro account
            </h5>
          )}
        </div>
        {error ? <div className="text-danger">{error}</div> : ""}
        <div className="px-3 mx-auto mb-5 login-form w-90">
          <AuthInput
            label="Email"
            type="text"
            name="email"
            placeholder="email"
            icon={
              <img
                src={user}
                alt="email"
                className="position-absolute top-50 end-0 me-2"
              />
            }
            touched={touched?.["email"]}
            value={values?.["email"]}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors?.["email"]}
          />

          <AuthInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            touched={touched?.["password"]}
            value={values?.["password"]}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors?.["password"]}
            icon={
              showPassword ? (
                <ShowIcon
                  handleClick={handleShowPassword}
                  width="24"
                  height="24"
                  fill="#CCCCCC"
                  className="position-absolute top-50 end-0 me-2 cursor-pointer"
                />
              ) : (
                <HideIcon
                  handleClick={handleShowPassword}
                  width="24"
                  height="24"
                  fill="#CCCCCC"
                  className="position-absolute top-50 end-0 me-2 cursor-pointer"
                />
              )
            }
          />
          <div className="w-100 mt-5 mb-2">
            <button
              onClick={handleSubmit}
              className="text-15 btn btn-primary w-100 py-4"
              disabled={loading}
            >
              Login
            </button>
          </div>
          <div className="text-start w-100">
            <NavLink to="/" className="w-100 text-decoration-none">
              Forgot your password?
            </NavLink>
          </div>
        </div>

        <div className="my-5">
          Need An Account?{" "}
          <NavLink to="/signup" className="text-decoration-none">
            Sign Up Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
