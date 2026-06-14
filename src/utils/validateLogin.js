export const checkValidData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,20}$/.test(password);

  if (!isEmailValid) return "Email Id is not valid";
  if (!isPasswordValid)
    return "Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";

  return null;
};
