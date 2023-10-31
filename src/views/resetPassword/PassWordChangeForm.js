import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/img/ganarpro-logo-1.png";
import {
  authSignup,
  passwordResetConfirm,
} from "../../store/actions/authentication.action";
import "../signup/Signup.css";
import HideIcon from "../../assets/icons/HideIcon";
import AuthInput from "../../components/input/AuthInput";
import ShowIcon from "../../assets/icons/ShowIcon";
import { emailValidation, checkNull } from "../../utils/helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Message from "../../components/Message";

const initialValues = {
  password: "",
};

const PassWordChangeForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { search } = window.location;
  const resetToken = new URLSearchParams(search).get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, token } = useSelector((state) => state.auth);
  const {
    error: confirmError,
    loading: confirmLoading,
    sucess,
  } = useSelector((state) => state.passwordResetConfirm);

  // const validate = {
  //   email: () => {},
  //   password: () => {},
  //   first_name: () => {},
  //   last_name: () => {},
  //   confirm_password: () => {},
  //   username: () => {},
  //   send_notification: () => {},
  //   phone: () => {},
  //   user_regions: () => {}
  // };
  const validate = {
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
      dispatch(passwordResetConfirm({ ...values, token: resetToken }));
      // alert(JSON.stringify(values, null, 2));
    }
  };
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <section
        className="signup-page pt-5"
        style={{ backgroundColor: "#195893" }}
      >
        <div className="row justify-content-center px-2 row-cols-md-2 align-items-md-center signup-page-div">
          <div className="mb-5">
            <div className="signup-text text-white mb-lg-4 px-3 text-center text-md-start mx-auto">
              {/*<h3 className="signup-header">Start your free trial today</h3>*/}
              {/*<h5 className="text-20">*/}
              {/*  No credit card required, no software to install. With your*/}
              {/*  trial, you get:*/}
              {/*</h5>*/}
              <div className="my-5 text-13 text-start">
                <div className="d-flex mb-4">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="me-3 py-3 fs-2 "
                    style={{ color: "rgb(6 128 245)" }}
                  />
                  <h5>
                    <span className="fw-bolder fs-2">
                      Create and manage proposals
                    </span>
                    <br />
                    Detailed document generation to accelerate bidding{" "}
                  </h5>
                  <br />
                </div>
                <div className="d-flex mb-4">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="me-3 py-3 fs-2 "
                    style={{ color: "rgb(6 128 245)" }}
                  />
                  <h5>
                    <span className="fw-bolder fs-2">
                      Supports the construction cleanup scope
                    </span>
                    <br />
                    Choose between 20 project types to include the correct scope
                    of work for your proposal
                  </h5>
                  <br />
                </div>
                <div className="d-flex mb-4">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="me-3 py-3 fs-2 "
                    style={{ color: "rgb(6 128 245)" }}
                  />
                  <h5>
                    <span className="fw-bolder fs-2">
                      Join the top cleaning companies
                    </span>
                    <br />
                    Ganarpto is accepted by estimators, project managers, home
                    owners, and property managers of every size
                  </h5>
                  <br />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="signup-page-div"> */}
          <div className="">
            <div className="bg-white py-3 signup-form-container">
              <Link to="/" className="text-decoration-none">
                <div className="text-center">
                  <img src={logo} alt="logo" />
                </div>
              </Link>
              {/* {error ? <div className="text-danger">{error}</div> : ""} */}
              <div className="px-3 px-md-1 mx-auto mb-5 mt-5 signup-form text-16">
                <h2 className="mb-5">Enter a new password</h2>
                {confirmError && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {Object.keys(confirmError).map((error) => {
                      return (
                        <p>
                          {" "}
                          {error}: {confirmError[error].toString()}
                        </p>
                      );
                    })}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                <div className="d-lg-flex">
                  <div className="w-100 me-2">
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
                      requestError={error?.["password"]}
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
                  </div>
                </div>
                <div className="w-100 mt-5 mb-2">
                  <button
                    onClick={handleSubmit}
                    className="text-15 btn btn-primary w-100 py-4"
                    disabled={confirmLoading}
                  >
                    Reset PassWord
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassWordChangeForm;
