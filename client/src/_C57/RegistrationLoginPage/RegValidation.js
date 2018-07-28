export function validateRegistration(data) {
  const firstValid = data.firstName.length >= 2;
  const lastValid = data.lastName.length >= 2;
  const emailValid = data.emailInput.includes("@");
  const passwordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!,.$%^&*-]).{8,}/.test(data.password);

  const formValid = firstValid && lastValid && emailValid && passwordValid;
  return {
    firstValid,
    lastValid,
    emailValid,
    passwordValid,
    formValid
  };
}
