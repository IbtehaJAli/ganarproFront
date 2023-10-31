import React, { useState } from "react";
import AuthInput from "../../input/AuthInput";
import ShowIcon from "../../../assets/icons/ShowIcon";
import HideIcon from "../../../assets/icons/HideIcon";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkNull, emailValidation } from "../../../utils/helpers/validation";
import { authSignup } from "../../../store/actions/authentication.action";
const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  confirm_password: "",
  username: "",
  send_notification: "1",
  user_regions: [
    { name: "U", slug: "ab" },
    { name: "w", slug: "ab" },
  ],
};

const SignupForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { error, loading, token } = useSelector((state) => state.auth);

  // const validate = {
  //   email: () => {},
  //   password: () => {},
  //   fname: () => {},
  //   lname: () => {},
  //   confirm_password: () => {},
  //   username: () => {},
  //   send_notification: () => {},
  //   phone: () => {},
  //   user_regions: () => {}
  // };
  const validate = {
    email: emailValidation,
    password: checkNull,
    fname: checkNull,
    lname: checkNull,
    confirm_password: checkNull,
    username: checkNull,
    send_notification: () => {},
    phone: () => {},
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
      dispatch(authSignup(values, history));
      // alert(JSON.stringify(values, null, 2));
    }
  };
  // if (token) {
  //   return <Navigate to="/" />;
  // }
  return (
    <>
      <div className="px-3 px-md-1 mx-auto mb-5 mt-5 signup-form text-16">
        <div className="d-lg-flex">
          <div className="w-100 me-2">
            <AuthInput
              label="First name"
              type="text"
              name="fname"
              placeholder="First name"
              touched={touched?.["fname"]}
              value={values?.["fname"]}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.["fname"]}
              requestError={error?.["fname"]}
            />
          </div>
          <div className="w-100">
            <AuthInput
              label="Last name"
              type="text"
              name="lname"
              placeholder="Last name"
              touched={touched?.["lname"]}
              value={values?.["lname"]}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.["lname"]}
              requestError={error?.["lname"]}
            />
          </div>
        </div>
        <AuthInput
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          touched={touched?.["username"]}
          value={values?.["username"]}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors?.["username"]}
          requestError={error?.["username"]}
        />
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
          <div className="w-100">
            <AuthInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="password"
              touched={touched?.["confirm_password"]}
              value={values?.["confirm_password"]}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors?.["confirm_password"]}
              requestError={error?.["confirm_password"]}
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
            disabled={loading}
          >
            Start my free trial
          </button>
        </div>
        <div className="text-start w-100">
          <Link to="/" className="w-100 text-decoration-none">
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
    </>
  );
};

export default SignupForm;
