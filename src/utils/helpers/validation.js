const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

const emailValidation = (name, email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
};

const checkNull = (name, value) => {
  if (value.trim() === "") {
    return `Please ${name} is required`;
  }
  return null;
};

const confirmPassword = (password, confirmPassword) => {
  return null;
  // if (password !== confirmPassword) {
  //   return "Please password must match";
  // }
  // if (password.trim() === "" || confirmPassword.trim() === "") {
  //   return "Password is required";
  // }
  // return "Please enter a valid password";
};

export { nameValidation, emailValidation, confirmPassword, checkNull };
