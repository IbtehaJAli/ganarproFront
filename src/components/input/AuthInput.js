import PropTypes from "prop-types";
import ErrorIcon from "../../assets/icons/ErrorIcon";

const AuthInput = ({
  label,
  type,
  name,
  placeholder,
  icon,
  error,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  value,
  requestError,
  ...props
}) => {
  let inputClass = "form-control py-4";
  if (error || requestError) {
    inputClass = `${inputClass} input-error`;
  }
  return (
    <div className="mb-3">
      <div className="text-start position-relative">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className={inputClass}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          onBlur={handleBlur}
          {...props}
        />
        {error || requestError ? (
          <ErrorIcon
            width="24"
            height="24"
            className="self-center ml-2 position-absolute top-50 end-0 me-2"
            fill="#D34A4A"
          />
        ) : (
          icon
        )}
      </div>
      <div className="text-start text-danger text-10">{error}</div>
      {requestError?.map((err, index) => (
        <div key={index + 1} className="text-start text-danger text-10">
          {err}
        </div>
      ))}
    </div>
  );
};

AuthInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired
};

export default AuthInput;
