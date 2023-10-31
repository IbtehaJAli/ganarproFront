import PropTypes from 'prop-types';

const FormInput = ({
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
  let inputClass = 'form-control py-4';
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
      </div>
      <div className="text-start text-danger text-10">
        {error || requestError ? 'Search name is required.' : ''}
      </div>
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default FormInput;
