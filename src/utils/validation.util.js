export const requiredValidation = {
  errorMessage: "This field is required",
  test: (value) => value !== "",
};

export const nameValidation = {
  errorMessage: "Enter the name for your profile",
  test: (value) => value !== "",
};

export const emailValidation = {
  errorMessage: "Please enter a valid email",
  test: (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
};

export const passwordValidation = {
  errorMessage: "Your password must be at least 8 characters long",
  test: (value) => value.length >= 8,
};
