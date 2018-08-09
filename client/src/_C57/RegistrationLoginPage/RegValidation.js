export function validateRegistration(data) {
  const firstValid = data.firstName.length >= 2;
  const lastValid = data.lastName.length >= 2;
  const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    data.emailInput
  );
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
