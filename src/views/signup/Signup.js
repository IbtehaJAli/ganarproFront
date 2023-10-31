import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/img/ganarpro-logo-1.png";
import { authSignup } from "../../store/actions/authentication.action";
import "./Signup.css";
import HideIcon from "../../assets/icons/HideIcon";
import AuthInput from "../../components/input/AuthInput";
import ShowIcon from "../../assets/icons/ShowIcon";
import { emailValidation, checkNull } from "../../utils/helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import IntlTelInput from "react-intl-tel-input";
import { formatPhoneNumber } from "../../utils/helpers/helper";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  send_notification: "1",
  user_regions: [
    { name: "U", slug: "ab" },
    { name: "w", slug: "ab" },
  ],
};

// Replace YOUR_TOKEN with your Project Token

const Signup = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, token, user } = useSelector((state) => state.auth);

  const validate = {
    email: emailValidation,
    password: checkNull,
    first_name: checkNull,
    last_name: checkNull,
    send_notification: () => {},
    phone: checkNull,
    user_regions: () => {},
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
    // return
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
      dispatch(authSignup(values, navigate));
      // alert(JSON.stringify(values, null, 2));
    }
  };
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [navigate, user]);

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
                      Services for contractors
                    </span>
                    <br />
                    Tools to accelerate sales, and efficiency.
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
                    <span className="fw-bolder fs-2">Get unlimited access</span>
                    <br />
                    Projects, Cleanup Calculator, Cleanup Proposals, and
                    PreQualify
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
                      Get started- It's free, no credit card needed
                    </span>
                    <br />
                    Subscribe to individual products or All products when you
                    are ready
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
              <p className="fw-bolder" style={{ color: "#000" }}>
                Create your Ganarpro account
              </p>
              {/* {error ? <div className="text-danger">{error}</div> : ""} */}
              <div className="px-3 px-md-1 mx-auto mb-5 mt-5 signup-form text-16">
                <div className="d-lg-flex">
                  <div className="w-100 me-2">
                    <AuthInput
                      label="First name"
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      touched={touched?.["first_name"]}
                      value={values?.["first_name"]}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors?.["first_name"]}
                      requestError={error?.["first_name"]}
                    />
                  </div>
                  <div className="w-100">
                    <AuthInput
                      label="Last name"
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      touched={touched?.["last_name"]}
                      value={values?.["last_name"]}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={errors?.["last_name"]}
                      requestError={error?.["last_name"]}
                    />
                  </div>
                </div>
                <AuthInput
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="email"
                  touched={touched?.["email"]}
                  value={values?.["email"]}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors?.["email"]}
                  requestError={error?.["email"]}
                />
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
                <div className="d-lg-flex">
                  <div className="w-100 me-2">
                    <label
                      htmlFor="phone"
                      className="form-label text-start w-100"
                    >
                      Phone number
                    </label>
                    <IntlTelInput
                      preferredCountries={["us"]}
                      inputClassName="form-control py-4"
                      type="tel"
                      autoComplete="tel"
                      // onPhoneNumberChange={handleChange()}
                      onPhoneNumberChange={(isValid, phone) => {
                        const evt = {
                          target: {
                            value: phone,
                            name: "phone",
                            type: "text",
                          },
                        };
                        // handlePhoneNumber(phone);
                        handleChange(evt);
                      }}
                      onPhoneNumberBlur={(isValid, phone) => {
                        const evt = {
                          target: {
                            value: phone,
                            name: "phone",
                            type: "text",
                          },
                        };
                        // handlePhoneNumber(phone);
                        handleBlur(evt);
                      }}
                      value={values?.["phone"]}
                      fieldName="phone"
                    />
                    <div className="text-start text-danger text-10">
                      {errors?.["phone"]}
                    </div>
                    {error?.["phone"]?.map((err, index) => (
                      <div
                        key={index + 1}
                        className="text-start text-danger text-10"
                      >
                        {err}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-100 mt-5 mb-2">
                  <button
                    onClick={handleSubmit}
                    className="text-15 btn btn-primary w-100 py-4"
                    disabled={loading}
                  >
                    Create Account
                  </button>
                </div>
                <div className="text-start w-100">
                  <Link
                    to="/reset-password"
                    className="w-100 text-decoration-none"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="my-5">
                Already have an Account?
                <Link to="/login" className="text-decoration-none">
                  Login Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
